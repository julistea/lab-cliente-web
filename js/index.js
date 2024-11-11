import { createStore } from "./app/catalog-store.js";
import { renderCatalog } from "./features/list-catalog.js";

const init = async () => {
  const store = await createStore().fetchCatalog();
  renderCatalog(store);
};

init();
