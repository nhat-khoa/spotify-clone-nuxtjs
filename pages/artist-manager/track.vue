<template>
  <div class="container-fluid">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Track Management</h2>
      <button class="btn btn-primary" @click="showTrackModal(false)">
        <i class="ri-add-line me-2"></i>Add New Track
      </button>
    </div>

    <!-- Tracks Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Album</th>
                <th>Release Date</th>
                <th>Language</th>
                <th>Premium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="track in tracks" :key="track.id">
                <td><img :src="track.image_url || track.album?.avatar_url || '/images/default-avatar.png'" class="img-fluid" alt="Track Image" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"></td>
                <td>{{ track.title }}</td>
                <td>{{ track.album?.title || "No Album" }}</td>
                <td>{{ formatDate(track.release_date) }}</td>
                <td>{{ track.language }}</td>
                <td>
                  <span :class="track.is_premium ? 'badge bg-success' : 'badge bg-secondary'">
                    {{ track.is_premium ? 'Yes' : 'No' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" @click="showTrackModal(true, track)">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteTrack(track)">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Track Modal -->
    <div class="modal fade" id="trackModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Track' : 'Add New Track' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveTrack">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Title</label>
                  <input v-model="trackForm.title" type="text" class="form-control" required>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Album</label>
                  <select v-model="trackForm.album_id" class="form-select">
                    <option value="">No Album</option>
                    <option v-for="album in albums" :key="album.id" :value="album.id">
                      {{ album.title }}
                    </option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Release Date</label>
                  <input v-model="trackForm.release_date" type="date" class="form-control">
                </div>

                <div class="col-md-6">
                  <label class="form-label">Language</label>
                  <select v-model="trackForm.language" class="form-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="vi">Vietnamese</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">ISRC Code</label>
                  <input v-model="trackForm.isrc_code" type="text" class="form-control" 
                         placeholder="e.g., USRC17607839">
                  <small class="text-muted">International Standard Recording Code</small>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Record Label</label>
                  <input v-model="trackForm.record_label" type="text" class="form-control" 
                         placeholder="e.g., Universal Music">
                </div>

                <div class="col-md-6">
                  <label class="form-label">Source</label>
                  <select v-model="trackForm.source" class="form-select">
                    <option value="original">Original Recording</option>
                    <option value="licensed">Licensed</option>
                    <option value="cover">Cover Version</option>
                    <option value="remix">Remix</option>
                    <option value="live">Live Recording</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <div class="h-100 d-flex flex-column justify-content-center">
                    <div class="form-check mb-2">
                      <input v-model="trackForm.explicit" type="checkbox" class="form-check-input" id="explicit">
                      <label class="form-check-label" for="explicit">Explicit Content</label>
                    </div>
                    <div class="form-check mb-2">
                      <input v-model="trackForm.is_instrumental" type="checkbox" class="form-check-input" id="isInstrumental">
                      <label class="form-check-label" for="isInstrumental">Instrumental Track</label>
                    </div>
                    <div class="form-check">
                      <input v-model="trackForm.is_premium" type="checkbox" class="form-check-input" id="isPremium">
                      <label class="form-check-label" for="isPremium">Premium Track</label>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label">Plain Lyrics</label>
                  <textarea v-model="trackForm.plain_lyrics" class="form-control" rows="4"></textarea>
                </div>

                <div class="col-12">
                  <label class="form-label">Synced Lyrics</label>
                  <textarea v-model="trackForm.synced_lyrics" class="form-control" rows="4"
                    placeholder="[mm:ss.xx] Lyrics line"></textarea>
                  <small class="text-muted">Format: [mm:ss.xx] Lyrics line</small>
                </div>

                <!-- current image -->
                <div class="col-12">
                  <label class="form-label">Current Image</label><br>
                  <img :src="trackForm.album?.avatar_url || '/images/default-avatar.png'" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;"><br>
                </div>

                <!-- upload image album -->
                <div class="col-12">
                  <label class="form-label">Upload Image Album</label>
                  <input type="file" class="form-control" id="image-input" ref="imageInput" accept="image/*">
                </div>

                <!-- current audio file -->
                <div class="col-12">
                  <label class="form-label">Current Audio File</label><br>
                  <audio :src="trackForm.audio_file_path" controls></audio><br>
                </div>

                <div class="col-12">
                  <label class="form-label">Change Audio File</label>
                  <input type="file" class="form-control" id="file-input"
                  accept="audio/*">
                </div>
                
              </div>

              <div class="text-end mt-4">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Update' : 'Save' }} Track
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

const tracks = ref([]);
const albums = ref([]);
const isEditing = ref(false);
const trackForm = ref({
  title: '',
  album_id: '',
  release_date: '',
  language: '',
  plain_lyrics: '',
  synced_lyrics: '',
  is_premium: false,
  isrc_code: '',
  record_label: '',
  source: 'original',
  explicit: false,
  is_instrumental: false
});

const imageInput = ref(null);

let trackModal = null;

onMounted(async () => {
  await loadData();
  trackModal = new bootstrap.Modal(document.getElementById('trackModal'));
});

const loadData = async () => {
  try {
    const [tracksResponse, albumsResponse] = await Promise.all([
      $axios.get('/api/artists/get_tracks'),
      $axios.get('/api/artists/get_albums')
    ]);
    tracks.value = tracksResponse.data.result;
    albums.value = albumsResponse.data.result;
  } catch (error) {
    console.error('Error loading data:', error);
    toast.error('Failed to load data');
  }
};

const showTrackModal = (editing = false, track = null) => {
  isEditing.value = editing;
  const fileInput = document.getElementById('file-input');  
  fileInput.value = '';
  imageInput.value.value = '';
  if (editing && track) {
    trackForm.value = { ...track };
  } else {
    trackForm.value = {
      title: '',
      album_id: '',
      release_date: '',
      language: '',
      plain_lyrics: '',
      synced_lyrics: '',
      is_premium: false,
      isrc_code: '',
      record_label: '',
      source: 'original',
      explicit: false,
      is_instrumental: false
    };
  }
  trackModal.show();
};

const saveTrack = async () => {
  try {
    if (isEditing.value) {
        const formData = new FormData();
        
        formData.append('title', trackForm.value.title);
        formData.append('release_date', trackForm.value.release_date || '');
        formData.append('language', trackForm.value.language);
        formData.append('plain_lyrics', trackForm.value.plain_lyrics);
        formData.append('synced_lyrics', trackForm.value.synced_lyrics);
        formData.append('is_premium', trackForm.value.is_premium);
        formData.append('album_id', trackForm.value.album_id || null);
        formData.append('isrc_code', trackForm.value.isrc_code);
        formData.append('record_label', trackForm.value.record_label);
        formData.append('source', trackForm.value.source);
        formData.append('explicit', trackForm.value.explicit);
        formData.append('is_instrumental', trackForm.value.is_instrumental);

        const file = document.getElementById('file-input')?.files[0];   
        if (file) 
            formData.append('audio_file_path', file);

        if (imageInput.value.files[0]) 
            formData.append('album_image', imageInput.value.files[0]);


        // console.log(formData.get("album_id"));  
        await $axios.patch(`/api/tracks/${trackForm.value.id}/`, formData);
        toast.success('Track updated successfully');
    } else {
        const formData = new FormData();
        formData.append('title', trackForm.value.title);
        formData.append('album_id', trackForm.value.album_id);
        formData.append('release_date', trackForm.value.release_date);
        formData.append('language', trackForm.value.language);
        formData.append('plain_lyrics', trackForm.value.plain_lyrics);
        formData.append('synced_lyrics', trackForm.value.synced_lyrics);
        formData.append('is_premium', trackForm.value.is_premium);
        formData.append('isrc_code', trackForm.value.isrc_code);
        formData.append('record_label', trackForm.value.record_label);
        formData.append('source', trackForm.value.source);
        formData.append('explicit', trackForm.value.is_explicit);
        formData.append('is_instrumental', trackForm.value.is_instrumental);

        const file = document.getElementById('file-input').files[0];   
        if (file)
            formData.append('audio_file_path', file);

        if (imageInput.value.files[0])
            formData.append('album_image', imageInput.value.files[0]);

        await $axios.post('/api/tracks/upload/', formData);
        toast.success('Track created successfully');
    }
    await loadData();
    trackModal.hide();
  } catch (error) {
    console.error('Error saving track:', error);
    toast.error('Failed to save track');
  }
};

const deleteTrack = async (track) => {
  if (!confirm('Are you sure you want to delete this track?')) return;

  try {
    await $axios.delete(`/api/tracks/${track.id}/`);
    toast.success('Track deleted successfully');
    await loadData();
  } catch (error) {
    console.error('Error deleting track:', error);
    toast.error('Failed to delete track');
  }
};

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : 'Not set';
};
</script>

<style scoped>
.table th {
  font-weight: 600;
  background-color: #f8f9fa;
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}

.badge {
  font-weight: 500;
}
</style>