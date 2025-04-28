<template>

</template>

<script setup>
import { useToast } from "vue-toastification";
const { $axios } = useNuxtApp();
const toast = useToast();

definePageMeta({
  layout: false,
})

// pages/share/playlist/[id].vue
onMounted(async () => {
  const route = useRoute()
  const playlistId = route.params.id
  const token = route.query.token

  const res = await $axios.post('/api/libraries/playlists/join_playlist/', {
    playlist_id: playlistId,
    token: token,
  })

  toast.success(res.data.message)
  navigateTo(`/playlist/${playlistId}`, { replace: true })
})

</script>