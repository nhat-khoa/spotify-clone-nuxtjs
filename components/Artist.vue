<template>
  <NuxtLink to="/artist/1" class="mt-3 cover cover--round scale-animation">
    <div class="ratio ratio-1x1" style="width: 220px">
      <NuxtLink :to="`/artist/${artist.id}`" class="list__title text-truncate">
        <img
          :src="artist.avatar_url || '/images/cover/large/5.jpg'"
          alt=""
          class="rounded-circle"
        />
      </NuxtLink>
    </div>
    <div class="cover__foot">
      <h6 class="cover__title text-truncate p-3">
        <NuxtLink
          :to="`/artist/${artist.id}`"
          class="list__title text-truncate"
        >
          {{ artist.name }}
        </NuxtLink>
      </h6>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  artist: {
    type: Object,
    required: true,
  },
});
</script>
<style></style>
