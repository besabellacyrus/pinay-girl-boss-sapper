import{S as t,i as s,s as a,a as e,e as o,t as i,q as n,g as r,h as l,b as c,d as u,f as h,w as f,l as d,k as p,C as m,x as v}from"./client.f95581bd.js";function g(t){let s,a,g,x,b,j,w=t[0].title+"",y=t[0].html+"";return document.title=s=t[0].title,{c(){a=e(),g=o("h1"),x=i(w),b=e(),j=o("div"),this.h()},l(t){n('[data-svelte="svelte-1uty71u"]',document.head).forEach(r),a=l(t),g=c(t,"H1",{});var s=u(g);x=h(s,w),s.forEach(r),b=l(t),j=c(t,"DIV",{class:!0}),u(j).forEach(r),this.h()},h(){f(j,"class","content svelte-1tzifke")},m(t,s){d(t,a,s),d(t,g,s),p(g,x),d(t,b,s),d(t,j,s),j.innerHTML=y},p(t,[a]){1&a&&s!==(s=t[0].title)&&(document.title=s),1&a&&w!==(w=t[0].title+"")&&m(x,w),1&a&&y!==(y=t[0].html+"")&&(j.innerHTML=y)},i:v,o:v,d(t){t&&r(a),t&&r(g),t&&r(b),t&&r(j)}}}async function x({params:t,query:s}){const a=await this.fetch(`blog/${t.slug}.json`),e=await a.json();if(200===a.status)return{post:e};this.error(a.status,e.message)}function b(t,s,a){let{post:e}=s;return t.$set=t=>{"post"in t&&a(0,e=t.post)},[e]}export default class extends t{constructor(t){super(),s(this,t,b,g,a,{post:0})}}export{x as preload};
