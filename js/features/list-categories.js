export const renderCategories = (store) => {
  const { data: categories } = store.categories;
  const categoriesList = document.querySelector("#categories-list");
  for (const category of categories)
    categoriesList.innerHTML += `<li class="mb-1.5 capitalize">${category}</li>`;
};


