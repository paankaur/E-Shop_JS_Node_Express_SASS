export const displayFavoritesView = (favorites) => {
  const container = document.getElementById("favorites-view");
  container.innerHTML = "<h2>Favorites</h2>";
  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.title}</h3>
        <p>Price: €${item.price}</p>`;
    container.appendChild(favoriteItemElement);
  });
};
