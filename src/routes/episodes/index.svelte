<script context="module">
  import client from "../../lib/apollo";
  import { EPISODES } from "../../queries/episodes";
  import { PAGINATED_EPISODES } from "../../queries/paginatedEpisodes";
  const initial = {
    after: null,
    first: 3,
    before: null,
    last: null,
  };
  export async function preload() {
    return {
      cache: await client.query({
        query: EPISODES,
      }),
      paginated: await client.query({
        query: PAGINATED_EPISODES,
        variables: initial,
      }),
    };
  }
</script>

<script>
  import TransitionWrapper from "../../components/TransitionWrapper.svelte";
  import { restore, query } from "svelte-apollo";
  import { fly } from "svelte/transition";
  import { fade } from "svelte/transition";
  import moment from "moment";

  export let cache;
  export let paginated;
  restore(client, EPISODES, cache.data);

  const episodes = query(client, {
    query: EPISODES,
  });
  const cc = paginated.data.episodes.edges[0];

  console.log({ paginated: paginated.data.episodes.edges.indexOf(cc) });
</script>

<style lang="scss">
  .podcast-lists-wrapper {
    @media screen and (min-width: 981px) {
      width: 96rem;
    }
    @media screen and (min-width: 426px) {
      margin: 0 auto;
      padding: 4rem;
    }
    .podcast-list-item {
      display: grid;
      grid-template-columns: 0.2fr 1fr;
      margin-bottom: 6rem;
      grid-gap: 4rem;

      @media screen and (max-width: 425px) {
        grid-template-columns: initial;
        text-align: center;
        padding: 0 4rem;
      }
      .podcast-img-wrapper {
        @media screen and (max-width: 425px) {
          margin: 0 auto;
        }
      }
      .podcast-info-wrapper {
        & > h1 {
          font-size: 2rem;
          color: inherit;
          line-height: 1.2em;
          margin-bottom: 1rem;
        }
      }
    }
  }
  .episode-main-bg {
    background-image: url("/img/episode-main-bg.svg");
  }
</style>

<svelte:head>
  <title>Our Episodes</title>
</svelte:head>

<TransitionWrapper>
  <div
    class="app-division-wrapper font-white default-section-header
      episode-main-bg">
    <div class="section-wrapper">
      <div class="center-section-wrapper">
        <h1 class="app-decor">Our Episodes</h1>
        <p>
          Join the Online Kwentuhan! We talk about anything and everything under
          the sun - business, productivity, self-love, self-care, makeup,
          workouts (or the lack of it), coffee, our love for essential oils,
          daily struggles, life phases and transitions - no holds barred. Let’s
          get inspired and learn from stories of our guests and let us know how
          these stories resonate with you!
        </p>
      </div>
    </div>
  </div>

  <section>
    <div class="podcast-lists-wrapper">
      {#await $episodes}
        <p>Loading...</p>
      {:then data}
        {#if data.data}
          {#each data.data.episodes.nodes as episode, i}
            <a href="episodes/{episode.slug}">
              <div class="podcast-list-item">
                <div class="podcast-img-wrapper">
                  <img
                    src={episode.episodes_gql.episodeThumbnail.sourceUrl}
                    alt="" />
                </div>
                <div class="podcast-info-wrapper">
                  <h1>
                    {@html episode.title}
                  </h1>
                  <p>{episode.episodes_gql.excerpt}</p>
                  <div>
                    <small>
                      {moment(episode.date).format('MMMM Do, YYYY')} - {episode.episodes_gql.duration}
                    </small>
                  </div>
                </div>
              </div>
            </a>
          {/each}
        {:else}
          <p>ERROR!!</p>
        {/if}
      {/await}
    </div>
  </section>
</TransitionWrapper>
