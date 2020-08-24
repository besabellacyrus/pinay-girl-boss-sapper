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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    margin-bottom: 10rem;
    h4 {
      font-weight: bold;
    }
    @media screen and (max-width: 615px) {
      grid-template-columns: initial;
    }
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
      <div>
        <h1>Tina & Max</h1>
        <div>
          <h4>Tina:</h4>
          <p>
            I am a lifelong learner and a proud product of the Philippine public
            school system! I went to Manila Science High School, then the
            University of the Philippines Diliman for my pre-law and law
            degrees. I have worked in government and in the international
            development scene for more than a decade until life happened, I
            became a mom to 2 adorable kids and I’ve undergone a lot of mindset
            shifts. I became a mompreneur, became involved in mom-related
            advocacies, and explored my options. I am currently enjoying life as
            a self-employed boss mama at The Oil Natural Project, tribe leader
            to thousands of Young Living Essential Oil users, and community
            builder and co-founder of Fit Moms Project Ph and Pinay Girl Boss.
          </p>
        </div>
        <div>
          <h4>Max:</h4>
          <p>
            After graduating from the University of the Philippines Diliman, I
            moved back to Saudi Arabia where I started my career in the aviation
            industry in 2010. I am a dreamer, I am an unconventional mom, I
            enjoy getting lost in books, I believe that meals are not complete
            without dessert and I love traveling the world with my family. I am
            the other half of Pinay Girl Boss and proud boss mama of the
            Certified Oilers community.
          </p>
        </div>
      </div>
      <div>
        <img src="/img/tina-and-max.png" alt="" />
      </div>
    </div>
  </div>

</TransitionWrapper>
