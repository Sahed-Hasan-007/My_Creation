import { ref, onMounted } from "vue";
import { useFetch } from "#app"; // Nuxt 3's composable for fetching data

export function useProducts() {
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchProducts() {
    isLoading.value = true;
    try {
      const { data } = await useFetch("https://fakestoreapi.com/products");
      products.value = data.value || [];
    } catch (err) {
      error.value = err.message || "Failed to fetch products.";
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetchProducts);

  return { products, isLoading, error };
}
