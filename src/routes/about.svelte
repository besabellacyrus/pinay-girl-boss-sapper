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
  .app-spacer {
    padding: 8rem;
  }
  .header-label {
    text-align: center;
    h1 {
      font-family: Betty;
      padding: 2rem;
      color: #f9db7d;
      font-size: 4.3rem;
    }
    span {
      font-weight: bold;
    }
    hr {
      width: 14rem;
      margin: 4rem auto;
      border-top: 1px solid #e3e3e3;
    }
  }
  .first-founder {
    @media screen and (max-width: 768px) {
      display: flex !important;
      width: 100%;
      align-items: center;
      flex-flow: column wrap;
      flex-direction: column-reverse;
    }
  }
  .founder-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 9rem;
    @media screen and (max-width: 768px) {
      grid-template-columns: initial;
      padding: 0 0rem;
      justify-content: center;
    }
    .founder-photo {
      margin: 0 auto;
    }
    h1 {
      font-family: Betty;
      padding: 2rem;
      color: #25577d;
    }
    p {
      text-align: left;
    }
    button {
      margin-top: 2rem;
      border-radius: 25px;
      background: #f9db7d;
      padding: 1rem 2rem;
      color: #fff;
      box-shadow: 0px 21px 59px -1px #f9db7d;
    }
  }
  .max-content {
    ol {
      text-align: left;
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
          Hi! We are Tina and Max, the team behind Pinay Girl Boss. Know our
          WHYs, why we are on this path, why we started this project, and why we
          want to share this space with you!
        </p>
      </div>
    </div>
  </div>
  <div class="plain-wrapper">
    <div class="header-label">
      <span>Hi there!</span>
      <br />
      <h1>We are Tina &amp; Max</h1>
      <hr />
    </div>
  </div>
  <div class="plain-wrapper">
    <div class="founder-wrapper first-founder">
      <div>
        <h1>Meet Tina</h1>
        <p>
          I am a lifelong learner and a proud product of the Philippine public
          school system! I went to Manila Science High School, then the
          University of the Philippines Diliman for my pre-law and law degrees.
          I have worked in government and in the international development scene
          for more than a decade until life happened, I became a mom to 2
          adorable kids and I’ve undergone a lot of mindset shifts. I became a
          mompreneur, became involved in mom-related advocacies, and explored my
          options. I am currently enjoying life as a self-employed boss mama at
          The Oil Natural Project, tribe leader to thousands of Young Living
          Essential Oil users, and community builder and co-founder of Fit Moms
          Project Ph and Pinay Girl Boss.
        </p>
        <a href="https://tinyurl.com/oilnatural" target="_blank">
          <button>Join's Tina Essential Oil Tribe</button>
        </a>
      </div>
      <div><img src="/img/Founder2.png" alt="" /></div>
    </div>
  </div>
  <div class="app-spacer" />
  <div class="plain-wrapper">
    <div class="founder-wrapper">
      <div class="founder-photo"><img src="/img/Founder1.png" alt="" /></div>
      <div class="max-content">
        <h1>Meet Max</h1>
        <p>
          After graduating from the University of the Philippines Diliman, I
          moved back to Saudi Arabia where I started my career in the aviation
          industry in 2010. I am a dreamer, I am an unconventional mom, I enjoy
          getting lost in books, I believe that meals are not complete without
          dessert and I love traveling the world with my family. I am the other
          half of Pinay Girl Boss and proud boss mama of the Certified Oilers
          community.
        </p>
        <a
          href="https://www.youngliving.com/vo/#/signup/new-start?sponsorid=11107278&enrollerid=11107278&isocountrycode=SA&culture=en-US&type=member"
          target="_blank">
          <button>Join's Max Essential Oil Tribe</button>
        </a>
      </div>
    </div>
  </div>
  <div class="app-spacer" />
</TransitionWrapper>
