<script context="module">
  import client from "../../lib/apollo";
  import { EPISODE } from "../../queries/episode";
  import { EPISODES } from "../../queries/episodes";

  export async function preload({ params, query }) {
    let slug = params.slug;
    return {
      cache: await client.query({
        query: EPISODE,
        variables: { slug },
      }),
      episodes: await client.query({
        query: EPISODES,
      }),
      slug,
    };
  }
</script>

<script>
  import TransitionWrapper from "../../components/TransitionWrapper.svelte";
  import { restore, query } from "svelte-apollo";
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import moment from "moment";

  export let cache;
  export let episodes;
  export let slug;

  let prev;
  let next;

  onMount(async () => {
    console.log("mount");
  });

  beforeUpdate(() => {
    console.log("beforeUpdate");
    const eps = episodes.data.episodes.nodes;
    const cat = cache.data.episode;
    const ddd = (e) => e.slug === slug;
    const i = eps.findIndex(ddd);
    next = eps[i - 1] || null;
    prev = eps[i + 1] || null;
  });
  $: prevS = prev;
  $: nextS = next;

  afterUpdate(() => {
    console.log("afterUpdate");
  });

  restore(client, EPISODE, cache.data);

  const episode = query(client, {
    query: EPISODE,
    variables: { slug },
  });

  const goNext = async () => {
    console.log({ next });
    await goto("episodes/" + next.slug);
  };
  const goPrev = async () => {
    console.log({ prev });
    await goto("episodes/" + prev.slug);
  };
</script>

