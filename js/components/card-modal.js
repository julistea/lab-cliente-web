export default function cardModal(product) {
  const { image, title, description, price } = product;
  return /* html */ `
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none">✕</button>
    </form>
    <article class="card">
      <div class="relative">
        <figure>
          <img src="${image}" alt="${title}" class="h-72 w-full object-contain" />
        </figure>
      </div>
      <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p>${description}...</p>
        <div class="card-actions justify-between items-center mt-4">
          <div>
            <p class="badge badge-accent p-4 font-bold">$${price}</p>
          </div>

          <button class="btn btn-primary" id="btn-catalog-add">Agregar al carrito</button>
        </div>
      </div>
    </article>
  `;
}
