<template>
  <div class="container-fluid" style="background-color: #f9f9f9; padding: 20px;">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Album Management</h2>
      <button class="btn btn-primary" @click="showAlbumModal(false)">
        <i class="ri-add-line me-2"></i>Add New Album
      </button>
    </div>

    <!-- Albums Grid -->
    <div class="row g-4">
      <div v-for="album in albums" :key="album.id" class="col-sm-6 col-md-4 col-lg-3">
        <div class="card border-0 shadow-sm h-100">
          <img :src="album.avatar_url || '/default-album.png'" 
               class="card-img-top" 
               alt="Album cover"
               style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title mb-1">{{ album.title }}</h5>
            <p class="card-text">{{ album.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">{{ album.tracks_count }} tracks</span>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary" @click="showAlbumModal(true, album)">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteAlbum(album)">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Album Modal -->
    <div class="modal fade" id="albumModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Album' : 'Add New Album' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAlbum">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Title</label>
                  <input v-model="albumForm.title" type="text" class="form-control" required>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Album Type</label>
                  <select v-model="albumForm.album_type" class="form-select">
                    <option value="">Select Type</option>
                    <option value="album">Album</option>
                    <option value="single">Single</option>
                    <option value="ep">EP</option>
                    <option value="compilation">Compilation</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Record Label</label>
                  <input v-model="albumForm.label" type="text" class="form-control" 
                         placeholder="e.g., Universal Music">
                </div>

                <div class="col-md-6">
                  <label class="form-label">Copyright</label>
                  <input v-model="albumForm.copyright" type="text" class="form-control" 
                         placeholder="e.g., ℗ 2025 Record Label">
                </div>

                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea v-model="albumForm.description" class="form-control" rows="3"></textarea>
                </div>

                <!-- current image -->
                <div class="col-12">
                  <label class="form-label col-12">Current Image</label>
                  <img :src="albumForm.avatar_url || '/default-album.png'" 
                       class="img-fluid" 
                       alt="Current Image"
                       style="height: 200px; object-fit: cover;">
                </div>

                <div class="col-12">
                  <label class="form-label">Avatar Image</label>
                  <input type="file" class="form-control"  accept="image/*" ref="avatarImage">
                  <small class="text-muted">Recommended size: 1000x1000px</small>
                </div>

                <div class="col-12">
                  <div class="form-check mb-2">
                    <input v-model="albumForm.is_public" type="checkbox" class="form-check-input" id="isPublic">
                    <label class="form-check-label" for="isPublic">Public Album</label>
                  </div>
                  <div class="form-check">
                    <input v-model="albumForm.is_premium" type="checkbox" class="form-check-input" id="isPremium">
                    <label class="form-check-label" for="isPremium">Premium Album</label>
                  </div>
                </div>
              </div>

              <div class="text-end mt-4">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Update' : 'Save' }} Album
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: 'artist-manager'
});

const toast = useToast();
const { $axios } = useNuxtApp();

const albums = ref([]);
const isEditing = ref(false);
const albumForm = ref({
  title: '',
  description: '',
  album_type: '',
  label: '',
  copyright: '',
  is_public: true,
  is_premium: false,
  cover_file: null
});

const avatarImage = ref(null);

let albumModal = null;

onMounted(async () => {
  await loadAlbums();
  albumModal = new bootstrap.Modal(document.getElementById('albumModal'));
});

const loadAlbums = async () => {
  try {
    const response = await $axios.get('/api/artists/get_albums/');
    albums.value = response.data.result;
  } catch (error) {
    console.error('Error loading albums:', error);
    toast.error('Failed to load albums');
  }
};

const showAlbumModal = (editing = false, album = null) => {
  isEditing.value = editing;
  avatarImage.value.value ='';
  if (editing && album) {
    albumForm.value = { 
      ...album,
      cover_file: null
    };
  } else {
    albumForm.value = {
      title: '',
      description: '',
      album_type: '',
      label: '',
      copyright: '',
      is_public: true,
      is_premium: false,
    };
  }
  albumModal.show();
};


const saveAlbum = async () => {
  try {
    const formData = new FormData();
    Object.keys(albumForm.value).forEach(key => {
      if (key !== 'cover_art_url' 
      && key !== 'avatar_url' 
      && key !== 'created_at' 
      && key !== 'updated_at' 
      && key !== 'id' 
      && key !== 'artist') {
        formData.append(key, albumForm.value[key]);
      }
    });
    if (avatarImage.value.files[0]) {
      formData.append('avatar_url', avatarImage.value.files[0]);
    }

    if (isEditing.value) {
      await $axios.put(`/api/albums/${albumForm.value.id}/`, formData);
      toast.success('Album updated successfully');
    } else {
      await $axios.post('/api/albums/', formData);
      toast.success('Album created successfully');
    }

    await loadAlbums();
    albumModal.hide();
  } catch (error) {
    console.error('Error saving album:', error);
    toast.error('Failed to save album');
  }
};


const deleteAlbum = async (album) => {
  if (!confirm('Are you sure you want to delete this album? This will also delete all tracks in the album.')) return;

  try {
    await $axios.delete(`/api/albums/${album.id}/`);
    toast.success('Album deleted successfully');
    await loadAlbums();
  } catch (error) {
    console.error('Error deleting album:', error);
    toast.error('Failed to delete album');
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}

.badge {
  font-weight: 500;
}

body {
  background-color: #f9f9f9;
}
</style>