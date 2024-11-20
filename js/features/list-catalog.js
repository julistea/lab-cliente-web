import { card } from "../components/index.js";

const buildCatalog = (store) => {
  const { data } = store.products;
  const catalogHTML = data.map(card).join("");
  return catalogHTML;
};

export const renderCatalog = (store) => {
  const catalogHTML = buildCatalog(store);
  // Insertar html en el DOM
  const catalog = document.querySelector("#catalog");
  catalog.innerHTML = catalogHTML;
};
