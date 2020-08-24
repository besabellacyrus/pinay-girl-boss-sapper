'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var ApolloClient = require('apollo-boost');
var ApolloClient__default = _interopDefault(ApolloClient);
var fetch$1 = _interopDefault(require('node-fetch'));
var svelteApollo = require('svelte-apollo');
var moment = _interopDefault(require('moment'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://vercel.com/'>Vercel</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const LATEST_EPISODES = ApolloClient.gql`
   query MyQuery {
    episodes(last: 3) {
    nodes {
      episodes_gql {
        episodeThumbnail {
          sourceUrl
        }
        embed
      }
      title
      link
    }
  }
}
`;

var client = new ApolloClient__default({
  uri: 'http://pinaygirlboss.com/wp-api/graphql/',
  fetch: fetch$1,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

/* src\components\TransitionWrapper.svelte generated by Svelte v3.24.0 */

const css = {
	code: "div.svelte-1df7k4b{min-height:800px;position:relative}",
	map: "{\"version\":3,\"file\":\"TransitionWrapper.svelte\",\"sources\":[\"TransitionWrapper.svelte\"],\"sourcesContent\":[\"<script>\\nimport { onMount } from \\\"svelte\\\";\\nimport { fadeIn, fadeOut } from \\\"../lib/pageFade\\\";\\nlet show = false;\\n\\nonMount(() => {\\n  show = true;\\n});\\n</script>\\n\\n<style>\\ndiv {\\n  min-height: 800px;\\n  position: relative;\\n}</style>\\n\\n{#if show}\\n  <div in:fadeIn out:fadeOut>\\n    <slot />\\n  </div>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAWA,GAAG,eAAC,CAAC,AACH,UAAU,CAAE,KAAK,CACjB,QAAQ,CAAE,QAAQ,AACpB,CAAC\"}"
};

const TransitionWrapper = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let show = false;

	onMount(() => {
		show = true;
	});

	$$result.css.add(css);

	return `${show
	? `<div class="${"svelte-1df7k4b"}">${$$slots.default ? $$slots.default({}) : ``}</div>`
	: ``}`;
});

/* src\routes\index.svelte generated by Svelte v3.24.0 */

const css$1 = {
	code: "@media screen and (max-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (max-width: 425px){}@media screen and (min-width: 1025px){}@media screen and (max-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (max-width: 425px){}.player-wrapper.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{width:100%}.player-wrapper.svelte-1en2oig.svelte-1en2oig .player.svelte-1en2oig.svelte-1en2oig{height:13rem;background-color:#e3e3e3;border-radius:8px;margin:0 auto}@media screen and (min-width: 1024px){.player-wrapper.svelte-1en2oig.svelte-1en2oig .player.svelte-1en2oig.svelte-1en2oig{width:66%}}@media screen and (min-width: 1025px){}@media screen and (max-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (max-width: 425px){}@media screen and (min-width: 1025px){}@media screen and (max-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (max-width: 425px){}@media screen and (min-width: 1025px){}@media screen and (max-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (max-width: 425px){}@media screen and (min-width: 768px){}@media screen and (max-width: 425px){}.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{display:flex;justify-content:space-evenly;width:100%;padding:0 11rem}.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig img.svelte-1en2oig.svelte-1en2oig{height:20rem}@media screen and (max-width: 768px){.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{padding:0px 3rem}.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig img.svelte-1en2oig.svelte-1en2oig{height:12rem}}@media screen and (max-width: 425px){.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{justify-content:center;display:grid;grid-gap:3rem;padding:0}.featured-episodes-wrapper.svelte-1en2oig.svelte-1en2oig img.svelte-1en2oig.svelte-1en2oig{height:19rem}}@media screen and (min-width: 426px){.first-section-container.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{padding-top:20rem}}@media screen and (max-width: 425px){.first-section-container.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{padding-top:14rem}}.about-us-founders.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{display:flex;justify-content:space-evenly;align-items:center}@media screen and (max-width: 718px){.about-us-founders.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{display:grid;padding-left:1rem;padding-right:1rem;grid-gap:5rem}}.about-us-founders.svelte-1en2oig.svelte-1en2oig p.svelte-1en2oig.svelte-1en2oig{text-align:left}@media screen and (min-width: 426px){.about-us-founders.svelte-1en2oig.svelte-1en2oig p.svelte-1en2oig.svelte-1en2oig{width:32rem}}.about-us-founders.svelte-1en2oig.svelte-1en2oig img.svelte-1en2oig.svelte-1en2oig{height:21rem;margin:0 auto}.home-about-us.svelte-1en2oig.svelte-1en2oig h1.svelte-1en2oig.svelte-1en2oig{color:#25577d;margin-bottom:7rem}.home-about-us.svelte-1en2oig.svelte-1en2oig h3.svelte-1en2oig.svelte-1en2oig{color:#25577d;text-align:left;font-weight:bold;font-size:2.3rem;margin-bottom:1rem}.home-about-us.svelte-1en2oig.svelte-1en2oig .social-media.svelte-1en2oig.svelte-1en2oig{display:flex;height:2rem}.home-about-us.svelte-1en2oig .social-media.svelte-1en2oig>div.svelte-1en2oig{padding-right:1rem}.home-about-us.svelte-1en2oig.svelte-1en2oig .social-media img.svelte-1en2oig.svelte-1en2oig{height:100%}.home-contact-us.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{max-width:56rem;color:#fff}.first-image.svelte-1en2oig.svelte-1en2oig.svelte-1en2oig{width:143rem}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport client from \\\"../lib/apollo\\\";\\nimport { LATEST_EPISODES } from \\\"../queries/latestEpisodes\\\";\\n\\nexport async function preload() {\\n  return {\\n    cache: await client.query({\\n      query: LATEST_EPISODES,\\n    }),\\n  };\\n}\\n</script>\\n\\n<script>\\nimport TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\nimport { restore, query } from \\\"svelte-apollo\\\";\\n\\nexport let cache;\\n\\nrestore(client, LATEST_EPISODES, cache.data);\\n\\nconst latestEpisodes = query(client, {\\n  query: LATEST_EPISODES,\\n});\\n</script>\\n\\n<style lang=\\\"scss\\\">.first-section-bg {\\n  background-image: url(\\\"/img/home-bgs/section-one.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  top: 0;\\n  z-index: -1;\\n  width: 100%; }\\n  @media screen and (max-width: 1024px) {\\n    .first-section-bg {\\n      background-image: url(\\\"/img/1024/red-section.svg\\\"); } }\\n  @media screen and (max-width: 768px) {\\n    .first-section-bg {\\n      background-image: url(\\\"/img/768/red-section.svg\\\"); } }\\n  @media screen and (max-width: 425px) {\\n    .first-section-bg {\\n      background-image: url(\\\"/img/425/red-section.svg\\\"); } }\\n\\n.second-section-bg {\\n  background-image: url(\\\"/img/home-bgs/section-two.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  position: relative;\\n  z-index: -1; }\\n  @media screen and (min-width: 1025px) {\\n    .second-section-bg {\\n      background-position-x: -10rem; } }\\n  @media screen and (max-width: 1024px) {\\n    .second-section-bg {\\n      background-image: url(\\\"/img/1024/yellow-section.svg\\\"); } }\\n  @media screen and (max-width: 768px) {\\n    .second-section-bg {\\n      background-image: url(\\\"/img/768/yellow-section.svg\\\"); } }\\n  @media screen and (max-width: 425px) {\\n    .second-section-bg {\\n      background-image: url(\\\"/img/425/yellow-section.svg\\\"); } }\\n\\n.app-section-center {\\n  text-align: center; }\\n\\n.player-wrapper {\\n  width: 100%; }\\n  .player-wrapper .player {\\n    height: 13rem;\\n    background-color: #e3e3e3;\\n    border-radius: 8px;\\n    margin: 0 auto; }\\n    @media screen and (min-width: 1024px) {\\n      .player-wrapper .player {\\n        width: 66%; } }\\n    .player-wrapper .player iframe {\\n      width: 100%;\\n      height: 18rem; }\\n\\n.third-section-bg {\\n  background-image: url(\\\"/img/home-bgs/section-three.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  position: relative;\\n  z-index: -1; }\\n  @media screen and (min-width: 1025px) {\\n    .third-section-bg .section-wrapper {\\n      min-height: 186vh; } }\\n  @media screen and (max-width: 1024px) {\\n    .third-section-bg {\\n      background-image: url(\\\"/img/1024/blue-section.svg\\\"); } }\\n  @media screen and (max-width: 768px) {\\n    .third-section-bg {\\n      background-image: url(\\\"/img/768/blue-section.svg\\\"); } }\\n  @media screen and (max-width: 425px) {\\n    .third-section-bg {\\n      background-image: url(\\\"/img/425/blue-section.svg\\\");\\n      height: 124rem; } }\\n\\n.fourth-section-bg {\\n  background-image: url(\\\"/img/home-bgs/section-four.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  position: relative;\\n  z-index: -1; }\\n  @media screen and (min-width: 1025px) {\\n    .fourth-section-bg .section-wrapper {\\n      min-height: 126vh; } }\\n  @media screen and (max-width: 1024px) {\\n    .fourth-section-bg {\\n      background-image: url(\\\"/img/1024/grey-section.svg\\\"); } }\\n  @media screen and (max-width: 768px) {\\n    .fourth-section-bg {\\n      background-image: url(\\\"/img/768/grey-section.svg\\\"); } }\\n  @media screen and (max-width: 425px) {\\n    .fourth-section-bg {\\n      background-image: url(\\\"/img/425/grey-section.svg\\\"); } }\\n\\n.fifth-section-bg {\\n  background-image: url(\\\"/img/home-bgs/section-five.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  z-index: -1;\\n  position: relative; }\\n  @media screen and (min-width: 1025px) {\\n    .fifth-section-bg .section-wrapper {\\n      min-height: 89vh; } }\\n  @media screen and (max-width: 1024px) {\\n    .fifth-section-bg {\\n      background-image: url(\\\"/img/1024/red-section-contact.svg\\\"); } }\\n  @media screen and (max-width: 768px) {\\n    .fifth-section-bg {\\n      background-image: url(\\\"/img/768/red-section-contact.svg\\\"); } }\\n  @media screen and (max-width: 425px) {\\n    .fifth-section-bg {\\n      background-image: url(\\\"/img/425/red-section-contact.svg\\\"); } }\\n\\n.home-episodes-wrapper {\\n  text-align: center;\\n  width: 100%; }\\n  .home-episodes-wrapper h1 {\\n    padding: 0 3rem;\\n    margin: 0 auto; }\\n    @media screen and (min-width: 768px) {\\n      .home-episodes-wrapper h1 {\\n        width: 30ch;\\n        margin-top: 6rem; } }\\n    @media screen and (max-width: 425px) {\\n      .home-episodes-wrapper h1 {\\n        margin-top: 5rem; } }\\n\\n.featured-episodes-wrapper {\\n  display: flex;\\n  justify-content: space-evenly;\\n  width: 100%;\\n  padding: 0 11rem; }\\n  .featured-episodes-wrapper img {\\n    height: 20rem; }\\n  @media screen and (max-width: 768px) {\\n    .featured-episodes-wrapper {\\n      padding: 0px 3rem; }\\n      .featured-episodes-wrapper img {\\n        height: 12rem; } }\\n  @media screen and (max-width: 425px) {\\n    .featured-episodes-wrapper {\\n      justify-content: center;\\n      display: grid;\\n      grid-gap: 3rem;\\n      padding: 0; }\\n      .featured-episodes-wrapper img {\\n        height: 19rem; } }\\n\\n@media screen and (min-width: 426px) {\\n  .first-section-container {\\n    padding-top: 20rem; } }\\n\\n@media screen and (max-width: 425px) {\\n  .first-section-container {\\n    padding-top: 14rem; } }\\n\\n.about-us-founders {\\n  display: flex;\\n  justify-content: space-evenly;\\n  align-items: center; }\\n  @media screen and (max-width: 718px) {\\n    .about-us-founders {\\n      display: grid;\\n      padding-left: 1rem;\\n      padding-right: 1rem;\\n      grid-gap: 5rem; } }\\n  .about-us-founders p {\\n    text-align: left; }\\n    @media screen and (min-width: 426px) {\\n      .about-us-founders p {\\n        width: 32rem; } }\\n  .about-us-founders img {\\n    height: 21rem;\\n    margin: 0 auto; }\\n\\n.home-about-us h1 {\\n  color: #25577d;\\n  margin-bottom: 7rem; }\\n\\n.home-about-us h3 {\\n  color: #25577d;\\n  text-align: left;\\n  font-weight: bold;\\n  font-size: 2.3rem;\\n  margin-bottom: 1rem; }\\n\\n.home-about-us .social-media {\\n  display: flex;\\n  height: 2rem; }\\n  .home-about-us .social-media > div {\\n    padding-right: 1rem; }\\n  .home-about-us .social-media img {\\n    height: 100%; }\\n\\n.home-contact-us {\\n  max-width: 56rem;\\n  color: #fff; }\\n  .home-contact-us h1 {\\n    color: #fff;\\n    margin-bottom: 2rem; }\\n  .home-contact-us form {\\n    display: grid;\\n    margin: 0 auto; }\\n    .home-contact-us form input {\\n      height: 5rem;\\n      border-radius: 6px;\\n      margin-bottom: 2rem;\\n      color: #5d545d99;\\n      padding-left: 1rem; }\\n    .home-contact-us form button {\\n      margin: 0 auto;\\n      background-color: #fff;\\n      color: #f87e7d;\\n      height: 5rem;\\n      width: 16rem;\\n      border-radius: 26px; }\\n\\n.first-image {\\n  width: 143rem; }</style>\\n\\n<svelte:head>\\n  <title>Home</title>\\n  <script>\\n(function (w, d, t, s, n) {\\n  w.FlodeskObject = n;\\n  var fn = function () {\\n    (w[n].q = w[n].q || []).push(arguments);\\n  };\\n  w[n] = w[n] || fn;\\n  var f = d.getElementsByTagName(t)[0];\\n  var e = d.createElement(t);\\n  var h = \\\"?v=\\\" + new Date().getTime();\\n  e.async = true;\\n  e.src = s + h;\\n  f.parentNode.insertBefore(e, f);\\n})(\\n  window,\\n  document,\\n  \\\"script\\\",\\n  \\\"https://assets.flodesk.com/universal.js\\\",\\n  \\\"fd\\\"\\n);\\n  </script>\\n</svelte:head>\\n<TransitionWrapper>\\n  <div class=\\\"main-wrap\\\">\\n    <figure class=\\\"app-img-figure\\\">\\n      <img src=\\\"/img/home-bgs/section-one.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper\\\">\\n      <div class=\\\"section-wrapper first-section-container\\\">\\n        <div>\\n          <h1 class=\\\"app-decor\\\">Hello! Welcome to Pinay Girl Boss</h1>\\n          <p>\\n            We are a podcast and you can find us by searching Pinay Girl Boss on\\n            Spotify and Apple Podcast.\\n          </p>\\n          <div class=\\\"app-btn mt-10\\\">\\n            <a href=\\\"episodes\\\">\\n\\n              <button>\\n                <span>Listen to our Podcast</span>\\n                <span>\\n                  <svg\\n                    id=\\\"rss\\\"\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n                    width=\\\"17.5\\\"\\n                    height=\\\"17.5\\\"\\n                    viewBox=\\\"0 0 17.5 17.5\\\">\\n                    <g\\n                      id=\\\"Group_54\\\"\\n                      data-name=\\\"Group 54\\\"\\n                      transform=\\\"translate(0 12.672)\\\">\\n                      <g\\n                        id=\\\"Group_53\\\"\\n                        data-name=\\\"Group 53\\\"\\n                        transform=\\\"translate(0 0)\\\">\\n                        <circle\\n                          id=\\\"Ellipse_8\\\"\\n                          data-name=\\\"Ellipse 8\\\"\\n                          cx=\\\"2.5\\\"\\n                          cy=\\\"2.5\\\"\\n                          r=\\\"2.5\\\"\\n                          transform=\\\"translate(0 -0.173)\\\"\\n                          fill=\\\"#fff\\\" />\\n                      </g>\\n                    </g>\\n                    <g\\n                      id=\\\"Group_56\\\"\\n                      data-name=\\\"Group 56\\\"\\n                      transform=\\\"translate(0 5.834)\\\">\\n                      <g id=\\\"Group_55\\\" data-name=\\\"Group 55\\\">\\n                        <path\\n                          id=\\\"Path_386\\\"\\n                          data-name=\\\"Path 386\\\"\\n                          d=\\\"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z\\\"\\n                          transform=\\\"translate(0 -149.344)\\\"\\n                          fill=\\\"#fff\\\" />\\n                      </g>\\n                    </g>\\n                    <g id=\\\"Group_58\\\" data-name=\\\"Group 58\\\">\\n                      <g id=\\\"Group_57\\\" data-name=\\\"Group 57\\\">\\n                        <path\\n                          id=\\\"Path_387\\\"\\n                          data-name=\\\"Path 387\\\"\\n                          d=\\\"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z\\\"\\n                          fill=\\\"#fff\\\" />\\n                      </g>\\n                    </g>\\n                  </svg>\\n                </span>\\n              </button>\\n            </a>\\n          </div>\\n        </div>\\n        <img class=\\\"first-image\\\" src=\\\"/img/woman-illustration-one.svg\\\" alt=\\\"\\\" />\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"main-wrap\\\">\\n    <figure class=\\\"app-img-figure\\\">\\n      <img src=\\\"/img/home-bgs/section-two.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper\\\">\\n      <div class=\\\"section-wrapper\\\">\\n        <img src=\\\"/img/woman-illustration-two.svg\\\" alt=\\\"\\\" />\\n        <div>\\n          <h1 class=\\\"app-decor\\\">We're Ready for You!</h1>\\n          <p>\\n            This is a virtual tambayan where we can all connect with each other,\\n            exchange ideas, talk about ANYTHING, ask questions, or just hang\\n            out. We are creating safe space for us to discuss being the boss of\\n            our own lives.\\n          </p>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"main-wrap\\\">\\n    <figure class=\\\"app-img-figure third-section\\\">\\n      <img src=\\\"/img/home-bgs/section-three.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper\\\">\\n      <div class=\\\"section-wrapper home-latest-episode-wrapper\\\">\\n        {#await $latestEpisodes}\\n          <p>Loading</p>\\n        {:then data}\\n          <div class=\\\"center-section-wrapper\\\">\\n            <h1 class=\\\"app-decor\\\">Listen to Our Podcast</h1>\\n            <p class=\\\"my-10\\\">Our Latest Episode</p>\\n            <div class=\\\"player-wrapper\\\">\\n              <div class=\\\"player\\\">\\n                {@html data.data.episodes.nodes[0].episodes_gql.embed}\\n              </div>\\n            </div>\\n            <p class=\\\"my-20\\\">More Episodes</p>\\n            <div class=\\\"featured-episodes-wrapper\\\">\\n              {#if data.data}\\n                {#each data.data.episodes.nodes as latest, i}\\n                  <a href={latest.link}>\\n                    <img\\n                      src={latest.episodes_gql.episodeThumbnail.sourceUrl}\\n                      alt={latest.title} />\\n                  </a>\\n                {/each}\\n              {/if}\\n            </div>\\n          </div>\\n        {/await}\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"main-wrap\\\">\\n    <figure class=\\\"app-img-figure fourth-section\\\">\\n      <img src=\\\"/img/home-bgs/section-four.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper\\\">\\n      <div class=\\\"section-wrapper\\\">\\n        <div class=\\\"center-section-wrapper home-about-us\\\">\\n          <h1 class=\\\"app-decor\\\">About Us</h1>\\n          <div class=\\\"about-us-founders\\\">\\n            <div>\\n              <img src=\\\"/img/founder-two.png\\\" alt=\\\"\\\" />\\n              <h3>Tina</h3>\\n              <p>\\n                I’m a 30-something mom of 2, a lawyer, an entrepreneur,\\n                community builder, essential oils, travel, and coffee lover, and\\n                wannabe fitmom, dancer, and videoke queen.\\n              </p>\\n              <div class=\\\"social-media\\\">\\n                <div>\\n                  <a\\n                    href=\\\" https://www.facebook.com/theoilnaturalproject\\\"\\n                    target=\\\"_blank\\\">\\n                    <img src=\\\"/img/facebook.svg\\\" alt=\\\"\\\" />\\n                  </a>\\n                </div>\\n                <div>\\n                  <a href=\\\"https://www.instagram.com/tina.dg_/\\\" target=\\\"_blank\\\">\\n                    <img src=\\\"/img/instagram.svg\\\" alt=\\\"\\\" />\\n                  </a>\\n                </div>\\n                <a href=\\\"\\\">\\n                  <img src=\\\"/img/linkedin.svg\\\" alt=\\\"\\\" />\\n                </a>\\n              </div>\\n            </div>\\n            <div>\\n              <img src=\\\"/img/founder-one.png\\\" alt=\\\"\\\" />\\n              <h3>Max</h3>\\n              <p>\\n                30 year old mom (& wife), Travel Junkie, Potterhead, Dessert\\n                Fiend, Essential Oil Fairy (haha!)\\n              </p>\\n              <div class=\\\"social-media\\\">\\n                <div>\\n                  <a\\n                    href=\\\" https://www.facebook.com/CertifiedOilers\\\"\\n                    target=\\\"_blank\\\">\\n                    <img src=\\\"/img/facebook.svg\\\" alt=\\\"\\\" />\\n                  </a>\\n                </div>\\n                <div>\\n                  <a\\n                    href=\\\"https://www.instagram.com/maxidoodle/\\\"\\n                    target=\\\"_blank\\\">\\n                    <img src=\\\"/img/instagram.svg\\\" alt=\\\"\\\" />\\n                  </a>\\n                </div>\\n                <div>\\n                  <a href=\\\"\\\">\\n                    <img src=\\\"/img/linkedin.svg\\\" alt=\\\"\\\" />\\n                  </a>\\n                </div>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"main-wrap fifth-section\\\">\\n    <figure class=\\\"app-img-figure\\\">\\n      <img src=\\\"/img/home-bgs/section-five.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper fifth-section-wrapper\\\">\\n      <div class=\\\"section-wrapper\\\">\\n        <div class=\\\"center-section-wrapper home-contact-us\\\">\\n          <div id=\\\"fd-form-5f3459b06267530026690ee8\\\" />\\n          <script>\\nwindow.fd(\\\"form\\\", {\\n  formId: \\\"5f3459b06267530026690ee8\\\",\\n  containerEl: \\\"#fd-form-5f3459b06267530026690ee8\\\",\\n});\\n          </script>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload() {
	return {
		cache: await client.query({ query: LATEST_EPISODES })
	};
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $latestEpisodes;
	let { cache } = $$props;
	svelteApollo.restore(client, LATEST_EPISODES, cache.data);
	const latestEpisodes = svelteApollo.query(client, { query: LATEST_EPISODES });
	$latestEpisodes = get_store_value(latestEpisodes);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$$result.css.add(css$1);
	$latestEpisodes = get_store_value(latestEpisodes);

	return `${($$result.head += `${($$result.title = `<title>Home</title>`, "")}<script>(function (w, d, t, s, n) {
  w.FlodeskObject = n;
  var fn = function () {
    (w[n].q = w[n].q || []).push(arguments);
  };
  w[n] = w[n] || fn;
  var f = d.getElementsByTagName(t)[0];
  var e = d.createElement(t);
  var h = "?v=" + new Date().getTime();
  e.async = true;
  e.src = s + h;
  f.parentNode.insertBefore(e, f);
})(
  window,
  document,
  "script",
  "https://assets.flodesk.com/universal.js",
  "fd"
);
  </script>`, "")}
${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `<div class="${"main-wrap"}"><figure class="${"app-img-figure"}"><img src="${"/img/home-bgs/section-one.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper"}"><div class="${"section-wrapper first-section-container svelte-1en2oig"}"><div><h1 class="${"app-decor"}">Hello! Welcome to Pinay Girl Boss</h1>
          <p>We are a podcast and you can find us by searching Pinay Girl Boss on
            Spotify and Apple Podcast.
          </p>
          <div class="${"app-btn mt-10"}"><a href="${"episodes"}"><button><span>Listen to our Podcast</span>
                <span><svg id="${"rss"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"17.5"}" height="${"17.5"}" viewBox="${"0 0 17.5 17.5"}"><g id="${"Group_54"}" data-name="${"Group 54"}" transform="${"translate(0 12.672)"}"><g id="${"Group_53"}" data-name="${"Group 53"}" transform="${"translate(0 0)"}"><circle id="${"Ellipse_8"}" data-name="${"Ellipse 8"}" cx="${"2.5"}" cy="${"2.5"}" r="${"2.5"}" transform="${"translate(0 -0.173)"}" fill="${"#fff"}"></circle></g></g><g id="${"Group_56"}" data-name="${"Group 56"}" transform="${"translate(0 5.834)"}"><g id="${"Group_55"}" data-name="${"Group 55"}"><path id="${"Path_386"}" data-name="${"Path 386"}" d="${"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"}" transform="${"translate(0 -149.344)"}" fill="${"#fff"}"></path></g></g><g id="${"Group_58"}" data-name="${"Group 58"}"><g id="${"Group_57"}" data-name="${"Group 57"}"><path id="${"Path_387"}" data-name="${"Path 387"}" d="${"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"}" fill="${"#fff"}"></path></g></g></svg></span></button></a></div></div>
        <img class="${"first-image svelte-1en2oig"}" src="${"/img/woman-illustration-one.svg"}" alt="${""}"></div></div></div>

  <div class="${"main-wrap"}"><figure class="${"app-img-figure"}"><img src="${"/img/home-bgs/section-two.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper"}"><div class="${"section-wrapper"}"><img src="${"/img/woman-illustration-two.svg"}" alt="${""}">
        <div><h1 class="${"app-decor"}">We&#39;re Ready for You!</h1>
          <p>This is a virtual tambayan where we can all connect with each other,
            exchange ideas, talk about ANYTHING, ask questions, or just hang
            out. We are creating safe space for us to discuss being the boss of
            our own lives.
          </p></div></div></div></div>

  <div class="${"main-wrap"}"><figure class="${"app-img-figure third-section"}"><img src="${"/img/home-bgs/section-three.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper"}"><div class="${"section-wrapper home-latest-episode-wrapper"}">${(function (__value) {
			if (is_promise(__value)) return `
          <p>Loading</p>
        `;

			return (function (data) {
				return `
          <div class="${"center-section-wrapper"}"><h1 class="${"app-decor"}">Listen to Our Podcast</h1>
            <p class="${"my-10"}">Our Latest Episode</p>
            <div class="${"player-wrapper svelte-1en2oig"}"><div class="${"player svelte-1en2oig"}">${data.data.episodes.nodes[0].episodes_gql.embed}</div></div>
            <p class="${"my-20"}">More Episodes</p>
            <div class="${"featured-episodes-wrapper svelte-1en2oig"}">${data.data
				? `${each(data.data.episodes.nodes, (latest, i) => `<a${add_attribute("href", latest.link, 0)}><img${add_attribute("src", latest.episodes_gql.episodeThumbnail.sourceUrl, 0)}${add_attribute("alt", latest.title, 0)} class="${"svelte-1en2oig"}">
                  </a>`)}`
				: ``}</div></div>
        `;
			})(__value);
		})($latestEpisodes)}</div></div></div>

  <div class="${"main-wrap"}"><figure class="${"app-img-figure fourth-section"}"><img src="${"/img/home-bgs/section-four.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper home-about-us svelte-1en2oig"}"><h1 class="${"app-decor svelte-1en2oig"}">About Us</h1>
          <div class="${"about-us-founders svelte-1en2oig"}"><div><img src="${"/img/founder-two.png"}" alt="${""}" class="${"svelte-1en2oig"}">
              <h3 class="${"svelte-1en2oig"}">Tina</h3>
              <p class="${"svelte-1en2oig"}">I’m a 30-something mom of 2, a lawyer, an entrepreneur,
                community builder, essential oils, travel, and coffee lover, and
                wannabe fitmom, dancer, and videoke queen.
              </p>
              <div class="${"social-media svelte-1en2oig"}"><div class="${"svelte-1en2oig"}"><a href="${" https://www.facebook.com/theoilnaturalproject"}" target="${"_blank"}"><img src="${"/img/facebook.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div>
                <div class="${"svelte-1en2oig"}"><a href="${"https://www.instagram.com/tina.dg_/"}" target="${"_blank"}"><img src="${"/img/instagram.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div>
                <a href="${""}"><img src="${"/img/linkedin.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div></div>
            <div><img src="${"/img/founder-one.png"}" alt="${""}" class="${"svelte-1en2oig"}">
              <h3 class="${"svelte-1en2oig"}">Max</h3>
              <p class="${"svelte-1en2oig"}">30 year old mom (&amp; wife), Travel Junkie, Potterhead, Dessert
                Fiend, Essential Oil Fairy (haha!)
              </p>
              <div class="${"social-media svelte-1en2oig"}"><div class="${"svelte-1en2oig"}"><a href="${" https://www.facebook.com/CertifiedOilers"}" target="${"_blank"}"><img src="${"/img/facebook.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div>
                <div class="${"svelte-1en2oig"}"><a href="${"https://www.instagram.com/maxidoodle/"}" target="${"_blank"}"><img src="${"/img/instagram.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div>
                <div class="${"svelte-1en2oig"}"><a href="${""}"><img src="${"/img/linkedin.svg"}" alt="${""}" class="${"svelte-1en2oig"}"></a></div></div></div></div></div></div></div></div>

  <div class="${"main-wrap fifth-section"}"><figure class="${"app-img-figure"}"><img src="${"/img/home-bgs/section-five.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper fifth-section-wrapper"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper home-contact-us svelte-1en2oig"}"><div id="${"fd-form-5f3459b06267530026690ee8"}"></div>
          <script>window.fd("form", {
  formId: "5f3459b06267530026690ee8",
  containerEl: "#fd-form-5f3459b06267530026690ee8",
});
          </script></div></div></div></div>`
	})}`;
});

const RESOURCES = ApolloClient.gql`
    query MyQuery {
    resources {
      nodes {
        resources_gql {
          description
          file {
            mediaItemUrl
          }
          thumbnail {
            sourceUrl
          }
        }
        slug
        title
      }
    }
  }
