<template>
  <div class="playlist-page" v-if="playlist">
    <div class="playlist-header-wrapper">
      <div class="gradient-background"></div>
      <div class="playlist-header">
        <div class="playlist-cover" @click="openDialog">
          <img
            :src="playlist.avatar_url || 'https://picsum.photos/232/232'"
            alt="Playlist Cover"
          />
        </div>
        <div class="playlist-info">
          <span class="playlist-type"
            >{{ playlist.is_public ? "Public" : "Private" }} Playlist</span
          >
          <h1
            class="playlist-title"
            :class="{ 'cursor-pointer': playlist.user_id == userStore.user.id }"
            @click="openDialog"
          > 
            {{ playlist.name }}
          </h1>
          <div class="playlist-description" v-if="playlist.description">
            {{ playlist.description }}
          </div>
          <div class="playlist-details">
            <span
              v-if="playlist.collaborators.length == 0"
              class="playlist-owner"
              @click="navigateTo(`/user/${playlist.user?.id}`)"
              >{{ playlist.user?.full_name }}</span
            >
            <span
              v-else
              class="playlist-owner"
              @click="collabDialog.showModal()"
              >{{ playlist.user?.full_name }} &
              {{ playlist.collaborators.length }}
              other
            </span>

            <span class="playlist-stats">
              • {{ playlist.items?.length || 0 }} items,
              {{ formatTotalDuration(getTotalDuration()) }}
            </span>
            <span
              class="playlist-likes"
              v-if="
                playlist.likes_count > 0 &&
                playlist.user_id == userStore.user.id
              "
            >
              • {{ playlist.likes_count }} lượt lưu
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- collabDialog  -->
    <dialog ref="collabDialog" class="bg-dark text-white rounded-3 border-0">
      <div class="p-4" style="min-width: 480px">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="h5 mb-0">Những người cộng tác</h3>
          <button
            class="btn-close btn-close-white"
            @click="collabDialog.close()"
          ></button>
        </div>

        <!-- Owner -->
        <div class="collaborator-list">
          <div class="d-flex align-items-center gap-3 mb-3">
            <img
              :src="playlist.user?.avatar_url || '/images/default-avatar.png'"
              class="rounded-circle"
              width="40"
              height="40"
              :alt="playlist.user?.full_name"
            />
            <div class="flex-grow-1">
              <div
                class="fw-bold cursor-pointer"
                @click="navigateTo(`/user/${playlist.user?.id}`)"
              >
                {{ playlist.user?.full_name }}
              </div>
              <div class="text-secondary small">Người tạo</div>
            </div>
          </div>

          <!-- Collaborators -->
          <div
            v-for="collab in playlist.collaborators"
            :key="collab.id"
            class="d-flex align-items-center gap-3 mb-3"
          >
            <img
              :src="collab.avatar_url || '/images/default-avatar.png'"
              class="rounded-circle"
              width="40"
              height="40"
              :alt="collab.full_name"
            />
            <div class="flex-grow-1">
              <div
                class="fw-bold cursor-pointer"
                @click="navigateTo(`/user/${collab.id}`)"
              >
                {{ collab.full_name }}
              </div>
              <div class="text-secondary small">Cộng tác viên</div>
            </div>
            <button
              v-if="playlist.user_id === userStore.user.id"
              class="btn text-danger p-0 small"
              @click="removeCollaborator(collab.id)"
            >
              Xóa
            </button>
          </div>
        </div>

        <!-- Add Collaborator Section (Only for owner) -->
        <div v-if="playlist.user_id === userStore.user.id" class="mt-4">
          <div class="d-flex gap-2">
            <input
              type="text"
              class="form-control form-control-sm bg-dark text-white border-secondary"
              placeholder="Email người dùng"
              v-model="newCollaboratorEmail"
            />
            <button
              class="btn btn-success btn-sm"
              @click="addCollaboratorViaEmail"
              :disabled="!newCollaboratorEmail"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <!-- Playlist Controls -->
    <div class="playlist-controls d-flex align-items-center">
      <button class="btn-play" @click="playSong(playlist.items[0],0)" v-if="playlist.items?.length">
        <i class="ri-play-fill"></i>
      </button>
      <!-- add collaborators button -->
      <button
        class="btn-options"
        v-if="playlist.user_id == userStore.user.id"
        @click="inviteCollaborator"
      >
        <i class="ri-user-add-fill"></i>
      </button>

      <!-- add to favorite button -->
      <button
        class="btn-options"
        v-if="playlist.user_id != userStore.user.id"
        @click="toggleFavorite"
      >
        <i
          :class="
            playlist.is_favorite
              ? 'ri-heart-3-fill text-success'
              : 'ri-heart-3-line'
          "
        ></i>
      </button>

      <div class="position-relative">
        <button class="btn-options" @click="showMoreMenu = !showMoreMenu">
          <i class="ri-more-fill"></i>
        </button>
        <div
          v-if="showMoreMenu"
          class="dropdown-menu show position-absolute"
          :style="{ top: '-100%', left: '100%', zIndex: 999 }"
        >
          <button
            class="dropdown-item d-flex align-items-center gap-2"
            v-if="playlist.user_id == userStore.user.id"
            @click="editPlaylist"
          >
            <i class="ri-edit-line"></i>
            <span>Chỉnh sửa</span>
          </button>
          <button
            class="dropdown-item d-flex align-items-center gap-2"
            v-if="playlist.user_id == userStore.user.id"
            @click="deletePlaylist"
          >
            <i class="ri-delete-bin-line"></i>
            <span>Xóa</span>
          </button>
          <button
            class="dropdown-item d-flex align-items-center gap-2"
            v-if="playlist.user_id == userStore.user.id"
            @click="togglePrivacy"
          >
            <i
              :class="
                playlist.is_public ? 'ri-lock-line' : 'ri-lock-unlock-line'
              "
            ></i>
            <span>{{
              playlist.is_public ? "Đặt thành riêng tư" : "Đặt thành công khai"
            }}</span>
          </button>
          <button
            class="dropdown-item d-flex align-items-center gap-2"
            v-if="playlist.user_id == userStore.user.id"
            @click="inviteCollaborator"
          >
            <i class="ri-user-add-line"></i>
            <span>Mời cộng sự</span>
          </button>

          <button
            class="dropdown-item d-flex align-items-center gap-2"
            v-if="
              playlist.user_id != userStore.user.id &&
              playlist.collaborators.some((c) => c.id == userStore.user.id)
            "
            @click="leavePlaylist"
          >
            <i class="ri-user-unfollow-line"></i>
            <span>Rời playlist</span>
          </button>

          <button
            class="dropdown-item d-flex align-items-center gap-2"
            @click="sharePlaylist"
          >
            <i class="ri-share-line"></i>
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Playlist Table -->
    <div class="playlist-table" v-if="playlist.items?.length">
      <div class="table-header border-bottom border-secondary mb-2">
        <div
          class="header-row d-flex align-items-center py-2 px-3 text-secondary small"
        >
          <div class="col-1 col-sm-auto me-3 text-center">#</div>
          <div class="col-6 col-md-4">Title</div>
          <div class="col-md-3 d-none d-md-block">Album or Podcast</div>
          <div class="col-md-2 d-none d-md-block">Date added</div>
          <div class="col-auto ms-auto text-center">
            <i class="ri-time-line"></i>
          </div>
        </div>
      </div>

      <!-- Draggable Songs List -->
      <div>
        <ul class="songs-list list-group" ref="listRef">
          <li
            v-for="(element, index) in playlist.items"
            :key="element.uid"
            class="song-row list-group-item border-0 d-flex align-items-center py-2 px-3 position-relative"
            :class="{
            }"
            :data-uid="element.uid"
            @dblclick.stop="playSong(element, index)"
            @contextmenu.prevent="
              showPlaylistMenu = true;
              showPlaylistMenuElement = element;
            "
          >
            <!-- Track Number -->
            <div class="col-1 col-sm-auto me-3 text-center text-white">
              <i
                v-if="element.item_type === 'track'"
                class="bi bi-music-note"
              ></i>
              <i
                v-if="element.item_type === 'podcast_episode'"
                class="bi bi-headphones"
              ></i>
            </div>

            <!-- Title and Artist -->
            <div class="col-6 col-md-4 d-flex align-items-center">
              <img
                :src="element.item_image || '/images/default-song.png'"
                :alt="element.item_name"
                class="song-cover rounded shadow-sm me-3"
                width="40"
                height="40"
              />
              <div class="song-info overflow-hidden">
                <div
                  class="song-name text-truncate"
                >

                
                {{ element.item_name }}
                </div>
                <div
                  v-if="element.item_type === 'track'"
                  @click="navigateTo(`/artist/${element.owner_id}`)"
                  class="song-artist text-secondary small text-truncate d-flex align-items-center "
                >
                <!-- Explicit content icon  -->
                <i v-if="element.explicit" class="bi bi-explicit-fill me-1"></i> 

                  {{ element.owner_name }}
                </div>
                <div
                  v-if="element.item_type === 'podcast_episode'"
                  @click="navigateTo(`/podcaster/${element.owner_id}`)"
                  class="song-artist text-secondary cursor-pointer small text-truncate"
                >
                  {{ element.owner_name }}
                </div>
              </div>
            </div>

            <!-- Album -->
            <div
              v-if="element.item_type === 'track'"
              @click="navigateTo(`/album/${element.album_or_podcast_id}`)"
              class="album col-md-3 d-none d-md-block text-secondary text-truncate cursor-pointer"
            >
              {{ element.album_or_podcast }}
            </div>
            <div
              v-if="element.item_type === 'podcast_episode'"
              @click="navigateTo(`/podcast/${element.album_or_podcast_id}`)"
              class="album col-md-3 d-none d-md-block text-secondary text-truncate cursor-pointer"
            >
              {{ element.album_or_podcast }}
            </div>

            <!-- Date Added -->
            <div class="col-md-2 d-none d-md-block text-secondary">
              {{ formatDate(element.created_at) }}
            </div>

            <!-- Duration -->
            <div class="col-auto ms-auto text-secondary">
              {{ formatDuration(element.item_duration_ms) }}
            </div>

            <!-- show only the element that click -->
            <div
              v-if="
                showPlaylistMenu && showPlaylistMenuElement.uid === element.uid
              "
              class="dropdown-menu show position-absolute"
              :style="{ top: '-200%', left: '10%', zIndex: 999 }"
            >
              <button
                class="dropdown-item d-flex align-items-center gap-2"
                @click="addToQueue(element)"
              >
                <i class="ri-add-line"></i>
                <span>Thêm vào hàng đợi</span>
              </button>

              <button
                class="dropdown-item d-flex align-items-center gap-2"
                @click="addToFavourite(element)"
              >
                <template
                  v-if="
                    !libraryStore.savedTracks.some(
                      (track) => track.id === element.item_id
                    ) &&
                    !libraryStore.savedEpisodes.some(
                      (episode) => episode.id === element.item_id
                    )
                  "
                >
                  <i class="ri-heart-line"></i>
                  <span v-if="element.item_type === 'track'"
                    >Lưu vào nhạc yêu thích</span
                  >
                  <span v-else>Lưu vào tập yêu thích</span>
                </template>
                <template v-else>
                  <i class="ri-heart-fill text-success"></i>
                  <span v-if="element.item_type === 'track'"
                    >Xóa khỏi nhạc yêu thích</span
                  >
                  <span v-else>Xóa khỏi tập yêu thích</span>
                </template>
              </button>

              <div class="dropdown-divider"></div>

              <div class="dropdown-submenu">
                <button class="dropdown-item d-flex align-items-center gap-2">
                  <i class="ri-add-circle-line"></i>
                  <span>Thêm vào danh sách phát</span>
                  <i class="ri-arrow-right-s-line ms-auto"></i>
                </button>
                <div
                  class="submenu dropdown-menu show position-absolute"
                  style="top: 0; left: 100%"
                >
                  <div
                    class="playlists-menu overflow-auto"
                    style="max-height: 150px; overflow-y: auto"
                  >
                    <button
                      v-for="pl in filteredPlaylists"
                      :key="pl.id"
                      class="dropdown-item d-flex align-items-center gap-2"
                      @click="addToPlaylist(element, pl.id)"
                    >
                      <img
                        :src="pl.avatar_url || '/images/default-playlist.png'"
                        class="rounded"
                        width="30"
                        height="30"
                      />
                      <span class="text-truncate">{{ pl.name }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="dropdown-divider"></div>

              <button
                v-if="playlist.user_id == userStore.user.id || playlist.collaborators.some(c => c.id == userStore.user.id)"
                class="dropdown-item d-flex align-items-center gap-2"
                @click="deleteItemFromPlaylist(element)"
              >
                <i class="ri-delete-bin-line"></i>
                <span>Xóa khỏi danh sách phát</span>
              </button>

              <button
                class="dropdown-item d-flex align-items-center gap-2"
                @click="
                  element.item_type == 'track'
                    ? navigateTo(`/album/${element.album_or_podcast_id}`)
                    : navigateTo(`/podcast/${element.album_or_podcast_id}`)
                "
              >
                <i class="ri-information-line"></i>
                <span v-if="element.item_type == 'track'"
                  >Xem thông tin album
                </span>
                <span v-else>Xem thông tin podcast</span>
              </button>
              <button
                class="dropdown-item d-flex align-items-center gap-2"
                @click="
                  element.item_type == 'track'
                    ? navigateTo(`/artist/${element.owner_id}`)
                    : navigateTo(`/podcaster/${element.owner_id}`)
                "
              >
                <i class="ri-user-line"></i>
                <span>Xem thông tin nghệ sĩ</span>
              </button>
              <button
                v-if="element.item_type == 'podcast_episode'"
                class="dropdown-item d-flex align-items-center gap-2"
                @click="navigateTo(`/episode/${element.item_id}`)"
              >
                <i class="ri-file-text-line"></i>
                <span>Xem mô tả tập</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="empty-playlist">
      <p>This playlist is empty. Add some songs!</p>
    </div>
  </div>

  <!-- Edit Dialog -->
  <dialog ref="editDialog" class="edit-dialog rounded-3">
    <div class="dialog-content p-4">
      <div class="d-flex justify-content-between align-items-start mb-4">
        <h3 class="fs-5 fw-bold m-0">Chỉnh sửa thông tin</h3>
        <button class="btn-close bg-white" @click="closeDialog"></button>
      </div>

      <form @submit.prevent="saveChanges" class="d-flex flex-column gap-3">
        <!-- Image upload -->
        <div class="position-relative image-upload">
          <img
            v-if="playlist"
            :src="editedImage || playlist.avatar_url"
            class="rounded-3"
            width="180"
            height="180"
            alt="Playlist cover"
          />
          <div
            class="upload-overlay rounded-3 d-flex flex-column align-items-center justify-content-center"
          >
            <i class="bi bi-camera-fill fs-4 mb-2"></i>
            <span class="text-sm">Chọn ảnh</span>
          </div>
          <input
            type="file"
            class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>

        <!-- Name input -->
        <div class="form-group">
          <input
            type="text"
            class="form-control form-control-lg bg-dark text-white border-0"
            v-model="editedName"
            placeholder="Thêm tên"
            required
          />
        </div>

        <!-- Description textarea -->
        <div class="form-group">
          <textarea
            class="form-control bg-dark text-white border-0"
            v-model="editedDescription"
            rows="3"
            placeholder="Thêm phần mô tả tùy chọn"
          ></textarea>
        </div>

        <!-- Save button -->
        <div class="d-flex justify-content-end gap-2">
          <button type="button" class="btn text-white" @click="closeDialog">
            Hủy
          </button>
          <button type="submit" class="btn btn-success px-4">Lưu</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/user";
import { useToast } from "vue-toastification";
import { useLibraryStore } from "~/stores/library";
const { $axios, $sortable } = useNuxtApp();
const player = usePlayerStore();

definePageMeta({
  layout: "default2",
});

const route = useRoute();
const playlist = ref(null);
const drag = ref(false);
const userStore = useUserStore();
const showMoreMenu = ref(false);
const showPlaylistMenu = ref(false);
const showPlaylistMenuElement = ref(null);

// dialog
const editedImage = ref(null);
const editedName = ref("");
const editedDescription = ref("");
const editDialog = ref(null);

// draggable
const listRef = ref(null);

// Fetch playlist data
const fetchPlaylist = async () => {
  try {
    const response = await $axios.get(
      `/api/libraries/playlists/get_playlist_by_id?playlist_id=${route.params.id}`
    );
    playlist.value = response.data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};

onMounted(async () => {
  await fetchPlaylist();
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".position-relative")) {
      showMoreMenu.value = false;
      showPlaylistMenu.value = false;
    }
  });
  console.log(playlist.value.items);

  if (listRef.value) {
    new $sortable(listRef.value, {
      disabled:
        playlist.value.user_id != userStore.user.id &&
        !playlist.value.collaborators.some((c) => c.id == userStore.user.id),
      animation: 150,
      multiDrag: true,
      selectedClass: "selected",
      ghostClass: "ghost",
      multiDragKey: "ctrl",
      fallbackTolerance: 3,
      async onEnd(evt) {
        // console.log(evt);
        // let type;
        // let oldIndexes = evt.oldIndicies.map((i) => i.index);
        // oldIndexes = Array.from(new Set([...oldIndexes, evt.oldIndex]));
        // let newIndex = Math.min(
        //   evt.newIndex,
        //   evt.newIndicies.at(0)?.index || evt.newIndex
        // );
        // console.log(newIndex)
        // if (Math.min(oldIndex) )
        const uids = Array.from(evt.to.children).map((el) =>
          el.getAttribute("data-uid")
        );
        console.log(uids);
        const { $axios } = useNuxtApp();
        try {
          const response = await $axios.put(
            "/api/libraries/playlists/change_item_order2/",
            {
              playlist_id: playlist.value.id,
              uids: uids,
            }
          );
          playlist.value.items = response.data.result;
          console.log(playlist.value.items);
        } catch (error) {
          console.error("Error updating playlist items:", error);
        }
      },
    });
  }
});

