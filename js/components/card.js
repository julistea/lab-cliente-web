export default function card(product) {
  const { image, title, description, price } = product;
  return /* html */ `
     <article class="card shadow-xl hover:scale-105 transition">
     <div class="relative">
      <figure>
        <img src="${image}" alt="${title}" class="h-72 w-full object-cover" />
      </figure>
      <p class="absolute bottom-2 left-2 badge badge-accent p-4 font-bold">$${price}</p>
     </div>
      <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p>${description.slice(0, 100)}...</p>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </article>
  `;
}
