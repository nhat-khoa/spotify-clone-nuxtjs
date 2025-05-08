<template>
  <div class="podcast-manager">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-black">Your Podcasts</h1>
      <button class="btn btn-primary" @click="showCreateModal()">
        <i class="ri-add-line me-2"></i>Create New Podcast
      </button>
    </div>

    <!-- Podcast List -->
    <div class="row g-4">
      <div v-for="podcast in podcasts" :key="podcast.id" class="col-md-2 cursor-pointer"
      @click="navigateTo(`/podcaster-manager/podcast/?id=${podcast.id}`)"
      >
        <div class="podcast-card">
          <div class="podcast-image">
            <img :src="podcast.cover_art_image_url || '/images/default-podcast.png'" :alt="podcast.title" />
          </div>
          <div class="podcast-info p-3">
            <h3 class="podcast-title">{{ podcast.title }}</h3>
            <p class="podcast-author">{{ podcast.author_name }}</p>
            <div class="podcast-status mb-2">
              <span class="badge" :class="getStatusClass(podcast.status)">
                {{ podcast.status }}
              </span>
              <!-- episode count -->
              <span class="ms-2">{{ podcast.episodes.length }} Episodes</span>
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-success" @click.stop="editPodcast(podcast)">
                <i class="ri-edit-line me-1"></i>Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click.stop="deletePodcast(podcast)">
                <i class="ri-delete-bin-line me-1"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal fade " id="podcastModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit' : 'Create' }} Podcast</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePodcast">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input v-model="podcastForm.title" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Author Name</label>
                <input v-model="podcastForm.author_name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="podcastForm.description" class="form-control" rows="3"></textarea>
              </div>

                <!-- current cover_art_image_url -->
                <div class="mb-3">
                  <label class="form-label">Current Cover Art</label>
                  <img :src="podcastForm.cover_art_image_url" class="img-fluid" alt="Current Cover Art">
                </div>

              <div class="mb-3">
                <label class="form-label">cover_art_image_url</label>
                <input type="file" class="form-control" ref="imageInput"  accept="image/*">
              </div>
              <div class="mb-3">
                <label class="form-label">Language</label>
                <input v-model="podcastForm.language" type="text" class="form-control">
              </div>


              <div class="mb-3">
                <label class="form-label">Licenser</label>
                <input v-model="podcastForm.licensor" type="text" class="form-control">
              </div>

              <div class="mb-3">
                <label class="form-label">Copyright Notice</label>
                <input v-model="podcastForm.copyright_notice" type="text" class="form-control">
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input v-model="podcastForm.explicit" type="checkbox" class="form-check-input" id="explicitCheck">
                  <label class="form-check-label" for="explicitCheck">Explicit Content</label>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="podcastForm.status" class="form-select">
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
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
  layout: 'podcaster-manager'
});

const toast = useToast();
const { $axios } = useNuxtApp();

const podcasts = ref([]);
const isEditing = ref(false);
const imageInput = ref(null)
const podcastForm = ref({
  title: '',
  author_name: '',
  description: '',
  language: '',
  explicit: false,
  status: 'active',
  licensors: '',
  copyright_notice: '',

});

let modal;

onMounted(() => {
  fetchPodcasts();
  modal = new bootstrap.Modal(document.getElementById('podcastModal'));
});

const fetchPodcasts = async () => {
  try {
    const response = await $axios.get('/api/podcasts/get_podcasts/');
    podcasts.value = response.data.result;
    console.log(podcasts.value);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    toast.error('Failed to load podcasts');
  }
};

const showCreateModal = () => {
  isEditing.value = false;
  imageInput.value.value = '';
  podcastForm.value = {
    title: '',
    author_name: '',
    description: '',
    language: '',
    explicit: false,
    status: 'active',
    licensors: '',
    copyright_notice: '',
  };
  modal.show();
};

const editPodcast = (podcast) => {
  imageInput.value.value = '';
  isEditing.value = true;
  podcastForm.value = { ...podcast };
  modal.show();
};

const savePodcast = async () => {
  try {
    if (isEditing.value) {
      const formData = new FormData();
      formData.append('title', podcastForm.value.title);
      formData.append('author_name', podcastForm.value.author_name);
      formData.append('description', podcastForm.value.description);
      formData.append('language', podcastForm.value.language);
      formData.append('explicit', podcastForm.value.explicit);
      formData.append('status', podcastForm.value.status);
      formData.append('licensors', podcastForm.value.licensors);
      formData.append('copyright_notice', podcastForm.value.copyright_notice);
      if (imageInput.value.files[0]) {
        formData.append('cover_art_image_url', imageInput.value.files[0]);
      }
      await $axios.patch(`/api/podcasts/${podcastForm.value.id}/`, formData);
      toast.success('Podcast updated successfully');
    } else {
      const formData = new FormData();
      formData.append('title', podcastForm.value.title);
      formData.append('author_name', podcastForm.value.author_name);
      formData.append('description', podcastForm.value.description);
      formData.append('language', podcastForm.value.language);
      formData.append('explicit', podcastForm.value.explicit);
      formData.append('status', podcastForm.value.status);
      formData.append('licensors', podcastForm.value.licensors);
      formData.append('copyright_notice', podcastForm.value.copyright_notice);
      if (imageInput.value.files[0]) {
        formData.append('cover_art_image_url', imageInput.value.files[0]);
      }
      await $axios.post('/api/podcasts/', formData);
      toast.success('Podcast created successfully');
    }
    modal.hide();
    fetchPodcasts();
  } catch (error) {
    console.error('Error saving podcast:', error);
    toast.error('Failed to save podcast');
  }
};

const deletePodcast = async (podcast) => {
  if (!confirm('Are you sure you want to delete this podcast?')) return;
  
  try {
    await $axios.delete(`/api/podcasts/${podcast.id}/`);
    toast.success('Podcast deleted successfully');
    fetchPodcasts();
  } catch (error) {
    console.error('Error deleting podcast:', error);
    toast.error('Failed to delete podcast');
  }
};


const getStatusClass = (status) => {
  const classes = {
    active: 'bg-success',
    paused: 'bg-warning',
    completed: 'bg-info',
    cancelled: 'bg-danger'
  };
  return classes[status] || 'bg-secondary';
};
</script>

<style scoped>
.podcast-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

}

.podcast-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.podcast-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.podcast-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.podcast-title {
  font-size: 1.2rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #212529;
}

.podcast-author {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.modal-content {
  background: #ffffff;
  color: #212529;
}

.form-control, .form-select {
  background: #ffffff;
  border-color: #dee2e6;
  color: #212529;
}

.form-control:focus, .form-select:focus {
  background: #ffffff;
  border-color: #86b7fe;
  color: #212529;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.podcast-info {
  padding: 1rem;
}
</style>