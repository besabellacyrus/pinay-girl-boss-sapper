import{a as t,b as n,c as r,d as e,i as s,s as o,e as a,S as c,f,t as u,j as i,k as l,l as h,m as p,D as v,u as g,p as d,N as m,g as y,q as R,n as E,w as b,E as j,G as q}from"./client.7d563b89.js";function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,o=n(t);if(e){var a=n(this).constructor;s=Reflect.construct(o,arguments,a)}else s=o.apply(this,arguments);return r(this,s)}}function D(t,n,r){var e=t.slice();return e[1]=n[r],e}function L(t){var n,r,e,s,o=t[1].title+"";return{c:function(){n=f("li"),r=f("a"),e=u(o),this.h()},l:function(t){n=i(t,"LI",{});var s=l(n);r=i(s,"A",{rel:!0,href:!0});var a=l(r);e=h(a,o),a.forEach(p),s.forEach(p),this.h()},h:function(){v(r,"rel","prefetch"),v(r,"href",s="blog/"+t[1].slug)},m:function(t,s){g(t,n,s),d(n,r),d(r,e)},p:function(t,n){1&n&&o!==(o=t[1].title+"")&&m(e,o),1&n&&s!==(s="blog/"+t[1].slug)&&v(r,"href",s)},d:function(t){t&&p(n)}}}function S(t){for(var n,r,e,s,o,a=t[0],c=[],m=0;m<a.length;m+=1)c[m]=L(D(t,a,m));return{c:function(){n=y(),r=f("h1"),e=u("Recent posts"),s=y(),o=f("ul");for(var t=0;t<c.length;t+=1)c[t].c();this.h()},l:function(t){R('[data-svelte="svelte-hfp9t8"]',document.head).forEach(p),n=E(t),r=i(t,"H1",{});var a=l(r);e=h(a,"Recent posts"),a.forEach(p),s=E(t),o=i(t,"UL",{class:!0});for(var f=l(o),u=0;u<c.length;u+=1)c[u].l(f);f.forEach(p),this.h()},h:function(){document.title="Blog",v(o,"class","svelte-gi3qaz")},m:function(t,a){g(t,n,a),g(t,r,a),d(r,e),g(t,s,a),g(t,o,a);for(var f=0;f<c.length;f+=1)c[f].m(o,null)},p:function(t,n){var r=b(n,1)[0];if(1&r){var e;for(a=t[0],e=0;e<a.length;e+=1){var s=D(t,a,e);c[e]?c[e].p(s,r):(c[e]=L(s),c[e].c(),c[e].m(o,null))}for(;e<c.length;e+=1)c[e].d(1);c.length=a.length}},i:j,o:j,d:function(t){t&&p(n),t&&p(r),t&&p(s),t&&p(o),q(c,t)}}}function k(t){t.params,t.query;return this.fetch("blog.json").then((function(t){return t.json()})).then((function(t){return{posts:t}}))}function w(t,n,r){var e=n.posts;return t.$set=function(t){"posts"in t&&r(0,e=t.posts)},[e]}var z=function(n){t(f,c);var r=x(f);function f(t){var n;return e(this,f),n=r.call(this),s(a(n),t,w,S,o,{posts:0}),n}return f}();export default z;export{k as preload};
