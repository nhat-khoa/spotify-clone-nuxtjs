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
          <img :src="album.cover_url || '/default-album.png'" 
               class="card-img-top" 
               alt="Album cover"
               style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title mb-1">{{ album.title }}</h5>
            <p class="text-muted small mb-2">{{ album.release_date }}</p>
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
                  <label class="form-label">Release Date</label>
                  <input v-model="albumForm.release_date" type="date" class="form-control" required>
                </div>

                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea v-model="albumForm.description" class="form-control" rows="3"></textarea>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Genre</label>
                  <select v-model="albumForm.genre" class="form-select">
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="electronic">Electronic</option>
                    <option value="classical">Classical</option>
                    <option value="jazz">Jazz</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Type</label>
                  <select v-model="albumForm.type" class="form-select">
                    <option value="album">Album</option>
                    <option value="single">Single</option>
                    <option value="ep">EP</option>
                  </select>
                </div>

                <div class="col-12">
                  <label class="form-label">Cover Image</label>
                  <input type="file" class="form-control" @change="handleCoverSelect" accept="image/*">
                  <small class="text-muted">Recommended size: 1000x1000px</small>
                </div>

                <div class="col-12">
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
  release_date: '',
  genre: 'pop',
  type: 'album',
  is_premium: false,
  cover_file: null
});

let albumModal = null;

onMounted(async () => {
  await loadAlbums();
  albumModal = new bootstrap.Modal(document.getElementById('albumModal'));
});

const loadAlbums = async () => {
  try {
    const response = await $axios.get('/api/artist/albums');
    albums.value = response.data;
  } catch (error) {
    console.error('Error loading albums:', error);
    toast.error('Failed to load albums');
  }
};

const showAlbumModal = (editing = false, album = null) => {
  isEditing.value = editing;
  if (editing && album) {
    albumForm.value = { ...album, cover_file: null };
  } else {
    albumForm.value = {
      title: '',
      description: '',
      release_date: '',
      genre: 'pop',
      type: 'album',
      is_premium: false,
      cover_file: null
    };
  }
  albumModal.show();
};

const handleCoverSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    albumForm.value.cover_file = file;
  }
};

const saveAlbum = async () => {
  try {
    const formData = new FormData();
    Object.keys(albumForm.value).forEach(key => {
      if (key !== 'cover_file') {
        formData.append(key, albumForm.value[key]);
      }
    });
    if (albumForm.value.cover_file) {
      formData.append('cover', albumForm.value.cover_file);
    }

    if (isEditing.value) {
      await $axios.put(`/api/artist/albums/${albumForm.value.id}`, formData);
      toast.success('Album updated successfully');
    } else {
      await $axios.post('/api/artist/albums', formData);
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
    await $axios.delete(`/api/artist/albums/${album.id}`);
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