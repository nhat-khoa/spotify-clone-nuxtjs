<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/song.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div
        class="row"
        data-song-id="8"
        data-song-name="Sadness inside"
        data-song-artist="Karen Jennings"
        data-song-album="Sadness"
        data-song-url="audio/ringtone-8.mp3"
        data-song-cover="/images/cover/small/8.jpg"
      >
        <div class="col-xl-3 col-md-4">
          <div class="cover cover--round">
            <div class="cover__image">
              <div class="ratio ratio-1x1">
                <img src="/images/cover/large/9.jpg" alt="Treasure face" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 d-none d-xl-block"></div>
        <div class="col-md-8 mt-5 mt-md-0">
          <div class="d-flex flex-wrap mb-2">
            <span class="text-dark fs-4 fw-semibold pe-2">Electric wave</span>
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
                  <a class="dropdown-item" role="button" data-playlist-id="8"
                    >Add to playlist</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" role="button" data-queue-id="8"
                    >Add to queue</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" role="button" data-next-id="8"
                    >Next to play</a
                  >
                </li>
                <li><a class="dropdown-item" role="button">Share</a></li>
                <li class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" role="button" data-play-id="8"
                    >Play</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <ul class="info-list info-list--dotted mb-3">
            <li>Pop</li>
            <li>01:23</li>
            <li>Apr 14, 2019</li>
            <li>Travers Music Company</li>
          </ul>
          <div class="mb-4">
            <p class="mb-2">
              Compose by: <span class="text-dark fw-medium">Lenisa Gory</span>
            </p>
            <p class="mb-2">
              Lyrics by: <span class="text-dark fw-medium">Gerrina Linda</span>
            </p>
            <p class="mb-2">
              Music director:
              <span class="text-dark fw-medium">Nutty Nina</span>
            </p>
          </div>
          <ul class="info-list mb-5">
            <li>
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  id="play_all"
                  class="btn btn-icon btn-primary rounded-pill"
                  aria-label="Play"
                  data-play-id="8"
                >
                  <i class="ri-play-fill icon-play"></i>
                  <i class="ri-pause-fill icon-pause"></i>
                </button>
                <span class="ps-2 fw-semibold">348</span>
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
          <div class="mt-2">
            <span class="d-block text-dark fs-6 fw-semibold mb-3">Lyrics</span>
            <p>This one's for you Mrs Van De Kamp!</p>
            <p>
              My love for you is like the most brave aubergine,<br />Your face
              reminds me of repugnant goats,<br />Together, we are like bread
              rolls and olive oil.
            </p>
            <p>
              Oh darling Nigel,<br />My brave aubergine,<br />My repugnant
              onion,<br />The perfect companion to my bread rolls soul.
            </p>
            <p>
              Poppies are red,<br />Kingfishers are blue,<br />I like drinking
              tequila,<br />But not as much as I love crashing with you!
            </p>
            <p>
              Oh darling Nigel,<br />Your cheeks are like clean rakes on a
              summer day,<br />You're like the most super barman to ever walk
              Hull.
            </p>
            <p>
              Your repugnant goat face,<br />Your olive oil soul,<br />Your
              clean cheeks,<br />Your super barman being...
            </p>
            <p>
              How could I look at another when our brave aubergine love is so
              strong?
            </p>
            <p>I love you Mrs Van De Kamp!</p>
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

<script setup></script>

<style></style>
