import { defineStore } from 'pinia'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating?: {
    rate: number
    count: number
  }
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const search = ref('')
  const categoryFilter = ref('')

  async function fetchProducts() {
    const config = useRuntimeConfig()
    const { data } = await useFetch<Product[]>(`${config.public.apiBase}/products`)
    products.value = data.value || []
  }

  async function fetchCategories() {
    const config = useRuntimeConfig()
    const { data } = await useFetch<string[]>(`${config.public.apiBase}/products/categories`)
    categories.value = data.value || []
  }

  const filtered = computed(() => {
    return products.value.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(search.value.toLowerCase())
      const matchCategory = categoryFilter.value ? p.category === categoryFilter.value : true
      return matchTitle && matchCategory
    })
  })

  return { products, categories, search, categoryFilter, filtered, fetchProducts, fetchCategories }
})
