import{_ as n,r as e,a as t,b as r,c as a,d as s,i as o,s as c,e as i,S as u,T as f,g as l,h as p,q as d,m as h,n as v,o as g,u as m,v as y,w as b,x as E,y as w,z as $,A as k,B as I,f as x,t as M,j as D,k as q,l as _,D as R,p as P,O as L,E as O,P as T,N as V,F as N,G as Y}from"./client.e1f1860a.js";import{s as S,_ as j,c as A,r as C,q as H}from"./svelte-apollo.es.5219f2f0.js";import{E as U,m as B}from"./moment.a5487535.js";function G(){var n=j(["\n  query MyQuery($last: Int, $before: String, $first: Int, $after: String) {\n    episodes(last: $last, first: $first, before: $before, after: $after) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        title\n        slug\n        date\n        id\n        episodes_gql {\n          duration\n          embed\n          episodeThumbnail {\n            sourceUrl\n          }\n          excerpt\n          information\n        }\n      }\n    }\n  }\n"]);return G=function(){return n},n}var J=S(G());function K(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var t,s=r(n);if(e){var o=r(this).constructor;t=Reflect.construct(s,arguments,o)}else t=s.apply(this,arguments);return a(this,t)}}function Q(n,e,t){var r=n.slice();return r[6]=e[t],r[8]=t,r}function W(n){return{c:O,l:O,m:O,p:O,d:O}}function z(n){var e,t;function r(n,e){return n[5].data?X:F}var a=r(n),s=a(n),o=n[5].data.episodes.pageInfo.hasNextPage&&nn(n);return{c:function(){s.c(),e=l(),t=x("div"),o&&o.c(),this.h()},l:function(n){s.l(n),e=v(n),t=D(n,"DIV",{class:!0});var r=q(t);o&&o.l(r),r.forEach(h),this.h()},h:function(){R(t,"class","load-more-wrapper")},m:function(n,r){s.m(n,r),m(n,e,r),m(n,t,r),o&&o.m(t,null)},p:function(n,c){a===(a=r(n))&&s?s.p(n,c):(s.d(1),(s=a(n))&&(s.c(),s.m(e.parentNode,e))),n[5].data.episodes.pageInfo.hasNextPage?o?o.p(n,c):((o=nn(n)).c(),o.m(t,null)):o&&(o.d(1),o=null)},d:function(n){s.d(n),n&&h(e),n&&h(t),o&&o.d()}}}function F(n){var e,t;return{c:function(){e=x("p"),t=M("ERROR!!")},l:function(n){e=D(n,"P",{});var r=q(e);t=_(r,"ERROR!!"),r.forEach(h)},m:function(n,r){m(n,e,r),P(e,t)},p:O,d:function(n){n&&h(e)}}}function X(n){for(var e,t=n[5].data.episodes.nodes,r=[],a=0;a<t.length;a+=1)r[a]=Z(Q(n,t,a));return{c:function(){for(var n=0;n<r.length;n+=1)r[n].c();e=N()},l:function(n){for(var t=0;t<r.length;t+=1)r[t].l(n);e=N()},m:function(n,t){for(var a=0;a<r.length;a+=1)r[a].m(n,t);m(n,e,t)},p:function(n,a){if(1&a){var s;for(t=n[5].data.episodes.nodes,s=0;s<t.length;s+=1){var o=Q(n,t,s);r[s]?r[s].p(o,a):(r[s]=Z(o),r[s].c(),r[s].m(e.parentNode,e))}for(;s<r.length;s+=1)r[s].d(1);r.length=t.length}},d:function(n){Y(r,n),n&&h(e)}}}function Z(n){var e,t,r,a,s,o,c,i,u,f,p,d,g,y,b,E,w,$,k,I=n[6].title+"",L=n[6].episodes_gql.excerpt+"",O=B(n[6].date).format("MMMM Do, YYYY")+"",T=n[6].episodes_gql.duration+"";return{c:function(){e=x("a"),t=x("div"),r=x("div"),a=x("img"),o=l(),c=x("div"),i=x("h1"),u=l(),f=x("p"),p=M(L),d=l(),g=x("div"),y=x("small"),b=M(O),E=M(" - "),w=M(T),$=l(),this.h()},l:function(n){e=D(n,"A",{href:!0});var s=q(e);t=D(s,"DIV",{class:!0});var l=q(t);r=D(l,"DIV",{class:!0});var m=q(r);a=D(m,"IMG",{src:!0,alt:!0}),m.forEach(h),o=v(l),c=D(l,"DIV",{class:!0});var k=q(c);i=D(k,"H1",{class:!0}),q(i).forEach(h),u=v(k),f=D(k,"P",{});var I=q(f);p=_(I,L),I.forEach(h),d=v(k),g=D(k,"DIV",{});var x=q(g);y=D(x,"SMALL",{});var M=q(y);b=_(M,O),E=_(M," - "),w=_(M,T),M.forEach(h),x.forEach(h),k.forEach(h),l.forEach(h),$=v(s),s.forEach(h),this.h()},h:function(){a.src!==(s=n[6].episodes_gql.episodeThumbnail.sourceUrl)&&R(a,"src",s),R(a,"alt",""),R(r,"class","podcast-img-wrapper svelte-1a8popc"),R(i,"class","svelte-1a8popc"),R(c,"class","podcast-info-wrapper svelte-1a8popc"),R(t,"class","podcast-list-item svelte-1a8popc"),R(e,"href",k="episodes/"+n[6].slug)},m:function(n,s){m(n,e,s),P(e,t),P(t,r),P(r,a),P(t,o),P(t,c),P(c,i),i.innerHTML=I,P(c,u),P(c,f),P(f,p),P(c,d),P(c,g),P(g,y),P(y,b),P(y,E),P(y,w),P(e,$)},p:function(n,t){1&t&&a.src!==(s=n[6].episodes_gql.episodeThumbnail.sourceUrl)&&R(a,"src",s),1&t&&I!==(I=n[6].title+"")&&(i.innerHTML=I),1&t&&L!==(L=n[6].episodes_gql.excerpt+"")&&V(p,L),1&t&&O!==(O=B(n[6].date).format("MMMM Do, YYYY")+"")&&V(b,O),1&t&&T!==(T=n[6].episodes_gql.duration+"")&&V(w,T),1&t&&k!==(k="episodes/"+n[6].slug)&&R(e,"href",k)},d:function(n){n&&h(e)}}}function nn(n){var e,t,r,a;function s(){for(var e,t=arguments.length,r=new Array(t),a=0;a<t;a++)r[a]=arguments[a];return(e=n)[4].apply(e,[n[5]].concat(r))}return{c:function(){e=x("button"),t=M("Load More")},l:function(n){e=D(n,"BUTTON",{});var r=q(e);t=_(r,"Load More"),r.forEach(h)},m:function(n,o){m(n,e,o),P(e,t),r||(a=T(e,"click",s),r=!0)},p:function(e,t){n=e},d:function(n){n&&h(e),r=!1,a()}}}function en(n){var e,t;return{c:function(){e=x("p"),t=M("Loading...")},l:function(n){e=D(n,"P",{});var r=q(e);t=_(r,"Loading..."),r.forEach(h)},m:function(n,r){m(n,e,r),P(e,t)},p:O,d:function(n){n&&h(e)}}}function tn(n){var e,t,r,a,s,o,c,i,u,f,p,d,g={ctx:n,current:null,token:null,pending:en,then:z,catch:W,value:5};return I(d=n[0],g),{c:function(){e=x("div"),t=x("div"),r=x("div"),a=x("h1"),s=M("Our Episodes"),o=l(),c=x("p"),i=M("Join the Online Kwentuhan! We talk about anything and everything under\n          the sun - business, productivity, self-love, self-care, makeup,\n          workouts (or the lack of it), coffee, our love for essential oils,\n          daily struggles, life phases and transitions - no holds barred. Let’s\n          get inspired and learn from stories of our guests and let us know how\n          these stories resonate with you!"),u=l(),f=x("section"),p=x("div"),g.block.c(),this.h()},l:function(n){e=D(n,"DIV",{class:!0});var l=q(e);t=D(l,"DIV",{class:!0});var d=q(t);r=D(d,"DIV",{class:!0});var m=q(r);a=D(m,"H1",{class:!0});var y=q(a);s=_(y,"Our Episodes"),y.forEach(h),o=v(m),c=D(m,"P",{});var b=q(c);i=_(b,"Join the Online Kwentuhan! We talk about anything and everything under\n          the sun - business, productivity, self-love, self-care, makeup,\n          workouts (or the lack of it), coffee, our love for essential oils,\n          daily struggles, life phases and transitions - no holds barred. Let’s\n          get inspired and learn from stories of our guests and let us know how\n          these stories resonate with you!"),b.forEach(h),m.forEach(h),d.forEach(h),l.forEach(h),u=v(n),f=D(n,"SECTION",{});var E=q(f);p=D(E,"DIV",{class:!0});var w=q(p);g.block.l(w),w.forEach(h),E.forEach(h),this.h()},h:function(){R(a,"class","app-decor"),R(r,"class","center-section-wrapper"),R(t,"class","section-wrapper"),R(e,"class","app-division-wrapper font-white default-section-header\n      episode-main-bg svelte-1a8popc"),R(p,"class","podcast-lists-wrapper svelte-1a8popc")},m:function(n,l){m(n,e,l),P(e,t),P(t,r),P(r,a),P(a,s),P(r,o),P(r,c),P(c,i),m(n,u,l),m(n,f,l),P(f,p),g.block.m(p,g.anchor=null),g.mount=function(){return p},g.anchor=null},p:function(e,t){if(n=e,g.ctx=n,1&t&&d!==(d=n[0])&&I(d,g));else{var r=n.slice();r[5]=g.resolved,g.block.p(r,t)}},d:function(n){n&&h(e),n&&h(u),n&&h(f),g.block.d(),g.token=null,g=null}}}function rn(n){var e,t,r;return t=new f({props:{$$slots:{default:[tn]},$$scope:{ctx:n}}}),{c:function(){e=l(),p(t.$$.fragment),this.h()},l:function(n){d('[data-svelte="svelte-1afeobh"]',document.head).forEach(h),e=v(n),g(t.$$.fragment,n),this.h()},h:function(){document.title="Our Episodes"},m:function(n,a){m(n,e,a),y(t,n,a),r=!0},p:function(n,e){var r=b(e,1)[0],a={};513&r&&(a.$$scope={dirty:r,ctx:n}),t.$set(a)},i:function(n){r||(E(t.$$.fragment,n),r=!0)},o:function(n){w(t.$$.fragment,n),r=!1},d:function(n){n&&h(e),$(t,n)}}}function an(){return sn.apply(this,arguments)}function sn(){return(sn=n(e.mark((function n(){return e.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,A.query({query:U});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function on(t,r,a){var s,o=r.cache;C(A,U,o.data);var c=H(A,{query:J,variables:{first:5,before:null,after:null}});function i(n){return u.apply(this,arguments)}function u(){return(u=n(e.mark((function n(t){var r,a,s,o;return e.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=t.last,a=t.before,s=t.after,o=t.first,c.fetchMore({variables:{last:r,before:a,after:s,first:o},updateQuery:function(n,e){var t=e.fetchMoreResult;if(!t)return n;var r=t.episodes.nodes,a=t.episodes.pageInfo;return r.length?{episodes:{__typename:n.episodes.__typename,nodes:[].concat(L(n.episodes.nodes),L(r)),pageInfo:a}}:n}});case 2:case"end":return n.stop()}}),n)})))).apply(this,arguments)}k(t,c,(function(n){return a(0,s=n)}));return t.$set=function(n){"cache"in n&&a(3,o=n.cache)},[s,c,i,o,function(n){return i({first:5,after:null,before:n.data.episodes.pageInfo.endCursor})}]}var cn=function(n){t(r,u);var e=K(r);function r(n){var t;return s(this,r),t=e.call(this),o(i(t),n,on,rn,c,{cache:3}),t}return r}();export default cn;export{an as preload};