`;

/* src\routes\resources.svelte generated by Svelte v3.24.0 */

const css$2 = {
	code: ".download-wrapper.svelte-mqz5kp h2.svelte-mqz5kp{font-size:2.5rem;font-weight:bold;margin-bottom:4rem;color:#25577d}.download-items.svelte-mqz5kp.svelte-mqz5kp{min-height:35rem}.download-item.svelte-mqz5kp.svelte-mqz5kp{margin-bottom:2rem}.resources-main-bg.svelte-mqz5kp.svelte-mqz5kp{background-image:url(\"/img/resource-header.svg\")}",
	map: "{\"version\":3,\"file\":\"resources.svelte\",\"sources\":[\"resources.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport client from \\\"../lib/apollo\\\";\\nimport { RESOURCES } from \\\"../queries/resources\\\";\\n\\nexport async function preload() {\\n  return {\\n    cache: await client.query({\\n      query: RESOURCES\\n    })\\n  };\\n}\\n</script>\\n\\n<script>\\nimport TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\nimport { restore, query } from \\\"svelte-apollo\\\";\\n\\nexport let cache;\\n\\nrestore(client, RESOURCES, cache.data);\\n\\nconst resources = query(client, {\\n  query: RESOURCES\\n});\\n</script>\\n\\n<style lang=\\\"scss\\\">.resource-wrapper p,\\n.resource-wrapper h1 {\\n  color: #fff; }\\n\\n.download-wrapper h2 {\\n  font-size: 2.5rem;\\n  font-weight: bold;\\n  margin-bottom: 4rem;\\n  color: #25577d; }\\n\\n.subscribe-wrapper {\\n  max-width: 1024px;\\n  margin: 0 auto;\\n  margin-bottom: 5rem; }\\n\\n.download-items {\\n  min-height: 35rem; }\\n\\n.download-item {\\n  margin-bottom: 2rem; }\\n\\n.resources-main-bg {\\n  background-image: url(\\\"/img/resource-header.svg\\\"); }</style>\\n\\n<svelte:head>\\n  <title>Resources</title>\\n  <script>\\n(function(w, d, t, s, n) {\\n  w.FlodeskObject = n;\\n  var fn = function() {\\n    (w[n].q = w[n].q || []).push(arguments);\\n  };\\n  w[n] = w[n] || fn;\\n  var f = d.getElementsByTagName(t)[0];\\n  var e = d.createElement(t);\\n  var h = \\\"?v=\\\" + new Date().getTime();\\n  e.async = true;\\n  e.src = s + h;\\n  f.parentNode.insertBefore(e, f);\\n})(\\n  window,\\n  document,\\n  \\\"script\\\",\\n  \\\"https://assets.flodesk.com/universal.js\\\",\\n  \\\"fd\\\"\\n);\\n  </script>\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  <div\\n    class=\\\"app-division-wrapper default-section-header font-white\\n    resources-main-bg\\\">\\n    <div class=\\\"section-wrapper\\\">\\n      <div class=\\\"center-section-wrapper\\\">\\n        <h1 class=\\\"app-decor\\\">Resources</h1>\\n        <p>\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,\\n          nostrum! Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum\\n          odit excepturi voluptas ad!\\n        </p>\\n      </div>\\n    </div>\\n  </div>\\n  <div class=\\\"plain-wrapper\\\">\\n    <div class=\\\"download-wrapper\\\">\\n      <h2>Downloads</h2>\\n      <div class=\\\"download-items\\\">\\n        {#await $resources}\\n          <p>Loading</p>\\n        {:then data}\\n          {#if data.data}\\n            {#each data.data.resources.nodes as resource, i}\\n              <div>\\n                <div class=\\\"download-item\\\">\\n                  <img\\n                    src={resource.resources_gql.thumbnail.sourceUrl}\\n                    alt=\\\"\\\" />\\n                  <div>\\n                    <h3>\\n                      {@html resource.title}\\n                    </h3>\\n                    <p>{resource.resources_gql.description}</p>\\n                  </div>\\n                  <div>\\n                    <a\\n                      href={resource.resources_gql.file.mediaItemUrl}\\n                      target=\\\"_blank\\\">\\n                      <button>Download</button>\\n                    </a>\\n                  </div>\\n                </div>\\n                <hr />\\n              </div>\\n            {/each}\\n          {/if}\\n        {/await}\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"main-wrap fifth-section\\\">\\n    <figure class=\\\"app-img-figure\\\">\\n      <img src=\\\"/img/resources-bg.svg\\\" alt=\\\"\\\" />\\n    </figure>\\n    <div class=\\\"app-division-wrapper fifth-section-wrapper\\\">\\n      <div class=\\\"section-wrapper\\\">\\n        <div class=\\\"center-section-wrapper home-contact-us\\\">\\n          <div id=\\\"fd-form-5f3459b06267530026690ee8\\\" />\\n          <script>\\nwindow.fd(\\\"form\\\", {\\n  formId: \\\"5f3459b06267530026690ee8\\\",\\n  containerEl: \\\"#fd-form-5f3459b06267530026690ee8\\\"\\n});\\n          </script>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"AA8BA,+BAAiB,CAAC,EAAE,cAAC,CAAC,AACpB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,OAAO,AAAE,CAAC,AAOnB,eAAe,4BAAC,CAAC,AACf,UAAU,CAAE,KAAK,AAAE,CAAC,AAEtB,cAAc,4BAAC,CAAC,AACd,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,kBAAkB,4BAAC,CAAC,AAClB,gBAAgB,CAAE,IAAI,0BAA0B,CAAC,AAAE,CAAC\"}"
};

async function preload$1() {
	return {
		cache: await client.query({ query: RESOURCES })
	};
}

const Resources = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $resources;
	let { cache } = $$props;
	svelteApollo.restore(client, RESOURCES, cache.data);
	const resources = svelteApollo.query(client, { query: RESOURCES });
	$resources = get_store_value(resources);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$$result.css.add(css$2);
	$resources = get_store_value(resources);

	return `${($$result.head += `${($$result.title = `<title>Resources</title>`, "")}<script>(function(w, d, t, s, n) {
  w.FlodeskObject = n;
  var fn = function() {
    (w[n].q = w[n].q || []).push(arguments);
  };
  w[n] = w[n] || fn;
  var f = d.getElementsByTagName(t)[0];
  var e = d.createElement(t);
  var h = "?v=" + new Date().getTime();
  e.async = true;
  e.src = s + h;
  f.parentNode.insertBefore(e, f);
})(
  window,
  document,
  "script",
  "https://assets.flodesk.com/universal.js",
  "fd"
);
  </script>`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `<div class="${"app-division-wrapper default-section-header font-white\n    resources-main-bg svelte-mqz5kp"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper"}"><h1 class="${"app-decor"}">Resources</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          nostrum! Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum
          odit excepturi voluptas ad!
        </p></div></div></div>
  <div class="${"plain-wrapper"}"><div class="${"download-wrapper svelte-mqz5kp"}"><h2 class="${"svelte-mqz5kp"}">Downloads</h2>
      <div class="${"download-items svelte-mqz5kp"}">${(function (__value) {
			if (is_promise(__value)) return `
          <p>Loading</p>
        `;

			return (function (data) {
				return `
          ${data.data
				? `${each(data.data.resources.nodes, (resource, i) => `<div><div class="${"download-item svelte-mqz5kp"}"><img${add_attribute("src", resource.resources_gql.thumbnail.sourceUrl, 0)} alt="${""}">
                  <div><h3>${resource.title}</h3>
                    <p>${escape(resource.resources_gql.description)}</p></div>
                  <div><a${add_attribute("href", resource.resources_gql.file.mediaItemUrl, 0)} target="${"_blank"}"><button>Download</button></a>
                  </div></div>
                <hr>
              </div>`)}`
				: ``}
        `;
			})(__value);
		})($resources)}</div></div></div>

  <div class="${"main-wrap fifth-section"}"><figure class="${"app-img-figure"}"><img src="${"/img/resources-bg.svg"}" alt="${""}"></figure>
    <div class="${"app-division-wrapper fifth-section-wrapper"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper home-contact-us"}"><div id="${"fd-form-5f3459b06267530026690ee8"}"></div>
          <script>window.fd("form", {
  formId: "5f3459b06267530026690ee8",
  containerEl: "#fd-form-5f3459b06267530026690ee8"
});
          </script></div></div></div></div>`
	})}`;
});

const PAGINATED_EPISODES = ApolloClient.gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    episodes(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

const EPISODES = ApolloClient.gql`
  query MyQuery {
    episodes {
      nodes {
        title
        slug
        date
        id
        episodes_gql {
          duration
          embed
          episodeThumbnail {
            sourceUrl
          }
          excerpt
          information
        }
      }
    }
  }
