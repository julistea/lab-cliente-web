import { createStore } from "./app/catalog-store.js";
import { renderCatalog, filterCatalog } from "./features/list-catalog.js";
import { renderCategories } from "./features/list-categories.js";

const init = async () => {
  
  const store = await createStore().fetchCatalog();
  
  renderCatalog(store);
  renderCategories(store);

  const searchBar = document.querySelector("#search-bar");
  searchBar.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    filterCatalog(store, searchQuery);
  });
};

init();
