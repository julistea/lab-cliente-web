import CatalogService from "../api/catalog-service.js";

class CatalogStore {
  catalogService = new CatalogService();
  products = {
    loading: false,
    error: false,
    data: [],
  };
  categories = {
    loading: false,
    error: false,
    data: [],
  };
  localStorageProducts = localStorage.getItem("selectedProducts");
  selectedProducts = this.localStorageProducts
    ? JSON.parse(selectedProducts)
    : [];

  fetchCatalog = async () => {
    try {
      this.products.loading = true;
      this.categories.loading = true;
      this.products = await this.catalogService.fetchProducts();
      this.categories = await this.catalogService.fetchCategories();
      return this;
    } catch (error) {
      console.error(error);
      this.products.loading = false;
      this.products.error = true;
      this.categories.loading = false;
      this.categories.error = true;
    }
  };
}

export const createStore = () => {
  const store = new CatalogStore();
  return store;
};
