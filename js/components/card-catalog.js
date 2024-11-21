export default function cardCatalog(product) {
  const { id, image, title } = product;
  return /* html */ `
     <article id="card-catalog-${id}" class="card shadow-xl hover:scale-105 transition cursor-pointer">
      <div class="relative">
        <figure>
          <img src="${image}" alt="${title}" class="h-72 w-full object-contain" />
        </figure>
      </div>
      <div class="card-body">
        <h2 class="card-title">${title}</h2>
      </div>
    </article>
  `;
}
