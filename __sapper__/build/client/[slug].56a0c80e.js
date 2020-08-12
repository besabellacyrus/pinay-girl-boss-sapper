import{S as s,i as e,s as a,T as l,a as o,c as t,q as r,d as i,b as c,e as d,f as n,m as p,t as h,g as u,h as g,C as m,D as v,E as f,w as q,j as _,k as E,n as k,o as I,p as b,r as D,u as M,F as V,z as $,G as T,x as H,y}from"./client.ca8f87f9.js";import{s as w,c as L,r as P,q as S}from"./svelte-apollo.es.815e52b7.js";import{E as x,m as N}from"./moment.3a2680b1.js";const U=w`
  query MyQuery($slug: ID!) {
    episode(id: $slug, idType: URI) {
      title
      slug
      date
      id
      episodes_gql {
        duration
        embed
        resources
        episodeThumbnail {
          sourceUrl
        }
        information
        speaker {
          ... on Author {
            id
            title
            authors_gql {
              bio
              facebook
              fieldGroupName
              instagram
              linkedin
              name
              surname
              profession
            }
          }
        }
      }
    }
  }
`;function G(s){return{c:H,l:H,m:H,p:H,d:H}}function Y(s){let e,a=s[10].data&&A(s);return{c(){a&&a.c(),e=y()},l(s){a&&a.l(s),e=y()},m(s,l){a&&a.m(s,l),n(s,e,l)},p(s,l){s[10].data?a?a.p(s,l):(a=A(s),a.c(),a.m(e.parentNode,e)):a&&(a.d(1),a=null)},d(s){a&&a.d(s),s&&i(e)}}}function A(s){let e,a,l,t,r,d,p,h,u,g,m,v,f,q,V,T,H,w=s[10].data.episode.title+"",L=N(s[10].data.episode.date).format("MMMM Do, YYYY")+"",P=s[10].data.episode.episodes_gql.duration+"",S=s[10].data.episode.episodes_gql.embed+"",x=s[10].data.episode.episodes_gql.information+"",U=s[10].data.episode.episodes_gql.speaker&&O(s),G=s[10].data.episode.episodes_gql.resources&&z(s);return{c(){e=_("div"),a=_("div"),l=_("h1"),t=o(),r=_("p"),d=E(L),p=E(" - "),h=E(P),u=o(),g=_("div"),m=o(),v=_("div"),f=_("p"),q=E(x),V=o(),U&&U.c(),T=o(),G&&G.c(),H=y(),this.h()},l(s){e=k(s,"DIV",{class:!0});var o=I(e);a=k(o,"DIV",{class:!0});var n=I(a);l=k(n,"H1",{class:!0}),I(l).forEach(i),t=c(n),r=k(n,"P",{class:!0});var _=I(r);d=b(_,L),p=b(_," - "),h=b(_,P),_.forEach(i),u=c(n),g=k(n,"DIV",{class:!0}),I(g).forEach(i),m=c(n),v=k(n,"DIV",{class:!0});var E=I(v);f=k(E,"P",{});var D=I(f);q=b(D,x),D.forEach(i),E.forEach(i),n.forEach(i),o.forEach(i),V=c(s),U&&U.l(s),T=c(s),G&&G.l(s),H=y(),this.h()},h(){D(l,"class","app-decor"),D(r,"class","episode-date"),D(g,"class","podcast-player svelte-1as6e7t"),D(v,"class","episode-information-wrapper svelte-1as6e7t"),D(a,"class","inner-page-wrapper"),D(e,"class","single-episode-main-bg svelte-1as6e7t")},m(s,o){n(s,e,o),M(e,a),M(a,l),l.innerHTML=w,M(a,t),M(a,r),M(r,d),M(r,p),M(r,h),M(a,u),M(a,g),g.innerHTML=S,M(a,m),M(a,v),M(v,f),M(f,q),n(s,V,o),U&&U.m(s,o),n(s,T,o),G&&G.m(s,o),n(s,H,o)},p(s,e){1&e&&w!==(w=s[10].data.episode.title+"")&&(l.innerHTML=w),1&e&&L!==(L=N(s[10].data.episode.date).format("MMMM Do, YYYY")+"")&&$(d,L),1&e&&P!==(P=s[10].data.episode.episodes_gql.duration+"")&&$(h,P),1&e&&S!==(S=s[10].data.episode.episodes_gql.embed+"")&&(g.innerHTML=S),1&e&&x!==(x=s[10].data.episode.episodes_gql.information+"")&&$(q,x),s[10].data.episode.episodes_gql.speaker?U?U.p(s,e):(U=O(s),U.c(),U.m(T.parentNode,T)):U&&(U.d(1),U=null),s[10].data.episode.episodes_gql.resources?G?G.p(s,e):(G=z(s),G.c(),G.m(H.parentNode,H)):G&&(G.d(1),G=null)},d(s){s&&i(e),s&&i(V),U&&U.d(s),s&&i(T),G&&G.d(s),s&&i(H)}}}function O(s){let e,a,l,t,r,d,p,h,u,g,m,v,f,q,V,T,H,y,w,L,P,S,x,N=s[10].data.episode.episodes_gql.speaker.authors_gql.name+"",U=s[10].data.episode.episodes_gql.speaker.authors_gql.surname+"",G=s[10].data.episode.episodes_gql.speaker.authors_gql.profession+"",Y=s[10].data.episode.episodes_gql.speaker.authors_gql.bio+"",A=s[10].data.episode.episodes_gql.speaker.authors_gql.facebook&&R(s),O=s[10].data.episode.episodes_gql.speaker.authors_gql.linkedin&&j(s),z=s[10].data.episode.episodes_gql.speaker.authors_gql.instagram&&X(s);return{c(){e=_("div"),a=_("h3"),l=E("About the Speaker"),t=o(),r=_("div"),d=_("div"),p=_("h4"),h=E(N),u=o(),g=E(U),m=o(),v=_("small"),f=E(G),q=o(),V=_("div"),T=o(),H=_("div"),y=_("img"),L=o(),P=_("div"),A&&A.c(),S=o(),O&&O.c(),x=o(),z&&z.c(),this.h()},l(s){e=k(s,"DIV",{class:!0});var o=I(e);a=k(o,"H3",{class:!0});var n=I(a);l=b(n,"About the Speaker"),n.forEach(i),t=c(o),r=k(o,"DIV",{class:!0});var _=I(r);d=k(_,"DIV",{class:!0});var E=I(d);p=k(E,"H4",{class:!0});var D=I(p);h=b(D,N),u=c(D),g=b(D,U),D.forEach(i),m=c(E),v=k(E,"SMALL",{class:!0});var M=I(v);f=b(M,G),M.forEach(i),q=c(E),V=k(E,"DIV",{class:!0}),I(V).forEach(i),E.forEach(i),T=c(_),H=k(_,"DIV",{});var $=I(H);y=k($,"IMG",{src:!0,alt:!0,class:!0}),$.forEach(i),_.forEach(i),o.forEach(i),L=c(s),P=k(s,"DIV",{class:!0});var w=I(P);A&&A.l(w),S=c(w),O&&O.l(w),x=c(w),z&&z.l(w),w.forEach(i),this.h()},h(){D(a,"class","svelte-1as6e7t"),D(p,"class","svelte-1as6e7t"),D(v,"class","svelte-1as6e7t"),D(V,"class","speaker-bio svelte-1as6e7t"),D(d,"class","speaker-name-wrapper"),y.src!==(w="img/founder-two.png")&&D(y,"src","img/founder-two.png"),D(y,"alt",""),D(y,"class","svelte-1as6e7t"),D(r,"class","speaker-info-wrapper svelte-1as6e7t"),D(e,"class","common-wrapper about-speaker svelte-1as6e7t"),D(P,"class","common-wrapper social-media svelte-1as6e7t")},m(s,o){n(s,e,o),M(e,a),M(a,l),M(e,t),M(e,r),M(r,d),M(d,p),M(p,h),M(p,u),M(p,g),M(d,m),M(d,v),M(v,f),M(d,q),M(d,V),V.innerHTML=Y,M(r,T),M(r,H),M(H,y),n(s,L,o),n(s,P,o),A&&A.m(P,null),M(P,S),O&&O.m(P,null),M(P,x),z&&z.m(P,null)},p(s,e){1&e&&N!==(N=s[10].data.episode.episodes_gql.speaker.authors_gql.name+"")&&$(h,N),1&e&&U!==(U=s[10].data.episode.episodes_gql.speaker.authors_gql.surname+"")&&$(g,U),1&e&&G!==(G=s[10].data.episode.episodes_gql.speaker.authors_gql.profession+"")&&$(f,G),1&e&&Y!==(Y=s[10].data.episode.episodes_gql.speaker.authors_gql.bio+"")&&(V.innerHTML=Y),s[10].data.episode.episodes_gql.speaker.authors_gql.facebook?A?A.p(s,e):(A=R(s),A.c(),A.m(P,S)):A&&(A.d(1),A=null),s[10].data.episode.episodes_gql.speaker.authors_gql.linkedin?O?O.p(s,e):(O=j(s),O.c(),O.m(P,x)):O&&(O.d(1),O=null),s[10].data.episode.episodes_gql.speaker.authors_gql.instagram?z?z.p(s,e):(z=X(s),z.c(),z.m(P,null)):z&&(z.d(1),z=null)},d(s){s&&i(e),s&&i(L),s&&i(P),A&&A.d(),O&&O.d(),z&&z.d()}}}function R(s){let e,a,l,t,r,d,p=s[10].data.episode.episodes_gql.speaker.authors_gql.facebook+"";return{c(){e=_("div"),a=_("img"),t=o(),r=_("span"),d=E(p),this.h()},l(s){e=k(s,"DIV",{class:!0});var l=I(e);a=k(l,"IMG",{src:!0,alt:!0}),t=c(l),r=k(l,"SPAN",{});var o=I(r);d=b(o,p),o.forEach(i),l.forEach(i),this.h()},h(){a.src!==(l="img/instagram.svg")&&D(a,"src","img/instagram.svg"),D(a,"alt",""),D(e,"class","svelte-1as6e7t")},m(s,l){n(s,e,l),M(e,a),M(e,t),M(e,r),M(r,d)},p(s,e){1&e&&p!==(p=s[10].data.episode.episodes_gql.speaker.authors_gql.facebook+"")&&$(d,p)},d(s){s&&i(e)}}}function j(s){let e,a,l,t,r,d,p=s[10].data.episode.episodes_gql.speaker.authors_gql.linkedin+"";return{c(){e=_("div"),a=_("img"),t=o(),r=_("span"),d=E(p),this.h()},l(s){e=k(s,"DIV",{class:!0});var l=I(e);a=k(l,"IMG",{src:!0,alt:!0}),t=c(l),r=k(l,"SPAN",{});var o=I(r);d=b(o,p),o.forEach(i),l.forEach(i),this.h()},h(){a.src!==(l="img/linkedin.svg")&&D(a,"src","img/linkedin.svg"),D(a,"alt",""),D(e,"class","svelte-1as6e7t")},m(s,l){n(s,e,l),M(e,a),M(e,t),M(e,r),M(r,d)},p(s,e){1&e&&p!==(p=s[10].data.episode.episodes_gql.speaker.authors_gql.linkedin+"")&&$(d,p)},d(s){s&&i(e)}}}function X(s){let e,a,l,t,r,d,p=s[10].data.episode.episodes_gql.speaker.authors_gql.instagram+"";return{c(){e=_("div"),a=_("img"),t=o(),r=_("span"),d=E(p),this.h()},l(s){e=k(s,"DIV",{class:!0});var l=I(e);a=k(l,"IMG",{src:!0,alt:!0}),t=c(l),r=k(l,"SPAN",{});var o=I(r);d=b(o,p),o.forEach(i),l.forEach(i),this.h()},h(){a.src!==(l="img/facebook.svg")&&D(a,"src","img/facebook.svg"),D(a,"alt",""),D(e,"class","svelte-1as6e7t")},m(s,l){n(s,e,l),M(e,a),M(e,t),M(e,r),M(r,d)},p(s,e){1&e&&p!==(p=s[10].data.episode.episodes_gql.speaker.authors_gql.instagram+"")&&$(d,p)},d(s){s&&i(e)}}}function z(s){let e,a,l,t,r,d=s[10].data.episode.episodes_gql.resources+"";return{c(){e=_("div"),a=_("h3"),l=E("Resources"),t=o(),r=_("div"),this.h()},l(s){e=k(s,"DIV",{class:!0});var o=I(e);a=k(o,"H3",{class:!0});var d=I(a);l=b(d,"Resources"),d.forEach(i),t=c(o),r=k(o,"DIV",{}),I(r).forEach(i),o.forEach(i),this.h()},h(){D(a,"class","svelte-1as6e7t"),D(e,"class","common-wrapper about-resources svelte-1as6e7t")},m(s,o){n(s,e,o),M(e,a),M(a,l),M(e,t),M(e,r),r.innerHTML=d},p(s,e){1&e&&d!==(d=s[10].data.episode.episodes_gql.resources+"")&&(r.innerHTML=d)},d(s){s&&i(e)}}}function C(s){let e,a;return{c(){e=_("p"),a=E("Loading...")},l(s){e=k(s,"P",{});var l=I(e);a=b(l,"Loading..."),l.forEach(i)},m(s,l){n(s,e,l),M(e,a)},p:H,d(s){s&&i(e)}}}function F(s){let e,a,l,t,r,d,p,h,u,g,m,v,f,q,T,H=s[1].title+"",y=s[1].episodes_gql.information+"";return{c(){e=_("div"),a=_("h2"),l=E("PREVIOUS EPISODE"),t=o(),r=_("div"),d=_("img"),h=o(),u=_("div"),g=_("h3"),m=o(),v=_("p"),f=E(y),this.h()},l(s){e=k(s,"DIV",{});var o=I(e);a=k(o,"H2",{class:!0});var n=I(a);l=b(n,"PREVIOUS EPISODE"),n.forEach(i),t=c(o),r=k(o,"DIV",{class:!0});var p=I(r);d=k(p,"IMG",{src:!0,alt:!0,class:!0}),h=c(p),u=k(p,"DIV",{});var q=I(u);g=k(q,"H3",{class:!0}),I(g).forEach(i),m=c(q),v=k(q,"P",{class:!0});var _=I(v);f=b(_,y),_.forEach(i),q.forEach(i),p.forEach(i),o.forEach(i),this.h()},h(){D(a,"class","svelte-1as6e7t"),d.src!==(p=s[1].episodes_gql.episodeThumbnail.sourceUrl)&&D(d,"src",p),D(d,"alt",""),D(d,"class","svelte-1as6e7t"),D(g,"class","svelte-1as6e7t"),D(v,"class","svelte-1as6e7t"),D(r,"class","pagination-content-left svelte-1as6e7t")},m(o,i){n(o,e,i),M(e,a),M(a,l),M(e,t),M(e,r),M(r,d),M(r,h),M(r,u),M(u,g),g.innerHTML=H,M(u,m),M(u,v),M(v,f),q||(T=V(e,"click",s[4]),q=!0)},p(s,e){2&e&&d.src!==(p=s[1].episodes_gql.episodeThumbnail.sourceUrl)&&D(d,"src",p),2&e&&H!==(H=s[1].title+"")&&(g.innerHTML=H),2&e&&y!==(y=s[1].episodes_gql.information+"")&&$(f,y)},d(s){s&&i(e),q=!1,T()}}}function Q(s){let e,a,l,t,r,d,p,h,u,g,m,v,f,q,T,H=s[2].title+"",y=s[2].episodes_gql.information+"";return{c(){e=_("div"),a=_("h2"),l=E("NEXT EPISODE"),t=o(),r=_("div"),d=_("img"),h=o(),u=_("div"),g=_("h3"),m=o(),v=_("p"),f=E(y),this.h()},l(s){e=k(s,"DIV",{});var o=I(e);a=k(o,"H2",{class:!0});var n=I(a);l=b(n,"NEXT EPISODE"),n.forEach(i),t=c(o),r=k(o,"DIV",{class:!0});var p=I(r);d=k(p,"IMG",{src:!0,alt:!0,class:!0}),h=c(p),u=k(p,"DIV",{});var q=I(u);g=k(q,"H3",{class:!0}),I(g).forEach(i),m=c(q),v=k(q,"P",{class:!0});var _=I(v);f=b(_,y),_.forEach(i),q.forEach(i),p.forEach(i),o.forEach(i),this.h()},h(){D(a,"class","svelte-1as6e7t"),d.src!==(p=s[2].episodes_gql.episodeThumbnail.sourceUrl)&&D(d,"src",p),D(d,"alt",""),D(d,"class","svelte-1as6e7t"),D(g,"class","svelte-1as6e7t"),D(v,"class","svelte-1as6e7t"),D(r,"class","pagination-content-right svelte-1as6e7t")},m(o,i){n(o,e,i),M(e,a),M(a,l),M(e,t),M(e,r),M(r,d),M(r,h),M(r,u),M(u,g),g.innerHTML=H,M(u,m),M(u,v),M(v,f),q||(T=V(e,"click",s[3]),q=!0)},p(s,e){4&e&&d.src!==(p=s[2].episodes_gql.episodeThumbnail.sourceUrl)&&D(d,"src",p),4&e&&H!==(H=s[2].title+"")&&(g.innerHTML=H),4&e&&y!==(y=s[2].episodes_gql.information+"")&&$(f,y)},d(s){s&&i(e),q=!1,T()}}}function B(s){let e,a,l,t,r,d,p,h={ctx:s,current:null,token:null,pending:C,then:Y,catch:G,value:10};q(e=s[0],h);let u=s[1]&&F(s),g=s[2]&&Q(s);return{c(){h.block.c(),a=o(),l=_("div"),t=_("div"),r=_("div"),u&&u.c(),d=o(),p=_("div"),g&&g.c(),this.h()},l(s){h.block.l(s),a=c(s),l=k(s,"DIV",{class:!0});var e=I(l);t=k(e,"DIV",{class:!0});var o=I(t);r=k(o,"DIV",{class:!0});var n=I(r);u&&u.l(n),n.forEach(i),d=c(o),p=k(o,"DIV",{class:!0});var m=I(p);g&&g.l(m),m.forEach(i),o.forEach(i),e.forEach(i),this.h()},h(){D(r,"class","pagination-left svelte-1as6e7t"),D(p,"class","pagination-right svelte-1as6e7t"),D(t,"class","pagination-wrapper svelte-1as6e7t"),D(l,"class","common-wrapper")},m(s,e){h.block.m(s,h.anchor=e),h.mount=()=>a.parentNode,h.anchor=a,n(s,a,e),n(s,l,e),M(l,t),M(t,r),u&&u.m(r,null),M(t,d),M(t,p),g&&g.m(p,null)},p(a,l){if(s=a,h.ctx=s,1&l&&e!==(e=s[0])&&q(e,h));else{const e=s.slice();e[10]=h.resolved,h.block.p(e,l)}s[1]?u?u.p(s,l):(u=F(s),u.c(),u.m(r,null)):u&&(u.d(1),u=null),s[2]?g?g.p(s,l):(g=Q(s),g.c(),g.m(p,null)):g&&(g.d(1),g=null)},d(s){h.block.d(s),h.token=null,h=null,s&&i(a),s&&i(l),u&&u.d(),g&&g.d()}}}function J(s){let e,a,m;return a=new l({props:{$$slots:{default:[B]},$$scope:{ctx:s}}}),{c(){e=o(),t(a.$$.fragment),this.h()},l(s){r('[data-svelte="svelte-hqnabp"]',document.head).forEach(i),e=c(s),d(a.$$.fragment,s),this.h()},h(){document.title="Single Podcast"},m(s,l){n(s,e,l),p(a,s,l),m=!0},p(s,[e]){const l={};2055&e&&(l.$$scope={dirty:e,ctx:s}),a.$set(l)},i(s){m||(h(a.$$.fragment,s),m=!0)},o(s){u(a.$$.fragment,s),m=!1},d(s){s&&i(e),g(a,s)}}}async function K({params:s,query:e}){let a=s.slug;return{cache:await L.query({query:U,variables:{slug:a}}),episodes:await L.query({query:x}),slug:a}}function W(s,e,a){let l,o,{cache:t}=e,{episodes:r}=e,{slug:i}=e;m(async()=>{console.log("mount")}),v(()=>{console.log("beforeUpdate");const s=r.data.episodes.nodes,e=(t.data.episode,s.findIndex(s=>s.slug===i));a(2,o=s[e-1]||null),a(1,l=s[e+1]||null)}),f(()=>{console.log("afterUpdate")}),P(L,U,t.data);S(L,{query:U,variables:{slug:i}});return s.$set=s=>{"cache"in s&&a(0,t=s.cache),"episodes"in s&&a(5,r=s.episodes),"slug"in s&&a(6,i=s.slug)},s.$$.update=()=>{s.$$.dirty,s.$$.dirty},[t,l,o,async()=>{console.log({next:o}),await T("episodes/"+o.slug)},async()=>{console.log({prev:l}),await T("episodes/"+l.slug)},r,i]}export default class extends s{constructor(s){super(),e(this,s,W,J,a,{cache:0,episodes:5,slug:6})}}export{K as preload};
