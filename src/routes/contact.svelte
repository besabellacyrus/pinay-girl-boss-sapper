<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
</script>

<style lang="scss">
  .contact-main-bg {
    background-image: url("/img/contact-main-bg.svg");
  }
  form {
    display: grid;
    text-align: left;
    max-width: 60rem;
    margin: 0 auto;
    margin-bottom: 7rem;
    input {
      height: 5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      padding-left: 1rem;
    }
    textarea {
      border-radius: 8px;
      margin-bottom: 7rem;
      padding-left: 1rem;
    }
    .app-btn {
      margin: 0 auto;
    }
  }
</style>

<svelte:head>
  <title>Contact Us</title>
</svelte:head>

<TransitionWrapper>
  <div
    class="app-division-wrapper default-section-header font-white
    contact-main-bg">
    <div class="section-wrapper">
      <div class="center-section-wrapper">
        <h1 class="app-decor">Get Exclusives</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          nostrum! Blanditiis eligendi tenetur.
        </p>
      </div>
    </div>
  </div>
  <div class="plain-wrapper">
    <form action="">
      <label for="">Email</label>
      <input type="email" />
      <label for="">Subject</label>
      <input type="text" />
      <label for="">Message</label>
      <textarea name="" id="" cols="30" rows="10" />
      <div class="app-btn">
        <button>Submit</button>
      </div>
    </form>
  </div>
</TransitionWrapper>
