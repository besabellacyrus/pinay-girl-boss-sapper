!function(){"use strict";const t=["client/index.c6ae72bd.js","client/resources.3b363cde.js","client/about.95c39c22.js","client/index.538162f1.js","client/[slug].e6db6a41.js","client/contact.d34225b3.js","client/index.e0d8c7fc.js","client/[slug].27ede588.js","client/client.9ff9b9eb.js","client/moment.4913f727.js","client/svelte-apollo.es.fe4f957e.js"].concat(["service-worker-index.html","favicon.png","fonts/Roboto-Black.ttf","fonts/Roboto-BlackItalic.ttf","fonts/Roboto-Bold.ttf","fonts/Roboto-BoldItalic.ttf","fonts/Roboto-Italic.ttf","fonts/Roboto-Light.ttf","fonts/Roboto-LightItalic.ttf","fonts/Roboto-Medium.ttf","fonts/Roboto-MediumItalic.ttf","fonts/Roboto-Regular.ttf","fonts/Roboto-Thin.ttf","fonts/Roboto-ThinItalic.ttf","global.css","img/1024/blue-section.svg","img/1024/grey-section.svg","img/1024/red-section-contact.svg","img/1024/red-section.svg","img/1024/yellow-section.svg","img/425/blue-section.svg","img/425/grey-section.svg","img/425/red-section-contact.svg","img/425/red-section.svg","img/425/yellow-section.svg","img/768/blue-section.svg","img/768/grey-section.svg","img/768/red-section-contact.svg","img/768/red-section.svg","img/768/yellow-section.svg","img/about-bg.svg","img/blue-section-bg.svg","img/contact-main-bg.svg","img/contact-us-bg.svg","img/episode-footer-bg.svg","img/episode-main-bg.svg","img/episode-top-bg.svg","img/facebook.svg","img/file-image.svg","img/footer/facebook.svg","img/footer/instagram.svg","img/footer/iTunes.svg","img/footer/messenger.svg","img/footer/PGB Logotype.svg","img/footer/rss.svg","img/footer/Spotify.svg","img/footer/Twitter.svg","img/founder-one.png","img/founder-two.png","img/girl-boss-logo.svg","img/grey-section-bg.svg","img/home-bgs/section-five.svg","img/home-bgs/section-four.svg","img/home-bgs/section-one.svg","img/home-bgs/section-three.svg","img/home-bgs/section-two-2.svg","img/home-bgs/section-two.svg","img/instagram.svg","img/linkedin.svg","img/PGN Logo_Main.svg","img/podcast-item-img.png","img/podcast-item-img.svg","img/podcast-template.svg","img/red-section-bg.svg","img/resource-header.svg","img/resources-bg.svg","img/Sample Player Image.png","img/section-accent.svg","img/single-episodes-bg.svg","img/woman-illustration-one.svg","img/woman-illustration-two.svg","img/yellow-section-bg.svg","logo-192.png","logo-512.png","main.css","manifest.json","pgn_logo.svg","successkid.jpg","tailwind.css"]),e=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1597928925376").then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const e of t)"cache1597928925376"!==e&&await caches.delete(e);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&e.has(s.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1597928925376").then(async e=>{try{const s=await fetch(t.request);return e.put(t.request,s.clone()),s}catch(s){const o=await e.match(t.request);if(o)return o;throw s}}))))})}();
