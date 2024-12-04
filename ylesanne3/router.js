import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

export const navigate = (view, param) => {
    const views = {
        allProducts: () => displayAllProductsView(param || "all"),
        productDetail: () => displayProductDetailView(param),
        cart: () => displayCartView(),
        favorites: () => displayFavoritesView(),
    };

    if (views[view]) {
        views[view]();
        const encodedParam = encodeURIComponent(param);
        const newURL = view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`;
        window.history.pushState({}, "", newURL);
    }
};

window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    const [_, view, param] = path.split("/");
    const decodedParam = decodeURIComponent(param);
    navigate(view || "category", decodedParam);
});