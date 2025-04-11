<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/song.jpg)"
  ></div>
  <div v-if="loading">Đang tải...</div>
  <div v-else class="under-hero container">
    <div class="section">
      <div class="row align-items-center">
        <div class="col-xl-3 col-md-4">
          <div class="cover cover--round">
            <div class="cover__image">
              <div class="ratio ratio-1x1">
                <img src="/images/cover/large/5.jpg" alt="Treasure face" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 d-none d-xl-block"></div>
        <div class="col-md-8 mt-5 mt-md-0">
          <div class="d-flex flex-wrap mb-2">
            <span class="text-dark fs-4 fw-semibold pe-2">Treasure face</span>
            <div class="dropstart d-inline-flex ms-auto">
              <a
                class="dropdown-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-label="Cover options"
                aria-expanded="false"
                ><i class="ri-more-fill"></i
              ></a>
              <ul class="dropdown-menu dropdown-menu-sm">
                <li>
                  <a class="dropdown-item" role="button">Add to playlist</a>
                </li>
                <li><a class="dropdown-item" role="button">Add to queue</a></li>
                <li><a class="dropdown-item" role="button">Next to play</a></li>
                <li><a class="dropdown-item" role="button">Share</a></li>
                <li class="dropdown-divider"></li>
                <li>
                  <a
                    class="dropdown-item"
                    role="button"
                    data-collection-play-id="1"
                    >Play</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <ul class="info-list info-list--dotted mb-3">
            <li>Album</li>
            <li>10 Songs</li>
            <li>01:21:41</li>
            <li>Apr 14, 2019</li>
            <li>Travers Music Company</li>
          </ul>
          <p class="mb-5">
            By:
            <a href="artist-details.html" class="text-dark fw-medium"
              >Jina Moore</a
            >,
            <a href="artist-details.html" class="text-dark fw-medium"
              >Lenisa Gory</a
            >
          </p>
          <ul class="info-list">
            <li>
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  id="play_all"
                  class="btn btn-icon btn-primary rounded-pill"
                  data-collection-play-id="1"
                  aria-label="Play All"
                >
                  <i class="ri-play-fill icon-play"></i>
                  <i class="ri-pause-fill icon-pause"></i>
                </button>
                <label
                  for="play_all"
                  class="ps-2 fw-semibold text-primary mb-0"
                  style="cursor: pointer"
                  >Play all</label
                >
              </div>
            </li>
            <li>
              <a
                role="button"
                class="text-dark d-flex align-items-center"
                aria-label="Favorite"
                data-favorite-id="1"
                ><i class="ri-heart-line heart-empty"></i>
                <i class="ri-heart-fill heart-fill"></i>
                <span class="ps-2 fw-medium">121</span></a
              >
            </li>
            <li>
              <a
                role="button"
                class="text-dark d-flex align-items-center"
                aria-label="Download"
                ><i class="ri-download-2-line"></i>
                <span class="ps-2 fw-medium">24</span></a
              >
            </li>
            <li>
              <span class="text-dark d-flex align-items-center"
                ><i class="ri-star-fill text-warning"></i>
                <span class="ps-2 fw-medium">4.5</span></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="list">
        <div class="row">
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Comments</h3>
      </div>
      <div class="row">
        <div class="col-xl-8">
          <form action="#" class="row mb-5">
            <div class="col-12 mb-3 d-flex align-items-center">
              <span class="form-label mb-0">Ratings:</span>
              <div class="ps-2">
                <select
                  class="form-select"
                  style="min-width: 100px"
                  aria-label="Select ratings"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div class="col-6 mb-3">
              <input type="text" class="form-control" placeholder="Full name" />
            </div>
            <div class="col-6 mb-3">
              <input type="text" class="form-control" placeholder="Email ID" />
            </div>
            <div class="col-12 mb-4">
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="4"
                class="form-control"
                placeholder="Write your comment"
              ></textarea>
            </div>
            <div class="col-12">
              <button
                type="button"
                class="btn btn-primary"
                style="min-width: 160px"
              >
                Submit
              </button>
            </div>
          </form>
          <div class="avatar avatar--lg align-items-start">
            <div class="avatar__image">
              <img src="/images/users/thumb.jpg" alt="user" />
            </div>
            <div class="avatar__content">
              <span class="avatar__title mb-1">Androws Kinny</span>
              <span class="avatar__subtitle mb-2">Apr 22, 2019</span>
              <div class="text-warning d-flex mb-1">
                <i class="ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
                <i class="ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laboriosam vel necessitatibus suscipit dicta quasi velit ratione
                nemo, voluptatum debitis cum sit quod dolor pariatur laudantium
                cumque.
              </p>
              <a href="javascript:void(0);" class="btn btn-link">
                <div class="btn__wrap">
                  <i class="ri-reply-line fs-6"></i> <span>Reply</span>
                </div>
              </a>
              <div class="avatar avatar--lg align-items-start mt-4">
                <div class="avatar__image">
                  <img src="/images/users/thumb.jpg" alt="user" />
                </div>
                <div class="avatar__content">
                  <span class="avatar__title">Androws Kinny</span>
                  <span class="avatar__subtitle mb-2">Apr 23, 2019</span>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Laboriosam vel necessitatibus suscipit dicta quasi velit
                    ratione nemo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="avatar avatar--lg align-items-start mt-4">
            <div class="avatar__image">
              <img src="/images/users/thumb.jpg" alt="user" />
            </div>
            <div class="avatar__content">
              <span class="avatar__title mb-1">Androws Kinny</span>
              <span class="avatar__subtitle mb-2">Apr 16, 2019</span>
              <div class="text-warning d-flex mb-1">
                <i class="ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
                <i class="ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
                <i class="ri-star-s-fill"></i>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laboriosam vel necessitatibus suscipit dicta quasi velit ratione
                nemo, voluptatum debitis cum sit quod dolor pariatur laudantium
                cumque.
              </p>
              <a href="javascript:void(0);" class="btn btn-link">
                <div class="btn__wrap">
                  <i class="ri-reply-line fs-6"></i> <span>Reply</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="col-xl-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const trackId = route.params.id;

const track = ref(null);
const loading = ref(true);

onMounted(async () => {
  // try {
  //   const res = await $axios.get(`/api/tracks/${trackId}/`);
  //   track.value = res.data;
  // } catch (err) {
  //   console.error("Lỗi khi fetch track", err);
  // } finally {
  //   loading.value = false;
  // }
});
</script>

<style></style>
