const buildCatalog = (store) => {
  console.log(store.products);
  const { data } = store.products;
  // Importar componente de cards e interpolar html
  // Ejemplo
  const catalogHTML = data
    .map((product) => {
      return `
      <div class="product" id="product-catalog-${product.id}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
      </div>
    `;
    })
    .join("");

  return catalogHTML;
};

export const renderCatalog = (store) => {
  const catalogHTML = buildCatalog(store);
  // Insertar html en el DOM
  const catalog = document.querySelector("#catalog");
  catalog.innerHTML = catalogHTML;
};
