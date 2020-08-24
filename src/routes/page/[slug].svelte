<script context="module">
  export async function preload({ params, query }) {
    let slug = params.slug;
    return {
      slug,
    };
  }
</script>

<script>
  export let slug;
</script>

<style lang="scss">

</style>

<svelte:head>
  <title>Slug</title>
</svelte:head>

<div
  class="app-division-wrapper default-section-header font-white about-us-main-bg">
  <div class="section-wrapper">
    <div class="center-section-wrapper error-wrapper">
      <h1>{slug}</h1>

      <p>page</p>

    </div>
  </div>
</div>
