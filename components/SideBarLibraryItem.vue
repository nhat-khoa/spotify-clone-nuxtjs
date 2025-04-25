<!-- components/SideBarLibraryItem.vue -->
<template>
  <div class="library-item d-flex align-items-center p-2 rounded-2 position-relative" :class="{ 'ms-3': isInFolder }"
    @click="navigateToItem" @contextmenu.prevent="showContextMenu($event)">
    <div class="library-item-image me-3">
      <img :src="image" :alt="title" class="rounded" :class="{
        'rounded-circle': type === 'artist',
        'rounded-1': ['folder', 'podcast', 'album', 'playlist'].includes(
          type
        ),
      }" width="40" height="40" />
    </div>
    <div class="library-item-info flex-grow-1">
      <div class="library-item-title text-truncate">{{ title }}</div>
      <div class="library-item-meta d-flex align-items-center gap-2">
        <i v-if="type === 'artist'" class="ri-verified-badge-fill text-primary fs-6"></i>
        <i v-if="type === 'folder'" class="ri-folder-fill text-primary fs-6"></i>
        <i v-if="type === 'podcast'" class="ri-mic-fill text-primary fs-6"></i>
        <i v-if="type === 'album'" class="ri-album-fill text-primary fs-6"></i>
        <i v-if="type === 'playlist'" class="ri-play-list-fill text-primary fs-6"></i>
        <span class="library-item-subtitle text-white-50 small text-truncate">{{ subtitle }}</span>
      </div>
    </div>
  </div>

  <!-- Context Menu -->
  <div v-if="menuVisible" class="dropdown-menu show position-fixed" :style="{ top: `${menuY}px`, left: `${menuX}px` }">
    <!-- Các option -->
    <button class="dropdown-item" @click.stop="editItem">
      <i class="ri-edit-line fs-5 me-2"></i>
      Chỉnh sửa
    </button>
    <button class="dropdown-item" @click.stop="deleteItem">
      <i class="ri-delete-bin-line fs-5 me-2"></i>
      Xóa
    </button>
    <button class="dropdown-item" @click.stop="removeFromFolders">
      <i class="bi bi-folder-x fs-5 me-2"></i>
      Xóa khỏi các thư mục
    </button>

    <!-- Di chuyển sang thư mục -->
    <div class="dropdown-submenu position-relative">
      <button class="dropdown-item">
        <i class="ri-folder-line fs-5 me-2"></i>
        Di chuyển sang thư mục ➔
      </button>
      <div class="dropdown-menu show position-absolute" style="top: 0; left: 100%; min-width: 200px;">
        <FolderList :folders="folders" @moveToFolder="moveToFolder" />
      </div>
    </div>
  </div>

  <dialog ref="myDialog">
    
  </dialog>

</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import FolderList from './FolderList.vue'
const { $axios } = useNuxtApp();


const emit = defineEmits(['clickFolder', 'refresh'])
const myDialog = ref(null)
const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const showContextMenu = (event) => {
  if (props.type === 'folder' || props.type === 'playlist') {
    menuVisible.value = true
    menuX.value = event.clientX
    menuY.value = event.clientY
  }
}

onMounted(() => {
  document.addEventListener('click', () => {
    menuVisible.value = false
  })

})

onBeforeUnmount(() => {
  document.removeEventListener('click', () => {
    menuVisible.value = false
  })
})

const editItem = async () => {
  if (props.type === 'folder') {
    const name = prompt('Nhập tên thư mục', props.title)
    if (name) {
      await $axios.put(`/api/libraries/folders/update_folder/`, {
        folder_id: props.id,
        name: name
      })
      emit('refresh')
    }
  }
  if (props.type === 'playlist') {
    myDialog.value.showModal()
  }
}

const deleteItem = async () => {
  if (props.type === 'folder' || props.type === 'playlist') {
    await $axios.delete(`/api/libraries/${props.type === 'folder' ? 'folders' : 'playlists'}/remove_${props.type}/`, {
      data: { [`${props.type}_id`]: props.id }
    }).catch(error => {
      alert('Error deleting item: ' + error?.response?.data?.error)
      return
    })
    emit('refresh')
  }
}

const removeFromFolders = async () => {
  if (props.type === 'folder' || props.type === 'playlist') {
    await $axios.put(`/api/libraries/${props.type === 'folder' ? 'folders' : 'playlists'}/remove_${props.type}_from_folder/`, {
      [`${props.type}_id`]: props.id
    }).catch(error => {
      alert('Error removing item from folders: ' + error?.response?.data?.error)
      return
    })
    emit('refresh')
  }
}

const moveToFolder = async (folderId) => {
  if (props.type === 'folder' || props.type === 'playlist') {
    await $axios.put(`/api/libraries/${props.type === 'folder' ? 'folders' : 'playlists'}/add_${props.type}_to_folder/`, {
      [`${props.type}_id`]: props.id,
      parent_folder_id: folderId
    }).catch(error => {
      alert('Error moving item to folder: ' + error?.response?.data?.error)
      return
    })
    emit('refresh')
  }
}


const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  folders: {
    type: Array,
    required: false
  },

  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "playlist",
    validator: (value) =>
      ["playlist", "artist", "album", "folder", "podcast", 'track', 'episode'].includes(value),
  },
  isInFolder: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const navigateToItem = () => {
  if (props.path) {
    router.push(props.path);
  }
  if (props.type === 'folder') {
    emit('clickFolder')
  }
};
</script>

<style scoped>
.dropdown-submenu>.dropdown-menu {
  display: none;
}

.dropdown-submenu:hover>.dropdown-menu {
  display: block;
}


.library-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 48px;
}

.library-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.library-item-image {
  flex-shrink: 0;
}

.library-item-image img {
  object-fit: cover;
  width: 40px;
  height: 40px;
}

.library-item-title {
  font-weight: 500;
  font-size: 0.875rem;
}

.library-item-subtitle {
  font-size: 0.75rem;
}

.library-item-meta {
  line-height: 1.2;
}
</style>