`;

/* src\routes\episodes\index.svelte generated by Svelte v3.24.0 */

const css$3 = {
	code: "@media screen and (min-width: 981px){.podcast-lists-wrapper.svelte-1a8popc.svelte-1a8popc.svelte-1a8popc{width:96rem}}@media screen and (min-width: 426px){.podcast-lists-wrapper.svelte-1a8popc.svelte-1a8popc.svelte-1a8popc{margin:0 auto;padding:4rem}}.podcast-lists-wrapper.svelte-1a8popc.svelte-1a8popc .podcast-list-item.svelte-1a8popc.svelte-1a8popc{display:grid;grid-template-columns:0.2fr 1fr;margin-bottom:6rem;grid-gap:4rem}@media screen and (max-width: 425px){.podcast-lists-wrapper.svelte-1a8popc.svelte-1a8popc .podcast-list-item.svelte-1a8popc.svelte-1a8popc{grid-template-columns:initial;text-align:center;padding:0 4rem}}@media screen and (max-width: 425px){.podcast-lists-wrapper.svelte-1a8popc.svelte-1a8popc .podcast-list-item .podcast-img-wrapper.svelte-1a8popc.svelte-1a8popc{margin:0 auto}}.podcast-lists-wrapper.svelte-1a8popc .podcast-list-item .podcast-info-wrapper.svelte-1a8popc>h1.svelte-1a8popc{font-size:2rem;color:inherit;line-height:1.2em;margin-bottom:1rem}.episode-main-bg.svelte-1a8popc.svelte-1a8popc.svelte-1a8popc{background-image:url(\"/img/episode-main-bg.svg\")}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport client from \\\"../../lib/apollo\\\";\\nimport { EPISODES } from \\\"../../queries/episodes\\\";\\nimport { PAGINATED_EPISODES } from \\\"../../queries/paginatedEpisodes\\\";\\nconst initial = {\\n  after: null,\\n  first: 3,\\n  before: null,\\n  last: null,\\n};\\nexport async function preload() {\\n  return {\\n    cache: await client.query({\\n      query: EPISODES,\\n    }),\\n    paginated: await client.query({\\n      query: PAGINATED_EPISODES,\\n      variables: initial,\\n    }),\\n  };\\n}\\n</script>\\n\\n<script>\\nimport TransitionWrapper from \\\"../../components/TransitionWrapper.svelte\\\";\\nimport { restore, query } from \\\"svelte-apollo\\\";\\nimport { fly } from \\\"svelte/transition\\\";\\nimport { fade } from \\\"svelte/transition\\\";\\nimport moment from \\\"moment\\\";\\n\\nexport let cache;\\nexport let paginated;\\nrestore(client, EPISODES, cache.data);\\n\\nconst episodes = query(client, {\\n  query: EPISODES,\\n});\\nconst cc = paginated.data.episodes.edges[0];\\n\\nconsole.log({ paginated: paginated.data.episodes.edges.indexOf(cc) });\\n</script>\\n\\n<style lang=\\\"scss\\\">@media screen and (min-width: 981px) {\\n  .podcast-lists-wrapper {\\n    width: 96rem; } }\\n\\n@media screen and (min-width: 426px) {\\n  .podcast-lists-wrapper {\\n    margin: 0 auto;\\n    padding: 4rem; } }\\n\\n.podcast-lists-wrapper .podcast-list-item {\\n  display: grid;\\n  grid-template-columns: 0.2fr 1fr;\\n  margin-bottom: 6rem;\\n  grid-gap: 4rem; }\\n  @media screen and (max-width: 425px) {\\n    .podcast-lists-wrapper .podcast-list-item {\\n      grid-template-columns: initial;\\n      text-align: center;\\n      padding: 0 4rem; } }\\n  @media screen and (max-width: 425px) {\\n    .podcast-lists-wrapper .podcast-list-item .podcast-img-wrapper {\\n      margin: 0 auto; } }\\n  .podcast-lists-wrapper .podcast-list-item .podcast-info-wrapper > h1 {\\n    font-size: 2rem;\\n    color: inherit;\\n    line-height: 1.2em;\\n    margin-bottom: 1rem; }\\n\\n.episode-main-bg {\\n  background-image: url(\\\"/img/episode-main-bg.svg\\\"); }</style>\\n\\n<svelte:head>\\n  <title>Our Episodes</title>\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  <div\\n    class=\\\"app-division-wrapper font-white default-section-header\\n    episode-main-bg\\\">\\n    <div class=\\\"section-wrapper\\\">\\n      <div class=\\\"center-section-wrapper\\\">\\n        <h1 class=\\\"app-decor\\\">Our Episodes</h1>\\n        <p>\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,\\n          nostrum! Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum\\n          odit excepturi voluptas ad!\\n        </p>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <section>\\n    <div class=\\\"podcast-lists-wrapper\\\">\\n      {#await $episodes}\\n        <p>Loading...</p>\\n      {:then data}\\n        {#if data.data}\\n          {#each data.data.episodes.nodes as episode, i}\\n            <a href=\\\"episodes/{episode.slug}\\\">\\n              <div class=\\\"podcast-list-item\\\">\\n                <div class=\\\"podcast-img-wrapper\\\">\\n                  <img\\n                    src={episode.episodes_gql.episodeThumbnail.sourceUrl}\\n                    alt=\\\"\\\" />\\n                </div>\\n                <div class=\\\"podcast-info-wrapper\\\">\\n                  <h1>\\n                    {@html episode.title}\\n                  </h1>\\n                  <p>{episode.episodes_gql.excerpt}</p>\\n                  <div>\\n                    <small>\\n                      {moment(episode.date).format('MMMM Do, YYYY')} - {episode.episodes_gql.duration}\\n                    </small>\\n                  </div>\\n                </div>\\n              </div>\\n            </a>\\n          {/each}\\n        {:else}\\n          <p>ERROR!!</p>\\n        {/if}\\n      {/await}\\n    </div>\\n  </section>\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"AA0CmB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACvD,sBAAsB,6CAAC,CAAC,AACtB,KAAK,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAErB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,sBAAsB,6CAAC,CAAC,AACtB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEtB,oDAAsB,CAAC,kBAAkB,8BAAC,CAAC,AACzC,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,GAAG,CAChC,aAAa,CAAE,IAAI,CACnB,QAAQ,CAAE,IAAI,AAAE,CAAC,AACjB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,oDAAsB,CAAC,kBAAkB,8BAAC,CAAC,AACzC,qBAAqB,CAAE,OAAO,CAC9B,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC,AACxB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,oDAAsB,CAAC,kBAAkB,CAAC,oBAAoB,8BAAC,CAAC,AAC9D,MAAM,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC,AAAC,CAAC,AACvB,qCAAsB,CAAC,kBAAkB,CAAC,oCAAqB,CAAG,EAAE,eAAC,CAAC,AACpE,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,KAAK,CAClB,aAAa,CAAE,IAAI,AAAE,CAAC,AAE1B,gBAAgB,6CAAC,CAAC,AAChB,gBAAgB,CAAE,IAAI,0BAA0B,CAAC,AAAE,CAAC\"}"
};

const initial = {
	after: null,
	first: 3,
	before: null,
	last: null
};

async function preload$2() {
	return {
		cache: await client.query({ query: EPISODES }),
		paginated: await client.query({
			query: PAGINATED_EPISODES,
			variables: initial
		})
	};
}

const Episodes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $episodes;
	let { cache } = $$props;
	let { paginated } = $$props;
	svelteApollo.restore(client, EPISODES, cache.data);
	const episodes = svelteApollo.query(client, { query: EPISODES });
	$episodes = get_store_value(episodes);
	const cc = paginated.data.episodes.edges[0];

	console.log({
		paginated: paginated.data.episodes.edges.indexOf(cc)
	});

	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.paginated === void 0 && $$bindings.paginated && paginated !== void 0) $$bindings.paginated(paginated);
	$$result.css.add(css$3);
	$episodes = get_store_value(episodes);

	return `${($$result.head += `${($$result.title = `<title>Our Episodes</title>`, "")}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `<div class="${"app-division-wrapper font-white default-section-header\n    episode-main-bg svelte-1a8popc"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper"}"><h1 class="${"app-decor"}">Our Episodes</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          nostrum! Blanditiis eligendi tenetur, ipsum cum amet natus ab laborum
          odit excepturi voluptas ad!
        </p></div></div></div>

  <section><div class="${"podcast-lists-wrapper svelte-1a8popc"}">${(function (__value) {
			if (is_promise(__value)) return `
        <p>Loading...</p>
      `;

			return (function (data) {
				return `
        ${data.data
				? `${each(data.data.episodes.nodes, (episode, i) => `<a href="${"episodes/" + escape(episode.slug)}"><div class="${"podcast-list-item svelte-1a8popc"}"><div class="${"podcast-img-wrapper svelte-1a8popc"}"><img${add_attribute("src", episode.episodes_gql.episodeThumbnail.sourceUrl, 0)} alt="${""}"></div>
                <div class="${"podcast-info-wrapper svelte-1a8popc"}"><h1 class="${"svelte-1a8popc"}">${episode.title}</h1>
                  <p>${escape(episode.episodes_gql.excerpt)}</p>
                  <div><small>${escape(moment(episode.date).format("MMMM Do, YYYY"))} - ${escape(episode.episodes_gql.duration)}
                    </small></div>
                </div></div>
            </a>`)}`
				: `<p>ERROR!!</p>`}
      `;
			})(__value);
		})($episodes)}</div></section>`
	})}`;
});

const EPISODE = ApolloClient.gql`
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
`;

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src\components\Nav.svelte generated by Svelte v3.24.0 */

