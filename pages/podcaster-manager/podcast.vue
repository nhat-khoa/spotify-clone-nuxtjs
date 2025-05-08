<template>
  <div class="podcast-detail">
    <!-- Podcast Header -->
    <div class="podcast-header mb-4">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="podcast-image">
            <img :src="podcast.cover_art_image_url || '/images/default-podcast.png'" :alt="podcast.title" />
          </div>
        </div>
        <div class="col">
          <h1>{{ podcast.title }}</h1>
          <p class="text-muted mb-0">{{ podcast.author_name }}</p>
          <div class="mt-2">
            <span class="badge" :class="getStatusClass(podcast.status)">
              {{ podcast.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Episodes Section -->
    <div class="episodes-section">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Episodes</h2>
        <button class="btn btn-primary" @click="showCreateEpisodeModal = true">
          <i class="ri-add-line me-2"></i>Add Episode
        </button>
      </div>

      <!-- Episodes List -->
      <div class="episodes-list">
        <div v-for="episode in episodes" :key="episode.id" class="episode-item">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="episode-image">
                <img :src="episode.cover_art_image_url || podcast.cover_art_image_url || '/images/default-podcast.png'" 
                     :alt="episode.title" />
              </div>
            </div>
            <div class="col">
              <h3 class="episode-title">{{ episode.title }}</h3>
              <p class="episode-meta">
                Season {{ episode.season }} • Episode {{ episode.episode_number }}
                <span v-if="episode.duration_ms" class="ms-2">
                  • {{ formatDuration(episode.duration_ms) }}
                </span>
              </p>
              <p class="episode-description">{{ episode.description }}</p>
            </div>
            <div class="col-auto">
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-light" @click="editEpisode(episode)">
                  <i class="ri-edit-line me-1"></i>Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteEpisode(episode)">
                  <i class="ri-delete-bin-line me-1"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Episode Modal -->
    <div class="modal fade" id="episodeModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit' : 'Create' }} Episode</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEpisode">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input v-model="episodeForm.title" type="text" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Season</label>
                    <input v-model="episodeForm.season" type="number" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Episode Number</label>
                    <input v-model="episodeForm.episode_number" type="number" class="form-control" required>
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="episodeForm.description" class="form-control" rows="3"></textarea>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Audio File</label>
                    <input type="file" class="form-control" @change="handleAudioUpload" accept="audio/*">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Cover Image</label>
                    <input type="file" class="form-control" @change="handleImageUpload" accept="image/*">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Type</label>
                    <select v-model="episodeForm.type" class="form-select">
                      <option value="full">Full Episode</option>
                      <option value="trailer">Trailer</option>
                      <option value="bonus">Bonus</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Status</label>
                    <select v-model="episodeForm.status" class="form-select">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input v-model="episodeForm.explicit" type="checkbox" class="form-check-input" id="explicitCheck">
                  <label class="form-check-label" for="explicitCheck">Explicit Content</label>
                </div>
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
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: 'podcaster-manager'
});

const route = useRoute();
const toast = useToast();
const { $axios } = useNuxtApp();

const podcast = ref({});
const episodes = ref([]);
const isEditing = ref(false);
const episodeForm = ref({
  title: '',
  description: '',
  season: 1,
  episode_number: 1,
  explicit: false,
  type: 'full',
  status: 'draft'
});

let modal;

onMounted(() => {
  fetchPodcast();
  fetchEpisodes();
  modal = new bootstrap.Modal(document.getElementById('episodeModal'));
});

const fetchPodcast = async () => {
  try {
    const response = await $axios.get(`/api/podcasts/${route.params.id}/`);
    podcast.value = response.data;
  } catch (error) {
    console.error('Error fetching podcast:', error);
    toast.error('Failed to load podcast');
  }
};

const fetchEpisodes = async () => {
  try {
    const response = await $axios.get(`/api/podcasts/${route.params.id}/episodes/`);
    episodes.value = response.data.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    toast.error('Failed to load episodes');
  }
};

const showCreateEpisodeModal = () => {
  isEditing.value = false;
  episodeForm.value = {
    title: '',
    description: '',
    season: 1,
    episode_number: 1,
    explicit: false,
    type: 'full',
    status: 'draft'
  };
  modal.show();
};

const editEpisode = (episode) => {
  isEditing.value = true;
  episodeForm.value = { ...episode };
  modal.show();
};

const saveEpisode = async () => {
  try {
    if (isEditing.value) {
      await $axios.put(`/api/podcasts/episodes/${episodeForm.value.id}/update/`, episodeForm.value);
      toast.success('Episode updated successfully');
    } else {
      await $axios.post(`/api/podcasts/${route.params.id}/episodes/create/`, episodeForm.value);
      toast.success('Episode created successfully');
    }
    modal.hide();
    fetchEpisodes();
  } catch (error) {
    console.error('Error saving episode:', error);
    toast.error('Failed to save episode');
  }
};

const deleteEpisode = async (episode) => {
  if (!confirm('Are you sure you want to delete this episode?')) return;
  
  try {
    await $axios.delete(`/api/podcasts/episodes/${episode.id}/delete/`);
    toast.success('Episode deleted successfully');
    fetchEpisodes();
  } catch (error) {
    console.error('Error deleting episode:', error);
    toast.error('Failed to delete episode');
  }
};

const handleAudioUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('audio_file', file);
    // Handle audio upload
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('cover_art_image', file);
    // Handle image upload
  }
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
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
.podcast-image {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
}

.podcast-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.episode-item {
  background: #282828;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.episode-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
}

.episode-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.episode-title {
  font-size: 1.1rem;
  margin: 0;
}

.episode-meta {
  color: #b3b3b3;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.episode-description {
  color: #b3b3b3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modal-content {
  background: #282828;
  color: white;
}

.form-control, .form-select {
  background: #404040;
  border-color: #404040;
  color: white;
}

.form-control:focus, .form-select:focus {
  background: #404040;
  border-color: #404040;
  color: white;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1);
}
</style>