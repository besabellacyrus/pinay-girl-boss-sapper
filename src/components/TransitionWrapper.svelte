<script>
  import { onMount } from "svelte";
  import { fadeIn, fadeOut } from "../lib/pageFade";
  let show = false;

  onMount(() => {
    show = true;
  });
</script>

<style>
  div {
    min-height: 800px;
    position: relative;
  }
</style>

{#if show}
  <div in:fadeIn out:fadeOut>
    <slot />
  </div>
{/if}
