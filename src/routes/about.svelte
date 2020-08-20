<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
</script>

<style lang="scss">
  .about-us-main-bg {
    background-image: url("/img/about-bg.svg");
  }
  .about-info-wrapper {
    max-width: 93rem;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<TransitionWrapper>
  <div
    class="app-division-wrapper default-section-header font-white
    about-us-main-bg">
    <div class="section-wrapper">
      <div class="center-section-wrapper">
        <h1 class="app-decor">Who We Are</h1>
        <p>
          Know the team behind Pinay Girl Boss and the reason behind the
          Project, why they started it and why they share it to the world.
        </p>
      </div>
    </div>
  </div>

  <div class="plain-wrapper">
    <div class="about-info-wrapper">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
        voluptates odio qui beatae, eum perferendis eligendi nemo nihil atque
        illum perspiciatis, neque inventore soluta corrupti dignissimos
        cupiditate? Ullam ut architecto voluptatum magni iure, magnam id
        voluptate ratione, maxime aperiam assumenda debitis fugiat amet, eaque
        blanditiis inventore! Iste repellat dolores ab natus labore iure fugit
        voluptas iusto architecto nisi quae vitae eaque hic voluptates incidunt
        nobis, nesciunt officia odit assumenda exercitationem quisquam ea!
        Eligendi, ipsum eveniet aut aliquid ipsa accusantium sapiente explicabo
        beatae voluptates minus sunt! Ducimus repudiandae quidem autem
        exercitationem eius, ullam facilis. Ipsa saepe numquam distinctio vitae
        sit omnis!
      </p>
    </div>
  </div>

</TransitionWrapper>
