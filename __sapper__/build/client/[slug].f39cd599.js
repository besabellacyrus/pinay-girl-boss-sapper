import{S as t,i as s,s as e,a,e as n,t as o,q as i,d as r,c,f as l,g as u,h,j as f,k as p,l as d,r as m,n as v}from"./client.ffec1634.js";function g(t){let s,e,g,j,x,y,E=t[0].title+"",H=t[0].html+"";return document.title=s=t[0].title,{c(){e=a(),g=n("h1"),j=o(E),x=a(),y=n("div"),this.h()},l(t){i('[data-svelte="svelte-1uty71u"]',document.head).forEach(r),e=c(t),g=l(t,"H1",{});var s=u(g);j=h(s,E),s.forEach(r),x=c(t),y=l(t,"DIV",{class:!0}),u(y).forEach(r),this.h()},h(){f(y,"class","content svelte-1tzifke")},m(t,s){p(t,e,s),p(t,g,s),d(g,j),p(t,x,s),p(t,y,s),y.innerHTML=H},p(t,[e]){1&e&&s!==(s=t[0].title)&&(document.title=s),1&e&&E!==(E=t[0].title+"")&&m(j,E),1&e&&H!==(H=t[0].html+"")&&(y.innerHTML=H)},i:v,o:v,d(t){t&&r(e),t&&r(g),t&&r(x),t&&r(y)}}}async function j({params:t,query:s}){const e=await this.fetch(`blog/${t.slug}.json`),a=await e.json();if(200===e.status)return{post:a};this.error(e.status,a.message)}function x(t,s,e){let{post:a}=s;return t.$set=t=>{"post"in t&&e(0,a=t.post)},[a]}export default class extends t{constructor(t){super(),s(this,t,x,g,e,{post:0})}}export{j as preload};
