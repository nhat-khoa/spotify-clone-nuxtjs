<template>
  <header id="header">
    <div class="container">
      <div class="header-container">
        <div class="d-flex align-items-center">
          <a
            role="button"
            class="header-text sidebar-toggler d-lg-none me-3"
            aria-label="Sidebar toggler"
            ><i class="ri-menu-3-line"></i
          ></a>
          <form action="#" id="search_form" class="me-3">
            <label for="search_input"><i class="ri-search-2-line"></i></label>
            <input
              type="text"
              :placeholder="$t('header.search')"
              id="search_input"
              class="form-control form-control-sm"
            />
          </form>
          <div id="search_results" class="search pb-3">
            <div class="search__head">
              <button type="button" class="btn btn-sm btn-light-primary active">
                Trending
              </button>
              <button type="button" class="btn btn-sm btn-light-primary">
                Artists
              </button>
              <button type="button" class="btn btn-sm btn-light-primary">
                Songs
              </button>
              <button type="button" class="btn btn-sm btn-light-primary">
                Albums
              </button>
            </div>
            <div class="search__body" data-scroll="true">
              <div class="mb-4">
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <span class="search__title">Artists</span>
                  <a href="artists.html" class="btn btn-link">View All</a>
                </div>
                <div class="row g-2 g-sm-4 list">
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="artist-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/large/5.jpg"
                            alt="Jina Moore"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="artist-details.html"
                          class="list__title text-truncate"
                          >Jina Moore</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="artist-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/large/6.jpg"
                            alt="Rasomi Pelina"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="artist-details.html"
                          class="list__title text-truncate"
                          >Rasomi Pelina</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="artist-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/large/7.jpg"
                            alt="Pimila Holliwy"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="artist-details.html"
                          class="list__title text-truncate"
                          >Pimila Holliwy</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="artist-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/large/8.jpg"
                            alt="Karen Jennings"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="artist-details.html"
                          class="list__title text-truncate"
                          >Karen Jennings</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <span class="search__title">Songs</span>
                  <a href="songs.html" class="btn btn-link">View All</a>
                </div>
                <div class="row g-2 g-sm-4 list">
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="song-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/small/6.jpg"
                            alt="Hey not me"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="song-details.html"
                          class="list__title text-truncate"
                          >Hey not me</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Rasomi Pelina</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="song-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/small/7.jpg"
                            alt="Deep inside"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="song-details.html"
                          class="list__title text-truncate"
                          >Deep inside</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Pimila Holliwy</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="song-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img src="/images/cover/small/8.jpg" alt="Sadness" />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="song-details.html"
                          class="list__title text-truncate"
                          >Sadness</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Karen Jennings</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="song-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img
                            src="/images/cover/small/9.jpg"
                            alt="Electric wave"
                          />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="song-details.html"
                          class="list__title text-truncate"
                          >Electric wave</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Lenisa Gory</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <span class="search__title">Albums</span>
                  <a href="albums.html" class="btn btn-link">View All</a>
                </div>
                <div class="row g-2 g-sm-4 list">
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="album-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img src="/images/cover/small/1.jpg" alt="Mummy" />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="album-details.html"
                          class="list__title text-truncate"
                          >Mummy</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Arebica Luna</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="album-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img src="/images/cover/small/2.jpg" alt="Hot shot" />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="album-details.html"
                          class="list__title text-truncate"
                          >Hot shot</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Gerrina Linda</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="album-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img src="/images/cover/small/3.jpg" alt="Own way" />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="album-details.html"
                          class="list__title text-truncate"
                          >Own way</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html"
                            >Zunira Willy & Nutty Nina</a
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="list__item">
                      <a href="album-details.html" class="list__cover">
                        <div class="ratio ratio-1x1">
                          <img src="/images/cover/small/4.jpg" alt="Say yes" />
                        </div>
                      </a>
                      <div class="list__content">
                        <a
                          href="album-details.html"
                          class="list__title text-truncate"
                          >Say yes</a
                        >
                        <p class="list__subtitle text-truncate">
                          <a href="artist-details.html">Johnny Marro</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="dropdown">
              <a
                class="header-text d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i class="ri-earth-line fs-5"></i>
                <span class="d-none d-md-block ms-1">
                  {{ $t("header.language") }}
                </span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                aria-labelledby="language_menu"
              >
                <div class="py-2 px-4">
                  <span class="d-block fw-bold">
                    {{ $t("header.selectLanguage") }}
                  </span>
                </div>
                <div class="dropdown-divider"></div>
                <div class="d-flex flex-wrap py-2">
                  <div class="py-2 px-4 w-50">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="language"
                        id="english"
                        value="en"
                        :checked="locale === 'en'"
                        @change="switchLanguage('en')"
                      />
                      <label class="form-check-label fw-semibold" for="english">
                        {{ $t("header.en") }}
                      </label>
                    </div>
                  </div>
                  <div class="py-2 px-4 w-50">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="language"
                        id="vietnamese"
                        value="vi"
                        :checked="locale === 'vi'"
                        @change="switchLanguage('vi')"
                      />
                      <label
                        class="form-check-label fw-semibold"
                        for="vietnamese"
                      >
                        {{ $t("header.vi") }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown ms-3 ms-sm-4">
              <a
                href="javascript:void(0);"
                class="avatar header-text"
                role="button"
                id="user_menu"
                data-bs-offset="0,8"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div v-if="userStore.isLoaded" class="avatar__image">
                  <img :src="userStore.user.avatar_url" alt="user" />
                </div>
                <span v-if="userStore.isLoaded" class="ps-2 d-none d-sm-block">
                  {{ userStore.user.full_name }}
                </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-md dropdown-menu-end"
                aria-labelledby="user_menu"
              >
                <li>
                  <div class="py-2 px-3 avatar avatar--lg">
                    <div v-if="userStore.isLoaded" class="avatar__image">
                      <img :src="userStore.user.avatar_url" alt="user" />
                    </div>
                    <div class="avatar__content">
                      <span v-if="userStore.isLoaded" class="avatar__title">
                        {{ userStore.user.full_name }}
                      </span>
                      <span class="avatar__subtitle">Artist</span>
                    </div>
                  </div>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <NuxtLink
                    class="dropdown-item d-flex align-items-center"
                    to="/profile"
                  >
                    <i class="ri-user-3-line fs-5"></i>
                    <span class="ps-2">{{ $t("header.profile") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="dropdown-item d-flex align-items-center"
                    to="/favorite"
                  >
                    <i class="ri-heart-line fs-5"></i>
                    <span class="ps-2">{{ $t("header.favorites") }}</span>
                  </NuxtLink>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <button
                    class="dropdown-item d-flex align-items-center external text-danger"
                    @click="logout"
                  >
                    <i class="ri-logout-circle-line fs-5"></i>
                    <span class="ps-2"> {{ $t("header.logout") }} </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import { useUserStore } from "~/stores/user";

const { locale } = useI18n();
const userStore = useUserStore();

// Chỉ load user khi component đã mounted (để đảm bảo chạy trên client)
onMounted(() => {
  userStore.loadUserFromLocalStorage();
});

const switchLanguage = (lang) => {
  locale.value = lang;
};

const logout = () => {
  Cookies.remove("access_token"); // Xóa token khỏi cookie
  userStore.logout();
  navigateTo("/login"); // Chuyển hướng về trang login
};
</script>

<style></style>
