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
      const [products, categories] = await Promise.all([
        this.catalogService.fetchProducts(),
        this.catalogService.fetchCategories(),
      ]);
      this.products = products;
      this.categories = categories;
      return this;
    } catch (error) {
      console.error(error);
      this.products.error = true;
      this.categories.error = true;
    } finally {
      this.products.loading = false;
      this.categories.loading = false;
    }
  };
}

export const createStore = () => {
  const store = new CatalogStore();
  return store;
};
