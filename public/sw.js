if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>n(e,t),c={module:{uri:t},exports:o,require:d};i[t]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CVHDmHn-.css",revision:null},{url:"assets/index-vqRG9-KI.js",revision:null},{url:"index.html",revision:"6561ebd5d40f47fb514a768e8737e4c5"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/256.png",revision:"22ad055670842f27a6a16386eff0df90"},{url:"icons/512.png",revision:"d45dafe7e1e74e6c604dcaa796a10f22"},{url:"manifest.webmanifest",revision:"ed5cadc5ab998c12ee085ca1c18dea0b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
