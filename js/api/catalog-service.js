class CatalogService {
  API_URL = "https://fakestoreapi.com";

  fetchProducts = async () => {
    try {
      const response = await fetch(`${this.API_URL}/products`);
      const data = await response.json();
      return {
        loading: false,
        error: false,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        loading: false,
        error: true,
        data: [],
      };
    }
  };

  fetchCategories = async () => {
    try {
      const response = await fetch(`${this.API_URL}/products/categories`);
      const data = await response.json();
      return {
        loading: false,
        error: false,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        loading: false,
        error: true,
        data: [],
      };
    }
  };
}

export default CatalogService;
