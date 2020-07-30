<script>
  // export let segment;
  let isMobileMenu = false;

  function toggleMenu() {
    isMobileMenu = !isMobileMenu;
  }
</script>

<style lang="scss">
  .menu-wrapper {
    display: flex;
  }
  .menu-desktop {
    @media screen and (max-width: 696px) {
      display: none;
    }
  }
  .menu-icon {
    display: none;
    @media screen and (max-width: 696px) {
      display: block;
      height: 100%;
      width: 3.5rem;
      svg {
        fill: #25577d;
      }
    }
  }
  .mobile-open {
    left: 0 !important;
  }
  .mobile-menu {
    height: 100%;
    width: 100%;
    transition: left 300ms ease;
    left: -9900px;
    top: 0;
    background-color: #fff;
    position: absolute;
    z-index: 9;
    padding: 2rem;
    display: flex;
    .close-btn {
      position: absolute;
      right: 17px;
      width: 2rem;
      svg {
        fill: #25577d;
      }
    }
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & li {
        display: flex;
        justify-content: flex-start;
      }
    }
    .mobile-menu-items {
      display: flex;
      flex-direction: column;
      place-content: center;
    }
  }
</style>

<nav>
  <div class="logo-wrapper">
    <img src="/pgn_logo.svg" alt="" />
  </div>
  <div class="menu-desktop menu-wrapper">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="episodes">Episodes</a>
      </li>
      <li>
        <a href="about">About</a>
      </li>
      <li>
        <a href="resources">Resources</a>
      </li>
      <li>
        <a href="contact">Contact</a>
      </li>
    </ul>
    <button class="listen-btn">
      <span>Listen</span>
      <span>
        <svg
          id="rss"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="17.5"
          viewBox="0 0 17.5 17.5">
          <g id="Group_54" data-name="Group 54" transform="translate(0 12.672)">
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
          <g id="Group_56" data-name="Group 56" transform="translate(0 5.834)">
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
  <div class="menu-icon" on:click={toggleMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  </div>
  <div class="mobile-menu {isMobileMenu ? 'mobile-open' : ''}">
    <div class="close-btn" on:click={toggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414
          1.414L10 11.414l7.071 7.071 1.414-1.414L11.414
          10l7.071-7.071-1.414-1.414L10 8.586z" />
      </svg>
    </div>
    <div class="mobile-menu-items">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="episodes">Episodes</a>
        </li>
        <li>About</li>
        <li>Resources</li>
        <li>Contact</li>
      </ul>

      <button class="listen-btn">
        <span>Listen</span>
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
  </div>
</nav>
