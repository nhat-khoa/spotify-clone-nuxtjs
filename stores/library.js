import { defineStore } from "pinia";
import { ref } from "vue";
const config = useRuntimeConfig();

export const useLibraryStore = defineStore("library", () => {
    const folders = ref([]);
    const followedArtists = ref([]);
    const playlists = ref([]);
    const savedTracks = ref([]);
    const savedEpisodes = ref([]);
    const savedAlbums = ref([]);
    const savedPodcasts = ref([]);
    const currentFolder = ref(null);
    const folderMenuItems = ref([]);

    const update = async (libraryData) => {
        currentFolder.value = null;
        folders.value = libraryData.data.folders;
        followedArtists.value = libraryData.data.followed_artists;
        playlists.value = libraryData.data.playlists;
        savedTracks.value = libraryData.data.saved_tracks;
        savedEpisodes.value = libraryData.data.saved_episodes;
        savedAlbums.value = libraryData.data.saved_albums;
        savedPodcasts.value = libraryData.data.saved_podcasts;
    }

    const fetchLibrary = async () => {
        const { $axios } = useNuxtApp()
        try {

            const response = await $axios.get('/api/libraries/get_library/');
            currentFolder.value = null;
            folders.value = response.data.folders;
            followedArtists.value = response.data.followed_artists;
            playlists.value = response.data.playlists;
            savedTracks.value = response.data.saved_tracks;
            savedEpisodes.value = response.data.saved_episodes;
            savedAlbums.value = response.data.saved_albums;
            savedPodcasts.value = response.data.saved_podcasts;
        } catch (error) {
            console.error("Failed to fetch library data: ", error)
        }
    }

    const navigateToFolder = async (folder) => {
        const { $axios } = useNuxtApp()
        try {
            const response = await $axios.get(`/api/libraries/folders/get_folder_by_id?folder_id=${folder.id}`);

            if (response.status === 200) {
                currentFolder.value = response.data
                folders.value = [];
                followedArtists.value = [];
                playlists.value = [];
                savedTracks.value = [];
                savedEpisodes.value = [];
                savedAlbums.value = [];
                savedPodcasts.value = [];
            }
            else {
                console.error('Status fail!');
            }
        } catch (error) {
            console.error('Error fetching library:', error);
        }
    };

    const back = async (folder) => {
        if (!folder.parent) {
            await fetchLibrary()
        }
        else {
            await navigateToFolder({ id: folder.parent })
        }
    }

    const refreshAll = async () => {
        const { $axios } = useNuxtApp()
        if (currentFolder.value) {
            const response = await $axios.get(`/api/libraries/folders/get_folders/`);
            if (response.status === 200) {
                folderMenuItems.value = response.data
            }
            await navigateToFolder({ id: currentFolder.value.id })
        }
        else {
            await fetchLibrary()
        }
    }

    return {update,
        fetchLibrary,
        navigateToFolder,
        back,
        refreshAll,
        folders,
        followedArtists,
        playlists,
        savedTracks,
        savedEpisodes,
        savedAlbums,
        savedPodcasts,
        currentFolder,
        folderMenuItems
    };
});
