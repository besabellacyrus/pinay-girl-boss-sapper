<script>

</script>

<style lang="scss">
  .episode-bg {
    background-image: url("/img/episode-main-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 82vh;
    width: 100%;
    top: 0;
    z-index: -1;
  }
  .font-white {
    color: #fff;
    h1 {
      color: #fff;
    }
  }
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
        }
      }
    }
  }
</style>

<svelte:head>
  <title>Episodes</title>
</svelte:head>

<div class="episode-bg" />
<section>
  <div class="section-content-center font-white">
    <h1 class="app-decor">Episodes</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, nostrum!
      Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum odit
      excepturi voluptas ad!
    </p>
  </div>
</section>
<section>
  <div class="podcast-lists-wrapper">
    <div class="podcast-list-item">
      <div class="podcast-img-wrapper">
        <img src="/img/podcast-item-img.svg" alt="" />
      </div>
      <div class="podcast-info-wrapper">
        <h1>EP. 001 - The Power Of Now</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora cum
          quasi ea, distinctio labore, obcaecati aliquid nesciunt soluta libero
          dignissimos ducimus molestiae non ad porro omnis voluptatum ipsum.
          Quas deleniti soluta similique blanditiis exercitationem!
        </p>
        <div>
          <small>January 28, 2020 28min Category</small>
        </div>
      </div>
    </div>
    <div class="podcast-list-item">
      <div class="podcast-img-wrapper">
        <img src="/img/podcast-item-img.svg" alt="" />
      </div>
      <div class="podcast-info-wrapper">
        <h1>EP. 001 - The Power Of Now</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora cum
          quasi ea, distinctio labore, obcaecati aliquid nesciunt soluta libero
          dignissimos ducimus molestiae non ad porro omnis voluptatum ipsum.
          Quas deleniti soluta similique blanditiis exercitationem!
        </p>
        <div>
          <small>January 28, 2020 28min Category</small>
        </div>
      </div>
    </div>
  </div>
</section>
