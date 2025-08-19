import { ref, onMounted } from "vue";
import { useFetch } from "#app"; 
import { useRoute } from "vue-router";

export function useProduct() {
  const product = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchProduct(id) {
    isLoading.value = true;
    try {
      const uri = `https://fakestoreapi.com/products/${id}`;
      const { data } = await useFetch(uri);
      product.value = data.value || null;
    } catch (err) {
      error.value = err.message || "Failed to fetch the product.";
    } finally {
      isLoading.value = false;
    }
  }

  // Automatically fetch the product based on route params
  onMounted(() => {
    const { id } = useRoute().params;
    if (id) fetchProduct(id);
  });

  return { product, isLoading, error };
}
