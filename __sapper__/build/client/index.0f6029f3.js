import{S as t,i as s,s as e,e as l,t as r,f as a,g as n,h as o,d as h,j as c,k as f,l as i,r as u,a as p,q as g,c as d,n as m,u as v}from"./client.1c96a8b1.js";function E(t,s,e){const l=t.slice();return l[1]=s[e],l}function b(t){let s,e,p,g,d=t[1].title+"";return{c(){s=l("li"),e=l("a"),p=r(d),this.h()},l(t){s=a(t,"LI",{});var l=n(s);e=a(l,"A",{rel:!0,href:!0});var r=n(e);p=o(r,d),r.forEach(h),l.forEach(h),this.h()},h(){c(e,"rel","prefetch"),c(e,"href",g="blog/"+t[1].slug)},m(t,l){f(t,s,l),i(s,e),i(e,p)},p(t,s){1&s&&d!==(d=t[1].title+"")&&u(p,d),1&s&&g!==(g="blog/"+t[1].slug)&&c(e,"href",g)},d(t){t&&h(s)}}}function j(t){let s,e,u,j,q,x=t[0],L=[];for(let s=0;s<x.length;s+=1)L[s]=b(E(t,x,s));return{c(){s=p(),e=l("h1"),u=r("Recent posts"),j=p(),q=l("ul");for(let t=0;t<L.length;t+=1)L[t].c();this.h()},l(t){g('[data-svelte="svelte-hfp9t8"]',document.head).forEach(h),s=d(t),e=a(t,"H1",{});var l=n(e);u=o(l,"Recent posts"),l.forEach(h),j=d(t),q=a(t,"UL",{class:!0});var r=n(q);for(let t=0;t<L.length;t+=1)L[t].l(r);r.forEach(h),this.h()},h(){document.title="Blog",c(q,"class","svelte-gi3qaz")},m(t,l){f(t,s,l),f(t,e,l),i(e,u),f(t,j,l),f(t,q,l);for(let t=0;t<L.length;t+=1)L[t].m(q,null)},p(t,[s]){if(1&s){let e;for(x=t[0],e=0;e<x.length;e+=1){const l=E(t,x,e);L[e]?L[e].p(l,s):(L[e]=b(l),L[e].c(),L[e].m(q,null))}for(;e<L.length;e+=1)L[e].d(1);L.length=x.length}},i:m,o:m,d(t){t&&h(s),t&&h(e),t&&h(j),t&&h(q),v(L,t)}}}function q({params:t,query:s}){return this.fetch("blog.json").then(t=>t.json()).then(t=>({posts:t}))}function x(t,s,e){let{posts:l}=s;return t.$set=t=>{"posts"in t&&e(0,l=t.posts)},[l]}export default class extends t{constructor(t){super(),s(this,t,x,j,e,{posts:0})}}export{q as preload};
