<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style lang="scss">
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
  .error-wrapper {
    color: #25577d;
    h1 {
      color: #25577d;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div
  class="app-division-wrapper default-section-header font-white about-us-main-bg">
  <div class="section-wrapper">
    <div class="center-section-wrapper error-wrapper">
      <h1>{status}</h1>

      <p>{error.message}</p>

      {#if dev && error.stack}
        <pre>{error.stack}</pre>
      {/if}
    </div>
  </div>
</div>
