<script context="module">
  import client from "../lib/apollo";
  import { RESOURCES } from "../queries/resources";

  export async function preload() {
    return {
      cache: await client.query({
        query: RESOURCES
      })
    };
  }
</script>

<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import { restore, query } from "svelte-apollo";

  export let cache;

  restore(client, RESOURCES, cache.data);

  const resources = query(client, {
    query: RESOURCES
  });
</script>

<style lang="scss">
  .resource-wrapper {
    p,
    h1 {
      color: #fff;
    }
  }
  .download-wrapper {
    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 4rem;
      color: #25577d;
    }
  }
  .subscribe-wrapper {
    max-width: 1024px;
    margin: 0 auto;
    margin-bottom: 5rem;
  }
  .download-items {
    min-height: 35rem;
  }
  .download-item {
    margin-bottom: 2rem;
  }
  .resources-main-bg {
    background-image: url("/img/resource-header.svg");
  }
</style>

<svelte:head>
  <title>Resources</title>
</svelte:head>

<TransitionWrapper>
  <div
    class="app-division-wrapper default-section-header font-white
    resources-main-bg">
    <div class="section-wrapper">
      <div class="center-section-wrapper">
        <h1 class="app-decor">Resources</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          nostrum! Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum
          odit excepturi voluptas ad!
        </p>
      </div>
    </div>
  </div>
  <div class="plain-wrapper">
    <div class="download-wrapper">
      <h2>Downloads</h2>
      <div class="download-items">
        {#await $resources}
          <p>Loading</p>
        {:then data}
          {#if data.data}
            {#each data.data.resources.nodes as resource, i}
              <div>
                <div class="download-item">
                  <img
                    src={resource.resources_gql.thumbnail.sourceUrl}
                    alt="" />
                  <div>
                    <h3>
                      {@html resource.title}
                    </h3>
                    <p>{resource.resources_gql.description}</p>
                  </div>
                  <div>
                    <a
                      href={resource.resources_gql.file.mediaItemUrl}
                      target="_blank">
                      <button>Download</button>
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            {/each}
          {/if}
        {/await}
      </div>
    </div>
  </div>

  <div class="plain-wrapper">
    <div class="subscribe-wrapper">
      <h1>Subscribe</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex neque
        doloremque deserunt unde eum enim iusto incidunt, optio eaque facilis.
      </p>
    </div>
  </div>
</TransitionWrapper>