const playSong = (song, index) => {
  const trackIds = playlist.value.items.map(t => t.item_id);
  player.setPlaylist(trackIds, index);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getTotalDuration = () => {
  if (!playlist.value?.items) return 0;
  if (Object.keys(playlist.value.items).length === 0) return 0;

  return playlist.value.items?.reduce(
    (total, item) => total + (item.item_duration_ms || 0),
    0
  );
};

const formatTotalDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} m`;
  }
  return `${minutes} m ${seconds} s`;
};

const editPlaylist = () => {
  openDialog();
  showMoreMenu.value = false;
};
const openDialog = () => {
  if (playlist.value.user_id != userStore.user.id) return;

  editedName.value = playlist.value.name;
  editedDescription.value = playlist.value.description;
  editedImage.value = null;
  editDialog.value.showModal();
};
const closeDialog = () => {
  editDialog.value.close();
};

// edit playlist
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    editedImage.value = URL.createObjectURL(file);
  }
};
const saveChanges = async () => {
  if (!editedName.value) {
    alert("Vui lòng nhập tên!");
    return;
  }
  try {
    const formData = new FormData();
    formData.append("name", editedName.value);
    formData.append("description", editedDescription.value);
    formData.append("playlist_id", playlist.value.id);

    if (editedImage.value) {
      // Get the file from input
      const input = editDialog.value.querySelector('input[type="file"]');
      formData.append("avatar_url", input.files[0]);
    }

    const res = await $axios.put(
      "/api/libraries/playlists/update_playlist/",
      formData
    );
    if (res.status === 200) {
      playlist.value = res.data;
      useLibraryStore().refreshAll();
      closeDialog();
    }
  } catch (error) {
    console.error("Error updating playlist:", error);
  }
};

// delete playlist
const deletePlaylist = async () => {
  if (confirm("Bạn có chắc muốn xóa playlist này?")) {
    try {
      await $axios.delete(`/api/libraries/playlists/remove_playlist/`, {
        data: {
          playlist_id: playlist.value.id,
        },
      });
      useLibraryStore().refreshAll();
      navigateTo("/home", { replace: true });
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  }
  showMoreMenu.value = false;
};

// toggle privacy
const togglePrivacy = async () => {
  try {
    const res = await $axios.put(`/api/libraries/playlists/update_playlist/`, {
      playlist_id: playlist.value.id,
      is_public: !playlist.value.is_public,
    });
    if (res.status === 200) {
      playlist.value.is_public = res.data.is_public;
    }
  } catch (error) {
    console.error("Error toggling privacy:", error);
  }
  showMoreMenu.value = false;
};

const inviteCollaborator = async () => {
  // Implement invite functionality
  const toast = useToast();
  try {
    await navigator.clipboard.writeText(
      `http://localhost:3000/share/playlist/${playlist.value.id}?token=${playlist.value.share_token}`
    );
    toast.success("Đã copy link mời!", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  } catch (err) {
    toast.error("Không thể copy: " + err);
  }

  showMoreMenu.value = false;
};

