<script>

</script>

<style lang="scss">
  .episode-bg {
    background-image: url("/img/episode-main-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 82vh;
    @media screen and (max-width: 425px) {
      height: 74vh;
    }
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
    .podcast-list-item {
      display: flex;
      @media screen and (min-width: 922px) {
        width: 78ch;
      }
      margin-bottom: 3rem;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 922px) {
        flex-direction: column;
        padding: 0 2rem;
        text-align: center;
      }
      h1 {
        font-size: 2rem;
        color: inherit;
        margin-bottom: 0rem;
      }
      .podcast-img-wrapper {
        @media screen and (min-width: 928px) {
          margin-right: 2rem;
          height: 18rem;
          width: 68rem;
        }
        @media screen and (max-width: 425px) {
          height: 14rem;
          margin-bottom: 2rem;
        }
        img {
          width: 100%;
          height: 100%;
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