const css$4 = {
	code: "nav.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{position:absolute;transform:translate(-50%);left:50%;z-index:999999}@media screen and (max-width: 425px){nav.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{left:50%;transform:translate(-50%, 0)}}.menu-wrapper.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{display:flex}@media screen and (max-width: 696px){.menu-desktop.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{display:none}}.menu-icon.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{display:none}@media screen and (max-width: 696px){.menu-icon.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{display:block;height:100%;width:3.5rem}.menu-icon.svelte-11bxmgm.svelte-11bxmgm svg.svelte-11bxmgm.svelte-11bxmgm{fill:#25577d}}.mobile-open.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{left:0 !important}.mobile-menu.svelte-11bxmgm.svelte-11bxmgm.svelte-11bxmgm{height:100%;width:100%;transition:left 300ms ease;left:-9900px;top:0;background-color:#fff;position:absolute;z-index:9;padding:2rem;display:flex;z-index:99999999999;height:100vh;position:fixed}.mobile-menu.svelte-11bxmgm.svelte-11bxmgm .close-btn.svelte-11bxmgm.svelte-11bxmgm{position:absolute;right:17px;width:2rem}.mobile-menu.svelte-11bxmgm.svelte-11bxmgm .close-btn svg.svelte-11bxmgm.svelte-11bxmgm{fill:#25577d}.mobile-menu.svelte-11bxmgm.svelte-11bxmgm ul.svelte-11bxmgm.svelte-11bxmgm{display:flex;flex-direction:column;justify-content:center}.mobile-menu.svelte-11bxmgm ul.svelte-11bxmgm li.svelte-11bxmgm{display:flex;justify-content:flex-start;margin:1rem 0}.mobile-menu.svelte-11bxmgm.svelte-11bxmgm .mobile-menu-items.svelte-11bxmgm.svelte-11bxmgm{display:flex;flex-direction:column;place-content:center}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\nexport let segment;\\nlet isMobileMenu = false;\\n\\nfunction toggleMenu() {\\n  isMobileMenu = !isMobileMenu;\\n}\\n</script>\\n\\n<style lang=\\\"scss\\\">nav {\\n  position: absolute;\\n  transform: translate(-50%);\\n  left: 50%;\\n  z-index: 999999; }\\n  @media screen and (max-width: 425px) {\\n    nav {\\n      left: 50%;\\n      transform: translate(-50%, 0); } }\\n\\n.menu-wrapper {\\n  display: flex; }\\n\\n@media screen and (max-width: 696px) {\\n  .menu-desktop {\\n    display: none; } }\\n\\n.menu-icon {\\n  display: none; }\\n  @media screen and (max-width: 696px) {\\n    .menu-icon {\\n      display: block;\\n      height: 100%;\\n      width: 3.5rem; }\\n      .menu-icon svg {\\n        fill: #25577d; } }\\n\\n.mobile-open {\\n  left: 0 !important; }\\n\\n.mobile-menu {\\n  height: 100%;\\n  width: 100%;\\n  transition: left 300ms ease;\\n  left: -9900px;\\n  top: 0;\\n  background-color: #fff;\\n  position: absolute;\\n  z-index: 9;\\n  padding: 2rem;\\n  display: flex;\\n  z-index: 99999999999;\\n  height: 100vh;\\n  position: fixed; }\\n  .mobile-menu .close-btn {\\n    position: absolute;\\n    right: 17px;\\n    width: 2rem; }\\n    .mobile-menu .close-btn svg {\\n      fill: #25577d; }\\n  .mobile-menu ul {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center; }\\n    .mobile-menu ul li {\\n      display: flex;\\n      justify-content: flex-start;\\n      margin: 1rem 0; }\\n  .mobile-menu .mobile-menu-items {\\n    display: flex;\\n    flex-direction: column;\\n    place-content: center; }</style>\\n\\n<nav>\\n  <div class=\\\"logo-wrapper\\\">\\n    <a href=\\\"/\\\">\\n      <img src=\\\"/pgn_logo.svg\\\" alt=\\\"\\\" />\\n    </a>\\n  </div>\\n  <div class=\\\"menu-desktop menu-wrapper\\\">\\n    <ul>\\n      <li aria-current={segment === undefined ? 'page' : undefined}>\\n        <a rel=\\\"prefetch\\\" href=\\\"/\\\">Home</a>\\n      </li>\\n      <li aria-current={segment === 'episodes' ? 'page' : undefined}>\\n        <a rel=\\\"prefetch\\\" href=\\\"episodes\\\">Episodes</a>\\n      </li>\\n      <li aria-current={segment === 'about' ? 'page' : undefined}>\\n        <a rel=\\\"prefetch\\\" href=\\\"about\\\">About</a>\\n      </li>\\n      <li aria-current={segment === 'resources' ? 'page' : undefined}>\\n        <a rel=\\\"prefetch\\\" href=\\\"resources\\\">Resources</a>\\n      </li>\\n      <li aria-current={segment === 'contact' ? 'page' : undefined}>\\n        <a rel=\\\"prefetch\\\" href=\\\"contact\\\">Contact</a>\\n      </li>\\n    </ul>\\n    <a href=\\\"episodes\\\">\\n\\n      <button class=\\\"listen-btn\\\">\\n        <span>Listen</span>\\n        <span>\\n          <svg\\n            id=\\\"rss\\\"\\n            xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n            width=\\\"17.5\\\"\\n            height=\\\"17.5\\\"\\n            viewBox=\\\"0 0 17.5 17.5\\\">\\n            <g\\n              id=\\\"Group_54\\\"\\n              data-name=\\\"Group 54\\\"\\n              transform=\\\"translate(0 12.672)\\\">\\n              <g id=\\\"Group_53\\\" data-name=\\\"Group 53\\\" transform=\\\"translate(0 0)\\\">\\n                <circle\\n                  id=\\\"Ellipse_8\\\"\\n                  data-name=\\\"Ellipse 8\\\"\\n                  cx=\\\"2.5\\\"\\n                  cy=\\\"2.5\\\"\\n                  r=\\\"2.5\\\"\\n                  transform=\\\"translate(0 -0.173)\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n            <g\\n              id=\\\"Group_56\\\"\\n              data-name=\\\"Group 56\\\"\\n              transform=\\\"translate(0 5.834)\\\">\\n              <g id=\\\"Group_55\\\" data-name=\\\"Group 55\\\">\\n                <path\\n                  id=\\\"Path_386\\\"\\n                  data-name=\\\"Path 386\\\"\\n                  d=\\\"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z\\\"\\n                  transform=\\\"translate(0 -149.344)\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n            <g id=\\\"Group_58\\\" data-name=\\\"Group 58\\\">\\n              <g id=\\\"Group_57\\\" data-name=\\\"Group 57\\\">\\n                <path\\n                  id=\\\"Path_387\\\"\\n                  data-name=\\\"Path 387\\\"\\n                  d=\\\"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n          </svg>\\n        </span>\\n      </button>\\n    </a>\\n  </div>\\n  <div class=\\\"menu-icon\\\" on:click={toggleMenu}>\\n    <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\">\\n      <path d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n    </svg>\\n  </div>\\n  <div class=\\\"mobile-menu {isMobileMenu ? 'mobile-open' : ''}\\\">\\n    <div class=\\\"close-btn\\\" on:click={toggleMenu}>\\n      <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\">\\n        <path\\n          d=\\\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414\\n          1.414L10 11.414l7.071 7.071 1.414-1.414L11.414\\n          10l7.071-7.071-1.414-1.414L10 8.586z\\\" />\\n      </svg>\\n    </div>\\n    <div class=\\\"mobile-menu-items\\\">\\n      <ul>\\n        <li aria-current={segment === undefined ? 'page' : undefined}>\\n          <a rel=\\\"prefetch\\\" href=\\\".\\\">Home</a>\\n        </li>\\n        <li aria-current={segment === 'episodes' ? 'page' : undefined}>\\n          <a rel=\\\"prefetch\\\" href=\\\"episodes\\\">Episodes</a>\\n        </li>\\n        <li aria-current={segment === 'about' ? 'page' : undefined}>\\n          <a rel=\\\"prefetch\\\" href=\\\"about\\\">About</a>\\n        </li>\\n        <li aria-current={segment === 'resources' ? 'page' : undefined}>\\n          <a rel=\\\"prefetch\\\" href=\\\"resources\\\">Resources</a>\\n        </li>\\n        <li aria-current={segment === 'contact' ? 'page' : undefined}>\\n          <a rel=\\\"prefetch\\\" href=\\\"contact\\\">Contact</a>\\n        </li>\\n      </ul>\\n\\n      <button class=\\\"listen-btn\\\">\\n        <span>Listen</span>\\n        <span>\\n          <svg\\n            id=\\\"rss\\\"\\n            xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n            width=\\\"17.5\\\"\\n            height=\\\"17.5\\\"\\n            viewBox=\\\"0 0 17.5 17.5\\\">\\n            <g\\n              id=\\\"Group_54\\\"\\n              data-name=\\\"Group 54\\\"\\n              transform=\\\"translate(0 12.672)\\\">\\n              <g id=\\\"Group_53\\\" data-name=\\\"Group 53\\\" transform=\\\"translate(0 0)\\\">\\n                <circle\\n                  id=\\\"Ellipse_8\\\"\\n                  data-name=\\\"Ellipse 8\\\"\\n                  cx=\\\"2.5\\\"\\n                  cy=\\\"2.5\\\"\\n                  r=\\\"2.5\\\"\\n                  transform=\\\"translate(0 -0.173)\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n            <g\\n              id=\\\"Group_56\\\"\\n              data-name=\\\"Group 56\\\"\\n              transform=\\\"translate(0 5.834)\\\">\\n              <g id=\\\"Group_55\\\" data-name=\\\"Group 55\\\">\\n                <path\\n                  id=\\\"Path_386\\\"\\n                  data-name=\\\"Path 386\\\"\\n                  d=\\\"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z\\\"\\n                  transform=\\\"translate(0 -149.344)\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n            <g id=\\\"Group_58\\\" data-name=\\\"Group 58\\\">\\n              <g id=\\\"Group_57\\\" data-name=\\\"Group 57\\\">\\n                <path\\n                  id=\\\"Path_387\\\"\\n                  data-name=\\\"Path 387\\\"\\n                  d=\\\"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z\\\"\\n                  fill=\\\"#fff\\\" />\\n              </g>\\n            </g>\\n          </svg>\\n        </span>\\n      </button>\\n    </div>\\n  </div>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AASmB,GAAG,6CAAC,CAAC,AACtB,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,UAAU,IAAI,CAAC,CAC1B,IAAI,CAAE,GAAG,CACT,OAAO,CAAE,MAAM,AAAE,CAAC,AAClB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,GAAG,6CAAC,CAAC,AACH,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AAAC,CAAC,AAExC,aAAa,6CAAC,CAAC,AACb,OAAO,CAAE,IAAI,AAAE,CAAC,AAElB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,aAAa,6CAAC,CAAC,AACb,OAAO,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEtB,UAAU,6CAAC,CAAC,AACV,OAAO,CAAE,IAAI,AAAE,CAAC,AAChB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,UAAU,6CAAC,CAAC,AACV,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,MAAM,AAAE,CAAC,AAChB,wCAAU,CAAC,GAAG,8BAAC,CAAC,AACd,IAAI,CAAE,OAAO,AAAE,CAAC,AAAC,CAAC,AAE1B,YAAY,6CAAC,CAAC,AACZ,IAAI,CAAE,CAAC,CAAC,UAAU,AAAE,CAAC,AAEvB,YAAY,6CAAC,CAAC,AACZ,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,IAAI,CAC3B,IAAI,CAAE,OAAO,CACb,GAAG,CAAE,CAAC,CACN,gBAAgB,CAAE,IAAI,CACtB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,WAAW,CACpB,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,KAAK,AAAE,CAAC,AAClB,0CAAY,CAAC,UAAU,8BAAC,CAAC,AACvB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,AAAE,CAAC,AACd,0CAAY,CAAC,UAAU,CAAC,GAAG,8BAAC,CAAC,AAC3B,IAAI,CAAE,OAAO,AAAE,CAAC,AACpB,0CAAY,CAAC,EAAE,8BAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,AAAE,CAAC,AAC1B,2BAAY,CAAC,iBAAE,CAAC,EAAE,eAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,UAAU,CAC3B,MAAM,CAAE,IAAI,CAAC,CAAC,AAAE,CAAC,AACrB,0CAAY,CAAC,kBAAkB,8BAAC,CAAC,AAC/B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,MAAM,AAAE,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$4);

	return `<nav class="${"svelte-11bxmgm"}"><div class="${"logo-wrapper"}"><a href="${"/"}"><img src="${"/pgn_logo.svg"}" alt="${""}"></a></div>
  <div class="${"menu-desktop menu-wrapper svelte-11bxmgm"}"><ul class="${"svelte-11bxmgm"}"><li${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"/"}">Home</a></li>
      <li${add_attribute("aria-current", segment === "episodes" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"episodes"}">Episodes</a></li>
      <li${add_attribute("aria-current", segment === "about" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"about"}">About</a></li>
      <li${add_attribute("aria-current", segment === "resources" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"resources"}">Resources</a></li>
      <li${add_attribute("aria-current", segment === "contact" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"contact"}">Contact</a></li></ul>
    <a href="${"episodes"}"><button class="${"listen-btn"}"><span>Listen</span>
        <span><svg id="${"rss"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"17.5"}" height="${"17.5"}" viewBox="${"0 0 17.5 17.5"}"><g id="${"Group_54"}" data-name="${"Group 54"}" transform="${"translate(0 12.672)"}"><g id="${"Group_53"}" data-name="${"Group 53"}" transform="${"translate(0 0)"}"><circle id="${"Ellipse_8"}" data-name="${"Ellipse 8"}" cx="${"2.5"}" cy="${"2.5"}" r="${"2.5"}" transform="${"translate(0 -0.173)"}" fill="${"#fff"}"></circle></g></g><g id="${"Group_56"}" data-name="${"Group 56"}" transform="${"translate(0 5.834)"}"><g id="${"Group_55"}" data-name="${"Group 55"}"><path id="${"Path_386"}" data-name="${"Path 386"}" d="${"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"}" transform="${"translate(0 -149.344)"}" fill="${"#fff"}"></path></g></g><g id="${"Group_58"}" data-name="${"Group 58"}"><g id="${"Group_57"}" data-name="${"Group 57"}"><path id="${"Path_387"}" data-name="${"Path 387"}" d="${"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"}" fill="${"#fff"}"></path></g></g></svg></span></button></a></div>
  <div class="${"menu-icon svelte-11bxmgm"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" class="${"svelte-11bxmgm"}"><path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path></svg></div>
  <div class="${"mobile-menu " + escape( "") + " svelte-11bxmgm"}"><div class="${"close-btn svelte-11bxmgm"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" class="${"svelte-11bxmgm"}"><path d="${"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414\n          1.414L10 11.414l7.071 7.071 1.414-1.414L11.414\n          10l7.071-7.071-1.414-1.414L10 8.586z"}"></path></svg></div>
    <div class="${"mobile-menu-items svelte-11bxmgm"}"><ul class="${"svelte-11bxmgm"}"><li${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"."}">Home</a></li>
        <li${add_attribute("aria-current", segment === "episodes" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"episodes"}">Episodes</a></li>
        <li${add_attribute("aria-current", segment === "about" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"about"}">About</a></li>
        <li${add_attribute("aria-current", segment === "resources" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"resources"}">Resources</a></li>
        <li${add_attribute("aria-current", segment === "contact" ? "page" : undefined, 0)} class="${"svelte-11bxmgm"}"><a rel="${"prefetch"}" href="${"contact"}">Contact</a></li></ul>

      <button class="${"listen-btn"}"><span>Listen</span>
        <span><svg id="${"rss"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"17.5"}" height="${"17.5"}" viewBox="${"0 0 17.5 17.5"}" class="${"svelte-11bxmgm"}"><g id="${"Group_54"}" data-name="${"Group 54"}" transform="${"translate(0 12.672)"}"><g id="${"Group_53"}" data-name="${"Group 53"}" transform="${"translate(0 0)"}"><circle id="${"Ellipse_8"}" data-name="${"Ellipse 8"}" cx="${"2.5"}" cy="${"2.5"}" r="${"2.5"}" transform="${"translate(0 -0.173)"}" fill="${"#fff"}"></circle></g></g><g id="${"Group_56"}" data-name="${"Group 56"}" transform="${"translate(0 5.834)"}"><g id="${"Group_55"}" data-name="${"Group 55"}"><path id="${"Path_386"}" data-name="${"Path 386"}" d="${"M0,149.344v3.334a8.342,8.342,0,0,1,8.334,8.333h3.332A11.68,11.68,0,0,0,0,149.344Z"}" transform="${"translate(0 -149.344)"}" fill="${"#fff"}"></path></g></g><g id="${"Group_58"}" data-name="${"Group 58"}"><g id="${"Group_57"}" data-name="${"Group 57"}"><path id="${"Path_387"}" data-name="${"Path 387"}" d="${"M0,0V3.334A14.182,14.182,0,0,1,14.167,17.5H17.5A17.519,17.519,0,0,0,0,0Z"}" fill="${"#fff"}"></path></g></g></svg></span></button></div></div></nav>`;
});

/* src\components\Footer.svelte generated by Svelte v3.24.0 */

const css$5 = {
	code: ".footer-wrapper-main.svelte-sedm0k{display:grid;grid-template-columns:1fr 1fr}@media screen and (max-width: 768px){.footer-wrapper-main.svelte-sedm0k{display:flex;grid-template-columns:1fr 1fr;max-width:1400px;flex-direction:column-reverse}}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n<style lang=\\\"scss\\\">.footer-wrapper-main {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr; }\\n  @media screen and (max-width: 768px) {\\n    .footer-wrapper-main {\\n      display: flex;\\n      grid-template-columns: 1fr 1fr;\\n      max-width: 1400px;\\n      flex-direction: column-reverse; } }</style>\\n\\n<footer>\\n  <div class=\\\"footer-wrapper-main\\\">\\n    <div class=\\\"left-footer\\\">\\n      <div class=\\\"left-footer-content\\\">\\n        <div>\\n          <img src=\\\"/img/girl-boss-logo.svg\\\" alt=\\\"\\\" />\\n        </div>\\n        <div>\\n          <h3>Contact Us</h3>\\n          <p>\\n            123 Unit, Street Name, Municipality Name, City Name, Philippines\\n            Area Code\\n          </p>\\n          <span>sample@gmail.com</span>\\n        </div>\\n      </div>\\n      <div class=\\\"footer-links\\\">\\n        <h3>Privacy Policy</h3>\\n        <h3>Terms of Service</h3>\\n      </div>\\n      <div class=\\\"footer-copy-rights\\\">\\n        &copy; 2020 The Pinay Girl Boss. All rights reserved.\\n      </div>\\n    </div>\\n    <div class=\\\"right-footer\\\">\\n      <div>\\n        <div>\\n          <h3>Let's Get Social!</h3>\\n          <div class=\\\"social-media\\\">\\n            <div>\\n              <img src=\\\"/img/footer/facebook.svg\\\" alt=\\\"\\\" />\\n            </div>\\n            <div>\\n              <img src=\\\"/img/footer/instagram.svg\\\" alt=\\\"\\\" />\\n            </div>\\n            <div>\\n              <img src=\\\"/img/footer/messenger.svg\\\" alt=\\\"\\\" />\\n            </div>\\n            <div>\\n              <img src=\\\"/img/footer/Twitter.svg\\\" alt=\\\"\\\" />\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n      <div>\\n        <div>\\n          <h3>Subscribe To The Podcast</h3>\\n          <div class=\\\"social-media\\\">\\n            <div>\\n              <img src=\\\"/img/footer/rss.svg\\\" alt=\\\"\\\" />\\n            </div>\\n            <div>\\n              <a\\n                href=\\\"https://open.spotify.com/show/2OjVLvvJyQrzEWnKTgkGED?si=RxZeLXFwQwWXTR-4y9_8gw\\\"\\n                target=\\\"_blank\\\">\\n                <img src=\\\"/img/footer/Spotify.svg\\\" alt=\\\"\\\" />\\n              </a>\\n            </div>\\n            <div>\\n              <a\\n                href=\\\"https://podcasts.apple.com/ph/podcast/pinay-girl-boss/id1528063283\\\"\\n                target=\\\"_blank\\\">\\n                <img src=\\\"/img/footer/iTunes.svg\\\" alt=\\\"\\\" />\\n              </a>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</footer>\\n\"],\"names\":[],\"mappings\":\"AAImB,oBAAoB,cAAC,CAAC,AACvC,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAAE,CAAC,AACjC,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,oBAAoB,cAAC,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,cAAc,AAAE,CAAC,AAAC,CAAC\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$5);

	return `<footer><div class="${"footer-wrapper-main svelte-sedm0k"}"><div class="${"left-footer"}"><div class="${"left-footer-content"}"><div><img src="${"/img/girl-boss-logo.svg"}" alt="${""}"></div>
        <div><h3>Contact Us</h3>
          <p>123 Unit, Street Name, Municipality Name, City Name, Philippines
            Area Code
          </p>
          <span>sample@gmail.com</span></div></div>
      <div class="${"footer-links"}"><h3>Privacy Policy</h3>
        <h3>Terms of Service</h3></div>
      <div class="${"footer-copy-rights"}">© 2020 The Pinay Girl Boss. All rights reserved.
      </div></div>
    <div class="${"right-footer"}"><div><div><h3>Let&#39;s Get Social!</h3>
          <div class="${"social-media"}"><div><img src="${"/img/footer/facebook.svg"}" alt="${""}"></div>
            <div><img src="${"/img/footer/instagram.svg"}" alt="${""}"></div>
            <div><img src="${"/img/footer/messenger.svg"}" alt="${""}"></div>
            <div><img src="${"/img/footer/Twitter.svg"}" alt="${""}"></div></div></div></div>
      <div><div><h3>Subscribe To The Podcast</h3>
          <div class="${"social-media"}"><div><img src="${"/img/footer/rss.svg"}" alt="${""}"></div>
            <div><a href="${"https://open.spotify.com/show/2OjVLvvJyQrzEWnKTgkGED?si=RxZeLXFwQwWXTR-4y9_8gw"}" target="${"_blank"}"><img src="${"/img/footer/Spotify.svg"}" alt="${""}"></a></div>
            <div><a href="${"https://podcasts.apple.com/ph/podcast/pinay-girl-boss/id1528063283"}" target="${"_blank"}"><img src="${"/img/footer/iTunes.svg"}" alt="${""}"></a></div></div></div></div></div></div></footer>`;
});

/* src\routes\_layout.svelte generated by Svelte v3.24.0 */

