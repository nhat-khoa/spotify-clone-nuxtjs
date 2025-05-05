import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useNuxtApp } from "#app";

const toast = useToast();

export const usePlayerStore = defineStore("player", () => {
  const queue = ref([]); // Chỉ lưu danh sách id,type của track và episode
  const addedQueue = ref([]); // Chỉ lưu danh sách id,type của track và episode
  const currentIndex = ref(0);
  const isPlaying = ref(false);
  const audio = ref(null);
  const currentItem = ref(null); // Lưu full thông tin bài hát
  const isVisible = ref(false);
  const isShuffled = ref(false);
  const repeatMode = ref(0); // 0: no repeat, 1: repeat all, 2: repeat one

  // Keep original queue for shuffle
  const originalQueue = ref([]);

  async function setqueue(items = [], startIndex = 0) {
    console.log("Setting queue with track IDs:", items);
    queue.value = items;
    originalQueue.value = [...items]; // Save original queue
    currentIndex.value = startIndex;
    isVisible.value = true;
    await loadCurrentSong();
  }

  // Toggle shuffle mode
  function toggleShuffle() {
    isShuffled.value = !isShuffled.value;
    if (isShuffled.value) {
      // Save current playing item
      const currentItem = queue.value[currentIndex.value];
      
      // Shuffle the rest of the queue
      const remainingItems = queue.value.filter((_, i) => i !== currentIndex.value);
      for (let i = remainingItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingItems[i], remainingItems[j]] = [remainingItems[j], remainingItems[i]];
      }
      
      // Put current item at start and update queue
      queue.value = [currentItem, ...remainingItems];
      currentIndex.value = 0;
    } else {
      // Restore original queue
      const currentItemId = queue.value[currentIndex.value].id;
      queue.value = [...originalQueue.value];
      currentIndex.value = queue.value.findIndex(item => item.id === currentItemId);
    }
  }

  // Toggle repeat mode
  function toggleRepeat() {
    repeatMode.value = (repeatMode.value + 1) % 3;
  }

  // Lấy bài hát hiện tại dựa trên id trong queue
  async function loadCurrentSong() {
    if (queue.value.length === 0) return;

    const item = queue.value[currentIndex.value];
    if (item.type == "track") {
       currentItem.value = await fetchTrackById(item.id);
    }
    else if (item.type == "podcast_episode") {
      currentItem.value = await fetchPodcastEpisodeById(item.id);
    }

    
    if (audio.value) {
      audio.value.pause();
    }

    if (item.type == "track")
      audio.value = new Audio(currentItem.value?.audio_file_path);
    else if (item.type == "podcast_episode")
      audio.value = new Audio(currentItem.value?.audio_url);

    audio.value.onended = playNext;

    audio.value.play();
    isPlaying.value = true;
  }

  async function playPause() {
    if (!audio.value) return;

    if (isPlaying.value) {
      audio.value.pause();
      isPlaying.value = false;
    } else {
      if (!currentItem.value) {
        await loadCurrentSong();
      }
      audio.value.play();
      isPlaying.value = true;
    }
  }

  // Modified playNext to handle repeat modes
  async function playNext() {
    if (repeatMode.value === 2) { // Repeat one
      await loadCurrentSong();
      return;
    }

    if (currentIndex.value < queue.value.length - 1) {
      currentIndex.value++;
    } else if (repeatMode.value === 1) { // Repeat all
      currentIndex.value = 0;
    } else {
      return; // No repeat, stop at end
    }
    
    await loadCurrentSong();
  }

  async function playPrev() {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      await loadCurrentSong();
    }
  }

  const playTrackByIndex = async (index) => {
    if (index < 0 || index >= queue.value.length) return;
    currentIndex.value = index;
    await loadCurrentSong();
  };

  function setVolume(volume) {
    if (audio.value) {
      audio.value.volume = volume;
    }
  }

  function addToQueue(item) {
    addedQueue.value = [...addedQueue.value, item];
  }

  function getQueue() {
    return [...queue.value.slice(0, currentIndex.value),queue.value[currentIndex.value], ...addedQueue.value,...queue.value.slice(currentIndex.value + 1)];
  }

  return {
    setqueue,
    queue,
    currentIndex,
    isPlaying,
    currentItem,
    addedQueue,
    playPause,
    playNext,
    playPrev,
    setqueue,
    playTrackByIndex,
    setVolume,
    audio,
    isVisible,
    getQueue,
    addToQueue,
    isShuffled,
    repeatMode,
    toggleShuffle,
    toggleRepeat
  };
});

async function fetchTrackById(id) {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get(`/api/tracks/${id}`);
    const data = response.data
    data.type = "track";
    return data;
  } catch (error) {
    console.error("Failed to fetch track data: ", error);
    toast.error("Failed to fetch track data: " + error.message);
    return null;
  }
}

async function fetchPodcastEpisodeById(id) {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get(`/api/podcasts/get_episode_details/?episode_id=${id}`);
    const data = response.data
    data.type = "podcast_episode";
    return data;
  } catch (error) {
    console.error("Failed to fetch podcast episode data: ", error);
    toast.error("Failed to fetch podcast episode data: " + error.message);
    return null;
  }
}
