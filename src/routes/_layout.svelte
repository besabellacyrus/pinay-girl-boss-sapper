<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  export let segment;
</script>

<style lang="scss" global>
  @import "./style/global.scss";
</style>

<TransitionWrapper>
  <Nav {segment} />

  <main>
    <slot />
  </main>

  <Footer />
</TransitionWrapper>
