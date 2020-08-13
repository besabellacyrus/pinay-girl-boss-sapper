import { writable } from 'svelte/store';

export const contact = writable({
  email: '',
  subject: '',
  message: '',
});
