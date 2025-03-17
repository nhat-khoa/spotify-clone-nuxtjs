"use strict";
const Base = (function () {
  const t = "active",
    e = $("body"),
    a = () => {
      let a = !1;
      $(".sidebar-toggler").on("click", function () {
        (a = !a),
          $(this).toggleClass(t),
          e.attr("data-sidebar-toggle", a ? "true" : null);
      });
    },
    i = () => {
      $("#search_input").on("click", function (t) {
        t.stopPropagation();
        document
          .querySelectorAll('[data-bs-toggle="dropdown"]')
          .forEach((t) => {
            const e = bootstrap.Dropdown.getInstance(t);
            e && e.hide();
          }),
          e.attr("data-search-results", "true");
      }),
        $(".search").on("click", function (t) {
          t.stopPropagation();
        }),
        e.on("click", function () {
          $(this).removeAttr("data-search-results");
        });
    },
    s = () => {
      $('[data-scroll="true"]').each(function () {
        new PerfectScrollbar(this, {
          wheelSpeed: 2,
          swipeEasing: !0,
          wheelPropagation: !1,
          minScrollbarLength: 40,
        });
      });
    },
    l = () => {
      $(".swiper").each(function () {
        const t = parseInt(this.getAttribute("data-swiper-slides"), 10),
          e = this.parentElement,
          a = this.getAttribute("data-swiper-loop"),
          i = this.getAttribute("data-swiper-autoplay"),
          s = this.getAttribute("data-swiper-grid"),
          l = e.querySelector(".swiper-button-next"),
          n = e.querySelector(".swiper-button-prev"),
          r = e.querySelector(".swiper-pagination"),
          o = this.getAttribute("data-swiper-pagination")
            ? this.getAttribute("data-swiper-pagination")
            : "bullets",
          d = e.querySelector(".swiper-scrollbar"),
          c = this.querySelectorAll(".swiper-slide"),
          p = Array.from(c).reduce((e, a, i) => {
            const s = Math.floor(i / t);
            return (e[s] = [].concat(e[s] || [], a)), e;
          }, []).length;
        let u = t,
          g = 1,
          m = 2;
        1 === t
          ? (g = m = 1)
          : t > 1 && t < 5
            ? ((g = 2), (m = 1))
            : t >= 5 && ((g = 3), (m = 2));
        const h = {
          speed: 500,
          slidesPerView: m,
          slidesPerGroup: 1,
          spaceBetween: 16,
          a11y: !0,
          rtl: Utils.isRTL(),
          breakpoints: {
            576: { slidesPerView: g },
            1200: { slidesPerView: u, spaceBetween: 24 },
          },
        };
        a && (h.loop = a),
          i &&
          (h.autoplay = {
            delay: 5e3,
            disableOnInteraction: !1,
            pauseOnMouseEnter: !0,
          }),
          s && (h.breakpoints[1200].grid = { rows: p, fill: "row" }),
          l && n && (h.navigation = { nextEl: l, prevEl: n }),
          r &&
          (h.pagination = {
            el: r,
            type: o,
            clickable: !0,
            dynamicBullets: !0,
          }),
          d && (h.scrollbar = { el: d, draggable: !0 }),
          new Swiper(this, h);
      });
    },
    n = () => {
      const t = "mat-tabs",
        e = "mat-tabs__line",
        a = $("<span>", { class: e }),
        i = $("." + t),
        s = $(".nav-link");
      i.each(function () {
        const t = $(this).find(".nav-link.active").outerWidth(),
          { left: e } = $(this).find(".nav-link.active").position();
        a.stop().css({ left: e, width: t }), a.appendTo(this);
      }),
        s.on("click", function () {
          const a = $(this);
          a.closest("." + t)
            .find("." + e)
            .stop()
            .css({ left: a.position().left, width: a.outerWidth() });
        });
    },
    r = () => {
      $(document).on(
        "click",
        'a:not([href^="#"])a:not([href^="mail"])a:not([href^="tel"]):not([href^="javascript"]):not(.external):not([target])',
        function (t) {
          t.preventDefault(), t.stopPropagation();
          const e = $(this).closest("#sidebar"),
            a =
              "undefined" !== $(this).attr("href")
                ? $(this).attr("href")
                : null;
          if (a) {
            window.history.pushState("", "", a), o(a, e);
          }
        }
      );
    },
    o = function (a, i) {
      const s = $("#line_loader");
      s.show().animate({ width: 20 + 80 * Math.random() + "%" }, 200),
        $.ajax({ url: a, type: "GET", dataType: "html" })
          .done(function (t, e, a) {
            "success" === e &&
              200 == a.status &&
              ((t = $("<div>" + t + "</div>")),
                $("head title").html(t.find("title").html()),
                $("#wrapper").html(t.find("#wrapper").html()),
                $("html, body").animate({ scrollTop: 0 }, 100),
                u(),
                d(),
                p(),
                Dashboard.init());
          })
          .fail(function () {
            window.location.href = "404.html";
          })
          .always(function () {
            i &&
              i.length &&
              $(window).width() < 992 &&
              ($(".sidebar-toggler").toggleClass(t),
                e.removeAttr("data-sidebar-toggle")),
              s.animate({ width: "100%" }, 200).fadeOut(300, function () {
                $(this).width("0");
              });
          });
    },
    d = () => {
      const t = Utils.getLocalItem("skin"),
        e = document.getElementById("header"),
        a = document.getElementById("sidebar");
      t &&
        e &&
        a &&
        (e.setAttribute("data-header", t.header),
          a.setAttribute("data-sidebar", t.sidebar));
    },
    c = (t, e, a) => {
      t.each(function () {
        const t = $(this)
          .attr("class")
          .split(" ")
          .map(function (t) {
            return t.startsWith(e) || t.endsWith("start") || t.endsWith("end")
              ? t.replace(e, a)
              : t;
          });
        $(this).attr("class", t.join(" "));
      });
    },
    p = () => {
      if (Utils.isRTL()) {
        const t = ["me", "ms", "pe", "ps", "start", "end"];
        let e = t.map((t) => {
          return (
            (e = t),
            $(
              `[class^="${e}"], [class*=" ${e}"], [class$="${e}"],[class*="${e} "]`
            )
          );
          var e;
        });
        (e = e.map((t) =>
          t.filter((t, e) => {
            if (e && e.classList) {
              const t = Array.from(e.classList);
              return !t.includes("ps") && !t.some((t) => t.startsWith("ps__"));
            }
            return e;
          })
        )),
          e.forEach((e, a) => {
            const i = t[a],
              s =
                i.endsWith("start") || i.endsWith("end")
                  ? (n = i).endsWith("start")
                    ? n.replace("start", "end")
                    : n.replace("end", "start")
                  : (l = i).endsWith("e")
                    ? l.replace("e", "s")
                    : l.replace("s", "e");
            var l, n;
            c(e, i, s);
          });
      }
    },
    u = () => {
      if (
        (s(),
          l(),
          document.querySelector(".dropzone") &&
          ((Dropzone.autoDiscover = !1),
            new Dropzone(".dropzone", { url: "/file/post" })),
          n(),
          a(),
          i(),
          $(".amplitude-play-pause").hasClass("amplitude-playing"))
      ) {
        const e = Amplitude.getActiveSongMetadata();
        $("[data-play-id]").removeClass(t),
          $("[data-play-id=" + e.id + "]").addClass(t);
      }
    };
  return {
    init() {
      $("#loader").fadeOut(1e3),
        e.settings(),
        u(),
        $(window).on("popstate", function () {
          const t = window.location.href.split("/").pop();
          t && o(t);
        }),
        r(),
        p();
    },
  };
})();
$(document).ready(function () {
  Base.init();
});
const ChartJs = {
  overrideDefaults() {
    const t = Chart.defaults,
      e = {
        color: Utils.isDarkMode()
          ? "#92929F"
          : Utils.getCSSVarValue("body-color"),
        borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
        font: { family: Utils.getCSSVarValue("body-font-family"), size: 13 },
        hover: { intersect: !1, mode: "index" },
      },
      a = {
        titleMarginBottom: 6,
        caretSize: 6,
        caretPadding: 10,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        intersect: !1,
        mode: "index",
        rtl: Utils.isRTL(),
        backgroundColor: "#131416",
        usePointStyle: !0,
        padding: { top: 8, right: 12, bottom: 8, left: 12 },
      };
    Object.assign(t, e), Object.assign(t.plugins.tooltip, a);
  },
};
$(() => {
  ChartJs.overrideDefaults();
});
const Dashboard = (function () {
  let t, e, a, i;
  return {
    init() {
      (() => {
        const e = document.getElementById("total_user");
        if ((t && t.destroy(), e)) {
          const a = {
            type: "line",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              datasets: [
                {
                  label: "Users",
                  data: [65, 59, 42, 73, 56, 55, 40],
                  backgroundColor: Utils.getCSSVarValue("red"),
                  borderColor: Utils.getCSSVarValue("red"),
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  pointHoverBorderWidth: 12,
                  pointBackgroundColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0)
                    .rgbString(),
                  pointBorderColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0)
                    .rgbString(),
                  pointHoverBackgroundColor: Utils.getCSSVarValue("red"),
                  pointHoverBorderColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0.1)
                    .rgbString(),
                },
              ],
            },
            options: {
              title: { display: !1 },
              responsive: !0,
              maintainAspectRatio: !1,
              elements: {
                borderJoinStyle: "bevel",
                borderCapStyle: "round",
                line: { tension: 0.4 },
              },
              scales: {
                x: { position: Utils.isRTL() ? "right" : "left", display: !1 },
                y: {
                  position: Utils.isRTL() ? "right" : "left",
                  display: !1,
                  min: 0,
                  max: 85,
                },
              },
              layout: { margin: 0, padding: 0 },
              plugins: { legend: { display: !1 } },
            },
          };
          t = new Chart(e, a);
        }
      })(),
        (() => {
          const t = document.getElementById("total_songs");
          if ((e && e.destroy(), t)) {
            const a = {
              type: "bar",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Songs",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: Utils.getCSSVarValue("green"),
                    borderWidth: 0,
                    barThickness: 16,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  x: {
                    position: Utils.isRTL() ? "right" : "left",
                    display: !1,
                  },
                  y: {
                    position: Utils.isRTL() ? "right" : "left",
                    display: !1,
                    min: 0,
                    max: 85,
                  },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            e = new Chart(t, a);
          }
        })(),
        (() => {
          const t = document.getElementById("purchases");
          if ((a && a.destroy(), t)) {
            const e = {
              type: "line",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Purchases",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: "transparent",
                    borderColor: "#000000",
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 12,
                    pointBackgroundColor: Chart.helpers
                      .color("#000000")
                      .alpha(0)
                      .rgbString(),
                    pointBorderColor: Chart.helpers
                      .color("#000000")
                      .alpha(0)
                      .rgbString(),
                    pointHoverBackgroundColor: "#000000",
                    pointHoverBorderColor: Chart.helpers
                      .color("#000000")
                      .alpha(0.1)
                      .rgbString(),
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  x: {
                    position: Utils.isRTL() ? "right" : "left",
                    display: !1,
                  },
                  y: {
                    position: Utils.isRTL() ? "right" : "left",
                    display: !1,
                    min: 0,
                    max: 85,
                  },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            a = new Chart(t, e);
          }
        })(),
        (() => {
          const t = document.getElementById("user_statistics");
          if ((i && i.destroy(), t)) {
            const e = {
              type: "bar",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Statistics",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: Utils.getCSSVarValue("purple"),
                    borderWidth: 0,
                    barThickness: 32,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  y: {
                    position: Utils.isRTL() ? "right" : "left",
                    min: 0,
                    max: 80,
                    grid: {
                      borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
                    },
                  },
                  x: {
                    position: Utils.isRTL() ? "right" : "left",
                    grid: {
                      borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
                    },
                  },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            i = new Chart(t, e);
          }
        })();
    },
  };
})();
$(document).ready(function () {
  Dashboard.init();
});
var Player = (function () {
  var t = "active",
    e = $("body"),
    a = $("#playlist"),
    i = [],
    s = Amplitude.getConfig(),
    l = { playPause: !1, nextPrev: !1 },
    n = function (t) {
      setTimeout(t, Amplitude.getDelay());
    },
    r = function (e = !0) {
      $("#player").addClass("show"),
        Amplitude.getSongs() &&
        1 === Amplitude.getSongs().length &&
        (Amplitude.pause(),
          n(() => {
            Player.volumeBackground();
          })),
        Amplitude.init({
          songs: i,
          callbacks: {
            song_change: function () {
              n(() => {
                v(),
                  "playing" === Amplitude.getPlayerState()
                    ? g()
                    : $("[data-play-id]").removeClass(t),
                  d(s);
              });
            },
          },
        });
      var s = i[0];
      a.html(p(s)), c(!1), m(), e && (Amplitude.play(), g(), v()), d(s);
    },
    o = function (t) {
      var e = $(t).closest("[data-song-id]");
      return {
        id: parseInt(e.data("song-id")),
        name: e.data("song-name"),
        artist: e.data("song-artist"),
        album: e.data("song-album"),
        url: e.data("song-url"),
        cover_art_url: e.data("song-cover"),
      };
    },
    d = function (t) {
      var e = $("#player_options");
      e.find("[data-favorite-id]").attr("data-favorite-id", t.id),
        e.find("[data-playlist-id]").attr("data-playlist-id", t.id),
        e.find("[download]").attr("href", t.url);
    },
    c = function (t = !0) {
      $(
        ".amplitude-repeat, .amplitude-prev, .amplitude-next, .amplitude-shuffle"
      ).prop("disabled", t);
    },
    p = function (t) {
      var e = Amplitude.getActiveSongMetadata();
      return `<div class="list__item"\n        data-song-id="${t.id
        }"\n        data-song-name="${t.name}"\n        data-song-artist="${t.artist
        }"\n        data-song-album="${t.album}"\n        data-song-url="${t.url
        }"\n        data-song-cover="${t.cover_art_url
        }">\n            <div class="list__cover">\n                <img src="${t.cover_art_url
        }" alt="${t.name
        }">\n                <a href="javascript:void(0);" class="btn btn-play btn-sm btn-default btn-icon rounded-pill ${"playing" === Amplitude.getPlayerState() && t.id === e.id
          ? "active"
          : ""
        }" data-play-id="${t.id
        }">\n                    <i class="ri-play-fill icon-play"></i>\n                    <i class="ri-pause-fill icon-pause"></i>\n                </a>\n            </div>\n            <div class="list__content">\n                <a href="song-details.html" class="list__title text-truncate">${t.name
        }</a>\n                <p class="list__subtitle text-truncate">\n                    <a href="artist-details.html">${t.artist
        }</a>\n                </p>\n            </div>\n            <ul class="list__option">\n                <li class="list__icon-hover">\n                    <a role="button" class="d-inline-flex" data-remove-song-id="${t.id
        }">\n                        <i class="ri-close-line fs-6"></i>\n                    </a>\n                </li>\n                <li>\n                    <a role="button" class="d-inline-flex" data-favorite-id="${t.id
        }">\n                        <i class="ri-heart-line heart-empty"></i>\n                        <i class="ri-heart-fill heart-fill"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>`;
    },
    u = function () {
      (i = []),
        c(),
        Amplitude.pause(),
        (s.player_state = "paused"),
        Utils.removeLocalItem("songs"),
        a.html(
          '<div class="col-sm-8 col-10 mx-auto mt-5 text-center">\n            <i class="ri-music-2-line mb-3"></i>\n            <p>No songs, album or playlist are added on lineup.</p>\n        </div>'
        ),
        n(() => {
          h(), v();
        });
    },
    g = function () {
      var e = Amplitude.getActiveSongMetadata();
      $("[data-play-id]").removeClass(t),
        $("[data-play-id=" + e.id + "]").addClass(t);
    },
    m = function () {
      $(".amplitude-play-pause")
        .removeClass("amplitude-paused")
        .addClass("amplitude-playing");
    },
    h = function () {
      $(".amplitude-play-pause")
        .removeClass("amplitude-playing")
        .addClass("amplitude-paused"),
        $("[data-play-id]").removeClass(t);
    },
    v = function () {
      var t = Amplitude.getActiveSongMetadata(),
        e = Amplitude.getActivePlaylist() ? Amplitude.getActivePlaylist() : "";
      if ("mediaSession" in navigator) {
        var a = navigator.mediaSession;
        (a.metadata = new MediaMetadata({
          title: t.name,
          artist: t.artist,
          album: t.album,
          artwork: [
            { src: t.cover_art_url, sizes: "96x96", type: "image/jpg" },
            { src: t.cover_art_url, sizes: "128x128", type: "image/jpg" },
            { src: t.cover_art_url, sizes: "192x192", type: "image/jpg" },
            { src: t.cover_art_url, sizes: "256x256", type: "image/jpg" },
            { src: t.cover_art_url, sizes: "384x384", type: "image/jpg" },
            { src: t.cover_art_url, sizes: "512x512", type: "image/jpg" },
          ],
        })),
          i.length >= 1 &&
          !l.playPause &&
          ((l.playPause = !0),
            a.setActionHandler("play", () => (Amplitude.play(), m(), void g())),
            a.setActionHandler("pause", () => (Amplitude.pause(), void h()))),
          i.length >= 2 &&
          !l.nextPrev &&
          ((l.nextPrev = !0),
            a.setActionHandler("previoustrack", () => Amplitude.prev(e)),
            a.setActionHandler("nexttrack", () => Amplitude.next(e)));
      }
    };
  return {
    volumeBackground: function () {
      var t = $('.player-volume input[type="range"]'),
        e = parseInt(t.val(), 10),
        a = Utils.isDarkMode()
          ? "255, 255, 255"
          : Utils.getCSSVarValue("dark-rgb"),
        i =
          "linear-gradient(to right, rgb(" +
          a +
          ") 0%, rgb(" +
          a +
          ") " +
          e +
          "%, rgba(" +
          a +
          ", 0) " +
          e +
          "%, rgba(" +
          a +
          ", 0) 100%)";
      t.css("background", i);
    },
    init: function () {
      var l;
      !(function () {
        if (
          Utils.getLocalItem("songs") &&
          Utils.getLocalItem("songs").length &&
          ((i = Utils.getLocalItem("songs")), r(!1), h(), i.length > 1)
        )
          for (let e = 0; e < i.length; e++) {
            var t = i[e];
            0 === e ? a.html(p(t)) : a.append(p(t));
          }
      })(),
        e.on("click", "[data-play-id]", function () {
          var e = o(this),
            s = i.findIndex((t) => t.id === e.id);
          $(this).hasClass(t)
            ? (Amplitude.pause(), h())
            : -1 === s
              ? (i.push(e),
                1 === i.length
                  ? r()
                  : (a.append(p(e)), Amplitude.playSongAtIndex(i.length - 1)))
              : Amplitude.playSongAtIndex(s),
            Utils.setLocalItem("songs", i);
        }),
        e.on("click", "[data-queue-id]", function () {
          var t = o(this);
          -1 === i.findIndex((e) => e.id === t.id)
            ? (i.push(t), 1 === i.length ? r() : a.append(p(t)))
            : Utils.showMessage("Song already in Queue"),
            Utils.setLocalItem("songs", i);
        }),
        e.on("click", "[data-next-id]", function () {
          var t = o(this),
            e = Amplitude.getActiveIndex(),
            s = i.findIndex((e) => e.id === t.id);
          i && !i.length
            ? (i.push(t), r())
            : -1 === s
              ? (i.splice(e + 1, 0, t), a.find(".list__item").eq(e).after(p(t)))
              : Utils.showMessage("Song already in Queue"),
            Utils.setLocalItem("songs", i);
        }),
        e.on("click", "[data-collection-play-id]", function () {
          var t = $(this).attr("data-collection-play-id"),
            e = $("[data-collection-song-id=" + t + "]").find("[data-song-id]"),
            s = [],
            l = 0;
          e.each(function () {
            var t = o(this);
            s.push(t);
          }),
            i && !i.length ? ((i = s), r(), (l = 1)) : i.push(...s);
          for (let t = l; t < s.length; t++) a.append(p(s[t]));
          Utils.setLocalItem("songs", i);
        }),
        e.on("click", "[data-remove-song-id]", function (t) {
          t.stopPropagation();
          var e = parseInt($(this).data("remove-song-id")),
            a = $(this).closest("[data-song-id"),
            s = i.findIndex((t) => t.id === e);
          s > -1 &&
            (a.remove(), Amplitude.removeSong(s), 0 === i.length && u()),
            Utils.setLocalItem("songs", i);
        }),
        $("#clear_playlist").on("click", function () {
          if (i.length >= 1) {
            for (var t = 0; t < i.length; t++)
              a.find(".list__item").eq(t).remove();
            for (t = i.length - 1; t > -1; t--) {
              var e = i[t],
                s = Amplitude.getActiveSongMetadata();
              e.id !== s.id && Amplitude.removeSong(t);
            }
            u();
          }
        }),
        (l = $(".player-volume"))
          .find('input[type="range"]')
          .on("input", function () {
            var t = l.find(".ri-volume-mute-fill"),
              e = l.find(".ri-volume-down-fill"),
              a = l.find(".ri-volume-up-fill"),
              i = $(this),
              s = parseInt(i.val(), 10),
              n = "d-block",
              r = "d-none";
            Player.volumeBackground(),
              0 === s
                ? (t.removeClass(r).addClass(n), e.addClass(r), a.addClass(r))
                : s > 0 && s < 70
                  ? (t.addClass(r), e.removeClass(r).addClass(n), a.addClass(r))
                  : s > 70 &&
                  (t.addClass(r), e.addClass(r), a.removeClass(r).addClass(n));
          }),
        $(".amplitude-play-pause").on("click", function () {
          v(),
            n(() => {
              "playing" === Amplitude.getPlayerState()
                ? g()
                : $("[data-play-id]").removeClass(t);
            });
        }),
        $(".amplitude-prev").on("click", function () {
          s.player_state = "playing";
        }),
        $(".amplitude-next").on("click", function () {
          s.player_state = Amplitude.getActiveIndex() ? "playing" : "stopped";
        });
    },
  };
})();
$(document).ready(function () {
  Player.init();
}),
  (function (t, e, a, i) {
    var s = a.body,
      l = "data-theme",
      n = "data-header",
      r = "data-sidebar",
      o = "data-player";
    t.fn.extend({
      settings: function (e) {
        (e = t.extend({}, t.settings.defaults, e)),
          this.each(function () {
            new t.settings(this, e);
          });
      },
    }),
      (t.settings = function (i, d) {
        var c,
          p,
          u,
          g = "skin",
          m = "setting",
          h = "Theme Settings",
          v = [
            "red",
            "green",
            "blue",
            "orange",
            "yellow",
            "purple",
            "indigo",
            "pink",
            "violet",
            "magenta",
          ],
          y = (t = !1) => {
            var e = a.getElementById("header"),
              i = a.getElementById("sidebar"),
              c = a.getElementById("player"),
              p = {
                dark: d.dark,
                system: d.system,
                rtl: d.rtl,
                header: d.header,
                sidebar: d.sidebar,
                player: d.player,
              };
            t || p.dark || p.system || !s.hasAttribute(l) || (p.dark = !0),
              "rtl" == a.dir && (p.rtl = !0),
              Utils.setLocalItem(g, p),
              p.dark ? s.setAttribute(l, "dark") : s.removeAttribute(l),
              p.rtl
                ? a.documentElement.setAttribute("dir", "rtl")
                : a.documentElement.removeAttribute("dir"),
              e && d.header && e.setAttribute(n, d.header),
              i && d.sidebar && i.setAttribute(r, d.sidebar),
              c && d.player && c.setAttribute(o, d.player);
          },
          f = (t, e, a) => {
            var i = `<div class="${m}__card__item"><span class="${m}__title">${e}</span>\n                <div class="${m}__options">`;
            for (let e = 0; e < t.length; e++) {
              var s = t[e];
              i += `<a role="button" aria-label="Color ${s}"\n                    class="${m}__option ${m}__option--${s} ${!d[a] && "blue" === s && "active"
                }" \n                    data-${a}-option="${s}"></a>`;
            }
            return (i += "</div></div>");
          },
          b = () => {
            var i = t(`#${m}`),
              l = t(`#${m}_toggler`),
              n = t(`#${m}_close`),
              r = t(`.${m}__option`),
              o = "show",
              c = "active";
            t(s).on("click", () => {
              i.removeClass(o);
            }),
              l.on("click", () => {
                i.toggleClass(o);
              }),
              n.on("click", () => {
                i.removeClass(o);
              }),
              i.on("click", (t) => {
                t.stopPropagation();
              }),
              r.on("click", function () {
                var i = t(this),
                  s = i.data("theme-option"),
                  l = i.data("header-option"),
                  n = i.data("sidebar-option"),
                  r = i.data("player-option"),
                  o = i.data("rtl-option");
                s
                  ? (t("[data-theme-option]").removeClass(c),
                    "system" === s
                      ? ((d.system = !0),
                        (d.dark = !1),
                        e.matchMedia &&
                        e.matchMedia("(prefers-color-scheme: dark)")
                          .matches &&
                        (d.dark = !0))
                      : ((d.system = !1), (d.dark = "dark" === s)),
                    Utils.changeSkin())
                  : o
                    ? (e.location.reload(),
                      i.is(":checked")
                        ? a.documentElement.setAttribute("dir", "rtl")
                        : a.documentElement.removeAttribute("dir"),
                      (d.rtl = i.is(":checked")))
                    : l
                      ? (t("[data-header-option]").removeClass(c), (d.header = l))
                      : n
                        ? (t("[data-sidebar-option]").removeClass(c), (d.sidebar = n))
                        : r &&
                        (t("[data-player-option]").removeClass(c), (d.player = r)),
                  i.addClass(c),
                  y(!0);
              });
          };
        (u = Utils.getLocalItem(g)) && (d = t.extend({}, d, u)),
          y(),
          (c = a.createElement("div")),
          (p = `<a role="button" id="${m}_toggler" aria-label="Settings">\n                        <i class="ri-settings-line"></i>\n                    </a>\n                    <div class="${m}__wrapper">\n                        <div class="${m}__head">\n                            <span class="me-auto">${h}</span>\n                            <a role="button" id="${m}_close" aria-label="Close settings">\n                                <i class="ri-close-fill"></i>\n                            </a>\n                        </div>\n                        <div class="${m}__body" data-scroll="true">`),
          (p += `<span class="${m}__title">Theme Appearance</span>\n                <div class="${m}__theme">\n                    <a role="button" class="${m}__option ${!d.dark && !d.system && "active"
            }" data-theme-option="light">\n                        <img src="/images/misc/light.svg" class="img-fluid" alt="">\n                        <div class="${m}__theme__title">Light</div>\n                        <i class="ri-checkbox-circle-fill fs-6"></i>\n                    </a>\n                    <a role="button" class="${m}__option ${d.dark && !d.system && "active"
            }" data-theme-option="dark">\n                        <img src="/images/misc/dark.svg" class="img-fluid" alt="">\n                        <div class="${m}__theme__title">Dark</div>\n                        <i class="ri-checkbox-circle-fill fs-6"></i>\n                    </a>\n                    <a role="button" class="${m}__option ${d.system && "active"
            }" data-theme-option="system">\n                        <img src="/images/misc/system.svg" class="img-fluid" alt="">\n                        <div class="${m}__theme__title">System</div>\n                        <i class="ri-checkbox-circle-fill fs-6"></i>\n                    </a>\n                </div>\n                <div class="${m}__rtl">\n                    <label for="rtl" class="${m}__title mb-0">Right-To-Left</label>\n                    <div class="ms-auto switch">\n                        <input type="checkbox" id="rtl" class="${m}__option" data-rtl-option="true" ${d.rtl ? "checked" : ""
            }>\n                        <label for="rtl"></label>\n                    </div>\n                </div>\n                <span class="${m}__title">Component Appearance</span>\n                <div class="${m}__card">\n            `),
          (p += f(v, "Header", "header")),
          (p += f(v, "Sidebar", "sidebar")),
          (p += f(v, "Player", "player")),
          (p += "</div>"),
          (p += `</div>\n                <div class="${m}__info">\n                    <i class="ri-information-2-line me-2"></i>\n                    <span class="flex-grow-1">You can observe the color change effect in the header, sidebar, and player components on the inner pages.</span>\n                </div>\n            </div>`),
          (c.id = m),
          (c.innerHTML = p),
          s.appendChild(c),
          b(),
          d.system
            ? t('[data-theme-option="system"]').addClass("active")
            : d.dark
              ? t('[data-theme-option="dark"]').addClass("active")
              : t('[data-theme-option="light"]').addClass("active"),
          t("[data-header-option=" + d.header + "]").addClass("active"),
          t("[data-sidebar-option=" + d.sidebar + "]").addClass("active"),
          t("[data-player-option=" + d.player + "]").addClass("active");
      }),
      (t.settings.defaults = {
        dark: !1,
        system: !1,
        rtl: !1,
        header: null,
        sidebar: null,
        player: null,
      });
  })(jQuery, window, document);
const Utils = {
  getCSSVarValue(t) {
    var e = getComputedStyle(document.documentElement).getPropertyValue(
      "--bs-" + t
    );
    return e && e.length > 0 && (e = e.trim()), e;
  },
  getLocalItem: (t) => JSON.parse(localStorage.getItem(t)),
  setLocalItem(t, e) {
    localStorage.setItem(t, JSON.stringify(e));
  },
  removeLocalItem(t) {
    localStorage.removeItem(t);
  },
  showMessage(t) {
    Snackbar.show({
      pos: this.isRTL() ? "bottom-left" : "bottom-right",
      text: t,
      showAction: !1,
    });
  },
  changeSkin() {
    setTimeout(() => {
      ChartJs.overrideDefaults(), Dashboard.init(), Player.volumeBackground();
    }, 10);
  },
  isDarkMode: () =>
    "dark" === document.querySelector("body").getAttribute("data-theme"),
  isRTL: () => "rtl" === document.querySelector("html").getAttribute("dir"),
};
"undefined" != typeof module &&
  void 0 !== module.exports &&
  (module.exports = Utils);
//# sourceMappingURL=scripts.bundle.js.map
