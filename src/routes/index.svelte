<script context="module">
  import client from "../lib/apollo";
  import { LATEST_EPISODES } from "../queries/latestEpisodes";

  export async function preload() {
    return {
      cache: await client.query({
        query: LATEST_EPISODES,
      }),
    };
  }
</script>

<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import { restore, query } from "svelte-apollo";

  export let cache;

  restore(client, LATEST_EPISODES, cache.data);

  const latestEpisodes = query(client, {
    query: LATEST_EPISODES,
  });
</script>

<style lang="scss">
  .first-section-bg {
    background-image: url("/img/home-bgs/section-one.svg");
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    z-index: -1;
    width: 100%;
    @media screen and (min-width: 1025px) {
      // background-position-x: 25rem;
      // background-size: 100% 100%;
    }
    @media screen and (max-width: 1024px) {
      background-image: url("/img/1024/red-section.svg");
    }
    @media screen and (max-width: 768px) {
      background-image: url("/img/768/red-section.svg");
    }
    @media screen and (max-width: 425px) {
      background-image: url("/img/425/red-section.svg");
    }
  }
  .second-section-bg {
    background-image: url("/img/home-bgs/section-two.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: -1;
    @media screen and (min-width: 1025px) {
      // background-position-x: -10rem;
      // background-size: 100% 100%;
      background-position-x: -10rem;
    }
    @media screen and (max-width: 1024px) {
      background-image: url("/img/1024/yellow-section.svg");
    }
    @media screen and (max-width: 768px) {
      background-image: url("/img/768/yellow-section.svg");
    }
    @media screen and (max-width: 425px) {
      background-image: url("/img/425/yellow-section.svg");
    }
  }

  .app-section-center {
    text-align: center;
  }
  .player-wrapper {
    width: 100%;
    .player {
      height: 13rem;
      background-color: #e3e3e3;
      border-radius: 8px;
      margin: 0 auto;
      @media screen and (min-width: 1024px) {
        width: 66%;
      }
      iframe {
        width: 100%;
        height: 18rem;
      }
    }
  }
  .third-section-bg {
    background-image: url("/img/home-bgs/section-three.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: -1;
    @media screen and (min-width: 1025px) {
      .section-wrapper {
        min-height: 186vh;
      }
    }
    @media screen and (max-width: 1024px) {
      background-image: url("/img/1024/blue-section.svg");
    }
    @media screen and (max-width: 768px) {
      background-image: url("/img/768/blue-section.svg");
    }
    @media screen and (max-width: 425px) {
      background-image: url("/img/425/blue-section.svg");
      height: 124rem;
    }
  }
  .fourth-section-bg {
    background-image: url("/img/home-bgs/section-four.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: -1;
    @media screen and (min-width: 1025px) {
      .section-wrapper {
        min-height: 126vh;
      }
    }
    @media screen and (max-width: 1024px) {
      background-image: url("/img/1024/grey-section.svg");
    }
    @media screen and (max-width: 768px) {
      background-image: url("/img/768/grey-section.svg");
    }
    @media screen and (max-width: 425px) {
      background-image: url("/img/425/grey-section.svg");
    }
  }
  .fifth-section-bg {
    background-image: url("/img/home-bgs/section-five.svg");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    position: relative;
    @media screen and (min-width: 1025px) {
      .section-wrapper {
        min-height: 89vh;
      }
    }
    @media screen and (max-width: 1024px) {
      background-image: url("/img/1024/red-section-contact.svg");
    }
    @media screen and (max-width: 768px) {
      background-image: url("/img/768/red-section-contact.svg");
    }
    @media screen and (max-width: 425px) {
      background-image: url("/img/425/red-section-contact.svg");
    }
  }
  .home-episodes-wrapper {
    text-align: center;
    width: 100%;

    h1 {
      padding: 0 3rem;
      margin: 0 auto;
      @media screen and (min-width: 768px) {
        width: 30ch;
        margin-top: 6rem;
      }
      @media screen and (max-width: 425px) {
        margin-top: 5rem;
      }
    }
  }

  .featured-episodes-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 0 11rem;
    img {
      height: 20rem;
    }
    @media screen and (max-width: 768px) {
      padding: 0px 3rem;
      img {
        height: 12rem;
      }
    }
    @media screen and (max-width: 425px) {
      justify-content: center;
      display: grid;
      grid-gap: 3rem;
      padding: 0;
      img {
        height: 19rem;
      }
    }
  }
  .first-section-container {
    @media screen and (min-width: 426px) {
      padding-top: 20rem;
    }
    @media screen and (max-width: 425px) {
      padding-top: 14rem;
    }
  }
  .about-us-founders {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (max-width: 718px) {
      display: grid;
      padding-left: 1rem;
      padding-right: 1rem;
      grid-gap: 5rem;
    }
    p {
      text-align: left;
      @media screen and (min-width: 426px) {
        width: 32rem;
      }
    }
    img {
      height: 21rem;
      margin: 0 auto;
    }
  }
  .home-about-us {
    h1 {
      color: #25577d;
      margin-bottom: 7rem;
    }
    h3 {
      color: #25577d;
      text-align: left;
      font-weight: bold;
      font-size: 2.3rem;
      margin-bottom: 1rem;
    }
    .social-media {
      display: flex;
      height: 2rem;
      & > div {
        padding-right: 1rem;
      }
      img {
        height: 100%;
      }
    }
  }
  .home-contact-us {
    max-width: 56rem;
    h1 {
      color: #fff;
      margin-bottom: 2rem;
    }
    color: #fff;
    form {
      display: grid;
      margin: 0 auto;
      input {
        height: 5rem;
        border-radius: 6px;
        margin-bottom: 2rem;
        color: #5d545d99;
        padding-left: 1rem;
      }
      button {
        margin: 0 auto;
        background-color: #fff;
        color: #f87e7d;
        height: 5rem;
        width: 16rem;
        border-radius: 26px;
      }
    }
  }
  .first-image {
    width: 143rem;
  }
</style>

<svelte:head>
  <title>Home</title>
  <script>
    (function (w, d, t, s, n) {
      w.FlodeskObject = n;
      var fn = function () {
        (w[n].q = w[n].q || []).push(arguments);
      };
      w[n] = w[n] || fn;
      var f = d.getElementsByTagName(t)[0];
      var e = d.createElement(t);
      var h = "?v=" + new Date().getTime();
      e.async = true;
      e.src = s + h;
      f.parentNode.insertBefore(e, f);
    })(
      window,
      document,
      "script",
      "https://assets.flodesk.com/universal.js",
      "fd"
    );
  </script>
</svelte:head>
<TransitionWrapper>
  <div class="main-wrap">
    <figure class="app-img-figure">
      <img src="/img/home-bgs/section-one.svg" alt="" />
    </figure>
    <div class="app-division-wrapper">
      <div class="section-wrapper first-section-container">
        <div>
          <h1 class="app-decor">Hello! Welcome to Pinay Girl Boss</h1>
          <p>
            We are a podcast and you can find us by searching Pinay Girl Boss on
            Spotify and Apple Podcast.
          </p>
          <div class="app-btn mt-10">
            <a href="episodes">

              <button>
                <span>Listen to our Podcast</span>
                <span>
                  <svg
                    id="rss"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.5"
                    height="17.5"
                    viewBox="0 0 17.5 17.5">
                    <g
                      id="Group_54"
                      data-name="Group 54"
                      transform="translate(0 12.672)">
                      <g
                        id="Group_53"
                        data-name="Group 53"
                        transform="translate(0 0)">
                        <circle
                          id="Ellipse_8"
                          data-name="Ellipse 8"
                          cx="2.5"
                          cy="2.5"
                          r="2.5"
                          transform="translate(0 -0.173)"
                          fill="#fff" />
                      </g>
                    </g>
                    <g
                      id="Group_56"
                      data-name="Group 56"
                      transform="translate(0 5.834)">
                      <g id="Group_55" data-name="Group 55">
                        <path
                          id="Path_386"
                          data-name="Path 386"
                          d="M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"
                          transform="translate(0 -149.344)"
                          fill="#fff" />
                      </g>
                    </g>
                    <g id="Group_58" data-name="Group 58">
                      <g id="Group_57" data-name="Group 57">
                        <path
                          id="Path_387"
                          data-name="Path 387"
                          d="M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"
                          fill="#fff" />
                      </g>
                    </g>
                  </svg>
                </span>
              </button>
            </a>
          </div>
        </div>
        <img class="first-image" src="/img/woman-illustration-one.svg" alt="" />
      </div>
    </div>
  </div>

  <div class="main-wrap">
    <figure class="app-img-figure">
      <img src="/img/home-bgs/section-two.svg" alt="" />
    </figure>
    <div class="app-division-wrapper">
      <div class="section-wrapper">
        <img src="/img/woman-illustration-two.svg" alt="" />
        <div>
          <h1 class="app-decor">We're Ready for You!</h1>
          <p>
            This is a virtual tambayan where we can all connect with each other,
            exchange ideas, talk about ANYTHING, ask questions, or just hang
            out. We are creating safe space for us to discuss being the boss of
            our own lives.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="main-wrap">
    <figure class="app-img-figure third-section">
      <img src="/img/home-bgs/section-three.svg" alt="" />
    </figure>
    <div class="app-division-wrapper">
      <div class="section-wrapper home-latest-episode-wrapper">
        {#await $latestEpisodes}
          <p>Loading</p>
        {:then data}
          <div class="center-section-wrapper">
            <h1 class="app-decor">Listen to Our Podcast</h1>
            <p class="my-10">Our Latest Episode</p>
            <div class="player-wrapper">
              <div class="player">
                {@html data.data.episodes.nodes[0].episodes_gql.embed}
              </div>
            </div>
            <p class="my-20">More Episodes</p>
            <div class="featured-episodes-wrapper">
              {#if data.data}
                {#each data.data.episodes.nodes as latest, i}
                  <a href={'episodes/' + latest.slug}>
                    <img
                      src={latest.episodes_gql.episodeThumbnail.sourceUrl}
                      alt={latest.title} />
                  </a>
                {/each}
              {/if}
            </div>
          </div>
        {/await}
      </div>
    </div>
  </div>

  <div class="main-wrap">
    <figure class="app-img-figure fourth-section">
      <img src="/img/home-bgs/section-four.svg" alt="" />
    </figure>
    <div class="app-division-wrapper">
      <div class="section-wrapper">
        <div class="center-section-wrapper home-about-us">
          <h1 class="app-decor">About Us</h1>
          <div class="about-us-founders">
            <div>
              <img src="/img/founder-two.png" alt="" />
              <h3>Tina</h3>
              <p>
                I’m a 30-something mom of 2, a lawyer, an entrepreneur,
                community builder, essential oils, travel, and coffee lover, and
                wannabe fitmom, dancer, and videoke queen.
              </p>
              <div class="social-media">
                <div>
                  <a
                    href=" https://www.facebook.com/theoilnaturalproject"
                    target="_blank">
                    <img src="/img/facebook.svg" alt="" />
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/tina.dg_/" target="_blank">
                    <img src="/img/instagram.svg" alt="" />
                  </a>
                </div>
                <a href="">
                  <img src="/img/linkedin.svg" alt="" />
                </a>
              </div>
            </div>
            <div>
              <img src="/img/founder-one.png" alt="" />
              <h3>Max</h3>
              <p>
                30 year old mom (& wife), Travel Junkie, Potterhead, Dessert
                Fiend, Essential Oil Fairy (haha!)
              </p>
              <div class="social-media">
                <div>
                  <a
                    href=" https://www.facebook.com/CertifiedOilers"
                    target="_blank">
                    <img src="/img/facebook.svg" alt="" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/maxidoodle/"
                    target="_blank">
                    <img src="/img/instagram.svg" alt="" />
                  </a>
                </div>
                <div>
                  <a href="">
                    <img src="/img/linkedin.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="main-wrap fifth-section">
    <figure class="app-img-figure">
      <img src="/img/home-bgs/section-five.svg" alt="" />
    </figure>
    <div class="app-division-wrapper fifth-section-wrapper">
      <div class="section-wrapper">
        <div class="center-section-wrapper home-contact-us">
          <div id="fd-form-5f3459b06267530026690ee8" />
          <script>
            window.fd("form", {
              formId: "5f3459b06267530026690ee8",
              containerEl: "#fd-form-5f3459b06267530026690ee8",
            });
          </script>
        </div>
      </div>
    </div>
  </div>
</TransitionWrapper>
