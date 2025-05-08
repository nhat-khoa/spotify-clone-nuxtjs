<template>
  <div class="container-fluid">
    <div class="row g-4">
      <!-- Welcome Section -->
      <div class="col-12">
        <div class="card border-0 bg-primary text-white">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <img :src="userStore.user?.avatar_url|| userStore.user?.avatar_google_url || '/default-avatar.png'" 
                   class="rounded-circle me-4" 
                   width="64" 
                   height="64"
                   alt="Artist avatar">
              <div>
                <h4 class="mb-1">Welcome back, {{ userStore.user?.name }}!</h4>
                <p class="mb-0 opacity-75">Here's what's happening with your music today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="col-sm-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-primary bg-opacity-10 p-3 rounded-3">
                <i class="ri-music-2-line text-primary fs-4"></i>
              </div>
            </div>
            <h3 class="mb-1">{{ stats.tracks }}</h3>
            <p class="text-muted mb-0">Total Tracks</p>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-success bg-opacity-10 p-3 rounded-3">
                <i class="ri-album-line text-success fs-4"></i>
              </div>
            </div>
            <h3 class="mb-1">{{ stats.albums }}</h3>
            <p class="text-muted mb-0">Total Albums</p>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-info bg-opacity-10 p-3 rounded-3">
                <i class="ri-user-line text-info fs-4"></i>
              </div>
            </div>
            <h3 class="mb-1">{{ stats.listeners }}</h3>
            <p class="text-muted mb-0">Monthly Listeners</p>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="bg-warning bg-opacity-10 p-3 rounded-3">
                <i class="ri-play-circle-line text-warning fs-4"></i>
              </div>
            </div>
            <h3 class="mb-1">{{ stats.monthlyPlays }}</h3>
            <p class="text-muted mb-0">Monthly Plays</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="col-md-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white py-3">
            <h5 class="card-title mb-0">Recent Activity</h5>
          </div>
          <div class="card-body">
            <div v-if="recentActivity.length > 0">
              <div v-for="activity in recentActivity" :key="activity.id" 
                   class="d-flex align-items-center p-3 border-bottom">
                <div class="me-3">
                  <div class="bg-light rounded-circle p-2">
                    <i :class="getActivityIcon(activity.type)" class="fs-5"></i>
                  </div>
                </div>
                <div>
                  <p class="mb-0">{{ activity.description }}</p>
                  <small class="text-muted">{{ formatDate(activity.timestamp) }}</small>
                </div>
              </div>
            </div>
            <p v-else class="text-muted mb-0 p-3">No recent activity</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white py-3">
            <h5 class="card-title mb-0">Quick Actions</h5>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <NuxtLink to="/artist-manager/track" class="btn btn-outline-primary">
                <i class="ri-add-line me-2"></i>Add New Track
              </NuxtLink>
              <NuxtLink to="/artist-manager/album" class="btn btn-outline-success">
                <i class="ri-album-line me-2"></i>Create Album
              </NuxtLink>
              <NuxtLink to="/artist-manager/profile-pick" class="btn btn-outline-info">
                <i class="ri-star-line me-2"></i>Update Artist Picks
              </NuxtLink>
              <NuxtLink to="/artist-manager/gallery" class="btn btn-outline-warning">
                <i class="ri-image-line me-2"></i>Manage Gallery
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';

definePageMeta({
  layout: 'artist-manager',
  middleware: 'is-artist'
});

const toast = useToast();
const userStore = useUserStore();
const { $axios } = useNuxtApp();

const stats = ref({
  tracks: 0,
  albums: 0,
  listeners: 0,
  monthlyPlays: 0
});

const recentActivity = ref([]);

onMounted(async () => {
  await loadDashboardData();
});

const loadDashboardData = async () => {
  try {
    // Load stats
    const statsResponse = await $axios.get('/api/artist/stats');
    stats.value = statsResponse.data;

    // Load recent activity
    const activityResponse = await $axios.get('/api/artist/recent-activity');
    recentActivity.value = activityResponse.data;
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    toast.error('Failed to load dashboard data');
  }
};

const getActivityIcon = (type) => {
  const icons = {
    'track': 'ri-music-2-line text-primary',
    'album': 'ri-album-line text-success',
    'pick': 'ri-star-line text-warning',
    'profile': 'ri-user-line text-info',
    'gallery': 'ri-image-line text-danger'
  };
  return icons[type] || 'ri-information-line text-muted';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.bg-opacity-10 {
  opacity: 0.1;
}
</style>