import {
  cardCatalog,
  cardModal,
  modalCatalog,
  toastCatalog,
} from "../components/index.js";

const buildCatalog = (store) => {
  const { data } = store.products;
  const catalogHTML = data.map(cardCatalog).concat(modalCatalog()).join("");
  return catalogHTML;
};

const addEventListeners = (store) => {
  const { data } = store.products;
  const idList = data.map((product) => product.id);
  const modal = document.querySelector("#catalog-modal");
  const modalContent = document.querySelector("#catalog-modal-content");
  idList.forEach((id) => {
    const card = document.querySelector(`#card-catalog-${id}`);
    card.addEventListener("click", () => {
      const modalProduct = data.find((product) => product.id === id);
      modalContent.innerHTML = cardModal(modalProduct);

      const btnAdd = document.querySelector("#btn-catalog-add");
      btnAdd.addEventListener("click", () => {
        const result = store.addProductToSelection(modalProduct.id);
        const toast = document.querySelector("#toast-catalog");
        const alert = document.createElement("div");
        alert.innerHTML = toastCatalog(result);
        toast.appendChild(alert);
        setTimeout(() => {
          toast.removeChild(alert);
        }, 5000);
        modal.close();
      });

      modal.showModal();
    });
  });
};

export const renderCatalog = (store) => {
  const catalogHTML = buildCatalog(store);
  // Insertar html en el DOM
  const catalog = document.querySelector("#catalog");
  catalog.innerHTML = catalogHTML;

  addEventListeners(store);
};
