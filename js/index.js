import { createStore } from "./app/catalog-store.js";
import { renderCatalog } from "./features/list-catalog.js";
import { renderCategories } from "./features/list-categories.js";

const init = async () => {
  const store = await createStore().fetchCatalog();
  renderCatalog(store);
  renderCategories(store);
};

init();
