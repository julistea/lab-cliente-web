import {
  cardCatalog,
  cardModal,
  modalCatalog,
  toastCatalog,
  cardInCart,
  buttonsCart,
  checkoutModal,
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
        const result = store.addProductToSelection(modalProduct);
        const toast = document.querySelector("#toast-catalog");
        const alert = document.createElement("div");
        alert.innerHTML = toastCatalog(result);
        toast.appendChild(alert);
        productsInCart(store);
        setTimeout(() => {
          toast.removeChild(alert);
        }, 3000);
        modal.close();
      });

      modal.showModal();
    });
  });
};

const productsInCart = (store) => {
  const container = document.querySelector("#products-cart");
  const containerButtons = document.querySelector("#container-buttons-cart");
  container.innerHTML = "";
  containerButtons.innerHTML = "";
  if (store.selectedProducts.length === 0) {
    container.innerHTML =
      '<p class="mb-8 text-lg">Aún no hay productos en el carrito de compra.</p>';
    return;
  }
  for (const product of store.selectedProducts) {
    container.innerHTML += cardInCart(product);
  }
  containerButtons.innerHTML = buttonsCart();
  addEventListenerButtons(store);
};

const addEventListenerButtons = (store) => {
  const buttonsDecrement = document.querySelectorAll("#button-decrement");
  const buttonsIncrement = document.querySelectorAll("#button-increment");
  const buttonsDelete = document.querySelectorAll("#button-delete");
  for (const button of buttonsDecrement) {
    button.addEventListener("click", (event) =>
      handleButtonsLess(event, store)
    );
  }
  for (const button of buttonsIncrement) {
    button.addEventListener("click", (event) =>
      handleButtonsMore(event, store)
    );
  }
  for (const button of buttonsDelete) {
    button.addEventListener("click", (event) =>
      handleButtonsDelete(event, store)
    );
  }

  const buttonCheckout = document.querySelector("#button-checkout");
  const buttonReset = document.querySelector("#button-reset");
  buttonCheckout.addEventListener("click", () => handleButtonCheckout(store));
  buttonReset.addEventListener("click", () => handleButtonReset(store));
};

const handleButtonsLess = (event, store) => {
  const { value: id } = event.target;
  if (!id) return;
  store.decrementQuantity(+id);
  productsInCart(store);
};

const handleButtonsMore = (event, store) => {
  const { value: id } = event.target;
  if (!id) return;
  store.incrementQuantity(+id);
  productsInCart(store);
};

const handleButtonsDelete = (event, store) => {
  const { value: id } = event.target;
  if (!id) return;
  store.deleteProductInCart(+id);
  productsInCart(store);
};

const handleButtonCheckout = (store) => {
  const modal = document.querySelector("#catalog-modal");
  const modalContent = document.querySelector("#catalog-modal-content");
  modalContent.innerHTML = checkoutModal();
  modal.showModal();
  store.buttonAction();
  productsInCart(store);
};

const handleButtonReset = (store) => {
  store.buttonAction();
  productsInCart(store);
};

export const renderCatalog = (store) => {
  const catalogHTML = buildCatalog(store);
  const catalog = document.querySelector("#catalog");
  catalog.innerHTML = catalogHTML;
  addEventListeners(store);
  productsInCart(store);
};
