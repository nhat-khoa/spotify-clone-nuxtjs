<template>
  <div v-for="folder in folders" :key="folder.id" class="dropdown-submenu position-relative">
    <button class="dropdown-item" @click.stop="handleMove(folder.id)">
      <i class="ri-folder-line fs-5 me-2"></i>
      {{ folder.name }}  {{ folder.subfolders.length ? '➔' : '' }}
    </button>

    <!-- Nếu có subfolders thì đệ quy render tiếp -->
    <div
      v-if="folder.subfolders && folder.subfolders.length > 0"
      class="dropdown-menu show position-absolute"
      style="top: 0; left: 100%; min-width: 200px;"
    >
      <FolderList :folders="folder.subfolders" @moveToFolder="emitMove" />
    </div>
  </div>
</template>

<script setup>
import FolderList from './FolderList.vue'

const props = defineProps({
  folders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['moveToFolder'])

function handleMove(id) {
  emit('moveToFolder', id)
}

function emitMove(id) {
  emit('moveToFolder', id)
}
</script>

<style scoped>
.dropdown-submenu > .dropdown-menu {
  display: none;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}
</style>