const css$6 = {
	code: "@font-face{font-family:RobotoRegular;src:url(\"/fonts/Roboto-Regular.ttf\");font-display:swap}@font-face{font-family:RobotoMedium;src:url(\"/fonts/Roboto-Medium.ttf\");font-display:swap}:root{font-size:62.5%}:root body{margin:0;color:#969696;font-size:1.6rem;font-family:\"RobotoRegular\";background-color:#f9f8f3;transition:all 300ms ease-in}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}p,h1,h2,h3,h4{-webkit-hyphens:manual !important;-ms-hyphens:manual !important;hyphens:manual !important}.episode-title-wrapper{padding:0 1rem}.inner-page-wrapper{max-width:1300px;margin:0 auto;padding-top:16rem;justify-content:center;align-items:center;padding-left:2rem;padding-right:2rem}.inner-page-wrapper h1.episode-title{max-width:70rem;margin:0 auto;margin-top:5rem}.inner-page-wrapper h1{z-index:1}.inner-page-wrapper h1,.inner-page-wrapper .episode-date{text-align:center;margin:3rem 0}.inner-page-wrapper .episode-date{color:#f87e7d;font-weight:bold}.section-wrapper{display:flex;justify-content:center;align-items:center;max-width:1300px;padding-top:5rem;padding-bottom:5rem;padding-left:2rem;padding-right:2rem;margin:0 auto}@media screen and (max-width: 768px){.section-wrapper{display:grid;text-align:center}}.section-wrapper h1{margin-bottom:3rem}.section-wrapper>img{width:240rem}@media screen and (max-width: 768px){.section-wrapper>img{margin:4rem 0;width:250rem}}.center-section-wrapper{text-align:center;margin-top:7rem;width:100%}.center-section-wrapper h1{max-width:30ch;margin:0 auto}.common-wrapper{margin-bottom:5rem;display:grid;align-items:center;max-width:100ch;margin:0 auto;padding:0 2rem;margin-bottom:8rem}@media screen and (max-width: 768px){.common-wrapper{text-align:center;margin-bottom:2rem}}.app-btn{font-family:RobotoMedium}.app-btn button{display:flex;background-color:#f87e7d;padding:1rem;border-radius:36px;color:#fff;justify-content:space-around;width:22rem;box-shadow:2px 27px 38px -1px #fcb2b2}@media screen and (max-width: 1024px){.app-btn button{margin:0 auto}}.home-episode-wrapper{padding:4rem 5rem}.app-center-wrapper{position:relative;max-width:1300px;margin:0 auto;display:flex;justify-content:center;align-items:center}.app-center-wrapper section{flex-direction:column}@media screen and (max-width: 1300px){.app-center-wrapper{padding:0 3rem}}.social-media{display:flex;margin-top:2rem}.social-media img{height:2rem;margin-right:1rem}.about-us-wrapper{display:flex;text-align:center;flex-direction:column}@media screen and (max-width: 425px){.about-us-wrapper{margin-top:7rem}}.about-us-wrapper .about-us-items{display:flex;justify-content:space-around}@media screen and (min-width: 1024px){.about-us-wrapper .about-us-items{width:89rem}}@media screen and (max-width: 700px){.about-us-wrapper .about-us-items{flex-direction:column;width:100%}.about-us-wrapper .about-us-items div{margin-bottom:1rem}}.about-us-wrapper .about-us-items>div{justify-content:center;align-items:center;display:flex;flex-direction:column}@media screen and (max-width: 768px){.about-us-wrapper .about-us-items>div{padding:0 3rem}}.about-us-wrapper .about-us-items>div h1{color:#25577d;font-size:2.5rem}.about-us-wrapper .about-us-items>div p{color:#25577d;text-align:left;width:30ch}.about-us-wrapper .about-us-items>div>img{height:21rem}.contact-us-wrapper{flex-direction:column;text-align:center;width:50ch;color:#fff}.contact-us-wrapper h1{color:#fff}.contact-us-wrapper form{display:flex;flex-direction:column;text-align:left}.contact-us-wrapper form input{height:5rem;outline:none;border-radius:5px;padding-left:1rem;color:#25577d;margin-bottom:2rem}.contact-us-wrapper form input[type=\"submit\"]{border-radius:3rem;width:23rem;margin:0 auto;color:#f87e7d;background-color:#fff}.featured-episodes{display:flex;justify-content:space-between}.featured-episodes img{width:20rem}@media screen and (max-width: 425px){.featured-episodes{flex-direction:column;margin:0 auto;height:100vh}}.podcast-player-wrapper{height:13rem;background-color:#e3e3e3;border-radius:8px}.app-wrapper{position:relative;max-width:1300px;margin:0 auto;display:flex;justify-content:center;align-items:center;min-height:100vh}@media screen and (max-width: 1300px){.app-wrapper{padding:0 3rem}}.app-img-figure{position:absolute;top:0;left:0;bottom:0;width:100%;margin:0;z-index:-1}.app-img-figure:before{content:\"\";display:block;position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;background-color:rgba(0, 0, 0, 0)}.app-img-figure img{-o-object-fit:cover;object-fit:cover;position:absolute;height:100%;width:100%;z-index:-1}@media screen and (max-width: 768px){.app-img-figure img{height:95rem}}@media screen and (max-width: 425px){.app-img-figure img{height:83rem}}.first-section{min-height:73.4vh}@media screen and (min-width: 1024px){.first-section{min-height:76.4vh}}.spacer{margin:5.7rem}@media screen and (max-width: 425px){.spacer{margin:3rem}}.single-episode-bg{background-image:url(\"/img/single-episodes-bg.svg\");background-repeat:no-repeat;background-size:contain;position:absolute;height:100vh;width:100%;top:0;z-index:-1;margin:0 auto}.episode-bg{background-image:url(\"/img/episode-main-bg.svg\");background-repeat:no-repeat;background-size:contain;position:absolute;height:100vh;width:100%;top:0;z-index:-1;margin:0 auto}@media screen and (min-width: 1441px){.episode-bg{background-position-y:-23rem;background-size:cover}}@media screen and (max-width: 1440px){.episode-bg{background-position-y:-15rem;background-size:cover}}@media screen and (max-width: 768px){.episode-bg{background-size:cover;background-position-y:-10rem}}.font-white{color:#fff}.font-white h1{color:#fff}.about-bg{background-image:url(\"/img/about-bg.svg\");background-repeat:no-repeat;background-size:contain;position:relative;height:100%;width:100%;top:0;z-index:-1;margin:0 auto}@media screen and (min-width: 1441px){.about-bg{background-position-y:-17rem;background-size:cover}}@media screen and (max-width: 1440px){.about-bg{background-position-y:-15rem;background-size:cover}}@media screen and (max-width: 768px){.about-bg{background-size:cover;background-position-y:-10rem}}.default-section-header{background-repeat:no-repeat;background-size:cover;z-index:-1;position:relative;margin:0 auto}@media screen and (min-width: 1256px){.default-section-header{background-position-y:-15rem}}.default-section-header .section-wrapper{min-height:76vh;align-items:initial;padding-top:12rem}.default-section-header .section-wrapper p{max-width:54rem;margin:0 auto}.resources-bg{background-image:url(\"/img/resource-header.svg\");background-repeat:no-repeat;background-size:contain;position:absolute;height:100%;width:100%;top:0;z-index:-1;margin:0 auto}@media screen and (min-width: 1441px){.resources-bg{background-position-y:-17rem;background-size:cover}}@media screen and (max-width: 1440px){.resources-bg{background-position-y:-15rem;background-size:cover}}@media screen and (max-width: 768px){.resources-bg{background-size:cover;background-position-y:-10rem}}.about-wrapper{color:#fff}.about-wrapper h1{color:#fff}@media screen and (max-width: 768px){.reverse-wrapper{flex-direction:column-reverse;display:flex !important}}.content-wrapper{display:grid;justify-content:center;align-items:center;grid-template-columns:1fr 1fr;max-width:105rem;padding:0 3rem}.content-wrapper h3{font-size:2.5rem;margin-bottom:3rem}.content-wrapper img{margin:0 auto}@media screen and (max-width: 768px){.content-wrapper{grid-template-columns:initial;text-align:center;margin-top:9rem}}@media screen and (max-width: 768px){.content-wrapper{padding:0 4rem}}.plain-wrapper{max-width:1300px;margin:0 auto;padding:0 3rem}@media screen and (max-width: 768px){.plain-wrapper{text-align:center}}.download-wrapper{max-width:1024px;margin:0 auto}.download-items .download-item{display:grid;grid-template-columns:0.2fr 1fr 0.2fr;justify-content:center;align-items:center;min-height:17rem;grid-gap:3rem}@media screen and (max-width: 768px){.download-items .download-item{grid-template-columns:initial;text-align:center;margin-bottom:3rem;margin-top:3rem}.download-items .download-item img{margin:0 auto}}.download-items .download-item h3{font-size:2rem;font-weight:bold;margin-bottom:2rem}.download-items .download-item button{width:20rem;background:#f87e7d;padding:1rem 0;border-radius:23px;color:#fff}footer{display:flex;margin:0 auto;justify-content:space-around;color:#25577d;height:35rem}@media screen and (max-width: 768px){footer{height:35rem;flex-direction:column;flex-direction:column-reverse;height:100%}}footer h3{font-weight:bold;margin-right:2rem}footer span{color:#707070}footer .footer-links{padding:4rem;display:flex}@media screen and (max-width: 768px){footer .footer-links{text-align:center;flex-direction:column}}footer .footer-copy-rights{padding:0 4rem;font-size:1.5rem}@media screen and (max-width: 768px){footer .footer-copy-rights{text-align:center;font-size:1rem}}footer .left-footer{background-color:#e2e2e2;width:100%}footer .left-footer .left-footer-content{display:flex;margin:0 auto;justify-content:center;align-items:center}footer .left-footer .left-footer-content div{margin:4rem}@media screen and (max-width: 768px){footer .left-footer .left-footer-content{flex-direction:column}}@media screen and (max-width: 425px){footer .left-footer .left-footer-content{text-align:center}}footer .right-footer{width:100%;display:flex;justify-content:space-evenly;margin-top:4rem}@media screen and (max-width: 768px){footer .right-footer{height:33rem;margin-top:8rem}}footer .right-footer>div{margin-bottom:9rem}footer .right-footer .social-media{align-items:center}@media screen and (max-width: 768px){footer .right-footer .social-media{justify-content:center}}@media screen and (max-width: 768px){footer .right-footer{flex-direction:column;height:30rem;justify-content:center;align-items:center;text-align:center}}section{display:flex;justify-content:space-evenly;min-height:54vh}@media screen and (max-width: 768px){section{flex-direction:column}}section .section-content-center{display:flex;flex-direction:column;text-align:center}@media screen and (min-width: 768px){section .section-content-center{width:56ch}}@media screen and (max-width: 768px){section .section-content-center{text-align:center;margin:0 auto;margin-top:-22rem}}@media screen and (max-width: 425px){section .section-content-center{margin-top:-15rem;padding:0 2rem}}@media screen and (max-width: 320px){section .section-content-center{width:30ch}}section .section-content-center p{margin-top:2rem}section .section-content{display:flex;flex-direction:column;justify-content:space-evenly}@media screen and (min-width: 768px){section .section-content{width:56ch}}section .section-image{display:flex;margin:0 2rem}section .section-image img{width:67rem}@media screen and (max-width: 768px){section .section-image img{width:45rem;margin:6rem auto}}.app-decor:before{content:\"\";background:url(\"/img/section-accent.svg\");background-repeat:no-repeat;height:100%;width:7rem;position:absolute;top:-2rem;background-size:2rem}h1{font-size:3.8rem;white-space:pre-wrap;color:#99cef6;font-family:\"RobotoMedium\";line-height:1.2em;position:relative}@media screen and (max-width: 1024px){h1{margin-bottom:2rem}}@media screen and (max-width: 425px){h1{text-align:center}}@media screen and (min-width: 1024px){p{margin-bottom:2rem}}@media screen and (max-width: 425px){p{margin-bottom:4rem;text-align:center}}nav{display:flex;justify-content:space-between;align-items:center;max-width:1300px;margin-left:auto;margin-right:auto;width:100%;padding:1rem;font-family:\"RobotoMedium\";padding-left:67.5px;padding-right:67.5px;margin-bottom:3rem}@media screen and (max-width: 1024px){nav{padding-left:51.5px;padding-right:51.5px}}@media screen and (max-width: 768px){nav{padding-left:23.5px;padding-right:23.5px}}nav ul{display:flex}nav ul .active{border-radius:17px;border:1px solid #2a587b}nav ul li{padding:0.3rem 2rem;height:3rem;font-size:1.6rem;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:color 300ms ease-in}nav ul li:hover{color:#25577d}@media screen and (max-width: 900px){nav ul li{padding:0.3rem 1rem}}[aria-current]{position:relative;border-radius:17px;border:1px solid #2a587b;color:#707070}@media screen and (max-width: 425px){.third-section img,.fourth-section img{height:100% !important}}.main-wrap{position:relative;overflow:hidden}@media screen and (min-width: 1366px){.home-latest-episode-wrapper{height:125rem}}.fifth-section img{height:55rem !important}@media screen and (max-width: 768px){.fifth-section img{height:65rem !important}}@media screen and (min-width: 1024px){.fifth-section-wrapper{height:55rem}}.logo-wrapper{height:13rem;width:100%}.logo-wrapper img{height:100%}@media screen and (max-width: 696px){.logo-wrapper{height:8rem}}.listen-btn{padding:0.3rem 6rem;background-color:#25577d;border-radius:17px;color:#fff;margin-left:8rem;display:flex;justify-content:center;width:15rem;height:3rem;align-items:center}.listen-btn svg{height:1rem}@media screen and (max-width: 1024px){.listen-btn{margin-left:2rem}}@media screen and (max-width: 768px){.listen-btn{margin-left:1rem}}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\nimport TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\nimport Nav from \\\"../components/Nav.svelte\\\";\\nimport Footer from \\\"../components/Footer.svelte\\\";\\nexport let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\" global>@font-face {\\n  font-family: RobotoRegular;\\n  src: url(\\\"/fonts/Roboto-Regular.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: RobotoMedium;\\n  src: url(\\\"/fonts/Roboto-Medium.ttf\\\");\\n  font-display: swap; }\\n\\n:global(:root) {\\n  font-size: 62.5%; }\\n  :global(:root) :global(body) {\\n    margin: 0;\\n    color: #969696;\\n    font-size: 1.6rem;\\n    font-family: \\\"RobotoRegular\\\";\\n    background-color: #f9f8f3;\\n    transition: all 300ms ease-in; }\\n\\n:global(body) {\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale; }\\n\\n:global(p),\\n:global(h1),\\n:global(h2),\\n:global(h3),\\n:global(h4) {\\n  -webkit-hyphens: manual !important;\\n      -ms-hyphens: manual !important;\\n          hyphens: manual !important; }\\n\\n:global(.episode-title-wrapper) {\\n  padding: 0 1rem; }\\n\\n:global(.inner-page-wrapper) {\\n  max-width: 1300px;\\n  margin: 0 auto;\\n  padding-top: 16rem;\\n  justify-content: center;\\n  align-items: center;\\n  padding-left: 2rem;\\n  padding-right: 2rem; }\\n  :global(.inner-page-wrapper) :global(h1.episode-title) {\\n    max-width: 70rem;\\n    margin: 0 auto;\\n    margin-top: 5rem; }\\n  :global(.inner-page-wrapper) :global(h1) {\\n    z-index: 1; }\\n  :global(.inner-page-wrapper) :global(h1),\\n  :global(.inner-page-wrapper) :global(.episode-date) {\\n    text-align: center;\\n    margin: 3rem 0; }\\n  :global(.inner-page-wrapper) :global(.episode-date) {\\n    color: #f87e7d;\\n    font-weight: bold; }\\n\\n:global(.section-wrapper) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  max-width: 1300px;\\n  padding-top: 5rem;\\n  padding-bottom: 5rem;\\n  padding-left: 2rem;\\n  padding-right: 2rem;\\n  margin: 0 auto; }\\n  @media screen and (max-width: 768px) {\\n    :global(.section-wrapper) {\\n      display: grid;\\n      text-align: center; } }\\n  :global(.section-wrapper) :global(h1) {\\n    margin-bottom: 3rem; }\\n  :global(.section-wrapper) > :global(img) {\\n    width: 240rem; }\\n    @media screen and (max-width: 768px) {\\n      :global(.section-wrapper) > :global(img) {\\n        margin: 4rem 0;\\n        width: 250rem; } }\\n\\n:global(.center-section-wrapper) {\\n  text-align: center;\\n  margin-top: 7rem;\\n  width: 100%; }\\n  :global(.center-section-wrapper) :global(h1) {\\n    max-width: 30ch;\\n    margin: 0 auto; }\\n\\n:global(.common-wrapper) {\\n  margin-bottom: 5rem;\\n  display: grid;\\n  align-items: center;\\n  max-width: 100ch;\\n  margin: 0 auto;\\n  padding: 0 2rem;\\n  margin-bottom: 8rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(.common-wrapper) {\\n      text-align: center;\\n      margin-bottom: 2rem; } }\\n\\n:global(.app-btn) {\\n  font-family: RobotoMedium; }\\n  :global(.app-btn) :global(button) {\\n    display: flex;\\n    background-color: #f87e7d;\\n    padding: 1rem;\\n    border-radius: 36px;\\n    color: #fff;\\n    justify-content: space-around;\\n    width: 22rem;\\n    box-shadow: 2px 27px 38px -1px #fcb2b2; }\\n    @media screen and (max-width: 1024px) {\\n      :global(.app-btn) :global(button) {\\n        margin: 0 auto; } }\\n\\n:global(.home-episode-wrapper) {\\n  padding: 4rem 5rem; }\\n\\n:global(.app-center-wrapper) {\\n  position: relative;\\n  max-width: 1300px;\\n  margin: 0 auto;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n  :global(.app-center-wrapper) :global(section) {\\n    flex-direction: column; }\\n  @media screen and (max-width: 1300px) {\\n    :global(.app-center-wrapper) {\\n      padding: 0 3rem; } }\\n\\n:global(.social-media) {\\n  display: flex;\\n  margin-top: 2rem; }\\n  :global(.social-media) :global(img) {\\n    height: 2rem;\\n    margin-right: 1rem; }\\n\\n:global(.about-us-wrapper) {\\n  display: flex;\\n  text-align: center;\\n  flex-direction: column; }\\n  @media screen and (max-width: 425px) {\\n    :global(.about-us-wrapper) {\\n      margin-top: 7rem; } }\\n  :global(.about-us-wrapper) :global(.about-us-items) {\\n    display: flex;\\n    justify-content: space-around; }\\n    @media screen and (min-width: 1024px) {\\n      :global(.about-us-wrapper) :global(.about-us-items) {\\n        width: 89rem; } }\\n    @media screen and (max-width: 700px) {\\n      :global(.about-us-wrapper) :global(.about-us-items) {\\n        flex-direction: column;\\n        width: 100%; }\\n        :global(.about-us-wrapper) :global(.about-us-items) :global(div) {\\n          margin-bottom: 1rem; } }\\n    :global(.about-us-wrapper) :global(.about-us-items) > :global(div) {\\n      justify-content: center;\\n      align-items: center;\\n      display: flex;\\n      flex-direction: column; }\\n      @media screen and (max-width: 768px) {\\n        :global(.about-us-wrapper) :global(.about-us-items) > :global(div) {\\n          padding: 0 3rem; } }\\n      :global(.about-us-wrapper) :global(.about-us-items) > :global(div) :global(h1) {\\n        color: #25577d;\\n        font-size: 2.5rem; }\\n      :global(.about-us-wrapper) :global(.about-us-items) > :global(div) :global(p) {\\n        color: #25577d;\\n        text-align: left;\\n        width: 30ch; }\\n      :global(.about-us-wrapper) :global(.about-us-items) > :global(div) > :global(img) {\\n        height: 21rem; }\\n\\n:global(.contact-us-wrapper) {\\n  flex-direction: column;\\n  text-align: center;\\n  width: 50ch;\\n  color: #fff; }\\n  :global(.contact-us-wrapper) :global(h1) {\\n    color: #fff; }\\n  :global(.contact-us-wrapper) :global(form) {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: left; }\\n    :global(.contact-us-wrapper) :global(form) :global(input) {\\n      height: 5rem;\\n      outline: none;\\n      border-radius: 5px;\\n      padding-left: 1rem;\\n      color: #25577d;\\n      margin-bottom: 2rem; }\\n    :global(.contact-us-wrapper) :global(form) :global(input[type=\\\"submit\\\"]) {\\n      border-radius: 3rem;\\n      width: 23rem;\\n      margin: 0 auto;\\n      color: #f87e7d;\\n      background-color: #fff; }\\n\\n:global(.featured-episodes) {\\n  display: flex;\\n  justify-content: space-between; }\\n  :global(.featured-episodes) :global(img) {\\n    width: 20rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.featured-episodes) {\\n      flex-direction: column;\\n      margin: 0 auto;\\n      height: 100vh; } }\\n\\n:global(.podcast-player-wrapper) {\\n  height: 13rem;\\n  background-color: #e3e3e3;\\n  border-radius: 8px; }\\n\\n:global(.app-wrapper) {\\n  position: relative;\\n  max-width: 1300px;\\n  margin: 0 auto;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  min-height: 100vh; }\\n  @media screen and (max-width: 1300px) {\\n    :global(.app-wrapper) {\\n      padding: 0 3rem; } }\\n\\n:global(.app-img-figure) {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  bottom: 0;\\n  width: 100%;\\n  margin: 0;\\n  z-index: -1; }\\n  :global(.app-img-figure:before) {\\n    content: \\\"\\\";\\n    display: block;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 1;\\n    width: 100%;\\n    height: 100%;\\n    background-color: rgba(0, 0, 0, 0); }\\n  :global(.app-img-figure) :global(img) {\\n    -o-object-fit: cover;\\n       object-fit: cover;\\n    position: absolute;\\n    height: 100%;\\n    width: 100%;\\n    z-index: -1; }\\n    @media screen and (max-width: 768px) {\\n      :global(.app-img-figure) :global(img) {\\n        height: 95rem; } }\\n    @media screen and (max-width: 425px) {\\n      :global(.app-img-figure) :global(img) {\\n        height: 83rem; } }\\n\\n:global(.first-section) {\\n  min-height: 73.4vh; }\\n  @media screen and (min-width: 1024px) {\\n    :global(.first-section) {\\n      min-height: 76.4vh; } }\\n\\n:global(.spacer) {\\n  margin: 5.7rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.spacer) {\\n      margin: 3rem; } }\\n\\n:global(.single-episode-bg) {\\n  background-image: url(\\\"/img/single-episodes-bg.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: contain;\\n  position: absolute;\\n  height: 100vh;\\n  width: 100%;\\n  top: 0;\\n  z-index: -1;\\n  margin: 0 auto; }\\n\\n:global(.episode-bg) {\\n  background-image: url(\\\"/img/episode-main-bg.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: contain;\\n  position: absolute;\\n  height: 100vh;\\n  width: 100%;\\n  top: 0;\\n  z-index: -1;\\n  margin: 0 auto; }\\n  @media screen and (min-width: 1441px) {\\n    :global(.episode-bg) {\\n      background-position-y: -23rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 1440px) {\\n    :global(.episode-bg) {\\n      background-position-y: -15rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.episode-bg) {\\n      background-size: cover;\\n      background-position-y: -10rem; } }\\n\\n:global(.font-white) {\\n  color: #fff; }\\n  :global(.font-white) :global(h1) {\\n    color: #fff; }\\n\\n:global(.about-bg) {\\n  background-image: url(\\\"/img/about-bg.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: contain;\\n  position: relative;\\n  height: 100%;\\n  width: 100%;\\n  top: 0;\\n  z-index: -1;\\n  margin: 0 auto; }\\n  @media screen and (min-width: 1441px) {\\n    :global(.about-bg) {\\n      background-position-y: -17rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 1440px) {\\n    :global(.about-bg) {\\n      background-position-y: -15rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.about-bg) {\\n      background-size: cover;\\n      background-position-y: -10rem; } }\\n\\n:global(.default-section-header) {\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n  z-index: -1;\\n  position: relative;\\n  margin: 0 auto; }\\n  @media screen and (min-width: 1256px) {\\n    :global(.default-section-header) {\\n      background-position-y: -15rem; } }\\n  :global(.default-section-header) :global(.section-wrapper) {\\n    min-height: 76vh;\\n    align-items: initial;\\n    padding-top: 12rem; }\\n    :global(.default-section-header) :global(.section-wrapper) :global(p) {\\n      max-width: 54rem;\\n      margin: 0 auto; }\\n\\n:global(.resources-bg) {\\n  background-image: url(\\\"/img/resource-header.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: contain;\\n  position: absolute;\\n  height: 100%;\\n  width: 100%;\\n  top: 0;\\n  z-index: -1;\\n  margin: 0 auto; }\\n  @media screen and (min-width: 1441px) {\\n    :global(.resources-bg) {\\n      background-position-y: -17rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 1440px) {\\n    :global(.resources-bg) {\\n      background-position-y: -15rem;\\n      background-size: cover; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.resources-bg) {\\n      background-size: cover;\\n      background-position-y: -10rem; } }\\n\\n:global(.about-wrapper) {\\n  color: #fff; }\\n  :global(.about-wrapper) :global(h1) {\\n    color: #fff; }\\n\\n@media screen and (max-width: 768px) {\\n  :global(.reverse-wrapper) {\\n    flex-direction: column-reverse;\\n    display: flex !important; } }\\n\\n:global(.content-wrapper) {\\n  display: grid;\\n  justify-content: center;\\n  align-items: center;\\n  grid-template-columns: 1fr 1fr;\\n  max-width: 105rem;\\n  padding: 0 3rem; }\\n  :global(.content-wrapper) :global(h3) {\\n    font-size: 2.5rem;\\n    margin-bottom: 3rem; }\\n  :global(.content-wrapper) :global(img) {\\n    margin: 0 auto; }\\n  @media screen and (max-width: 768px) {\\n    :global(.content-wrapper) {\\n      grid-template-columns: initial;\\n      text-align: center;\\n      margin-top: 9rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.content-wrapper) {\\n      padding: 0 4rem; } }\\n\\n:global(.plain-wrapper) {\\n  max-width: 1300px;\\n  margin: 0 auto;\\n  padding: 0 3rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(.plain-wrapper) {\\n      text-align: center; } }\\n\\n:global(.download-wrapper) {\\n  max-width: 1024px;\\n  margin: 0 auto; }\\n\\n:global(.download-items) :global(.download-item) {\\n  display: grid;\\n  grid-template-columns: 0.2fr 1fr 0.2fr;\\n  justify-content: center;\\n  align-items: center;\\n  min-height: 17rem;\\n  grid-gap: 3rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(.download-items) :global(.download-item) {\\n      grid-template-columns: initial;\\n      text-align: center;\\n      margin-bottom: 3rem;\\n      margin-top: 3rem; }\\n      :global(.download-items) :global(.download-item) :global(img) {\\n        margin: 0 auto; } }\\n  :global(.download-items) :global(.download-item) :global(h3) {\\n    font-size: 2rem;\\n    font-weight: bold;\\n    margin-bottom: 2rem; }\\n  :global(.download-items) :global(.download-item) :global(button) {\\n    width: 20rem;\\n    background: #f87e7d;\\n    padding: 1rem 0;\\n    border-radius: 23px;\\n    color: #fff; }\\n\\n:global(footer) {\\n  display: flex;\\n  margin: 0 auto;\\n  justify-content: space-around;\\n  color: #25577d;\\n  height: 35rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(footer) {\\n      height: 35rem;\\n      flex-direction: column;\\n      flex-direction: column-reverse;\\n      height: 100%; } }\\n  :global(footer) :global(h3) {\\n    font-weight: bold;\\n    margin-right: 2rem; }\\n  :global(footer) :global(span) {\\n    color: #707070; }\\n  :global(footer) :global(.footer-links) {\\n    padding: 4rem;\\n    display: flex; }\\n    @media screen and (max-width: 768px) {\\n      :global(footer) :global(.footer-links) {\\n        text-align: center;\\n        flex-direction: column; } }\\n  :global(footer) :global(.footer-copy-rights) {\\n    padding: 0 4rem;\\n    font-size: 1.5rem; }\\n    @media screen and (max-width: 768px) {\\n      :global(footer) :global(.footer-copy-rights) {\\n        text-align: center;\\n        font-size: 1rem; } }\\n  :global(footer) :global(.left-footer) {\\n    background-color: #e2e2e2;\\n    width: 100%; }\\n    :global(footer) :global(.left-footer) :global(.left-footer-content) {\\n      display: flex;\\n      margin: 0 auto;\\n      justify-content: center;\\n      align-items: center; }\\n      :global(footer) :global(.left-footer) :global(.left-footer-content) :global(div) {\\n        margin: 4rem; }\\n      @media screen and (max-width: 768px) {\\n        :global(footer) :global(.left-footer) :global(.left-footer-content) {\\n          flex-direction: column; } }\\n      @media screen and (max-width: 425px) {\\n        :global(footer) :global(.left-footer) :global(.left-footer-content) {\\n          text-align: center; } }\\n  :global(footer) :global(.right-footer) {\\n    width: 100%;\\n    display: flex;\\n    justify-content: space-evenly;\\n    margin-top: 4rem; }\\n    @media screen and (max-width: 768px) {\\n      :global(footer) :global(.right-footer) {\\n        height: 33rem;\\n        margin-top: 8rem; } }\\n    :global(footer) :global(.right-footer) > :global(div) {\\n      margin-bottom: 9rem; }\\n    :global(footer) :global(.right-footer) :global(.social-media) {\\n      align-items: center; }\\n      @media screen and (max-width: 768px) {\\n        :global(footer) :global(.right-footer) :global(.social-media) {\\n          justify-content: center; } }\\n    @media screen and (max-width: 768px) {\\n      :global(footer) :global(.right-footer) {\\n        flex-direction: column;\\n        height: 30rem;\\n        justify-content: center;\\n        align-items: center;\\n        text-align: center; } }\\n\\n:global(section) {\\n  display: flex;\\n  justify-content: space-evenly;\\n  min-height: 54vh; }\\n  @media screen and (max-width: 768px) {\\n    :global(section) {\\n      flex-direction: column; } }\\n  :global(section) :global(.section-content-center) {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center; }\\n    @media screen and (min-width: 768px) {\\n      :global(section) :global(.section-content-center) {\\n        width: 56ch; } }\\n    @media screen and (max-width: 768px) {\\n      :global(section) :global(.section-content-center) {\\n        text-align: center;\\n        margin: 0 auto;\\n        margin-top: -22rem; } }\\n    @media screen and (max-width: 425px) {\\n      :global(section) :global(.section-content-center) {\\n        margin-top: -15rem;\\n        padding: 0 2rem; } }\\n    @media screen and (max-width: 320px) {\\n      :global(section) :global(.section-content-center) {\\n        width: 30ch; } }\\n    :global(section) :global(.section-content-center) :global(p) {\\n      margin-top: 2rem; }\\n  :global(section) :global(.section-content) {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-evenly; }\\n    @media screen and (min-width: 768px) {\\n      :global(section) :global(.section-content) {\\n        width: 56ch; } }\\n  :global(section) :global(.section-image) {\\n    display: flex;\\n    margin: 0 2rem; }\\n    :global(section) :global(.section-image) :global(img) {\\n      width: 67rem; }\\n    @media screen and (max-width: 768px) {\\n      :global(section) :global(.section-image) :global(img) {\\n        width: 45rem;\\n        margin: 6rem auto; } }\\n\\n:global(.app-decor:before) {\\n  content: \\\"\\\";\\n  background: url(\\\"/img/section-accent.svg\\\");\\n  background-repeat: no-repeat;\\n  height: 100%;\\n  width: 7rem;\\n  position: absolute;\\n  top: -2rem;\\n  background-size: 2rem; }\\n\\n:global(h1) {\\n  font-size: 3.8rem;\\n  white-space: pre-wrap;\\n  color: #99cef6;\\n  font-family: \\\"RobotoMedium\\\";\\n  line-height: 1.2em;\\n  position: relative; }\\n  @media screen and (max-width: 1024px) {\\n    :global(h1) {\\n      margin-bottom: 2rem; } }\\n  @media screen and (max-width: 425px) {\\n    :global(h1) {\\n      text-align: center; } }\\n\\n@media screen and (min-width: 1024px) {\\n  :global(p) {\\n    margin-bottom: 2rem; } }\\n\\n@media screen and (max-width: 425px) {\\n  :global(p) {\\n    margin-bottom: 4rem;\\n    text-align: center; } }\\n\\n:global(nav) {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  max-width: 1300px;\\n  margin-left: auto;\\n  margin-right: auto;\\n  width: 100%;\\n  padding: 1rem;\\n  font-family: \\\"RobotoMedium\\\";\\n  padding-left: 67.5px;\\n  padding-right: 67.5px;\\n  margin-bottom: 3rem; }\\n  @media screen and (max-width: 1024px) {\\n    :global(nav) {\\n      padding-left: 51.5px;\\n      padding-right: 51.5px; } }\\n  @media screen and (max-width: 768px) {\\n    :global(nav) {\\n      padding-left: 23.5px;\\n      padding-right: 23.5px; } }\\n  :global(nav) :global(ul) {\\n    display: flex; }\\n    :global(nav) :global(ul) :global(.active) {\\n      border-radius: 17px;\\n      border: 1px solid #2a587b; }\\n    :global(nav) :global(ul) :global(li) {\\n      padding: 0.3rem 2rem;\\n      height: 3rem;\\n      font-size: 1.6rem;\\n      display: flex;\\n      justify-content: center;\\n      align-items: center;\\n      cursor: pointer;\\n      transition: color 300ms ease-in; }\\n      :global(nav) :global(ul) :global(li:hover) {\\n        color: #25577d; }\\n      @media screen and (max-width: 900px) {\\n        :global(nav) :global(ul) :global(li) {\\n          padding: 0.3rem 1rem; } }\\n\\n:global([aria-current]) {\\n  position: relative;\\n  border-radius: 17px;\\n  border: 1px solid #2a587b;\\n  color: #707070; }\\n\\n@media screen and (max-width: 425px) {\\n  :global(.third-section) :global(img),\\n  :global(.fourth-section) :global(img) {\\n    height: 100% !important; } }\\n\\n:global(.main-wrap) {\\n  position: relative;\\n  overflow: hidden; }\\n\\n@media screen and (min-width: 1366px) {\\n  :global(.home-latest-episode-wrapper) {\\n    height: 125rem; } }\\n\\n:global(.fifth-section) :global(img) {\\n  height: 55rem !important; }\\n  @media screen and (max-width: 768px) {\\n    :global(.fifth-section) :global(img) {\\n      height: 65rem !important; } }\\n\\n@media screen and (min-width: 1024px) {\\n  :global(.fifth-section-wrapper) {\\n    height: 55rem; } }\\n\\n:global(.logo-wrapper) {\\n  height: 13rem;\\n  width: 100%; }\\n  :global(.logo-wrapper) :global(img) {\\n    height: 100%; }\\n  @media screen and (max-width: 696px) {\\n    :global(.logo-wrapper) {\\n      height: 8rem; } }\\n\\n:global(.listen-btn) {\\n  padding: 0.3rem 6rem;\\n  background-color: #25577d;\\n  border-radius: 17px;\\n  color: #fff;\\n  margin-left: 8rem;\\n  display: flex;\\n  justify-content: center;\\n  width: 15rem;\\n  height: 3rem;\\n  align-items: center; }\\n  :global(.listen-btn) :global(svg) {\\n    height: 1rem; }\\n  @media screen and (max-width: 1024px) {\\n    :global(.listen-btn) {\\n      margin-left: 2rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.listen-btn) {\\n      margin-left: 1rem; } }</style>\\n\\n<TransitionWrapper>\\n  <Nav {segment} />\\n\\n  <main>\\n    <slot />\\n  </main>\\n\\n  <Footer />\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$6);

	return `${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

  <main>${$$slots.default ? $$slots.default({}) : ``}</main>

  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
	})}`;
});

