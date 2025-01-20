import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDB = path.join(__dirname,'data', 'products.json');

// Middleware staatiliste failide jaoks
app.use(express.static(path.join(__dirname)));

// Funktsioon: Laadi andmed FakeStore API-st ja salvesta faili
const fetchAndSaveProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;
  await fs.writeFile('./data/products.json', JSON.stringify(products, null, 2));
};

// Funktsioon: Kontrolli, kas fail on tühi
const isFileEmpty = async (path) => {
  try {
    const rawData = await fs.readFile(path, 'utf-8');
    return !rawData.trim(); // Kontrollime, kas fail on tühi (või ainult tühikud)
  } catch (error) {
    console.error('Viga faili lugemisel', error);
    return true; // Kui tekib viga, eeldame, et fail on tühi või puudub
  }
};

// API: Tagasta lokaalsest JSON-failist andmed
app.get('api/products', async (req, res) => {
  try {
    const filePath = './data/products.json';

    // Kontrolli, kas fail on tühi
    const emptyFile = await isFileEmpty(filePath);

    // Kui fail on tühi, lae andmed API-st ja salvesta need
    if (emptyFile) {
      console.log('Fail on tühi. Laadin andmed FakeStore API-st...');
      await fetchAndSaveProducts();
    }

    // Loe andmed failist
    const rawData = await fs.readFile(filePath, 'utf-8');

    // Parssige andmed
    const products = JSON.parse(rawData);

    // Seadista vastuse päised
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Tagasta andmed kasutajale
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});

// API: Käsitsi andmete uuesti laadimine ja faili salvestamine
// localhost:PORT/fetch-products käivitab, kui server töötab parasjagu
app.get('/fetch-products', async (req, res) => {
  try {
    await fetchAndSaveProducts();
    res.status(200).json({ message: 'Andmed salvestatud products.json faili' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete laadimine ebaõnnestus' });
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


// Käivita server
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
