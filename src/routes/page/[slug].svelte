<script context="module">
  import client from "../../lib/apollo";
  import { PAGE } from "../../queries/page";

  export async function preload({ params, query }) {
    let slug = params.slug;
    return {
      cache: await client.query({
        query: PAGE,
        variables: { slug },
      }),
      slug,
    };
  }
</script>

<script>
  import { restore, query } from "svelte-apollo";

  export let cache;
  export let slug;

  restore(client, PAGE, cache.data);

  const page = query(client, {
    query: PAGE,
    variables: { slug },
  });
</script>

<style>

</style>

<svelte:head>
  <title>Slug</title>
</svelte:head>

{#await $page}
  <p>Loading...</p>
{:then data}
  {#if data.data}
    <div class="app-division-wrapper default-section-header about-us-main-bg">
      <div class="section-wrapper">
        <div class="center-section-wrapper error-wrapper">
          <h1>{data.data.page.title}</h1>
          {@html data.data.page.content}
        </div>
      </div>
    </div>
  {/if}
{/await}
