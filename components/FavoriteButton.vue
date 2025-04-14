<script setup>
import { ref } from 'vue'
import { useFavorite } from '~/composables/useFavorite'
import { useToast } from 'vue-toastification'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  initialFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])

const { favorite } = useFavorite()

const isFavorite = ref(props.initialFavorite)
const loading = ref(false)

const toggleFavorite = async () => {
  if (loading.value) return

  loading.value = true
  try {
    await favorite({
      type: props.type,
      id: props.id,
      action: props.action
    })
    isFavorite.value = !isFavorite.value
    emit('update', isFavorite.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button 
    @click="toggleFavorite" 
    :disabled="loading"
    class="transition-all duration-300 hover:scale-110"
  >
    <i 
      class="ri-heart-fill" 
      :class="isFavorite ? 'text-pink-500' : 'text-gray-400'"
    ></i>
  </button>
</template>