/* src\routes\_error.svelte generated by Svelte v3.24.0 */

const css$7 = {
	code: "h1.svelte-ibl7am,p.svelte-ibl7am{margin:0 auto}h1.svelte-ibl7am{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-ibl7am{margin:1em auto}@media(min-width: 480px){h1.svelte-ibl7am{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\nexport let status;\\nexport let error;\\n\\nconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\nh1, p {\\n\\tmargin: 0 auto;\\n}\\n\\nh1 {\\n\\tfont-size: 2.8em;\\n\\tfont-weight: 700;\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\np {\\n\\tmargin: 1em auto;\\n}\\n\\n@media (min-width: 480px) {\\n\\th1 {\\n\\t\\tfont-size: 4em;\\n\\t}\\n}</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQA,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$7);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-ibl7am"}">${escape(status)}</h1>

<p class="${"svelte-ibl7am"}">${escape(error.message)}</p>

${ ``}`;
});

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.24.0 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

stores.session.subscribe(async value => {

	return;
});

/* src\routes\episodes\[slug].svelte generated by Svelte v3.24.0 */

const css$8 = {
	code: ".about-speaker.svelte-1wijmai h3.svelte-1wijmai{color:#25577d;font-size:3rem}.podcast-player.svelte-1wijmai.svelte-1wijmai{background:#e3e3e3;border-radius:10px;width:100%;margin:0 auto;margin-bottom:5rem;height:15rem;overflow:hidden;max-width:90rem}.speaker-info-wrapper.svelte-1wijmai.svelte-1wijmai{display:grid;grid-template-columns:1fr 1fr;justify-content:center;align-items:center;margin-top:2rem}@media screen and (max-width: 768px){.speaker-info-wrapper.svelte-1wijmai.svelte-1wijmai{grid-template-columns:initial;margin-top:2rem;text-align:center}}.speaker-info-wrapper.svelte-1wijmai img.svelte-1wijmai{height:25rem;margin:0 auto}.speaker-info-wrapper.svelte-1wijmai h4.svelte-1wijmai,.speaker-info-wrapper.svelte-1wijmai small.svelte-1wijmai{color:#25577d;font-weight:bold}.speaker-info-wrapper.svelte-1wijmai .speaker-bio.svelte-1wijmai{margin-top:2rem}.social-media.svelte-1wijmai.svelte-1wijmai{display:grid;grid-gap:1rem;align-items:center}.social-media.svelte-1wijmai div.svelte-1wijmai{display:flex;align-items:center}.about-resources.svelte-1wijmai h3.svelte-1wijmai{color:#25577d;margin-bottom:2rem;font-weight:bold;font-size:2rem}@media screen and (min-width: 426px){.pagination-wrapper.svelte-1wijmai.svelte-1wijmai{display:flex;justify-content:space-between}}.pagination-wrapper.svelte-1wijmai .pagination-right.svelte-1wijmai{text-align:right;cursor:pointer}.pagination-wrapper.svelte-1wijmai .pagination-left.svelte-1wijmai{text-align:left;cursor:pointer}.pagination-wrapper.svelte-1wijmai .pagination-right.svelte-1wijmai,.pagination-wrapper.svelte-1wijmai .pagination-left.svelte-1wijmai{transition:all 300ms ease-in}.pagination-wrapper.svelte-1wijmai .pagination-right h2.svelte-1wijmai,.pagination-wrapper.svelte-1wijmai .pagination-left h2.svelte-1wijmai{font-size:2rem;font-weight:bold;color:#f87e7d}.pagination-wrapper.svelte-1wijmai .pagination-right h3.svelte-1wijmai,.pagination-wrapper.svelte-1wijmai .pagination-left h3.svelte-1wijmai{font-weight:bold}.pagination-wrapper.svelte-1wijmai .pagination-right p.svelte-1wijmai,.pagination-wrapper.svelte-1wijmai .pagination-left p.svelte-1wijmai{max-width:28ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pagination-wrapper.svelte-1wijmai .pagination-content-left.svelte-1wijmai,.pagination-wrapper.svelte-1wijmai .pagination-content-right.svelte-1wijmai{transition:all 300ms ease-in}.pagination-wrapper.svelte-1wijmai .pagination-content-left.svelte-1wijmai:active,.pagination-wrapper.svelte-1wijmai .pagination-content-right.svelte-1wijmai:active{transform:scale(0.9)}.pagination-wrapper.svelte-1wijmai .pagination-content-left.svelte-1wijmai{display:flex;height:12rem;margin-top:2rem}.pagination-wrapper.svelte-1wijmai .pagination-content-left img.svelte-1wijmai{height:100%;margin-right:1rem}@media screen and (max-width: 425px){.pagination-wrapper.svelte-1wijmai .pagination-content-left img.svelte-1wijmai{display:none}}.pagination-wrapper.svelte-1wijmai .pagination-content-right.svelte-1wijmai{display:flex;flex-direction:row-reverse;height:12rem;margin-top:2rem}.pagination-wrapper.svelte-1wijmai .pagination-content-right img.svelte-1wijmai{height:100%;margin-left:1rem}@media screen and (max-width: 425px){.pagination-wrapper.svelte-1wijmai .pagination-content-right img.svelte-1wijmai{display:none}}.single-episode-main-bg.svelte-1wijmai.svelte-1wijmai{background-image:url(\"/img/single-episodes-bg.svg\");background-repeat:no-repeat;background-size:contain;top:0;z-index:-1;margin:0 auto}@media screen and (min-width: 769px){.single-episode-main-bg.svelte-1wijmai.svelte-1wijmai{padding-top:12rem}}.episode-information-wrapper.svelte-1wijmai.svelte-1wijmai{max-width:100ch;margin:0 auto;margin-bottom:6rem}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport client from \\\"../../lib/apollo\\\";\\nimport { EPISODE } from \\\"../../queries/episode\\\";\\nimport { EPISODES } from \\\"../../queries/episodes\\\";\\n\\nexport async function preload({ params, query }) {\\n  let slug = params.slug;\\n  return {\\n    cache: await client.query({\\n      query: EPISODE,\\n      variables: { slug },\\n    }),\\n    episodes: await client.query({\\n      query: EPISODES,\\n    }),\\n    slug,\\n  };\\n}\\n</script>\\n\\n<script>\\nimport TransitionWrapper from \\\"../../components/TransitionWrapper.svelte\\\";\\nimport { restore, query } from \\\"svelte-apollo\\\";\\nimport { goto } from \\\"@sapper/app\\\";\\nimport { onMount, beforeUpdate, afterUpdate } from \\\"svelte\\\";\\nimport moment from \\\"moment\\\";\\n\\nexport let cache;\\nexport let episodes;\\nexport let slug;\\n\\nlet prev;\\nlet next;\\n\\nonMount(async () => {\\n  console.log(\\\"mount\\\");\\n});\\n\\nbeforeUpdate(() => {\\n  console.log(\\\"beforeUpdate\\\");\\n  const eps = episodes.data.episodes.nodes;\\n  const cat = cache.data.episode;\\n  const ddd = (e) => e.slug === slug;\\n  const i = eps.findIndex(ddd);\\n  next = eps[i - 1] || null;\\n  prev = eps[i + 1] || null;\\n});\\n$: prevS = prev;\\n$: nextS = next;\\n\\nafterUpdate(() => {\\n  console.log(\\\"afterUpdate\\\");\\n});\\n\\nrestore(client, EPISODE, cache.data);\\n\\nconst episode = query(client, {\\n  query: EPISODE,\\n  variables: { slug },\\n});\\n\\nconst goNext = async () => {\\n  console.log({ next });\\n  await goto(\\\"episodes/\\\" + next.slug);\\n};\\nconst goPrev = async () => {\\n  console.log({ prev });\\n  await goto(\\\"episodes/\\\" + prev.slug);\\n};\\n</script>\\n\\n<style lang=\\\"scss\\\">.single-episode-wrapper {\\n  margin-top: 15rem;\\n  margin-bottom: 9rem; }\\n  .single-episode-wrapper h1 {\\n    color: #25577d;\\n    font-size: 3rem; }\\n  .single-episode-wrapper .episode-date {\\n    color: #f87e7d; }\\n\\n.about-speaker h3 {\\n  color: #25577d;\\n  font-size: 3rem; }\\n\\n.podcast-player {\\n  background: #e3e3e3;\\n  border-radius: 10px;\\n  width: 100%;\\n  margin: 0 auto;\\n  margin-bottom: 5rem;\\n  height: 15rem;\\n  overflow: hidden;\\n  max-width: 90rem; }\\n  .podcast-player iframe {\\n    width: 100%; }\\n\\n.podcast-info {\\n  width: 100%;\\n  margin: 0 auto; }\\n\\n.speaker-info-wrapper {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  justify-content: center;\\n  align-items: center;\\n  margin-top: 2rem; }\\n  @media screen and (max-width: 768px) {\\n    .speaker-info-wrapper {\\n      grid-template-columns: initial;\\n      margin-top: 2rem;\\n      text-align: center; } }\\n  .speaker-info-wrapper img {\\n    height: 25rem;\\n    margin: 0 auto; }\\n  .speaker-info-wrapper h4,\\n  .speaker-info-wrapper small {\\n    color: #25577d;\\n    font-weight: bold; }\\n  .speaker-info-wrapper .speaker-bio {\\n    margin-top: 2rem; }\\n\\n.social-media {\\n  display: grid;\\n  grid-gap: 1rem;\\n  align-items: center; }\\n  .social-media div {\\n    display: flex;\\n    align-items: center; }\\n\\n.about-resources h3 {\\n  color: #25577d;\\n  margin-bottom: 2rem;\\n  font-weight: bold;\\n  font-size: 2rem; }\\n\\n@media screen and (min-width: 426px) {\\n  .pagination-wrapper {\\n    display: flex;\\n    justify-content: space-between; } }\\n\\n.pagination-wrapper .pagination-right {\\n  text-align: right;\\n  cursor: pointer; }\\n\\n.pagination-wrapper .pagination-left {\\n  text-align: left;\\n  cursor: pointer; }\\n\\n.pagination-wrapper .pagination-right,\\n.pagination-wrapper .pagination-left {\\n  transition: all 300ms ease-in; }\\n  .pagination-wrapper .pagination-right h2,\\n  .pagination-wrapper .pagination-left h2 {\\n    font-size: 2rem;\\n    font-weight: bold;\\n    color: #f87e7d; }\\n  .pagination-wrapper .pagination-right h3,\\n  .pagination-wrapper .pagination-left h3 {\\n    font-weight: bold; }\\n  .pagination-wrapper .pagination-right p,\\n  .pagination-wrapper .pagination-left p {\\n    max-width: 28ch;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    white-space: nowrap; }\\n\\n.pagination-wrapper .pagination-content-left,\\n.pagination-wrapper .pagination-content-right {\\n  transition: all 300ms ease-in; }\\n  .pagination-wrapper .pagination-content-left:active,\\n  .pagination-wrapper .pagination-content-right:active {\\n    transform: scale(0.9); }\\n\\n.pagination-wrapper .pagination-content-left {\\n  display: flex;\\n  height: 12rem;\\n  margin-top: 2rem; }\\n  .pagination-wrapper .pagination-content-left img {\\n    height: 100%;\\n    margin-right: 1rem; }\\n    @media screen and (max-width: 425px) {\\n      .pagination-wrapper .pagination-content-left img {\\n        display: none; } }\\n\\n.pagination-wrapper .pagination-content-right {\\n  display: flex;\\n  flex-direction: row-reverse;\\n  height: 12rem;\\n  margin-top: 2rem; }\\n  .pagination-wrapper .pagination-content-right img {\\n    height: 100%;\\n    margin-left: 1rem; }\\n    @media screen and (max-width: 425px) {\\n      .pagination-wrapper .pagination-content-right img {\\n        display: none; } }\\n\\n.single-episode-main-bg {\\n  background-image: url(\\\"/img/single-episodes-bg.svg\\\");\\n  background-repeat: no-repeat;\\n  background-size: contain;\\n  top: 0;\\n  z-index: -1;\\n  margin: 0 auto; }\\n  @media screen and (min-width: 769px) {\\n    .single-episode-main-bg {\\n      padding-top: 12rem; } }\\n\\n.episode-information-wrapper {\\n  max-width: 100ch;\\n  margin: 0 auto;\\n  margin-bottom: 6rem; }</style>\\n\\n<svelte:head>\\n  <title>Single Podcast</title>\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  {#await cache}\\n    <p>Loading...</p>\\n  {:then data}\\n    {#if data.data}\\n      <div class=\\\"single-episode-main-bg\\\">\\n        <div class=\\\"inner-page-wrapper\\\">\\n          <h1 class=\\\"app-decor episode-title\\\">\\n            {@html data.data.episode.title}\\n          </h1>\\n          <p class=\\\"episode-date\\\">\\n            {moment(data.data.episode.date).format('MMMM Do, YYYY')} - {data.data.episode.episodes_gql.duration}\\n          </p>\\n          <div class=\\\"podcast-player\\\">\\n            {@html data.data.episode.episodes_gql.embed}\\n          </div>\\n          <div class=\\\"episode-information-wrapper\\\">\\n            <p>{data.data.episode.episodes_gql.information}</p>\\n          </div>\\n        </div>\\n      </div>\\n\\n      {#if data.data.episode.episodes_gql.speaker}\\n        <div class=\\\"common-wrapper about-speaker\\\">\\n          <h3>About the Speaker</h3>\\n          <div class=\\\"speaker-info-wrapper\\\">\\n            <div class=\\\"speaker-name-wrapper\\\">\\n              <h4>\\n                {data.data.episode.episodes_gql.speaker.authors_gql.name}\\n                {data.data.episode.episodes_gql.speaker.authors_gql.surname}\\n              </h4>\\n              <small>\\n                {data.data.episode.episodes_gql.speaker.authors_gql.profession}\\n              </small>\\n              <div class=\\\"speaker-bio\\\">\\n                {@html data.data.episode.episodes_gql.speaker.authors_gql.bio}\\n              </div>\\n            </div>\\n            <div>\\n              <img src=\\\"img/founder-two.png\\\" alt=\\\"\\\" />\\n            </div>\\n          </div>\\n        </div>\\n        <div class=\\\"common-wrapper social-media\\\">\\n          {#if data.data.episode.episodes_gql.speaker.authors_gql.facebook}\\n            <div>\\n              <img src=\\\"img/instagram.svg\\\" alt=\\\"\\\" />\\n              <span>\\n                {data.data.episode.episodes_gql.speaker.authors_gql.facebook}\\n              </span>\\n            </div>\\n          {/if}\\n          {#if data.data.episode.episodes_gql.speaker.authors_gql.linkedin}\\n            <div>\\n              <img src=\\\"img/linkedin.svg\\\" alt=\\\"\\\" />\\n              <span>\\n                {data.data.episode.episodes_gql.speaker.authors_gql.linkedin}\\n              </span>\\n            </div>\\n          {/if}\\n          {#if data.data.episode.episodes_gql.speaker.authors_gql.instagram}\\n            <div>\\n              <img src=\\\"img/facebook.svg\\\" alt=\\\"\\\" />\\n              <span>\\n                {data.data.episode.episodes_gql.speaker.authors_gql.instagram}\\n              </span>\\n            </div>\\n          {/if}\\n        </div>\\n      {/if}\\n      {#if data.data.episode.episodes_gql.resources}\\n        <div class=\\\"common-wrapper about-resources\\\">\\n          <h3>Resources</h3>\\n          <div>\\n            {@html data.data.episode.episodes_gql.resources}\\n          </div>\\n        </div>\\n      {/if}\\n    {/if}\\n  {/await}\\n\\n  <div class=\\\"common-wrapper\\\">\\n    <div class=\\\"pagination-wrapper\\\">\\n      <div class=\\\"pagination-left\\\">\\n        {#if prev}\\n          <div on:click={goPrev}>\\n            <h2>PREVIOUS EPISODE</h2>\\n            <div class=\\\"pagination-content-left\\\">\\n              <img src={prev.episodes_gql.episodeThumbnail.sourceUrl} alt=\\\"\\\" />\\n              <div>\\n                <h3>\\n                  {@html prev.title}\\n                </h3>\\n                <p>{prev.episodes_gql.information}</p>\\n              </div>\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n      <div class=\\\"pagination-right\\\">\\n        {#if next}\\n          <div on:click={goNext}>\\n            <h2>NEXT EPISODE</h2>\\n            <div class=\\\"pagination-content-right\\\">\\n              <img src={next.episodes_gql.episodeThumbnail.sourceUrl} alt=\\\"\\\" />\\n              <div>\\n                <h3>\\n                  {@html next.title}\\n                </h3>\\n                <p>{next.episodes_gql.information}</p>\\n              </div>\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n    </div>\\n  </div>\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$3({ params, query }) {
	let slug = params.slug;

	return {
		cache: await client.query({ query: EPISODE, variables: { slug } }),
		episodes: await client.query({ query: EPISODES }),
		slug
	};
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { cache } = $$props;
	let { episodes } = $$props;
	let { slug } = $$props;
	let prev;
	let next;

	onMount(async () => {
		console.log("mount");
	});

	beforeUpdate(() => {
		console.log("beforeUpdate");
		const eps = episodes.data.episodes.nodes;
		const cat = cache.data.episode;
		const ddd = e => e.slug === slug;
		const i = eps.findIndex(ddd);
		next = eps[i - 1] || null;
		prev = eps[i + 1] || null;
	});

	afterUpdate(() => {
		console.log("afterUpdate");
	});

	svelteApollo.restore(client, EPISODE, cache.data);
	const episode = svelteApollo.query(client, { query: EPISODE, variables: { slug } });

	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.episodes === void 0 && $$bindings.episodes && episodes !== void 0) $$bindings.episodes(episodes);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	$$result.css.add(css$8);

	return `${($$result.head += `${($$result.title = `<title>Single Podcast</title>`, "")}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
			if (is_promise(__value)) return `
    <p>Loading...</p>
  `;

			return (function (data) {
				return `
    ${data.data
				? `<div class="${"single-episode-main-bg svelte-1wijmai"}"><div class="${"inner-page-wrapper"}"><h1 class="${"app-decor episode-title"}">${data.data.episode.title}</h1>
          <p class="${"episode-date"}">${escape(moment(data.data.episode.date).format("MMMM Do, YYYY"))} - ${escape(data.data.episode.episodes_gql.duration)}</p>
          <div class="${"podcast-player svelte-1wijmai"}">${data.data.episode.episodes_gql.embed}</div>
          <div class="${"episode-information-wrapper svelte-1wijmai"}"><p>${escape(data.data.episode.episodes_gql.information)}</p></div></div></div>

      ${data.data.episode.episodes_gql.speaker
					? `<div class="${"common-wrapper about-speaker svelte-1wijmai"}"><h3 class="${"svelte-1wijmai"}">About the Speaker</h3>
          <div class="${"speaker-info-wrapper svelte-1wijmai"}"><div class="${"speaker-name-wrapper"}"><h4 class="${"svelte-1wijmai"}">${escape(data.data.episode.episodes_gql.speaker.authors_gql.name)}
                ${escape(data.data.episode.episodes_gql.speaker.authors_gql.surname)}</h4>
              <small class="${"svelte-1wijmai"}">${escape(data.data.episode.episodes_gql.speaker.authors_gql.profession)}</small>
              <div class="${"speaker-bio svelte-1wijmai"}">${data.data.episode.episodes_gql.speaker.authors_gql.bio}</div></div>
            <div><img src="${"img/founder-two.png"}" alt="${""}" class="${"svelte-1wijmai"}"></div></div></div>
        <div class="${"common-wrapper social-media svelte-1wijmai"}">${data.data.episode.episodes_gql.speaker.authors_gql.facebook
						? `<div class="${"svelte-1wijmai"}"><img src="${"img/instagram.svg"}" alt="${""}">
              <span>${escape(data.data.episode.episodes_gql.speaker.authors_gql.facebook)}</span></div>`
						: ``}
          ${data.data.episode.episodes_gql.speaker.authors_gql.linkedin
						? `<div class="${"svelte-1wijmai"}"><img src="${"img/linkedin.svg"}" alt="${""}">
              <span>${escape(data.data.episode.episodes_gql.speaker.authors_gql.linkedin)}</span></div>`
						: ``}
          ${data.data.episode.episodes_gql.speaker.authors_gql.instagram
						? `<div class="${"svelte-1wijmai"}"><img src="${"img/facebook.svg"}" alt="${""}">
              <span>${escape(data.data.episode.episodes_gql.speaker.authors_gql.instagram)}</span></div>`
						: ``}</div>`
					: ``}
      ${data.data.episode.episodes_gql.resources
					? `<div class="${"common-wrapper about-resources svelte-1wijmai"}"><h3 class="${"svelte-1wijmai"}">Resources</h3>
          <div>${data.data.episode.episodes_gql.resources}</div></div>`
					: ``}`
				: ``}
  `;
			})(__value);
		})(cache)}

  <div class="${"common-wrapper"}"><div class="${"pagination-wrapper svelte-1wijmai"}"><div class="${"pagination-left svelte-1wijmai"}">${prev
		? `<div><h2 class="${"svelte-1wijmai"}">PREVIOUS EPISODE</h2>
            <div class="${"pagination-content-left svelte-1wijmai"}"><img${add_attribute("src", prev.episodes_gql.episodeThumbnail.sourceUrl, 0)} alt="${""}" class="${"svelte-1wijmai"}">
              <div><h3 class="${"svelte-1wijmai"}">${prev.title}</h3>
                <p class="${"svelte-1wijmai"}">${escape(prev.episodes_gql.information)}</p></div></div></div>`
		: ``}</div>
      <div class="${"pagination-right svelte-1wijmai"}">${next
		? `<div><h2 class="${"svelte-1wijmai"}">NEXT EPISODE</h2>
            <div class="${"pagination-content-right svelte-1wijmai"}"><img${add_attribute("src", next.episodes_gql.episodeThumbnail.sourceUrl, 0)} alt="${""}" class="${"svelte-1wijmai"}">
              <div><h3 class="${"svelte-1wijmai"}">${next.title}</h3>
                <p class="${"svelte-1wijmai"}">${escape(next.episodes_gql.information)}</p></div></div></div>`
		: ``}</div></div></div>`
	})}`;
});

const contact = writable({
  email: '',
  subject: '',
  message: '',
});

/* src\routes\contact.svelte generated by Svelte v3.24.0 */

const css$9 = {
	code: ".contact-main-bg.svelte-1e50sig.svelte-1e50sig{background-image:url(\"/img/contact-main-bg.svg\")}form.svelte-1e50sig.svelte-1e50sig{display:grid;text-align:left;max-width:60rem;margin:0 auto;margin-bottom:7rem}form.svelte-1e50sig input.svelte-1e50sig{height:5rem;border-radius:8px;margin-bottom:1rem;padding-left:1rem}form.svelte-1e50sig textarea.svelte-1e50sig{border-radius:8px;margin-bottom:7rem;padding-left:1rem}form.svelte-1e50sig .app-btn.svelte-1e50sig{margin:0 auto}",
	map: "{\"version\":3,\"file\":\"contact.svelte\",\"sources\":[\"contact.svelte\"],\"sourcesContent\":[\"<script>\\nimport TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\nimport { contact } from \\\"../store/contact.js\\\";\\n\\nlet loading = false;\\nlet sent = false;\\n\\nasync function handleSubmit(event) {\\n  loading = true;\\n  if (!sent) {\\n    let formData = new FormData();\\n    formData.append(\\\"your-email\\\", event.target.email.value);\\n    formData.append(\\\"your-subject\\\", event.target.subject.value);\\n    formData.append(\\\"your-message\\\", event.target.message.value);\\n    const res = await fetch(\\n      \\\"http://pinaygirlboss.com/wp-api/wp-json/contact-form-7/v1/contact-forms/76/feedback\\\",\\n      {\\n        method: \\\"POST\\\",\\n        body: formData\\n      }\\n    )\\n      .then(e => {\\n        if (e.statusText === \\\"OK\\\") {\\n          sent = true;\\n          $contact.subject = \\\"\\\";\\n          $contact.email = \\\"\\\";\\n          $contact.message = \\\"\\\";\\n        }\\n        console.log({ e });\\n        loading = false;\\n      })\\n      .catch(err => {\\n        loading = false;\\n        console.log({ err });\\n      });\\n  }\\n}\\n</script>\\n\\n<style lang=\\\"scss\\\">.contact-main-bg {\\n  background-image: url(\\\"/img/contact-main-bg.svg\\\"); }\\n\\nform {\\n  display: grid;\\n  text-align: left;\\n  max-width: 60rem;\\n  margin: 0 auto;\\n  margin-bottom: 7rem; }\\n  form input {\\n    height: 5rem;\\n    border-radius: 8px;\\n    margin-bottom: 1rem;\\n    padding-left: 1rem; }\\n  form textarea {\\n    border-radius: 8px;\\n    margin-bottom: 7rem;\\n    padding-left: 1rem; }\\n  form .app-btn {\\n    margin: 0 auto; }</style>\\n\\n<svelte:head>\\n  <title>Contact Us</title>\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  <div\\n    class=\\\"app-division-wrapper default-section-header font-white\\n    contact-main-bg\\\">\\n    <div class=\\\"section-wrapper\\\">\\n      <div class=\\\"center-section-wrapper\\\">\\n        <h1 class=\\\"app-decor\\\">Get Exclusives</h1>\\n        <p>\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,\\n          nostrum! Blanditiis eligendi tenetur.\\n        </p>\\n      </div>\\n    </div>\\n  </div>\\n  <div class=\\\"plain-wrapper\\\">\\n    {#if !sent}\\n      <form on:submit|preventDefault={handleSubmit}>\\n        <label for=\\\"email\\\">Email</label>\\n        <input id=\\\"email\\\" type=\\\"email\\\" bind:value={$contact.email} required />\\n        <label for=\\\"subject\\\">Subject</label>\\n        <input\\n          id=\\\"subject\\\"\\n          type=\\\"text\\\"\\n          bind:value={$contact.subject}\\n          required />\\n        <label for=\\\"message\\\">Message</label>\\n        <textarea\\n          id=\\\"message\\\"\\n          cols=\\\"30\\\"\\n          rows=\\\"10\\\"\\n          bind:value={$contact.message}\\n          required />\\n        <div class=\\\"app-btn\\\">\\n          <button>\\n            {#if !loading}\\n              <span>Submit</span>\\n            {:else}\\n              <span>Loading...</span>\\n            {/if}\\n          </button>\\n        </div>\\n      </form>\\n    {:else}\\n      <p>Thank you for messaging us!</p>\\n    {/if}\\n  </div>\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"AAuCmB,gBAAgB,8BAAC,CAAC,AACnC,gBAAgB,CAAE,IAAI,0BAA0B,CAAC,AAAE,CAAC,AAEtD,IAAI,8BAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,aAAa,CAAE,IAAI,AAAE,CAAC,AACtB,mBAAI,CAAC,KAAK,eAAC,CAAC,AACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,IAAI,CACnB,YAAY,CAAE,IAAI,AAAE,CAAC,AACvB,mBAAI,CAAC,QAAQ,eAAC,CAAC,AACb,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,IAAI,CACnB,YAAY,CAAE,IAAI,AAAE,CAAC,AACvB,mBAAI,CAAC,QAAQ,eAAC,CAAC,AACb,MAAM,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC\"}"
};

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $contact = get_store_value(contact);

	$$result.css.add(css$9);

	return `${($$result.head += `${($$result.title = `<title>Contact Us</title>`, "")}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `<div class="${"app-division-wrapper default-section-header font-white\n    contact-main-bg svelte-1e50sig"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper"}"><h1 class="${"app-decor"}">Get Exclusives</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          nostrum! Blanditiis eligendi tenetur.
        </p></div></div></div>
  <div class="${"plain-wrapper"}">${ `<form class="${"svelte-1e50sig"}"><label for="${"email"}">Email</label>
        <input id="${"email"}" type="${"email"}" required class="${"svelte-1e50sig"}"${add_attribute("value", $contact.email, 1)}>
        <label for="${"subject"}">Subject</label>
        <input id="${"subject"}" type="${"text"}" required class="${"svelte-1e50sig"}"${add_attribute("value", $contact.subject, 1)}>
        <label for="${"message"}">Message</label>
        <textarea id="${"message"}" cols="${"30"}" rows="${"10"}" required class="${"svelte-1e50sig"}">${$contact.message || ""}</textarea>
        <div class="${"app-btn svelte-1e50sig"}"><button>${ `<span>Submit</span>`
			}</button></div></form>`
		}</div>`
	})}`;
});

