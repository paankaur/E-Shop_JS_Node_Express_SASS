import express from "express";
import fs from "fs/promises";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDB = path.join(__dirname, "data", "products.json");
const favoritesDB = path.join(__dirname, "data", "favorites.json");

// Middleware staatiliste failide jaoks
app.use(express.static(path.join(__dirname)));

// Funktsioon: Laadi andmed FakeStore API-st ja salvesta faili
const fetchAndSaveProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  await fs.writeFile(localDB, JSON.stringify(products, null, 2));
};

// Funktsioon: Kontrolli, kas fail on tühi
const isFileEmpty = async (path) => {
  try {
    const rawData = await fs.readFile(path, "utf-8");
    return !rawData.trim(); // Kontrollime, kas fail on tühi (või ainult tühikud)
  } catch (error) {
    console.error("Viga faili lugemisel", error);
    return true; // Kui tekib viga, eeldame, et fail on tühi või puudub
  }
};

// API: Tagasta lokaalsest JSON-failist andmed
app.get("/api/products", async (req, res) => {
  try {
    const filePath = "./data/products.json";

    // Kontrolli, kas fail on tühi
    const emptyFile = await isFileEmpty(filePath);

    // Kui fail on tühi, lae andmed API-st ja salvesta need
    if (emptyFile) {
      console.log("Fail on tühi. Laadin andmed FakeStore API-st...");
      await fetchAndSaveProducts();
    }

    // Loe andmed failist
    const rawData = await fs.readFile(filePath, "utf-8");

    // Parssige andmed
    const products = JSON.parse(rawData);

    // Seadista vastuse päised
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    // Tagasta andmed kasutajale
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

// API: Käsitsi andmete uuesti laadimine ja faili salvestamine
// localhost:PORT/fetch-products käivitab, kui server töötab parasjagu
app.get("/fetch-products", async (req, res) => {
  try {
    await fetchAndSaveProducts();
    res.status(200).json({ message: "Andmed salvestatud products.json faili" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Andmete laadimine ebaõnnestus" });
  }
});

// yhe kategooria vaade peaks see olema:
app.get("/api/products/category/:category", async (req, res) => {
  console.log(req.params);
  try {
    // Seadista vastuse päised
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    // Loe andmed failist
    const rawData = await fs.readFile(localDB, "utf-8");

    // Parssige andmed
    const products = JSON.parse(rawData);

    const categoryProducts = products.filter(
      (item) => item.category === req.params.category
    );
    res.status(200).json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

// kategooriate endpoint

app.get("/api/products/categories", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(localDB, "utf-8"));
    const categories = data.map((item) => item.category);
    const uniqueArray = [...new Set(categories)];

    if (uniqueArray) {
      res.json(uniqueArray);
    } else {
      res.status(404).json({ message: "Kategooria lugemine ebaõnnestus" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

// ühe toote ID saamine
app.get("/api/products/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(localDB, "utf-8"));
    const product = data.find((p) => p.id === parseInt(req.params.id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Ei leidnud toodet" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmeid ei leitud id järgi" });
  }
});
//käsitsi tegin 'data' kausta faili 'favorites.json'
//customer id järgi produkti leidmine
app.get("/api/favorites/:customerId", async (req, res) => {
  try {
    const favoritesData = JSON.parse(await fs.readFile(favoritesDB, "utf-8"));
    const favoritesIds = favoritesData[req.params.customerId] || [];
    const data = JSON.parse(await fs.readFile(localDB, "utf-8"));
    const products = data.filter((product) =>
      favoritesIds.includes(product.id)
    );

    if (products) {
      res.status(200).json(products);
    } else {
      res
        .status(404)
        .json({ message: "Toodete andmete lugemine ei õnnestunud" });
    }
  } catch (error) {
    res.status(404).json({
      message: "Andmete lugemine ebaõnnestus, probleem ehk customer ID'ga",
    });
  }
});

//producti POSTimine kindlale kliendi ID-le
app.post("/api/favorites/:customerId/:productId", async (req, res) => {
  try {
    const emptyFile = await isFileEmpty(favoritesDB);
    console.log(req.params);

    if (emptyFile) {
      const newData = {
        [req.params.customerId]: [parseInt(req.params.productId)],
      };
      console.log(newData);
      await fs.writeFile(favoritesDB, JSON.stringify(newData, null, 2));
      return res.status(200).json(newData);
    }

    const favoritesData = JSON.parse(await fs.readFile(favoritesDB, "utf-8"));

    //võtan customeri producti id failist
    const favoritesIds = favoritesData[req.params.customerId] || [];

    // pushin massiivisse
    favoritesIds.push(parseInt(req.params.productId));
    const uniqueIds = [...new Set(favoritesIds)];
    favoritesData[req.params.customerId] = uniqueIds;

    //kirjutan uue massiivi failisse
    await fs.writeFile(favoritesDB, JSON.stringify(favoritesData, null, 2));

    // network tabist saab uurida jrgnevat
    res.status(200).json(uniqueIds);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Andmete kirjutamine lemmikutesse ei õnnestunud" });
  }
});

//Endpoint to delete a favorite product by ID pooleli........................
app.delete("/api/favorites/:customerId/:productId", async (req, res) => {
  try {
    const favoritesData = JSON.parse(
      await fs.readFile(favoritesDB, "utf-8")
    );
    const favoritesIds = favoritesData[req.params.customerId] || [];

    const newArray = favoritesIds.filter(
      (id) => id !== parseInt(req.params.productId)
    );
    favoritesData[req.params.customerId] = newArray;
    await fs.writeFile(favoritesDB, JSON.stringify(favoritesData, null, 2));
    res.status(200).json(favoritesData);
  } catch (error) {
    res.status(404).json({ message: "Andmete kustutamine ei õnnistunud" });
  }
});

// Käivita server
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
