import{S as t,i as s,s as e,e as l,t as r,f as n,g as o,h as a,d as h,j as c,k as f,l as i,r as u,a as p,q as g,c as d,n as m,u as v}from"./client.5590e92d.js";function E(t,s,e){const l=t.slice();return l[1]=s[e],l}function j(t){let s,e,p,g,d=t[1].title+"";return{c(){s=l("li"),e=l("a"),p=r(d),this.h()},l(t){s=n(t,"LI",{});var l=o(s);e=n(l,"A",{rel:!0,href:!0});var r=o(e);p=a(r,d),r.forEach(h),l.forEach(h),this.h()},h(){c(e,"rel","prefetch"),c(e,"href",g="blog/"+t[1].slug)},m(t,l){f(t,s,l),i(s,e),i(e,p)},p(t,s){1&s&&d!==(d=t[1].title+"")&&u(p,d),1&s&&g!==(g="blog/"+t[1].slug)&&c(e,"href",g)},d(t){t&&h(s)}}}function b(t){let s,e,u,b,q,x=t[0],L=[];for(let s=0;s<x.length;s+=1)L[s]=j(E(t,x,s));return{c(){s=p(),e=l("h1"),u=r("Recent posts"),b=p(),q=l("ul");for(let t=0;t<L.length;t+=1)L[t].c();this.h()},l(t){g('[data-svelte="svelte-hfp9t8"]',document.head).forEach(h),s=d(t),e=n(t,"H1",{});var l=o(e);u=a(l,"Recent posts"),l.forEach(h),b=d(t),q=n(t,"UL",{class:!0});var r=o(q);for(let t=0;t<L.length;t+=1)L[t].l(r);r.forEach(h),this.h()},h(){document.title="Blog",c(q,"class","svelte-gi3qaz")},m(t,l){f(t,s,l),f(t,e,l),i(e,u),f(t,b,l),f(t,q,l);for(let t=0;t<L.length;t+=1)L[t].m(q,null)},p(t,[s]){if(1&s){let e;for(x=t[0],e=0;e<x.length;e+=1){const l=E(t,x,e);L[e]?L[e].p(l,s):(L[e]=j(l),L[e].c(),L[e].m(q,null))}for(;e<L.length;e+=1)L[e].d(1);L.length=x.length}},i:m,o:m,d(t){t&&h(s),t&&h(e),t&&h(b),t&&h(q),v(L,t)}}}function q({params:t,query:s}){return this.fetch("blog.json").then(t=>t.json()).then(t=>({posts:t}))}function x(t,s,e){let{posts:l}=s;return t.$set=t=>{"posts"in t&&e(0,l=t.posts)},[l]}export default class extends t{constructor(t){super(),s(this,t,x,b,e,{posts:0})}}export{q as preload};
