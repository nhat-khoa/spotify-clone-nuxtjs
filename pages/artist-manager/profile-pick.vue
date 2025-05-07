<template>
  <div class="container-fluid" style="background-color: #f9f9f9">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Artist Picks</h2>
      <button class="btn btn-primary" @click="showPickModal">
        <i class="ri-add-line me-2"></i>Add New Pick
      </button>
    </div>

    <!-- Picks Grid -->
    <div class="row g-4">
      <div v-for="pick in picks" :key="pick.id" class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="background-color: #ffffff">
          <div class="card-body">
            <div class="d-flex align-items-start mb-3">
              <div class="pick-image me-3">
                <img :src="pick.image_url || '/default-pick.png'" 
                     :alt="pick.title"
                     class="rounded"
                     width="64" 
                     height="64">
              </div>
              <div class="flex-grow-1">
                <h5 class="card-title mb-1">{{ pick.title }}</h5>
                <p class="text-muted small mb-0">{{ pick.type }}</p>
              </div>
              <div class="ms-2">
                <span class="badge" :class="pick.active ? 'bg-success' : 'bg-secondary'">
                  {{ pick.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
            <p class="card-text">{{ pick.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Display Order: {{ pick.display_order }}</small>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary" @click="editPick(pick)">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deletePick(pick)">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pick Modal -->
    <div class="modal fade" id="pickModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Pick' : 'Add New Pick' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePick">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input v-model="pickForm.title" type="text" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Type</label>
                <select v-model="pickForm.type" class="form-select" required>
                  <option value="track">Track</option>
                  <option value="album">Album</option>
                  <option value="playlist">Playlist</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="pickForm.description" class="form-control" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Item ID</label>
                <input v-model="pickForm.item_id" type="text" class="form-control" required>
                <small class="text-muted">ID of the track, album, or playlist</small>
              </div>

              <div class="mb-3">
                <label class="form-label">Display Order</label>
                <input v-model="pickForm.display_order" type="number" class="form-control" min="0">
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input v-model="pickForm.active" type="checkbox" class="form-check-input" id="isActive">
                  <label class="form-check-label" for="isActive">Active</label>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Image</label>
                <input type="file" class="form-control" @change="handleImageSelect" accept="image/*">
                <small class="text-muted">Optional. If not provided, will use the item's default image</small>
              </div>

              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Update' : 'Save' }} Pick
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

const picks = ref([]);
const isEditing = ref(false);
const pickForm = ref({
  title: '',
  type: 'track',
  description: '',
  item_id: '',
  image_url: '',
  display_order: 0,
  active: true,
  image_file: null
});

let pickModal = null;

onMounted(async () => {
  await loadPicks();
  pickModal = new bootstrap.Modal(document.getElementById('pickModal'));
});

const loadPicks = async () => {
  try {
    const response = await $axios.get('/api/artist/picks');
    picks.value = response.data;
  } catch (error) {
    console.error('Error loading picks:', error);
    toast.error('Failed to load picks');
  }
};

const showPickModal = () => {
  isEditing.value = false;
  pickForm.value = {
    title: '',
    type: 'track',
    description: '',
    item_id: '',
    image_url: '',
    display_order: picks.value.length,
    active: true,
    image_file: null
  };
  pickModal.show();
};

const editPick = (pick) => {
  isEditing.value = true;
  pickForm.value = { ...pick, image_file: null };
  pickModal.show();
};

const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    pickForm.value.image_file = file;
  }
};

const savePick = async () => {
  try {
    const formData = new FormData();
    Object.keys(pickForm.value).forEach(key => {
      if (key !== 'image_file') {
        formData.append(key, pickForm.value[key]);
      }
    });
    if (pickForm.value.image_file) {
      formData.append('image', pickForm.value.image_file);
    }

    if (isEditing.value) {
      await $axios.put(`/api/artist/picks/${pickForm.value.id}`, formData);
      toast.success('Pick updated successfully');
    } else {
      await $axios.post('/api/artist/picks', formData);
      toast.success('Pick created successfully');
    }

    await loadPicks();
    pickModal.hide();
  } catch (error) {
    console.error('Error saving pick:', error);
    toast.error('Failed to save pick');
  }
};

const deletePick = async (pick) => {
  if (!confirm('Are you sure you want to delete this pick?')) return;

  try {
    await $axios.delete(`/api/artist/picks/${pick.id}`);
    toast.success('Pick deleted successfully');
    await loadPicks();
  } catch (error) {
    console.error('Error deleting pick:', error);
    toast.error('Failed to delete pick');
  }
};
</script>

<style scoped>
.pick-image img {
  object-fit: cover;
}

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
</style>