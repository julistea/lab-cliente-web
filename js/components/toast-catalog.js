export default function toastCatalog(msgCode) {
  if (msgCode === "DUPLICATED_PRODUCT") {
    return /* html */ `
      <div class="alert alert-error">
        <span class="text-md font-bold text-slate-100">El producto ya está en el carrito</span>
      </div>
    `;
  }
  if (msgCode === "PRODUCT_ADDED") {
    return /* html */ `
      <div class="alert alert-success">
        <span class="text-md font-bold text-slate-100">El producto se ha agregado al carrito</span>
      </div>
    `;
  }
  return /* html */ ``;
}