/* src\routes\about.svelte generated by Svelte v3.24.0 */

const css$a = {
	code: ".about-us-main-bg.svelte-1dp6s5n.svelte-1dp6s5n{background-image:url(\"/img/about-bg.svg\")}.about-info-wrapper.svelte-1dp6s5n.svelte-1dp6s5n{max-width:93rem;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;grid-gap:3rem;margin-bottom:10rem}.about-info-wrapper.svelte-1dp6s5n h4.svelte-1dp6s5n{font-weight:bold}@media screen and (max-width: 615px){.about-info-wrapper.svelte-1dp6s5n.svelte-1dp6s5n{grid-template-columns:initial}}",
	map: "{\"version\":3,\"file\":\"about.svelte\",\"sources\":[\"about.svelte\"],\"sourcesContent\":[\"<script>\\nimport TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\n</script>\\n\\n<style lang=\\\"scss\\\">.about-us-main-bg {\\n  background-image: url(\\\"/img/about-bg.svg\\\"); }\\n\\n.about-info-wrapper {\\n  max-width: 93rem;\\n  margin: 0 auto;\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  grid-gap: 3rem;\\n  margin-bottom: 10rem; }\\n  .about-info-wrapper h4 {\\n    font-weight: bold; }\\n  @media screen and (max-width: 615px) {\\n    .about-info-wrapper {\\n      grid-template-columns: initial; } }</style>\\n\\n<svelte:head>\\n  <title>About</title>\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  <div\\n    class=\\\"app-division-wrapper default-section-header font-white\\n    about-us-main-bg\\\">\\n    <div class=\\\"section-wrapper\\\">\\n      <div class=\\\"center-section-wrapper\\\">\\n        <h1 class=\\\"app-decor\\\">Who We Are</h1>\\n        <p>\\n          Know the team behind Pinay Girl Boss and the reason behind the\\n          Project, why they started it and why they share it to the world.\\n        </p>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"plain-wrapper\\\">\\n    <div class=\\\"about-info-wrapper\\\">\\n      <div>\\n        <h1>Tina & Max</h1>\\n        <div>\\n          <h4>Tina:</h4>\\n          <p>\\n            I am a lifelong learner and a proud product of the Philippine public\\n            school system! I went to Manila Science High School, then the\\n            University of the Philippines Diliman for my pre-law and law\\n            degrees. I have worked in government and in the international\\n            development scene for more than a decade until life happened, I\\n            became a mom to 2 adorable kids and I’ve undergone a lot of mindset\\n            shifts. I became a mompreneur, became involved in mom-related\\n            advocacies, and explored my options. I am currently enjoying life as\\n            a self-employed boss mama at The Oil Natural Project, tribe leader\\n            to thousands of Young Living Essential Oil users, and community\\n            builder and co-founder of Fit Moms Project Ph and Pinay Girl Boss.\\n          </p>\\n        </div>\\n        <div>\\n          <h4>Max:</h4>\\n          <p>\\n            After graduating from the University of the Philippines Diliman, I\\n            moved back to Saudi Arabia where I started my career in the aviation\\n            industry in 2010. I am a dreamer, I am an unconventional mom, I\\n            enjoy getting lost in books, I believe that meals are not complete\\n            without dessert and I love traveling the world with my family. I am\\n            the other half of Pinay Girl Boss and proud boss mama of the\\n            Certified Oilers community.\\n          </p>\\n        </div>\\n      </div>\\n      <div>\\n        <img src=\\\"/img/tina-and-max.png\\\" alt=\\\"\\\" />\\n      </div>\\n    </div>\\n  </div>\\n\\n</TransitionWrapper>\\n\"],\"names\":[],\"mappings\":\"AAImB,iBAAiB,8BAAC,CAAC,AACpC,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,AAAE,CAAC,AAE/C,mBAAmB,8BAAC,CAAC,AACnB,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,QAAQ,CAAE,IAAI,CACd,aAAa,CAAE,KAAK,AAAE,CAAC,AACvB,kCAAmB,CAAC,EAAE,eAAC,CAAC,AACtB,WAAW,CAAE,IAAI,AAAE,CAAC,AACtB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,mBAAmB,8BAAC,CAAC,AACnB,qBAAqB,CAAE,OAAO,AAAE,CAAC,AAAC,CAAC\"}"
};

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$a);

	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `<div class="${"app-division-wrapper default-section-header font-white\n    about-us-main-bg svelte-1dp6s5n"}"><div class="${"section-wrapper"}"><div class="${"center-section-wrapper"}"><h1 class="${"app-decor"}">Who We Are</h1>
        <p>Know the team behind Pinay Girl Boss and the reason behind the
          Project, why they started it and why they share it to the world.
        </p></div></div></div>

  <div class="${"plain-wrapper"}"><div class="${"about-info-wrapper svelte-1dp6s5n"}"><div><h1>Tina &amp; Max</h1>
        <div><h4 class="${"svelte-1dp6s5n"}">Tina:</h4>
          <p>I am a lifelong learner and a proud product of the Philippine public
            school system! I went to Manila Science High School, then the
            University of the Philippines Diliman for my pre-law and law
            degrees. I have worked in government and in the international
            development scene for more than a decade until life happened, I
            became a mom to 2 adorable kids and I’ve undergone a lot of mindset
            shifts. I became a mompreneur, became involved in mom-related
            advocacies, and explored my options. I am currently enjoying life as
            a self-employed boss mama at The Oil Natural Project, tribe leader
            to thousands of Young Living Essential Oil users, and community
            builder and co-founder of Fit Moms Project Ph and Pinay Girl Boss.
          </p></div>
        <div><h4 class="${"svelte-1dp6s5n"}">Max:</h4>
          <p>After graduating from the University of the Philippines Diliman, I
            moved back to Saudi Arabia where I started my career in the aviation
            industry in 2010. I am a dreamer, I am an unconventional mom, I
            enjoy getting lost in books, I believe that meals are not complete
            without dessert and I love traveling the world with my family. I am
            the other half of Pinay Girl Boss and proud boss mama of the
            Certified Oilers community.
          </p></div></div>
      <div><img src="${"/img/tina-and-max.png"}" alt="${""}"></div></div></div>`
	})}`;
});

/* src\routes\blog\index.svelte generated by Svelte v3.24.0 */

const css$b = {
	code: "ul.svelte-gi3qaz{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nexport function preload({ params, query }) {\\n\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\treturn { posts };\\n\\t});\\n}\\n</script>\\n\\n<script>\\nexport let posts;\\n</script>\\n\\n<style>\\nul {\\n\\tmargin: 0 0 1em 0;\\n\\tline-height: 1.5;\\n}</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaA,EAAE,cAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload$4({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$b);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-gi3qaz"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

/* src\routes\blog\[slug].svelte generated by Svelte v3.24.0 */

const css$c = {
	code: ".content.svelte-1tzifke h2{font-size:1.4em;font-weight:500}.content.svelte-1tzifke pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-1tzifke pre code{background-color:transparent;padding:0}.content.svelte-1tzifke ul{line-height:1.5}.content.svelte-1tzifke li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nexport async function preload({ params, query }) {\\n\\t// the `slug` parameter is available because\\n\\t// this file is called [slug].svelte\\n\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\tconst data = await res.json();\\n\\n\\tif (res.status === 200) {\\n\\t\\treturn { post: data };\\n\\t} else {\\n\\t\\tthis.error(res.status, data.message);\\n\\t}\\n}\\n</script>\\n\\n<script>\\nexport let post;\\n</script>\\n\\n<style>\\n/*\\n\\tBy default, CSS is locally scoped to the component,\\n\\tand any unused styles are dead-code-eliminated.\\n\\tIn this page, Svelte can't know which elements are\\n\\tgoing to appear inside the {{{post.html}}} block,\\n\\tso we have to use the :global(...) modifier to target\\n\\tall elements inside .content\\n*/\\n.content :global(h2) {\\n\\tfont-size: 1.4em;\\n\\tfont-weight: 500;\\n}\\n\\n.content :global(pre) {\\n\\tbackground-color: #f9f9f9;\\n\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\tpadding: 0.5em;\\n\\tborder-radius: 2px;\\n\\toverflow-x: auto;\\n}\\n\\n.content :global(pre) :global(code) {\\n\\tbackground-color: transparent;\\n\\tpadding: 0;\\n}\\n\\n.content :global(ul) {\\n\\tline-height: 1.5;\\n}\\n\\n.content :global(li) {\\n\\tmargin: 0 0 0.5em 0;\\n}</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BA,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,uBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$5({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$c);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-1tzifke"}">${post.html}</div>`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?)\.json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes, preload: preload }
			]
		},

		{
			// resources.svelte
			pattern: /^\/resources\/?$/,
			parts: [
				{ name: "resources", file: "resources.svelte", component: Resources, preload: preload$1 }
			]
		},

		{
			// episodes/index.svelte
			pattern: /^\/episodes\/?$/,
			parts: [
				{ name: "episodes", file: "episodes/index.svelte", component: Episodes, preload: preload$2 }
			]
		},

		{
			// episodes/[slug].svelte
			pattern: /^\/episodes\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "episodes_$slug", file: "episodes/[slug].svelte", component: U5Bslugu5D, preload: preload$3, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: Contact }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload$4 }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D$1, preload: preload$5, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		let session;
		try {
			session = await session_getter(req, res);
		} catch (err) {
			return bail(req, res, err);
		}

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				opts = Object.assign({}, opts);

				const include_credentials = (
					opts.credentials === 'include' ||
					opts.credentials !== 'omit' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
				);

				if (include_credentials) {
					opts.headers = Object.assign({}, opts.headers);

					const cookies = Object.assign(
						{},
						cookie.parse(req.headers.cookie || ''),
						cookie.parse(opts.headers.cookie || '')
					);

					const set_cookie = res.getHeader('Set-Cookie');
					(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
						const match = /([^=]+)=([^;]+)/.exec(str);
						if (match) cookies[match[1]] = match[2];
					});

					const str = Object.keys(cookies)
						.map(key => `${key}=${cookies[key]}`)
						.join('; ');

					opts.headers.cookie = str;

					if (!opts.headers.authorization && req.headers.authorization) {
						opts.headers.authorization = req.headers.authorization;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && serialize_error(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
	if (!error) return null;
	let serialized = try_serialize(error);
	if (!serialized) {
		const { name, message, stack } = error ;
		serialized = try_serialize({ name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
