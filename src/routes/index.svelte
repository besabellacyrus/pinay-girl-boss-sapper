<style lang="scss">
  .index-wrapper {
    background-image: url("/img/red-section-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    z-index: -1;
  }
  .bg-two {
    background-image: url("/img/yellow-section-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 100vh;
    z-index: -1;
    width: 100%;
    background-position: -27rem;
  }
  .bg-three {
    background-image: url("/img/blue-section-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 90rem;
    z-index: -1;
    width: 100%;
    @media screen and (max-width: 425px) {
      height: 146rem;
    }
  }
  .bg-four {
    background-image: url("/img/grey-section-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 100%;
    z-index: -1;
    width: 100%;
    background-position: 0rem 4rem;
    @media screen and (max-width: 425px) {
      height: 146rem;
    }
  }
  .bg-five {
    background-image: url("/img/contact-us-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    height: 100%;
    z-index: -1;
    width: 100%;
    @media screen and (max-width: 1300px) {
      background-position: -26rem 0;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div class="index-wrapper" />
<div class="app-wrapper first-section">
  <section>
    <div class="section-content">
      <h1 class="app-decor">Boost Your Business Weekly</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nihil
        provident voluptatum? At quisquam, sequi repellendus officia
        voluptatibus libero recusandae, quia perferendis tenetur cupiditate
        assumenda modi in, dolorum provident laudantium! Mollitia quas rem
        inventore.
      </p>
      <div class="app-btn">
        <button>
          <span>Listen to our Podcast</span>
          <span>
            <svg
              id="rss"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="17.5"
              viewBox="0 0 17.5 17.5">
              <g
                id="Group_54"
                data-name="Group 54"
                transform="translate(0 12.672)">
                <g
                  id="Group_53"
                  data-name="Group 53"
                  transform="translate(0 0)">
                  <circle
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    cx="2.5"
                    cy="2.5"
                    r="2.5"
                    transform="translate(0 -0.173)"
                    fill="#fff" />
                </g>
              </g>
              <g
                id="Group_56"
                data-name="Group 56"
                transform="translate(0 5.834)">
                <g id="Group_55" data-name="Group 55">
                  <path
                    id="Path_386"
                    data-name="Path 386"
                    d="M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"
                    transform="translate(0 -149.344)"
                    fill="#fff" />
                </g>
              </g>
              <g id="Group_58" data-name="Group 58">
                <g id="Group_57" data-name="Group 57">
                  <path
                    id="Path_387"
                    data-name="Path 387"
                    d="M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"
                    fill="#fff" />
                </g>
              </g>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="section-image">
      <img src="/img/woman-illustration-one.svg" alt="" />
    </div>
  </section>
</div>
<div class="bg-two" />
<div class="app-wrapper">
  <section>
    <div class="section-image">
      <img src="/img/woman-illustration-two.svg" alt="" />
    </div>
    <div class="section-content">
      <h1 class="app-decor">Boost Your Business Weekly</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nihil
        provident voluptatum? At quisquam, sequi repellendus officia
        voluptatibus libero recusandae, quia perferendis tenetur cupiditate
        assumenda modi in, dolorum provident laudantium! Mollitia quas rem
        inventore.
      </p>
    </div>
  </section>
</div>
<div class="bg-three" />
<div class="app-center-wrapper">
  <section class="text-center my-20">
    <h1 class="app-decor">Lorem ipsum dolor sit amet consectetur</h1>
    <h4 class="my-20">Our Latest Episode</h4>
    <div class="podcast-player-wrapper" />
    <div class="app-btn mx-auto my-20">
      <button>
        <span>Listen to our Podcast</span>
        <span>
          <svg
            id="rss"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="17.5"
            viewBox="0 0 17.5 17.5">
            <g
              id="Group_54"
              data-name="Group 54"
              transform="translate(0 12.672)">
              <g id="Group_53" data-name="Group 53" transform="translate(0 0)">
                <circle
                  id="Ellipse_8"
                  data-name="Ellipse 8"
                  cx="2.5"
                  cy="2.5"
                  r="2.5"
                  transform="translate(0 -0.173)"
                  fill="#fff" />
              </g>
            </g>
            <g
              id="Group_56"
              data-name="Group 56"
              transform="translate(0 5.834)">
              <g id="Group_55" data-name="Group 55">
                <path
                  id="Path_386"
                  data-name="Path 386"
                  d="M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"
                  transform="translate(0 -149.344)"
                  fill="#fff" />
              </g>
            </g>
            <g id="Group_58" data-name="Group 58">
              <g id="Group_57" data-name="Group 57">
                <path
                  id="Path_387"
                  data-name="Path 387"
                  d="M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"
                  fill="#fff" />
              </g>
            </g>
          </svg>
        </span>
      </button>
    </div>
    <h3 class="my-20">More Episodes</h3>
    <div class="featured-episodes">
      <div>
        <img src="/img/podcast-template.svg" alt="" />
      </div>
      <div>
        <img src="/img/podcast-template.svg" alt="" />
      </div>
      <div>
        <img src="/img/podcast-template.svg" alt="" />
      </div>
    </div>
  </section>
</div>

<div class="bg-four" />
<div class="app-wrapper">
  <section>
    <div class="about-us-wrapper">
      <div class="mb-20">
        <h1>About Us</h1>
      </div>
      <div class="about-us-items">
        <div>
          <img src="/img/founder-one.png" alt="" />
          <h1>Juan Dela Cruz</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            nisi tempore velit laudantium nostrum omnis temporibus autem quae ab
            soluta. Tempora, facilis repudiandae!
          </p>
          <div class="social-media">
            <div>
              <a href="">
                <img src="/img/facebook.svg" alt="" />
              </a>
            </div>
            <div>
              <a href="">
                <img src="/img/instagram.svg" alt="" />
              </a>
            </div>
            <div>
              <a href="">
                <img src="/img/linkedin.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <img src="/img/founder-two.png" alt="" />
          <h1>Juan Dela Cruz</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            nisi tempore velit laudantium nostrum omnis temporibus autem quae ab
            soluta. Tempora, facilis repudiandae!
          </p>
          <div class="social-media">
            <div>
              <a href="">
                <img src="/img/facebook.svg" alt="" />
              </a>
            </div>
            <div>
              <a href="">
                <img src="/img/instagram.svg" alt="" />
              </a>
            </div>
            <div>
              <a href="">
                <img src="/img/linkedin.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
<div class="bg-five" />
<div class="app-wrapper">
  <section class="contact-us-wrapper">
    <h1>Contact Us</h1>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis est
      dolor harum recusandae! Nemo unde sed eum quaerat quisquam quo, aspernatur
      voluptas amet!
    </p>
    <form action="">
      <label for="">Email</label>
      <input type="text" />
      <input type="submit" value="Lorem Ipsum" />
    </form>
  </section>
</div>
