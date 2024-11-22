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
    ? JSON.parse(this.localStorageProducts)
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

  addProductToSelection = (product) => {
    const { id } = product;
    const isProductAlreadySelected = this.selectedProducts.some(
      (product) => product.id === id
    );
    if (isProductAlreadySelected) {
      return "DUPLICATED_PRODUCT";
    }
    this.selectedProducts.push({ ...product, quantity: 1 });
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.selectedProducts)
    );
    return "PRODUCT_ADDED";
  };

  decrementQuantity(id) {
    const productIndex = this.selectedProducts.findIndex(
      (product) => product.id === id
    );
    if (this.selectedProducts[productIndex].quantity === 1) {
      return this.selectedProducts;
    }
    this.selectedProducts[productIndex].quantity -= 1;
    this.selectedProducts = [...this.selectedProducts];
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.selectedProducts)
    );
  }

  incrementQuantity(id) {
    const productIndex = this.selectedProducts.findIndex(
      (product) => product.id === id
    );
    this.selectedProducts[productIndex].quantity += 1;
    this.selectedProducts = [...this.selectedProducts];
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.selectedProducts)
    );
  }

  deleteProductInCart(id) {
    this.selectedProducts = this.selectedProducts.filter(
      (product) => product.id !== id
    );
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.selectedProducts)
    );
    return this.selectedProducts;
  }

  buttonAction() {
    this.selectedProducts = [];
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.selectedProducts)
    );
  }
}

export const createStore = () => {
  const store = new CatalogStore();
  return store;
};