<style lang="scss">
  .single-episode-wrapper {
    margin-top: 15rem;
    margin-bottom: 9rem;
    h1 {
      color: #25577d;
      font-size: 3rem;
    }

    .episode-date {
      color: #f87e7d;
    }
  }
  .about-speaker {
    h3 {
      color: #25577d;
      font-size: 3rem;
    }
  }

  .podcast-player {
    background: #e3e3e3;
    border-radius: 10px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 5rem;
    height: 15rem;
    overflow: hidden;
    max-width: 90rem;
    iframe {
      width: 100%;
    }
  }
  .podcast-info {
    width: 100%;
    margin: 0 auto;
  }
  .speaker-info-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    @media screen and (max-width: 768px) {
      grid-template-columns: initial;
      margin-top: 2rem;
      text-align: center;
    }

    img {
      height: 25rem;
      margin: 0 auto;
    }
    h4,
    small {
      color: #25577d;
      font-weight: bold;
    }
    .speaker-bio {
      margin-top: 2rem;
    }
  }
  .social-media {
    display: grid;
    grid-gap: 1rem;
    align-items: center;
    & div {
      display: flex;
      align-items: center;
    }
  }
  .about-resources {
    h3 {
      color: #25577d;
      margin-bottom: 2rem;
      font-weight: bold;
      font-size: 2rem;
    }
  }
  .pagination-wrapper {
    @media screen and (min-width: 426px) {
      display: flex;
      justify-content: space-between;
    }
    .pagination-right {
      text-align: right;
      cursor: pointer;
    }
    .pagination-left {
      text-align: left;
      cursor: pointer;
    }
    .pagination-right,
    .pagination-left {
      transition: all 300ms ease-in;

      h2 {
        font-size: 2rem;
        font-weight: bold;
        color: #f87e7d;
      }
      h3 {
        font-weight: bold;
      }
      p {
        max-width: 28ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .pagination-content-left,
    .pagination-content-right {
      transition: all 300ms ease-in;
      &:active {
        transform: scale(0.9);
      }
    }
    .pagination-content-left {
      display: flex;
      height: 12rem;
      margin-top: 2rem;
      img {
        height: 100%;
        margin-right: 1rem;
        @media screen and (max-width: 425px) {
          display: none;
        }
      }
    }
    .pagination-content-right {
      display: flex;
      flex-direction: row-reverse;
      height: 12rem;
      margin-top: 2rem;
      img {
        height: 100%;
        margin-left: 1rem;
        @media screen and (max-width: 425px) {
          display: none;
        }
      }
    }
  }
  .single-episode-main-bg {
    background-image: url("/img/single-episodes-bg.svg");
    background-repeat: no-repeat;
    background-size: contain;
    top: 0;
    z-index: -1;
    margin: 0 auto;
    @media screen and (min-width: 769px) {
      padding-top: 12rem;
    }
  }

  .episode-information-wrapper {
    max-width: 100ch;
    margin: 0 auto;
    margin-bottom: 6rem;
  }
</style>

<svelte:head>
  <title>Single Podcast</title>
</svelte:head>

<TransitionWrapper>
  {#await cache}
    <p>Loading...</p>
  {:then data}
    {#if data.data}
      <div class="single-episode-main-bg">
        <div class="inner-page-wrapper">
          <h1 class="app-decor episode-title">
            {@html data.data.episode.title}
          </h1>
          <p class="episode-date">
            {moment(data.data.episode.date).format('MMMM Do, YYYY')} - {data.data.episode.episodes_gql.duration}
          </p>
          <div class="podcast-player">
            {@html data.data.episode.episodes_gql.embed}
          </div>
          <div class="episode-information-wrapper">
            <p>{data.data.episode.episodes_gql.information}</p>
          </div>
        </div>
      </div>

      {#if data.data.episode.episodes_gql.speaker}
        <div class="common-wrapper about-speaker">
          <h3>About the Speaker</h3>
          <div class="speaker-info-wrapper">
            <div class="speaker-name-wrapper">
              <h4>
                {data.data.episode.episodes_gql.speaker.authors_gql.name}
                {data.data.episode.episodes_gql.speaker.authors_gql.surname}
              </h4>
              <small>
                {data.data.episode.episodes_gql.speaker.authors_gql.profession}
              </small>
              <div class="speaker-bio">
                {@html data.data.episode.episodes_gql.speaker.authors_gql.bio}
              </div>
            </div>
            <div>
              <img src="img/founder-two.png" alt="" />
            </div>
          </div>
        </div>
        <div class="common-wrapper social-media">
          {#if data.data.episode.episodes_gql.speaker.authors_gql.facebook}
            <div>
              <img src="img/instagram.svg" alt="" />
              <span>
                {data.data.episode.episodes_gql.speaker.authors_gql.facebook}
              </span>
            </div>
          {/if}
          {#if data.data.episode.episodes_gql.speaker.authors_gql.linkedin}
            <div>
              <img src="img/linkedin.svg" alt="" />
              <span>
                {data.data.episode.episodes_gql.speaker.authors_gql.linkedin}
              </span>
            </div>
          {/if}
          {#if data.data.episode.episodes_gql.speaker.authors_gql.instagram}
            <div>
              <img src="img/facebook.svg" alt="" />
              <span>
                {data.data.episode.episodes_gql.speaker.authors_gql.instagram}
              </span>
            </div>
          {/if}
        </div>
      {/if}
      {#if data.data.episode.episodes_gql.resources}
        <div class="common-wrapper about-resources">
          <h3>Resources</h3>
          <div>
            {@html data.data.episode.episodes_gql.resources}
          </div>
        </div>
      {/if}
    {/if}
  {/await}

  <div class="common-wrapper">
    <div class="pagination-wrapper">
      <div class="pagination-left">
        {#if prev}
          <div on:click={goPrev}>
            <h2>PREVIOUS EPISODE</h2>
            <div class="pagination-content-left">
              <img src={prev.episodes_gql.episodeThumbnail.sourceUrl} alt="" />
              <div>
                <h3>
                  {@html prev.title}
                </h3>
                <p>{prev.episodes_gql.information}</p>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div class="pagination-right">
        {#if next}
          <div on:click={goNext}>
            <h2>NEXT EPISODE</h2>
            <div class="pagination-content-right">
              <img src={next.episodes_gql.episodeThumbnail.sourceUrl} alt="" />
              <div>
                <h3>
                  {@html next.title}
                </h3>
                <p>{next.episodes_gql.information}</p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</TransitionWrapper>
