
<template>
  <div class="container-fluid" style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 style="color: #333;">Gallery Management</h2>
      <button class="btn btn-primary" @click="showUploadModal">
        <i class="ri-upload-2-line me-2"></i>Upload Images
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="row g-4">
      <div v-for="image in images" :key="image.id" class="col-sm-6 col-md-4 col-lg-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #fff;">
          <img :src="image.image_url" class="card-img-top" alt="Gallery image"
               style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h6 class="card-title">{{ image.title || 'Untitled' }}</h6>
            <p class="card-text small text-muted">{{ image.description || 'No description' }}</p>
          </div>
          <div class="card-footer bg-white border-top-0">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Order: {{ image.display_order }}</small>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary" @click="editImage(image)">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteImage(image)">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload/Edit Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Image' : 'Upload Images' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveImage">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input v-model="imageForm.title" type="text" class="form-control">
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="imageForm.description" class="form-control" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Display Order</label>
                <input v-model="imageForm.display_order" type="number" class="form-control" min="0">
              </div>

              <div class="mb-3" v-if="!isEditing">
                <label class="form-label">Images</label>
                <input type="file" class="form-control" @change="handleImageSelect" multiple accept="image/*">
                <small class="text-muted">You can select multiple images</small>
              </div>

              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Save Changes' : 'Upload' }}
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

const images = ref([]);
const isEditing = ref(false);
const imageForm = ref({
  title: '',
  description: '',
  display_order: 0,
  files: []
});

let imageModal = null;

onMounted(async () => {
  await loadImages();
  imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
});

const loadImages = async () => {
  try {
    const response = await $axios.get('/api/artist/gallery');
    images.value = response.data;
  } catch (error) {
    console.error('Error loading images:', error);
    toast.error('Failed to load gallery images');
  }
};

const showUploadModal = () => {
  isEditing.value = false;
  imageForm.value = {
    title: '',
    description: '',
    display_order: images.value.length,
    files: []
  };
  imageModal.show();
};

const editImage = (image) => {
  isEditing.value = true;
  imageForm.value = { ...image };
  imageModal.show();
};

const handleImageSelect = (event) => {
  imageForm.value.files = Array.from(event.target.files);
};

const saveImage = async () => {
  try {
    if (isEditing.value) {
      await $axios.put(`/api/artist/gallery/${imageForm.value.id}`, imageForm.value);
      toast.success('Image updated successfully');
    } else {
      const formData = new FormData();
      imageForm.value.files.forEach(file => {
        formData.append('images[]', file);
      });
      formData.append('title', imageForm.value.title);
      formData.append('description', imageForm.value.description);
      formData.append('display_order', imageForm.value.display_order);

      await $axios.post('/api/artist/gallery', formData);
      toast.success('Images uploaded successfully');
    }

    await loadImages();
    imageModal.hide();
  } catch (error) {
    console.error('Error saving image:', error);
    toast.error('Failed to save image');
  }
};

const deleteImage = async (image) => {
  if (!confirm('Are you sure you want to delete this image?')) return;

  try {
    await $axios.delete(`/api/artist/gallery/${image.id}`);
    toast.success('Image deleted successfully');
    await loadImages();
  } catch (error) {
    console.error('Error deleting image:', error);
    toast.error('Failed to delete image');
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
</style>