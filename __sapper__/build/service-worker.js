!function(){"use strict";const t=["client/resources.066fe318.js","client/index.db05cb94.js","client/contact.043b2ab4.js","client/about.93370872.js","client/index.0f6029f3.js","client/index.2f16c3b4.js","client/[slug].f02ef336.js","client/[slug].7b01f07f.js","client/client.1c96a8b1.js","client/moment.5d8f6b95.js","client/svelte-apollo.es.82ec38d3.js"].concat(["service-worker-index.html","favicon.png","fonts/Roboto-Black.ttf","fonts/Roboto-BlackItalic.ttf","fonts/Roboto-Bold.ttf","fonts/Roboto-BoldItalic.ttf","fonts/Roboto-Italic.ttf","fonts/Roboto-Light.ttf","fonts/Roboto-LightItalic.ttf","fonts/Roboto-Medium.ttf","fonts/Roboto-MediumItalic.ttf","fonts/Roboto-Regular.ttf","fonts/Roboto-Thin.ttf","fonts/Roboto-ThinItalic.ttf","global.css","img/1024/blue-section.svg","img/1024/grey-section.svg","img/1024/red-section-contact.svg","img/1024/red-section.svg","img/1024/yellow-section.svg","img/425/blue-section.svg","img/425/grey-section.svg","img/425/red-section-contact.svg","img/425/red-section.svg","img/425/yellow-section.svg","img/768/blue-section.svg","img/768/grey-section.svg","img/768/red-section-contact.svg","img/768/red-section.svg","img/768/yellow-section.svg","img/PGN Logo_Main.svg","img/Sample Player Image.png","img/about-bg.svg","img/blue-section-bg.svg","img/contact-main-bg.svg","img/contact-us-bg.svg","img/episode-footer-bg.svg","img/episode-main-bg.svg","img/episode-top-bg.svg","img/facebook.svg","img/file-image.svg","img/footer/PGB Logotype.svg","img/footer/Spotify.svg","img/footer/Twitter.svg","img/footer/facebook.svg","img/footer/iTunes.svg","img/footer/instagram.svg","img/footer/messenger.svg","img/footer/rss.svg","img/founder-one.png","img/founder-two.png","img/girl-boss-logo.svg","img/grey-section-bg.svg","img/instagram.svg","img/linkedin.svg","img/podcast-item-img.png","img/podcast-item-img.svg","img/podcast-template.svg","img/red-section-bg.svg","img/resource-bottom-section.svg","img/resource-header.svg","img/section-accent.svg","img/single-episodes-bg.svg","img/woman-illustration-one.svg","img/woman-illustration-two.svg","img/yellow-section-bg.svg","logo-192.png","logo-512.png","main.css","manifest.json","pgn_logo.svg","successkid.jpg","tailwind.css"]),e=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1596985173411").then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const e of t)"cache1596985173411"!==e&&await caches.delete(e);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const o=new URL(t.request.url);o.protocol.startsWith("http")&&(o.hostname===self.location.hostname&&o.port!==self.location.port||(o.host===self.location.host&&e.has(o.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1596985173411").then(async e=>{try{const o=await fetch(t.request);return e.put(t.request,o.clone()),o}catch(o){const s=await e.match(t.request);if(s)return s;throw o}}))))})}();
