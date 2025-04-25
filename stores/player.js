import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const usePlayerStore = defineStore("player", () => {
  const playlist = ref([]); // Chỉ lưu danh sách id track
  const currentIndex = ref(0);
  const isPlaying = ref(false);
  const audio = ref(null);
  const currentSong = ref(null); // Lưu full thông tin bài hát
  const isVisible = ref(false);

  async function setPlaylist(trackIds = [], startIndex = 0) {
    console.log("Setting playlist with track IDs:", trackIds);
    playlist.value = trackIds;
    currentIndex.value = startIndex;
    isVisible.value = true;
    await loadCurrentSong();
  }

  // Lấy bài hát hiện tại dựa trên id trong playlist
  async function loadCurrentSong() {
    if (playlist.value.length === 0) return;

    const currentId = playlist.value[currentIndex.value];
    const songData = await fetchTrackById(currentId);
    currentSong.value = songData;

    if (audio.value) {
      audio.value.pause();
    }

    audio.value = new Audio(currentSong.value.audio_file_path);
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
      if (!currentSong.value) {
        await loadCurrentSong();
      }
      audio.value.play();
      isPlaying.value = true;
    }
  }

  async function playNext() {
    console.log("currentIndex.value: " + currentIndex.value);
    if (currentIndex.value < playlist.value.length - 1) {
      currentIndex.value++;
    } else {
      currentIndex.value = 0;
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
    if (index < 0 || index >= playlist.value.length) return;
    currentIndex.value = index;
    await loadCurrentSong();
  };

  function setVolume(volume) {
    if (audio.value) {
      audio.value.volume = volume;
    }
  }

  return {
    playlist,
    currentIndex,
    isPlaying,
    currentSong,
    playPause,
    playNext,
    playPrev,
    setPlaylist,
    playTrackByIndex,
    setVolume,
    audio,
    isVisible,
  };
});

async function fetchTrackById(id) {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get(`/api/tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch track data: ", error);
    toast.error("Failed to fetch track data: " + error.message);
    return null;
  }
}
