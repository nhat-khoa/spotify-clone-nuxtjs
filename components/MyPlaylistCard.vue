<template>
  <div class="text-white border-0">
    <img
      :src="playlist.avatar_url || '/images/cover/small/1.jpg'"
      class="card"
      alt="Playlist image"
      style="width: 200px"
    />
    <div class="card-body px-2 py-3">
      <h5 class="card-title text-truncate mb-1">{{ playlist.name }}</h5>
      <p class="card-text text-muted text-truncate mb-0">
        {{
          playlist.user?.full_name ||
          playlist.user?.username ||
          "Unknown Artist"
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});
</script>