const toggleFavorite = async () => {
  const toast = useToast();
  try {
    const res = await $axios.post(
      `/api/libraries/playlists/${
        playlist.value.is_favorite ? "unfollow_playlist" : "follow_playlist"
      }/`,
      {
        playlist_id: playlist.value.id,
      }
    );
    if (res.data.status === "success") {
      playlist.value.is_favorite = res.data.result.is_favorite;
      toast.success(
        playlist.value.is_favorite
          ? "Đã thêm vào danh sách yêu thích"
          : "Đã xóa khỏi danh sách yêu thích",
        {
          timeout: 1500,
          position: "bottom-center",
          pauseOnHover: false,
          hideProgressBar: true,
          icon: true,
        }
      );
      useLibraryStore().refreshAll();
    }
  } catch (error) {
    console.error("Error adding to favorite:", error);
  }
  showMoreMenu.value = false;
};

const sharePlaylist = async () => {
  const toast = useToast();
  try {
    await navigator.clipboard.writeText(
      `http://localhost:3000/playlist/${playlist.value.id}`
    );
    toast.success("Đã copy!", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  } catch (err) {
    toast.error("Không thể copy: " + err);
  }
  showMoreMenu.value = false;
};

const deleteItemFromPlaylist = async (item) => {
  try {
    const response = await $axios.post(
      `/api/libraries/playlists/remove_item_from_playlist/`,
      {
        playlist_id: playlist.value.id,
        item_uid: item.uid,
      }
    );
    if (response.data.status === "success") {
      playlist.value.items = response.data.result;
    }
  } catch (error) {
    console.error("Error deleting item from playlist:", error);
  }
};

const playlistSearchQuery = ref("");
const libraryStore = useLibraryStore();

// recursion
const getAllPlaylistsFromFolders = (folders) => {
  const playlists = [];
  for (const folder of folders) {
    playlists.push(...folder.playlists);
    if (folder.subfolders.length > 0) {
      playlists.push(...getAllPlaylistsFromFolders(folder.subfolders));
    }
  }
  return playlists;
};

// Filter playlists based on search query
const filteredPlaylists = computed(() => {
  return [
    ...libraryStore.playlists,
    ...getAllPlaylistsFromFolders(libraryStore.folders),
  ].filter(p => p.user_id == userStore.user.id || p.collaborators.some(c => c.id == userStore.user.id));
});

// Add song to another playlist
const addToPlaylist = async (item, playlistId) => {
  const toast = useToast();
  try {
    const response = await $axios.post(
      "/api/libraries/playlists/add_item_to_playlist/",
      {
        playlist_id: playlistId,
        item_id: item.item_id,
        item_type: item.item_type,
      }
    );

    if (response.data.status === "success") {
      toast.success("Đã thêm vào danh sách phát", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
      showPlaylistMenu.value = false;
      if (playlist.value.id === playlistId)
        playlist.value.items = response.data.result;
      else libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error adding to playlist:", error);
    toast.error("Không thể thêm vào danh sách phát");
  }
};

// Add to queue
const addToQueue = (item) => {
  // Implement queue functionality here
  const toast = useToast();
  toast.success("Đã thêm vào hàng đợi", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
  showPlaylistMenu.value = false;
};

const addToFavourite = async (element) => {
  let res;
  if (element.item_type === "track") {
    res = await $axios.post(
      `/api/libraries/tracks/${
        libraryStore.savedTracks.some((track) => track.id === element.item_id)
          ? "remove_saved_track"
          : "save_track"
      }/`,
      {
        track_id: element.item_id,
      }
    );
  } else {
    res = await $axios.post(
      `/api/libraries/episodes/${
        libraryStore.savedEpisodes.some(
          (episode) => episode.id === element.item_id
        )
          ? "remove_saved_episode"
          : "save_episode"
      }/`,
      {
        episode_id: element.item_id,
      }
    );
  }

  if (res.data.status === "success") {
    libraryStore.refreshAll();
  }

  const toast = useToast();
  toast.success("Đã thêm vào yêu thích", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

// Collaborator part

const leavePlaylist = async () => {
  const res = await $axios.post("/api/libraries/playlists/leave_playlist/", {
    playlist_id: playlist.value.id,
  });

  if (res.data.status === "success") {
    fetchPlaylist();
    const toast = useToast();
    toast.success("Đã rời playlist", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  }
};

// Collaborator dialog part

const collabDialog = ref(null);
const newCollaboratorEmail = ref("");

const addCollaboratorViaEmail = async () => {
  const toast = useToast();
  try {
    const response = await $axios.post(
      "/api/libraries/playlists/add_collaborator_via_email/",
      {
        playlist_id: playlist.value.id,
        email: newCollaboratorEmail.value,
      }
    );

    if (response.data.status === "success") {
      playlist.value = response.data.result;
      newCollaboratorEmail.value = "";
      toast.success("Đã thêm cộng tác viên", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
    }
  } catch (error) {
    console.error("Error adding collaborator:", error);
    toast.error("Không thể thêm cộng tác viên");
  }
};

const removeCollaborator = async (userId) => {
  if (!confirm("Bạn có chắc muốn xóa cộng tác viên này?")) return;

  const toast = useToast();
  try {
    const response = await $axios.post(
      "/api/libraries/playlists/remove_collaborator/",
      {
        playlist_id: playlist.value.id,
        user_id: userId,
      }
    );

    if (response.data.status === "success") {
      playlist.value = response.data.result;
      toast.success("Đã xóa cộng tác viên", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
    }
  } catch (error) {
    console.error("Error removing collaborator:", error);
    toast.error("Không thể xóa cộng tác viên");
  }
};
</script>

<style scoped>
.playlist-page {
  color: #fff;
}

.playlist-header-wrapper {
  position: relative;
  padding: 24px;
  margin: -24px -24px 0;
  background-color: #d1a66d;
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(180deg, rgba(80,56,160,0.8) 0%, transparent 100%);
  z-index: 0;
}

.playlist-header {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 80px 24px 24px;
  z-index: 1;
  min-height: 340px;
}

.playlist-cover {
  width: 232px;
  height: 232px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  background-color: #282828;
  border-radius: 8px;
  overflow: hidden;
}

.playlist-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playlist-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.playlist-type {
  font-size: 0.875rem;
  font-weight: 500;
}

.playlist-title {
  font-size: 5rem;
  font-weight: 700;
  margin: 0.3em 0;
}

.playlist-description {
  color: #e7e6e6;
  font-weight: 700;
  margin-bottom: 1em;
}

.playlist-details {
  font-size: 0.875rem;
  color: #e7e6e6;
}

.playlist-owner {
  font-weight: 700;
  color: #e7e6e6;
}

.playlist-owner:hover {
  text-decoration: underline;
  cursor: pointer;
}

.playlist-stats {
  font-weight: 700;
  color: #bbbaba;
}

.playlist-likes {
  font-weight: 700;
  color: #bbbaba;
}

.playlist-controls {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 32px;
}

.btn-play {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1ed760;
  border: none;
  color: #000;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-play:hover {
  transform: scale(1.05);
  background-color: #1fdf64;
}

.btn-options {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #a7a7a7;
  font-size: 20px;
  cursor: pointer;
}

.btn-options:hover {
  color: #fff;
}

.playlist-table {
  width: 100%;
}

.table-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #a7a7a7;
  font-size: 1rem;
}

.header-row,
.song-row {
  display: grid;
  grid-template-columns: 40px 4fr 2fr 2fr 1fr;
  padding: 8px 16px;
  align-items: center;
}

.songs-list {
  margin-top: 16px;
  background-color: transparent;
}

.song-row {
  user-select: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.song-row:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.song-row:hover .play-btn,
.song-row:hover .drag-handle {
  opacity: 0.7 !important;
}

.song-row.selected {
  background-color: rgba(255, 255, 255, 0.2);
}

.song-row.selected:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.song-row.is-dragging {
  background-color: rgba(255, 255, 255, 0.3);
}

.ghost {
  opacity: 0.5;
  background: #282828;
}

.drag-handle {
  cursor: move;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.play-btn {
  transition: opacity 0.2s ease;
}

.song-name {
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-artist {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist:hover {
  text-decoration: underline;
}

.album {
  cursor: pointer;
}

.album:hover {
  text-decoration: underline;
}

.dropdown-menu {
  background: #282828;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px;
  min-width: 200px;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
}

.dropdown-submenu > .dropdown-menu {
  display: none;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-item {
  color: #fff;
  padding: 8px 12px;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  border-radius: 2px;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-item i {
  font-size: 1.2em;
  opacity: 0.7;
}

.dropdown-item:hover i {
  opacity: 1;
}

.edit-dialog {
  border: none;
  background: #282828;
  color: white;
  min-width: 320px;
  max-width: 100%;
}

.edit-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.image-upload {
  width: 180px;
  height: 180px;
  cursor: pointer;
}

.image-upload:hover .upload-overlay {
  opacity: 1;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: 0;
}

.playlists-menu {
  scrollbar-width: thin;
  scrollbar-color: #ffffff40 transparent;
}

.playlists-menu::-webkit-scrollbar {
  width: 8px;
}

.playlists-menu::-webkit-scrollbar-track {
  background: transparent;
}

.playlists-menu::-webkit-scrollbar-thumb {
  background-color: #ffffff40;
  border-radius: 4px;
}

.collaborator-list {
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ffffff40 transparent;
}

.collaborator-list::-webkit-scrollbar {
  width: 8px;
}

.collaborator-list::-webkit-scrollbar-track {
  background: transparent;
}

.collaborator-list::-webkit-scrollbar-thumb {
  background-color: #ffffff40;
  border-radius: 4px;
}
</style>
