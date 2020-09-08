<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import { contact } from "../store/contact.js";

  let loading = false;
  let sent = false;

  async function handleSubmit(event) {
    loading = true;
    if (!sent) {
      let formData = new FormData();
      formData.append("your-email", event.target.email.value);
      formData.append("your-subject", event.target.subject.value);
      formData.append("your-message", event.target.message.value);
      const res = await fetch(
        "http://pinaygirlboss.com/wp-api/wp-json/contact-form-7/v1/contact-forms/76/feedback",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((e) => {
          if (e.statusText === "OK") {
            sent = true;
            $contact.subject = "";
            $contact.email = "";
            $contact.message = "";
          }
          console.log({ e });
          loading = false;
        })
        .catch((err) => {
          loading = false;
          console.log({ err });
        });
    }
  }
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
        <h1 class="app-decor">Get In Touch</h1>
        <p>
          Join in on the conversation! This online kwentuhan is abous us and
          YOU! Tell us what you think, did our guests inspire you to start an
          online business, or maybe pursue learning a new skill? Do you have a
          great idea about who we should invite to be the next guest? Or just
          say hi, we would love to hear from you!
        </p>
      </div>
    </div>
  </div>
  <div class="plain-wrapper">
    {#if !sent}
      <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={$contact.email} required />
        <label for="subject">Subject</label>
        <input
          id="subject"
          type="text"
          bind:value={$contact.subject}
          required />
        <label for="message">Message</label>
        <textarea
          id="message"
          cols="30"
          rows="10"
          bind:value={$contact.message}
          required />
        <div class="app-btn">
          <button>
            {#if !loading}<span>Submit</span>{:else}<span>Loading...</span>{/if}
          </button>
        </div>
      </form>
    {:else}
      <p>Thank you for messaging us!</p>
    {/if}
  </div>
</TransitionWrapper>
