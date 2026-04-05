/*!
 * artplayer.js v5.4.0
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2026 Harvey Zhao
 * Released under the MIT License.
 */function Xt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var at={exports:{}},jt=at.exports,bt;function Ut(){return bt||(bt=1,(function(e,t){(function(n,r){e.exports=r()})(jt,function(){function n(l){return(n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d})(l)}var r=Object.prototype.toString,o=function(l){if(l===void 0)return"undefined";if(l===null)return"null";var d=n(l);if(d==="boolean")return"boolean";if(d==="string")return"string";if(d==="number")return"number";if(d==="symbol")return"symbol";if(d==="function")return(function(h){return i(h)==="GeneratorFunction"})(l)?"generatorfunction":"function";if((function(h){return Array.isArray?Array.isArray(h):h instanceof Array})(l))return"array";if((function(h){return h.constructor&&typeof h.constructor.isBuffer=="function"?h.constructor.isBuffer(h):!1})(l))return"buffer";if((function(h){try{if(typeof h.length=="number"&&typeof h.callee=="function")return!0}catch(u){if(u.message.indexOf("callee")!==-1)return!0}return!1})(l))return"arguments";if((function(h){return h instanceof Date||typeof h.toDateString=="function"&&typeof h.getDate=="function"&&typeof h.setDate=="function"})(l))return"date";if((function(h){return h instanceof Error||typeof h.message=="string"&&h.constructor&&typeof h.constructor.stackTraceLimit=="number"})(l))return"error";if((function(h){return h instanceof RegExp||typeof h.flags=="string"&&typeof h.ignoreCase=="boolean"&&typeof h.multiline=="boolean"&&typeof h.global=="boolean"})(l))return"regexp";switch(i(l)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if((function(h){return typeof h.throw=="function"&&typeof h.return=="function"&&typeof h.next=="function"})(l))return"generator";switch(d=r.call(l)){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return d.slice(8,-1).toLowerCase().replace(/\s/g,"")};function i(l){return l.constructor?l.constructor.name:null}function a(l,d){var h=2<arguments.length&&arguments[2]!==void 0?arguments[2]:["option"];return s(l,d,h),c(l,d,h),(function(u,m,f){var y=o(m),b=o(u);if(y==="object"){if(b!=="object")throw new Error("[Type Error]: '".concat(f.join("."),"' require 'object' type, but got '").concat(b,"'"));Object.keys(m).forEach(function($){var C=u[$],L=m[$],x=f.slice();x.push($),s(C,L,x),c(C,L,x),a(C,L,x)})}if(y==="array"){if(b!=="array")throw new Error("[Type Error]: '".concat(f.join("."),"' require 'array' type, but got '").concat(b,"'"));u.forEach(function($,C){var L=u[C],x=m[C]||m[0],T=f.slice();T.push(C),s(L,x,T),c(L,x,T),a(L,x,T)})}})(l,d,h),l}function s(l,d,h){if(o(d)==="string"){var u=o(l);if(d[0]==="?"&&(d=d.slice(1)+"|undefined"),!(-1<d.indexOf("|")?d.split("|").map(function(m){return m.toLowerCase().trim()}).filter(Boolean).some(function(m){return u===m}):d.toLowerCase().trim()===u))throw new Error("[Type Error]: '".concat(h.join("."),"' require '").concat(d,"' type, but got '").concat(u,"'"))}}function c(l,d,h){if(o(d)==="function"){var u=d(l,o(l),h);if(u!==!0){var m=o(u);throw m==="string"?new Error(u):m==="error"?u:new Error("[Validator Error]: The scheme for '".concat(h.join("."),"' validator require return true, but got '").concat(u,"'"))}}}return a.kindOf=o,a})})(at)),at.exports}var qt=Ut();const Q=Xt(qt),mt="5.4.0",tt={properties:["audioTracks","autoplay","buffered","controller","controls","crossOrigin","currentSrc","currentTime","defaultMuted","defaultPlaybackRate","duration","ended","error","loop","mediaGroup","muted","networkState","paused","playbackRate","played","preload","readyState","seekable","seeking","src","startDate","textTracks","videoTracks","volume"],methods:["addTextTrack","canPlayType","load","play","pause"],events:["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],prototypes:["width","height","videoWidth","videoHeight","poster","webkitDecodedFrameCount","webkitDroppedFrameCount","playsInline","webkitSupportsFullscreen","webkitDisplayingFullscreen","onenterpictureinpicture","onleavepictureinpicture","disablePictureInPicture","cancelVideoFrameCallback","requestVideoFrameCallback","getVideoPlaybackQuality","requestPictureInPicture","webkitEnterFullScreen","webkitEnterFullscreen","webkitExitFullScreen","webkitExitFullscreen"]},rt=globalThis?.CUSTOM_USER_AGENT??(typeof navigator<"u"?navigator.userAgent:""),Tt=/^(?:(?!chrome|android).)*safari/i.test(rt),Et=/iPad|iPhone|iPod/i.test(rt)&&!window.MSStream,Ct=Et||rt.includes("Macintosh")&&navigator.maxTouchPoints>=1,M=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(rt)||Ct,ct=typeof window<"u"&&typeof document<"u";function A(e,t=document){return t.querySelector(e)}function ot(e,t=document){return Array.from(t.querySelectorAll(e))}function w(e,t){return e.classList.add(t)}function I(e,t){return e.classList.remove(t)}function H(e,t){return e.classList.contains(t)}function g(e,t){return t instanceof Element?e.appendChild(t):e.insertAdjacentHTML("beforeend",String(t)),e.lastElementChild||e.lastChild}function dt(e){return e.parentNode.removeChild(e)}function p(e,t,n){return e.style[t]=n,e}function pt(e,t){for(const n in t)p(e,n,t[n]);return e}function Gt(e,t,n=!0){const r=window.getComputedStyle(e,null).getPropertyValue(t);return n?Number.parseFloat(r):r}function Lt(e){return Array.from(e.parentElement.children).filter(t=>t!==e)}function Y(e,t){Lt(e).forEach(n=>I(n,t)),w(e,t)}function W(e,t,n="top"){M||(e.setAttribute("aria-label",t),w(e,"hint--rounded"),w(e,`hint--${n}`))}function gt(e,t=0){const n=e.getBoundingClientRect(),r=window.innerHeight||document.documentElement.clientHeight,o=window.innerWidth||document.documentElement.clientWidth,i=n.top-t<=r&&n.top+n.height+t>=0,a=n.left-t<=o+t&&n.left+n.width+t>=0;return i&&a}function q(e,t){return yt(e).includes(t)}function vt(e,t){return t.parentNode.replaceChild(e,t),e}function S(e){return document.createElement(e)}function Mt(e="",t=""){const n=S("i");return w(n,"art-icon"),w(n,`art-icon-${e}`),g(n,t),n}function St(e,t){let n=document.getElementById(e);n||(n=document.createElement("style"),n.id=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{document.head.appendChild(n)}):(document.head||document.documentElement).appendChild(n)),n.textContent=t}function zt(){const e=document.createElement("div");return e.style.display="flex",e.style.display==="flex"}function N(e){return e.getBoundingClientRect()}function It(e,t){return new Promise((n,r)=>{const o=new Image;o.onload=function(){if(!t||t===1)n(o);else{const i=document.createElement("canvas"),a=i.getContext("2d");i.width=o.width*t,i.height=o.height*t,a.drawImage(o,0,0,i.width,i.height),i.toBlob(s=>{const c=URL.createObjectURL(s),l=new Image;l.onload=function(){n(l)},l.onerror=function(){URL.revokeObjectURL(c),r(new Error(`Image load failed: ${e}`))},l.src=c})}},o.onerror=function(){r(new Error(`Image load failed: ${e}`))},o.src=e})}function yt(e){if(e.composedPath)return e.composedPath();const t=[];let n=e.target;for(;n;)t.push(n),n=n.parentNode;return!t.includes(window)&&window!==void 0&&t.push(window),t}class Rt extends Error{constructor(t,n){super(t),typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,n||this.constructor),this.name="ArtPlayerError"}}function V(e,t){if(!e)throw new Rt(t);return e}function nt(e){return e.includes("?")?nt(e.split("?")[0]):e.includes("#")?nt(e.split("#")[0]):e.trim().toLowerCase().split(".").pop()}function Pt(e,t){const n=document.createElement("a");n.style.display="none",n.href=e,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n)}function O(e,t,n){return Math.max(Math.min(e,Math.max(t,n)),Math.min(t,n))}function ht(e){return e.charAt(0).toUpperCase()+e.slice(1)}function F(e){if(!e)return"00:00";const t=i=>i<10?`0${i}`:String(i),n=Math.floor(e/3600),r=Math.floor((e-n*3600)/60),o=Math.floor(e-n*3600-r*60);return(n>0?[n,r,o]:[r,o]).map(t).join(":")}function At(e){return e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}function Kt(e){const t={"&amp;":"&","&lt;":"<","&gt;":">","&#39;":"'","&quot;":'"'},n=new RegExp(`(${Object.keys(t).join("|")})`,"g");return e.replace(n,r=>t[r]||r)}const v=Object.defineProperty,{hasOwnProperty:Zt}=Object.prototype;function et(e,t){return Zt.call(e,t)}function Ot(e,t){return Object.getOwnPropertyDescriptor(e,t)}function ut(...e){const t=n=>n&&typeof n=="object"&&!Array.isArray(n);return e.reduce((n,r)=>(Object.keys(r).forEach(o=>{const i=n[o],a=r[o];Array.isArray(i)&&Array.isArray(a)?n[o]=i.concat(...a):t(i)&&t(a)?n[o]=ut(i,a):n[o]=a}),n),{})}function Jt(e){return e.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g,(t,n,r)=>{let o=r.slice(0,3);return r.length===1&&(o=`${r}00`),r.length===2&&(o=`${r}0`),`${n},${o}`})}function _t(e){return`WEBVTT \r
\r
`.concat(Jt(e).replace(/\{\\([ibu])\}/g,"</$1>").replace(/\{\\([ibu])1\}/g,"<$1>").replace(/\{([ibu])\}/g,"<$1>").replace(/\{\/([ibu])\}/g,"</$1>").replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g,"$1.$2").replace(/\{[\s\S]*?\}/g,"").concat(`\r
\r
`))}function st(e){return URL.createObjectURL(new Blob([e],{type:"text/vtt"}))}function Vt(e){const t=new RegExp("Dialogue:\\s\\d,(\\d+:\\d\\d:\\d\\d.\\d\\d),(\\d+:\\d\\d:\\d\\d.\\d\\d),([^,]*),([^,]*),(?:[^,]*,){4}([\\s\\S]*)$","i");function n(r=""){return r.split(/[:.]/).map((o,i,a)=>{if(i===a.length-1){if(o.length===1)return`.${o}00`;if(o.length===2)return`.${o}0`}else if(o.length===1)return(i===0?"0":":0")+o;return i===0?o:i===a.length-1?`.${o}`:`:${o}`}).join("")}return`WEBVTT

${e.split(/\r?\n/).map(r=>{const o=r.match(t);return o?{start:n(o[1].trim()),end:n(o[2].trim()),text:o[5].replace(/\{[\s\S]*?\}/g,"").replace(/(\\N)/g,`
`).trim().split(/\r?\n/).map(i=>i.trim()).join(`
`)}:null}).filter(r=>r).map((r,o)=>r?`${o+1}
${r.start} --> ${r.end}
${r.text}`:"").filter(r=>r.trim()).join(`

`)}`}function K(e=0){return new Promise(t=>setTimeout(t,e))}function Dt(e,t){let n;return function(...r){const o=()=>(n=null,e.apply(this,r));clearTimeout(n),n=setTimeout(o,t)}}function Yt(e,t){let n=!1;return function(...r){n||(e.apply(this,r),n=!0,setTimeout(()=>{n=!1},t))}}const Qt=Object.freeze(Object.defineProperty({__proto__:null,ArtPlayerError:Rt,addClass:w,append:g,assToVtt:Vt,capitalize:ht,clamp:O,createElement:S,debounce:Dt,def:v,download:Pt,errorHandle:V,escape:At,get:Ot,getComposedPath:yt,getExt:nt,getIcon:Mt,getRect:N,getStyle:Gt,has:et,hasClass:H,includeFromEvent:q,inverseClass:Y,isBrowser:ct,isIOS:Et,isIOS13:Ct,isInViewport:gt,isMobile:M,isSafari:Tt,loadImg:It,mergeDeep:ut,query:A,queryAll:ot,remove:dt,removeClass:I,replaceElement:vt,secondToTime:F,setStyle:p,setStyleText:St,setStyles:pt,siblings:Lt,sleep:K,srtToVtt:_t,supportsFlex:zt,throttle:Yt,tooltip:W,unescape:Kt,userAgent:rt,vttToBlob:st},Symbol.toStringTag,{value:"Module"})),wt="array",E="boolean",R="string",D="number",U="object",B="function";function Nt(e,t,n){return V(t===R||t===D||e instanceof Element,`${n.join(".")} require '${R}' or 'Element' type`)}const Z={html:Nt,disable:`?${E}`,name:`?${R}`,index:`?${D}`,style:`?${U}`,click:`?${B}`,mounted:`?${B}`,tooltip:`?${R}|${D}`,width:`?${D}`,selector:`?${wt}`,onSelect:`?${B}`,switch:`?${E}`,onSwitch:`?${B}`,range:`?${wt}`,onRange:`?${B}`,onChange:`?${B}`},ft={id:R,container:Nt,url:R,poster:R,type:R,theme:R,lang:R,volume:D,isLive:E,muted:E,autoplay:E,autoSize:E,autoMini:E,loop:E,flip:E,playbackRate:E,aspectRatio:E,screenshot:E,setting:E,hotkey:E,pip:E,mutex:E,backdrop:E,fullscreen:E,fullscreenWeb:E,subtitleOffset:E,miniProgressBar:E,useSSR:E,playsInline:E,lock:E,gesture:E,fastForward:E,autoPlayback:E,autoOrientation:E,airplay:E,proxy:`?${B}`,plugins:[B],layers:[Z],contextmenu:[Z],settings:[Z],controls:[{...Z,position:(e,t,n)=>{const r=["top","left","right"];return V(r.includes(e),`${n.join(".")} only accept ${r.toString()} as parameters`)}}],quality:[{default:`?${E}`,html:R,url:R}],highlight:[{time:D,text:R}],thumbnails:{url:R,number:D,column:D,width:D,height:D,scale:D},subtitle:{url:R,name:R,type:R,style:U,escape:E,encoding:R,onVttLoad:B},moreVideoAttr:U,i18n:U,icons:U,cssVar:U,customType:U};class j{constructor(t){this.id=0,this.art=t,this.cache=new Map,this.add=this.add.bind(this),this.remove=this.remove.bind(this),this.update=this.update.bind(this)}get show(){return H(this.art.template.$player,`art-${this.name}-show`)}set show(t){const{$player:n}=this.art.template,r=`art-${this.name}-show`;t?w(n,r):I(n,r),this.art.emit(this.name,t)}toggle(){this.show=!this.show}add(t){const n=typeof t=="function"?t(this.art):t;if(n.html=n.html||"",Q(n,Z),!this.$parent||!this.name||n.disable)return;const r=n.name||`${this.name}${this.id}`;V(!this.cache.has(r),`Can't add an existing [${r}] to the [${this.name}]`),this.id+=1;const o=S("div");w(o,`art-${this.name}`),w(o,`art-${this.name}-${r}`);const i=Array.from(this.$parent.children);o.dataset.index=n.index||this.id;const a=i.find(c=>Number(c.dataset.index)>=Number(o.dataset.index));a?a.insertAdjacentElement("beforebegin",o):g(this.$parent,o),n.html&&g(o,n.html),n.style&&pt(o,n.style),n.tooltip&&W(o,n.tooltip);const s=[];if(n.click){const c=this.art.events.proxy(o,"click",l=>{l.preventDefault(),n.click.call(this.art,this,l)});s.push(c)}return n.selector&&["left","right"].includes(n.position)&&this.selector(n,o,s),this[r]=o,this.cache.set(r,{$ref:o,events:s,option:n}),n.mounted&&n.mounted.call(this.art,o),o}remove(t){V(this.cache.has(t),`Can't find [${t}] from the [${this.name}]`);const n=this.cache.get(t);n.option.beforeUnmount&&n.option.beforeUnmount.call(this.art,n.$ref);for(const r of n.events)this.art.events.remove(r);this.cache.delete(t),delete this[t],dt(n.$ref)}update(t){if(this.cache.has(t.name)){const n=this.cache.get(t.name);t=Object.assign(n.option,t),this.remove(t.name)}return this.add(t)}}function te(e){return t=>{const{i18n:n,constructor:{ASPECT_RATIO:r}}=t,o=r.map(i=>`<span data-value="${i}">${i==="default"?n.get("Default"):i}</span>`).join("");return{...e,html:`${n.get("Aspect Ratio")}: ${o}`,click:(i,a)=>{const{value:s}=a.target.dataset;s&&(t.aspectRatio=s,i.show=!1)},mounted:i=>{const a=A('[data-value="default"]',i);a&&Y(a,"art-current"),t.on("aspectRatio",s=>{const c=ot("span",i).find(l=>l.dataset.value===s);c&&Y(c,"art-current")})}}}}function ee(e){return t=>({...e,html:t.i18n.get("Close"),click:n=>{n.show=!1}})}function ne(e){return t=>{const{i18n:n,constructor:{FLIP:r}}=t,o=r.map(i=>`<span data-value="${i}">${n.get(ht(i))}</span>`).join("");return{...e,html:`${n.get("Video Flip")}: ${o}`,click:(i,a)=>{const{value:s}=a.target.dataset;s&&(t.flip=s.toLowerCase(),i.show=!1)},mounted:i=>{const a=A('[data-value="normal"]',i);a&&Y(a,"art-current"),t.on("flip",s=>{const c=ot("span",i).find(l=>l.dataset.value===s);c&&Y(c,"art-current")})}}}}function re(e){return t=>({...e,html:t.i18n.get("Video Info"),click:n=>{t.info.show=!0,n.show=!1}})}function oe(e){return t=>{const{i18n:n,constructor:{PLAYBACK_RATE:r}}=t,o=r.map(i=>`<span data-value="${i}">${i===1?n.get("Normal"):i.toFixed(1)}</span>`).join("");return{...e,html:`${n.get("Play Speed")}: ${o}`,click:(i,a)=>{const{value:s}=a.target.dataset;s&&(t.playbackRate=Number(s),i.show=!1)},mounted:i=>{const a=A('[data-value="1"]',i);a&&Y(a,"art-current"),t.on("video:ratechange",()=>{const s=ot("span",i).find(c=>Number(c.dataset.value)===t.playbackRate);s&&Y(s,"art-current")})}}}}function ie(e){const t=ct?location.href:"";return{...e,html:`<a href="https://artplayer.org?ref=${encodeURIComponent(t)}" target="_blank" style="width:100%;">ArtPlayer ${mt}</a>`}}class ae extends j{constructor(t){super(t),this.name="contextmenu",this.$parent=t.template.$contextmenu,M||this.init()}init(){const{option:t,proxy:n,template:{$player:r,$contextmenu:o}}=this.art;t.playbackRate&&this.add(oe({name:"playbackRate",index:10})),t.aspectRatio&&this.add(te({name:"aspectRatio",index:20})),t.flip&&this.add(ne({name:"flip",index:30})),this.add(re({name:"info",index:40})),this.add(ie({name:"version",index:50})),this.add(ee({name:"close",index:60}));for(let i=0;i<t.contextmenu.length;i++)this.add(t.contextmenu[i]);n(r,"contextmenu",i=>{if(!this.art.constructor.CONTEXTMENU)return;i.preventDefault(),this.show=!0;const a=i.clientX,s=i.clientY,{height:c,width:l,left:d,top:h}=N(r),{height:u,width:m}=N(o);let f=a-d,y=s-h;a+m>d+l&&(f=l-m),s+u>h+c&&(y=c-u),pt(o,{top:`${y}px`,left:`${f}px`})}),n(r,"click",i=>{q(i,o)||(this.show=!1)}),this.art.on("blur",()=>{this.show=!1})}}function se(e){return t=>({...e,tooltip:t.i18n.get("AirPlay"),mounted:n=>{const{proxy:r,icons:o}=t;g(n,o.airplay),r(n,"click",()=>t.airplay())}})}function le(e){return t=>({...e,tooltip:t.i18n.get("Fullscreen"),mounted:n=>{const{proxy:r,icons:o,i18n:i}=t,a=g(n,o.fullscreenOn),s=g(n,o.fullscreenOff);p(s,"display","none"),r(n,"click",()=>{t.fullscreen=!t.fullscreen}),t.on("fullscreen",c=>{c?(W(n,i.get("Exit Fullscreen")),p(a,"display","none"),p(s,"display","inline-flex")):(W(n,i.get("Fullscreen")),p(a,"display","inline-flex"),p(s,"display","none"))})}})}function ce(e){return t=>({...e,tooltip:t.i18n.get("Web Fullscreen"),mounted:n=>{const{proxy:r,icons:o,i18n:i}=t,a=g(n,o.fullscreenWebOn),s=g(n,o.fullscreenWebOff);p(s,"display","none"),r(n,"click",()=>{t.fullscreenWeb=!t.fullscreenWeb}),t.on("fullscreenWeb",c=>{c?(W(n,i.get("Exit Web Fullscreen")),p(a,"display","none"),p(s,"display","inline-flex")):(W(n,i.get("Web Fullscreen")),p(a,"display","inline-flex"),p(s,"display","none"))})}})}function de(e){return t=>({...e,tooltip:t.i18n.get("PIP Mode"),mounted:n=>{const{proxy:r,icons:o,i18n:i}=t;g(n,o.pip),r(n,"click",()=>{t.pip=!t.pip}),t.on("pip",a=>{W(n,i.get(a?"Exit PIP Mode":"PIP Mode"))})}})}function pe(e){return t=>({...e,mounted:n=>{const{proxy:r,icons:o,i18n:i}=t,a=g(n,o.play),s=g(n,o.pause);W(a,i.get("Play")),W(s,i.get("Pause")),r(a,"click",()=>{t.play()}),r(s,"click",()=>{t.pause()});function c(){p(a,"display","flex"),p(s,"display","none")}function l(){p(a,"display","none"),p(s,"display","flex")}t.playing?l():c(),t.on("video:playing",()=>{l()}),t.on("video:pause",()=>{c()})}})}function J(e,t){const{$progress:n}=e.template,{left:r}=N(n),o=M?t.touches[0].clientX:t.clientX,i=O(o-r,0,n.clientWidth),a=i/n.clientWidth*e.duration,s=F(a),c=O(i/n.clientWidth,0,1);return{second:a,time:s,width:i,percentage:c}}function Ft(e,t){if(e.isRotate){const n=t.touches[0].clientY/e.height,r=n*e.duration;e.emit("setBar","played",n,t),e.seek=r}else{const{second:n,percentage:r}=J(e,t);e.emit("setBar","played",r,t),e.seek=n}}function he(e){return t=>{const{icons:n,option:r,proxy:o}=t,{$player:i,$progress:a}=t.template;return{...e,html:`
                <div class="art-control-progress-inner">
                    <div class="art-progress-hover"></div>
                    <div class="art-progress-loaded"></div>
                    <div class="art-progress-played"></div>
                    <div class="art-progress-highlight"></div>
                    <div class="art-progress-indicator"></div>
                    <div class="art-progress-tip">00:00</div>
                </div>
            `,mounted:s=>{let c=null,l=!1;const d=A(".art-progress-hover",s),h=A(".art-progress-loaded",s),u=A(".art-progress-played",s),m=A(".art-progress-highlight",s),f=A(".art-progress-indicator",s),y=A(".art-progress-tip",s);n.indicator?g(f,n.indicator):p(f,"backgroundColor","var(--art-theme)");function b(x){const{width:T}=J(t,x),{text:P}=x.target.dataset;y.textContent=P;const _=y.clientWidth;T<=_/2?p(y,"left",0):T>s.clientWidth-_/2?p(y,"left",`${s.clientWidth-_}px`):p(y,"left",`${T-_/2}px`)}function $(x,T){const{width:P,time:_}=T||J(t,x);y.textContent=_||"00:00";const G=y.clientWidth;P<=G/2?p(y,"left",0):P>s.clientWidth-G/2?p(y,"left",`${s.clientWidth-G}px`):p(y,"left",`${P-G/2}px`)}function C(){m.textContent="";for(let x=0;x<r.highlight.length;x++){const T=r.highlight[x],P=O(T.time,0,t.duration)/t.duration*100,_=`<span data-text="${T.text}" data-time="${T.time}" style="left: ${P}%"></span>`;g(m,_)}}function L(x,T,P){const _=x==="played"&&P&&M;if(x==="loaded"&&p(h,"width",`${T*100}%`),x==="hover"&&(p(d,"width",`${T*100}%`),q(P,m)?b(P):$(P),T===0?I(i,"art-progress-hover"):w(i,"art-progress-hover")),x==="played"&&(p(u,"width",`${T*100}%`),p(f,"left",`${T*100}%`)),_){w(i,"art-progress-hover");const G=s.clientWidth*T,Bt=F(T*t.duration);$(P,{width:G,time:Bt}),clearTimeout(c),c=setTimeout(()=>{I(i,"art-progress-hover")},500)}}t.on("setBar",L),t.on("video:loadedmetadata",C),t.constructor.USE_RAF?t.on("raf",()=>{t.emit("setBar","played",t.played),t.emit("setBar","loaded",t.loaded)}):(t.on("video:timeupdate",()=>{t.emit("setBar","played",t.played)}),t.on("video:progress",()=>{t.emit("setBar","loaded",t.loaded)}),t.on("video:ended",()=>{t.emit("setBar","played",1)})),t.emit("setBar","loaded",t.loaded||0),M||(o(a,"click",x=>{x.target!==f&&Ft(t,x)}),o(a,"mousemove",x=>{const{percentage:T}=J(t,x);t.emit("setBar","hover",T,x)}),o(a,"mouseleave",x=>{t.emit("setBar","hover",0,x)}),o(a,"mousedown",x=>{l=x.button===0}),t.on("document:mousemove",x=>{if(l){const{second:T,percentage:P}=J(t,x);t.emit("setBar","played",P,x),t.seek=T}}),t.on("document:mouseup",()=>{l&&(l=!1)}))}}}}function ue(e){return t=>({...e,tooltip:t.i18n.get("Screenshot"),mounted:n=>{const{proxy:r,icons:o}=t;g(n,o.screenshot),r(n,"click",()=>{t.screenshot()})}})}function fe(e){return t=>({...e,tooltip:t.i18n.get("Show Setting"),mounted:n=>{const{proxy:r,icons:o,i18n:i}=t;g(n,o.setting),r(n,"click",()=>{t.setting.toggle(),t.setting.resize()}),t.on("setting",a=>{W(n,i.get(a?"Hide Setting":"Show Setting"))})}})}function me(e){return t=>({...e,style:M?{fontSize:"12px",padding:"0 5px"}:{cursor:"auto",padding:"0 10px"},mounted:n=>{function r(){const i=`${F(t.currentTime)} / ${F(t.duration)}`;i!==n.textContent&&(n.textContent=i)}r();const o=["video:loadedmetadata","video:timeupdate","video:progress"];for(let i=0;i<o.length;i++)t.on(o[i],r)}})}function ge(e){return t=>({...e,mounted:n=>{const{proxy:r,icons:o}=t,i=g(n,o.volume),a=g(n,o.volumeClose),s=g(n,'<div class="art-volume-panel"></div>'),c=g(s,'<div class="art-volume-inner"></div>'),l=g(c,'<div class="art-volume-val"></div>'),d=g(c,'<div class="art-volume-slider"></div>'),h=g(d,'<div class="art-volume-handle"></div>'),u=g(h,'<div class="art-volume-loaded"></div>'),m=g(d,'<div class="art-volume-indicator"></div>');function f(b){const{top:$,height:C}=N(d);return 1-(b.clientY-$)/C}function y(){if(t.muted||t.volume===0)p(i,"display","none"),p(a,"display","flex"),p(m,"top","100%"),p(u,"top","100%"),l.textContent=0;else{const b=t.volume*100;p(i,"display","flex"),p(a,"display","none"),p(m,"top",`${100-b}%`),p(u,"top",`${100-b}%`),l.textContent=Math.floor(b)}}if(y(),t.on("video:volumechange",y),r(i,"click",()=>{t.muted=!0}),r(a,"click",()=>{t.muted=!1}),M)p(s,"display","none");else{let b=!1;r(d,"mousedown",$=>{b=$.button===0,t.volume=f($)}),t.on("document:mousemove",$=>{b&&(t.muted=!1,t.volume=f($))}),t.on("document:mouseup",()=>{b&&(b=!1)})}}})}class ve extends j{constructor(t){super(t),this.isHover=!1,this.name="control",this.timer=Date.now();const{constructor:n}=t,{$player:r,$bottom:o}=this.art.template;t.on("mousemove",()=>{M||(this.show=!0)}),t.on("click",()=>{M?this.toggle():this.show=!0}),t.on("document:mousemove",i=>{this.isHover=q(i,o)}),t.on("video:timeupdate",()=>{!t.setting.show&&!this.isHover&&!t.isInput&&t.playing&&this.show&&Date.now()-this.timer>=n.CONTROL_HIDE_TIME&&(this.show=!1)}),t.on("control",i=>{i?(I(r,"art-hide-cursor"),w(r,"art-hover"),this.timer=Date.now()):(w(r,"art-hide-cursor"),I(r,"art-hover"))}),this.init()}init(){const{option:t}=this.art;t.isLive||this.add(he({name:"progress",position:"top",index:10})),this.add({name:"thumbnails",position:"top",index:20}),this.add(pe({name:"playAndPause",position:"left",index:10})),this.add(ge({name:"volume",position:"left",index:20})),t.isLive||this.add(me({name:"time",position:"left",index:30})),t.quality.length&&K().then(()=>{this.art.quality=t.quality}),t.screenshot&&!M&&this.add(ue({name:"screenshot",position:"right",index:20})),t.setting&&this.add(fe({name:"setting",position:"right",index:30})),t.pip&&this.add(de({name:"pip",position:"right",index:40})),t.airplay&&window.WebKitPlaybackTargetAvailabilityEvent&&this.add(se({name:"airplay",position:"right",index:50})),t.fullscreenWeb&&this.add(ce({name:"fullscreenWeb",position:"right",index:60})),t.fullscreen&&this.add(le({name:"fullscreen",position:"right",index:70}));for(let n=0;n<t.controls.length;n++)this.add(t.controls[n])}add(t){const n=typeof t=="function"?t(this.art):t,{$progress:r,$controlsLeft:o,$controlsRight:i}=this.art.template;switch(n.position){case"top":this.$parent=r;break;case"left":this.$parent=o;break;case"right":this.$parent=i;break;default:V(!1,"Control option.position must one of 'top', 'left', 'right'");break}super.add(n)}check(t){if(t){t.$control_value.innerHTML=t.html;for(let n=0;n<t.$control_option.length;n++){const r=t.$control_option[n];r.default=r===t,r.default&&Y(r.$control_item,"art-current")}}}selector(t,n,r){const{proxy:o}=this.art.events;w(n,"art-control-selector");const i=S("div");w(i,"art-selector-value"),g(i,t.html),n.textContent="",g(n,i);const a=S("div");w(a,"art-selector-list"),g(n,a);for(let c=0;c<t.selector.length;c++){const l=t.selector[c],d=S("div");w(d,"art-selector-item"),l.default&&w(d,"art-current"),d.dataset.index=c,d.dataset.value=l.value,d.innerHTML=l.html,g(a,d),v(l,"$control_option",{get:()=>t.selector}),v(l,"$control_item",{get:()=>d}),v(l,"$control_value",{get:()=>i})}const s=o(a,"click",async c=>{const l=yt(c),d=t.selector.find(h=>h.$control_item===l.find(u=>h.$control_item===u));this.check(d),t.onSelect&&(i.innerHTML=await t.onSelect.call(this.art,d,d.$control_item,c))});r.push(s)}}function ye(e,t){const{constructor:n,template:{$player:r,$video:o}}=e;function i(s){q(s,r)?(e.isInput=s.target.tagName==="INPUT",e.isFocus=!0,e.emit("focus",s)):(e.isInput=!1,e.isFocus=!1,e.emit("blur",s))}e.on("document:click",i),e.on("document:contextmenu",i);let a=[];t.proxy(o,"click",s=>{const c=Date.now();a.push(c);const{MOBILE_CLICK_PLAY:l,DBCLICK_TIME:d,MOBILE_DBCLICK_PLAY:h,DBCLICK_FULLSCREEN:u}=n,m=a.filter(f=>c-f<=d);switch(m.length){case 1:e.emit("click",s),M?!e.isLock&&l&&e.toggle():e.toggle(),a=m;break;case 2:e.emit("dblclick",s),M?!e.isLock&&h&&e.toggle():u&&(e.fullscreen=!e.fullscreen),a=[];break;default:a=[]}})}function be(e,t){return Math.atan2(t,e)*180/Math.PI}function we(e,t,n,r){const o=t-r,i=n-e;let a=0;if(Math.abs(i)<2&&Math.abs(o)<2)return a;const s=be(i,o);return s>=-45&&s<45?a=4:s>=45&&s<135?a=1:s>=-135&&s<-45?a=2:(s>=135&&s<=180||s>=-180&&s<-135)&&(a=3),a}function xe(e,t){if(M&&!e.option.isLive){const{$video:n,$progress:r}=e.template;let o=null,i=!1,a=0,s=0,c=0;const l=u=>{if(u.touches.length===1&&!e.isLock){o===r&&Ft(e,u),i=!0;const{pageX:m,pageY:f}=u.touches[0];a=m,s=f,c=e.currentTime}},d=u=>{if(u.touches.length===1&&i&&e.duration){const{pageX:m,pageY:f}=u.touches[0],y=we(a,s,m,f),b=[3,4].includes(y),$=[1,2].includes(y);if(b&&!e.isRotate||$&&e.isRotate){const L=O((m-a)/e.width,-1,1),x=O((f-s)/e.height,-1,1),T=e.isRotate?x:L,P=o===n?e.constructor.TOUCH_MOVE_RATIO:1,_=O(c+e.duration*T*P,0,e.duration);e.seek=_,e.emit("setBar","played",O(_/e.duration,0,1),u),e.notice.show=`${F(_)} / ${F(e.duration)}`}}},h=()=>{i&&(a=0,s=0,c=0,i=!1,o=null)};e.option.gesture&&(t.proxy(n,"touchstart",u=>{o=n,l(u)}),t.proxy(n,"touchmove",d)),t.proxy(r,"touchstart",u=>{o=r,l(u)}),t.proxy(r,"touchmove",d),e.on("document:touchend",h)}}function ke(e,t){const n=["click","mouseup","keydown","touchend","touchmove","mousemove","pointerup","contextmenu","pointermove","visibilitychange","webkitfullscreenchange"],r=["resize","scroll","orientationchange"],o=[];function i(a={}){for(let c=0;c<o.length;c++)t.remove(o[c]);o.length=0;const{$player:s}=e.template;n.forEach(c=>{const l=a.document||s.ownerDocument||document,d=t.proxy(l,c,h=>{e.emit(`document:${c}`,h)});o.push(d)}),r.forEach(c=>{const l=a.window||s.ownerDocument?.defaultView||window,d=t.proxy(l,c,h=>{e.emit(`window:${c}`,h)});o.push(d)})}i(),t.bindGlobalEvents=i}function $e(e,t){const{$player:n}=e.template;t.hover(n,r=>{w(n,"art-hover"),e.emit("hover",!0,r)},r=>{I(n,"art-hover"),e.emit("hover",!1,r)})}function Te(e,t){const{$player:n}=e.template;t.proxy(n,"mousemove",r=>{e.emit("mousemove",r)})}function Ee(e,t){const{option:n,constructor:r}=e;e.on("resize",()=>{const{aspectRatio:i,notice:a}=e;e.state==="standard"&&n.autoSize&&e.autoSize(),e.aspectRatio=i,a.show=""});const o=Dt(()=>e.emit("resize"),r.RESIZE_TIME);e.on("window:orientationchange",()=>o()),e.on("window:resize",()=>o()),screen&&screen.orientation&&screen.orientation.onchange&&t.proxy(screen.orientation,"change",()=>o())}function Ce(e){if(e.constructor.USE_RAF){let t=null;(function n(){e.playing&&e.emit("raf"),e.isDestroy||(t=requestAnimationFrame(n))})(),e.on("destroy",()=>{cancelAnimationFrame(t)})}}function Le(e){const{option:t,constructor:n,template:{$container:r}}=e,o=Yt(()=>{e.emit("view",gt(r,n.SCROLL_GAP))},n.SCROLL_TIME);e.on("window:scroll",()=>o()),e.on("view",i=>{t.autoMini&&(e.mini=!i)})}class Me{constructor(t){this.destroyEvents=new Set,this.proxy=this.proxy.bind(this),this.hover=this.hover.bind(this),ye(t,this),$e(t,this),Te(t,this),Ee(t,this),xe(t,this),Le(t),ke(t,this),Ce(t)}proxy(t,n,r,o={}){if(Array.isArray(n))return n.map(a=>this.proxy(t,a,r,o));t.addEventListener(n,r,o);const i=()=>t.removeEventListener(n,r,o);return this.destroyEvents.add(i),i}hover(t,n,r){n&&this.proxy(t,"mouseenter",n),r&&this.proxy(t,"mouseleave",r)}remove(t){if(this.destroyEvents.has(t))try{t()}catch(n){console.warn("Failed to remove event listener:",n)}finally{this.destroyEvents.delete(t)}}destroy(){for(const t of this.destroyEvents)try{t()}catch(n){console.warn("Failed to destroy event listener:",n)}this.destroyEvents.clear()}}class Se{constructor(t){this.art=t,this.keys={},M||this.init()}init(){const{constructor:t}=this.art;this.art.option.hotkey&&(this.add("Escape",()=>{this.art.fullscreenWeb&&(this.art.fullscreenWeb=!1)}),this.add("Space",()=>{this.art.toggle()}),this.add("ArrowLeft",()=>{this.art.backward=t.SEEK_STEP}),this.add("ArrowUp",()=>{this.art.volume+=t.VOLUME_STEP}),this.add("ArrowRight",()=>{this.art.forward=t.SEEK_STEP}),this.add("ArrowDown",()=>{this.art.volume-=t.VOLUME_STEP})),this.art.on("document:keydown",n=>{if(this.art.isFocus){const r=document.activeElement.tagName.toUpperCase(),o=document.activeElement.getAttribute("contenteditable");if(r!=="INPUT"&&r!=="TEXTAREA"&&o!==""&&o!=="true"&&!n.altKey&&!n.ctrlKey&&!n.metaKey&&!n.shiftKey){const i=this.keys[n.code];if(i){n.preventDefault();for(let a=0;a<i.length;a++)i[a].call(this.art,n);this.art.emit("hotkey",n)}}}this.art.emit("keydown",n)})}add(t,n){return this.keys[t]?this.keys[t].includes(n)||this.keys[t].push(n):this.keys[t]=[n],this}remove(t,n){if(this.keys[t]){const r=this.keys[t].indexOf(n);r!==-1&&this.keys[t].splice(r,1),this.keys[t].length===0&&delete this.keys[t]}return this}}const Ht={"Video Info":"统计信息",Close:"关闭","Video Load Failed":"加载失败",Volume:"音量",Play:"播放",Pause:"暂停",Rate:"速度",Mute:"静音","Video Flip":"画面翻转",Horizontal:"水平",Vertical:"垂直",Reconnect:"重新连接","Show Setting":"显示设置","Hide Setting":"隐藏设置",Screenshot:"截图","Play Speed":"播放速度","Aspect Ratio":"画面比例",Default:"默认",Normal:"正常",Open:"打开","Switch Video":"切换","Switch Subtitle":"切换字幕",Fullscreen:"全屏","Exit Fullscreen":"退出全屏","Web Fullscreen":"网页全屏","Exit Web Fullscreen":"退出网页全屏","Mini Player":"迷你播放器","PIP Mode":"开启画中画","Exit PIP Mode":"退出画中画","PIP Not Supported":"不支持画中画","Fullscreen Not Supported":"不支持全屏","Subtitle Offset":"字幕偏移","Last Seen":"上次看到","Jump Play":"跳转播放",AirPlay:"隔空播放","AirPlay Not Available":"隔空播放不可用"};typeof window<"u"&&(window["artplayer-i18n-zh-cn"]=Ht);class ze{constructor(t){this.art=t,this.languages={"zh-cn":Ht},this.language={},this.update(t.option.i18n)}init(){const t=this.art.option.lang.toLowerCase();this.language=this.languages[t]||{}}get(t){return this.language[t]||t}update(t){this.languages=ut(this.languages,t),this.init()}}const Ie=`<svg width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path d="M16,1 L2,1 C1.447,1 1,1.447 1,2 L1,12 C1,12.553 1.447,13 2,13 L5,13 L5,11 L3,11 L3,3 L15,3 L15,11 L13,11 L13,13 L16,13 C16.553,13 17,12.553 17,12 L17,2 C17,1.447 16.553,1 16,1 L16,1 Z"></path>
        <polygon points="4 17 14 17 9 11"></polygon>
    </g>
</svg>
`,Re=`<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" version="1.1" viewBox="0 0 32 32">
    <path d="M 19.41,20.09 14.83,15.5 19.41,10.91 18,9.5 l -6,6 6,6 z" />
</svg>`,Pe=`<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" version="1.1" viewBox="0 0 32 32">
    <path d="m 12.59,20.34 4.58,-4.59 -4.58,-4.59 1.41,-1.41 6,6 -6,6 z" />
</svg>`,Ae='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_216"><rect width="88" height="88" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_216)"><g transform="matrix(1,0,0,1,44,44)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M12.437999725341797,-12.70199966430664 C12.437999725341797,-12.70199966430664 9.618000030517578,-9.881999969482422 9.618000030517578,-9.881999969482422 C8.82800006866455,-9.092000007629395 8.82800006866455,-7.831999778747559 9.618000030517578,-7.052000045776367 C9.618000030517578,-7.052000045776367 16.687999725341797,0.017999999225139618 16.687999725341797,0.017999999225139618 C16.687999725341797,0.017999999225139618 9.618000030517578,7.0879998207092285 9.618000030517578,7.0879998207092285 C8.82800006866455,7.877999782562256 8.82800006866455,9.137999534606934 9.618000030517578,9.918000221252441 C9.618000030517578,9.918000221252441 12.437999725341797,12.748000144958496 12.437999725341797,12.748000144958496 C13.227999687194824,13.527999877929688 14.48799991607666,13.527999877929688 15.267999649047852,12.748000144958496 C15.267999649047852,12.748000144958496 26.58799934387207,1.437999963760376 26.58799934387207,1.437999963760376 C27.368000030517578,0.6579999923706055 27.368000030517578,-0.6119999885559082 26.58799934387207,-1.3919999599456787 C26.58799934387207,-1.3919999599456787 15.267999649047852,-12.70199966430664 15.267999649047852,-12.70199966430664 C14.48799991607666,-13.491999626159668 13.227999687194824,-13.491999626159668 12.437999725341797,-12.70199966430664z M-12.442000389099121,-12.70199966430664 C-13.182000160217285,-13.442000389099121 -14.362000465393066,-13.482000350952148 -15.142000198364258,-12.821999549865723 C-15.142000198364258,-12.821999549865723 -15.272000312805176,-12.70199966430664 -15.272000312805176,-12.70199966430664 C-15.272000312805176,-12.70199966430664 -26.582000732421875,-1.3919999599456787 -26.582000732421875,-1.3919999599456787 C-27.32200050354004,-0.6520000100135803 -27.36199951171875,0.5180000066757202 -26.70199966430664,1.3079999685287476 C-26.70199966430664,1.3079999685287476 -26.582000732421875,1.437999963760376 -26.582000732421875,1.437999963760376 C-26.582000732421875,1.437999963760376 -15.272000312805176,12.748000144958496 -15.272000312805176,12.748000144958496 C-14.531999588012695,13.48799991607666 -13.362000465393066,13.527999877929688 -12.571999549865723,12.868000030517578 C-12.571999549865723,12.868000030517578 -12.442000389099121,12.748000144958496 -12.442000389099121,12.748000144958496 C-12.442000389099121,12.748000144958496 -9.612000465393066,9.918000221252441 -9.612000465393066,9.918000221252441 C-8.871999740600586,9.178000450134277 -8.831999778747559,8.008000373840332 -9.501999855041504,7.2179999351501465 C-9.501999855041504,7.2179999351501465 -9.612000465393066,7.0879998207092285 -9.612000465393066,7.0879998207092285 C-9.612000465393066,7.0879998207092285 -16.68199920654297,0.017999999225139618 -16.68199920654297,0.017999999225139618 C-16.68199920654297,0.017999999225139618 -9.612000465393066,-7.052000045776367 -9.612000465393066,-7.052000045776367 C-8.871999740600586,-7.791999816894531 -8.831999778747559,-8.961999893188477 -9.501999855041504,-9.751999855041504 C-9.501999855041504,-9.751999855041504 -9.612000465393066,-9.881999969482422 -9.612000465393066,-9.881999969482422 C-9.612000465393066,-9.881999969482422 -12.442000389099121,-12.70199966430664 -12.442000389099121,-12.70199966430664z M28,-28 C32.41999816894531,-28 36,-24.420000076293945 36,-20 C36,-20 36,20 36,20 C36,24.420000076293945 32.41999816894531,28 28,28 C28,28 -28,28 -28,28 C-32.41999816894531,28 -36,24.420000076293945 -36,20 C-36,20 -36,-20 -36,-20 C-36,-24.420000076293945 -32.41999816894531,-28 -28,-28 C-28,-28 28,-28 28,-28z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#a8a6a4;"></path></g></g></g></svg>',Oe=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" style="width: 100%; height: 100%;">
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
</svg>`,_e=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1655876154826" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22">
<path d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z" p-id="2131">
</path>
</svg>`,Ve='<svg height="24" viewBox="0 0 24 24" width="24"><path d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z            M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#a8a6a4;"></path></svg>',De=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1652850026663" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2749" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50">
<path d="M593.8176 168.5504l356.00384 595.21024c26.15296 43.74528 10.73152 99.7376-34.44736 125.05088-14.39744 8.06912-30.72 12.30848-47.37024 12.30848H155.97568C103.75168 901.12 61.44 860.16 61.44 809.61536c0-16.09728 4.38272-31.92832 12.71808-45.8752L430.16192 168.5504c26.17344-43.7248 84.00896-58.65472 129.20832-33.34144a93.0816 93.0816 0 0 1 34.44736 33.34144zM512 819.2a61.44 61.44 0 1 0 0-122.88 61.44 61.44 0 0 0 0 122.88z m0-512a72.31488 72.31488 0 0 0-71.76192 81.3056l25.72288 205.7216a46.40768 46.40768 0 0 0 92.07808 0l25.72288-205.74208A72.31488 72.31488 0 0 0 512 307.2z" p-id="2750">
</path>
</svg>`,Ye=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1652445277062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
<path d="M554.666667 810.666667v85.333333h-85.333334v-85.333333h85.333334zM170.666667 178.005333a42.666667 42.666667 0 0 1 34.986666 18.218667l203.904 291.328a42.666667 42.666667 0 0 1 0 48.896l-203.946666 291.328A42.666667 42.666667 0 0 1 128 803.328V220.672a42.666667 42.666667 0 0 1 42.666667-42.666667z m682.666666 0a42.666667 42.666667 0 0 1 42.368 37.717334l0.298667 4.949333v582.656a42.666667 42.666667 0 0 1-74.24 28.629333l-3.413333-4.181333-203.904-291.328a42.666667 42.666667 0 0 1-3.029334-43.861333l3.029334-5.034667 203.946666-291.328A42.666667 42.666667 0 0 1 853.333333 178.005333zM554.666667 640v85.333333h-85.333334v-85.333333h85.333334zM196.266667 319.104V716.8L335.957333 512 196.309333 319.104zM554.666667 469.333333v85.333334h-85.333334v-85.333334h85.333334z m0-170.666666v85.333333h-85.333334V298.666667h85.333334z m0-170.666667v85.333333h-85.333334V128h85.333334z">
</path>
</svg>
`,Ne=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M768 298.666667h170.666667v85.333333h-256V128h85.333333v170.666667zM341.333333 384H85.333333V298.666667h170.666667V128h85.333333v256z m426.666667 341.333333v170.666667h-85.333333v-256h256v85.333333h-170.666667zM341.333333 640v256H256v-170.666667H85.333333v-85.333333h256z" />
</svg>
`,Fe=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M625.777778 256h142.222222V398.222222h113.777778V142.222222H625.777778v113.777778zM256 398.222222V256H398.222222v-113.777778H142.222222V398.222222h113.777778zM768 625.777778v142.222222H625.777778v113.777778h256V625.777778h-113.777778zM398.222222 768H256V625.777778h-113.777778v256H398.222222v-113.777778z" />
</svg>
`,He=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="18" height="18" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4A76.8 76.8 0 0 0 76.8 1024h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0zM1024 128v768H128V128h896zM896 512a64 64 0 0 1 7.488 127.552L896 640h-128v128a64 64 0 0 1-56.512 63.552L704 832a64 64 0 0 1-63.552-56.512L640 768V582.592c0-34.496 25.024-66.112 61.632-70.208L709.632 512H896zM256 512a64 64 0 0 1-7.488-127.552L256 384h128V256a64 64 0 0 1 56.512-63.552L448 192a64 64 0 0 1 63.552 56.512L512 256v185.408c0 34.432-25.024 66.112-61.632 70.144L442.368 512H256z" />
</svg>
`,We=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="18" height="18" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4A76.8 76.8 0 0 0 76.8 1024h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0zM1024 128v768H128V128h896zM448 192a64 64 0 0 1 7.488 127.552L448 320H320v128a64 64 0 0 1-56.512 63.552L256 512a64 64 0 0 1-63.552-56.512L192 448V262.592c0-34.432 25.024-66.112 61.632-70.144L261.632 192H448zM704 832a64 64 0 0 1-7.488-127.552L704 704h128V576a64 64 0 0 1 56.512-63.552L896 512a64 64 0 0 1 63.552 56.512L960 576v185.408c0 34.496-25.024 66.112-61.632 70.208l-8 0.384H704z" />
</svg>
`,Be=`<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default">
  <rect x="0" y="0" width="100" height="100" fill="none" class="bk"/>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-1s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/>
  </rect>
  <rect x="47" y="40" width="6" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">
    <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/>
  </rect>
</svg>`,Xe=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1650612139149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
<path d="M298.666667 426.666667V341.333333a213.333333 213.333333 0 1 1 426.666666 0v85.333334h42.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v256a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-256a85.333333 85.333333 0 0 1 85.333333-85.333333h42.666667z m213.333333-213.333334a128 128 0 0 0-128 128v85.333334h256V341.333333a128 128 0 0 0-128-128z"></path>
</svg>
`,je=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">
    <path d="M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z"></path>
</svg>`,Ue=`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
<path d="M844.8 219.648h-665.6c-6.144 0-10.24 4.608-10.24 10.752v563.2c0 5.632 4.096 10.24 10.24 10.24h256v92.16h-256a102.4 102.4 0 0 1-102.4-102.4v-563.2c0-56.832 45.568-102.4 102.4-102.4h665.6a102.4 102.4 0 0 1 102.4 102.4v204.8h-92.16v-204.8c0-6.144-4.608-10.752-10.24-10.752zM614.4 588.8c-28.672 0-51.2 22.528-51.2 51.2v204.8c0 28.16 22.528 51.2 51.2 51.2h281.6c28.16 0 51.2-23.04 51.2-51.2v-204.8c0-28.672-23.04-51.2-51.2-51.2H614.4z"></path>
</svg>`,qe=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">
  <path d="M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z"></path>
</svg>`,Ge='<svg height="24" viewBox="0 0 24 24" width="24"><path d="M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#a8a6a4;"></path></svg>',Ke=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 50 50">
	<path d="M 19.402344 6 C 17.019531 6 14.96875 7.679688 14.5 10.011719 L 14.097656 12 L 9 12 C 6.238281 12 4 14.238281 4 17 L 4 38 C 4 40.761719 6.238281 43 9 43 L 41 43 C 43.761719 43 46 40.761719 46 38 L 46 17 C 46 14.238281 43.761719 12 41 12 L 35.902344 12 L 35.5 10.011719 C 35.03125 7.679688 32.980469 6 30.597656 6 Z M 25 17 C 30.519531 17 35 21.480469 35 27 C 35 32.519531 30.519531 37 25 37 C 19.480469 37 15 32.519531 15 27 C 15 21.480469 19.480469 17 25 17 Z M 25 19 C 20.589844 19 17 22.589844 17 27 C 17 31.410156 20.589844 35 25 35 C 29.410156 35 33 31.410156 33 27 C 33 22.589844 29.410156 19 25 19 Z "/>
</svg>
`,Ze=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="2"></circle>
    <path d="M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
</svg>`,Je=`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
<path d="M9.5 9.325v5.35q0 .575.525.875t1.025-.05l4.15-2.65q.475-.3.475-.85t-.475-.85L11.05 8.5q-.5-.35-1.025-.05t-.525.875ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
</svg>
`,Qe=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="26" height="26" viewBox="0 0 1740 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M511.8976 1024h670.5152c282.4192-0.4096 511.1808-229.4784 511.1808-511.8976 0-282.4192-228.7616-511.488-511.1808-511.8976H511.8976C229.4784 0.6144 0.7168 229.6832 0.7168 512.1024c0 282.4192 228.7616 511.488 511.1808 511.8976zM511.3344 48.64A464.5888 464.5888 0 1 1 48.0256 513.024 463.872 463.872 0 0 1 511.3344 48.4352V48.64z" />
</svg>
`,tn=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg class="icon" width="26" height="26" viewBox="0 0 1664 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="#648FFC" d="M1152 0H512a512 512 0 0 0 0 1024h640a512 512 0 0 0 0-1024z m0 960a448 448 0 1 1 448-448 448 448 0 0 1-448 448z"  />
</svg>`,en=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1650612464266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M666.752 194.517333L617.386667 268.629333A128 128 0 0 0 384 341.333333l0.042667 85.333334h384a85.333333 85.333333 0 0 1 85.333333 85.333333v256a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-256a85.333333 85.333333 0 0 1 85.333333-85.333333h42.666667V341.333333a213.333333 213.333333 0 0 1 368.085333-146.816z"></path></svg>
`,nn=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">
    <path d="M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z"></path>
    <path d="M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z"></path>
</svg>`,rn=`<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22">
    <path d="M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z"></path>
    <path d="M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z"></path>
</svg>`;class on{constructor(t){const n={loading:Be,state:Je,play:qe,pause:je,check:Oe,volume:rn,volumeClose:nn,screenshot:Ke,setting:Ze,pip:Ue,arrowLeft:Re,arrowRight:Pe,playbackRate:Ge,aspectRatio:Ae,config:Ve,lock:Xe,flip:Ye,unlock:en,fullscreenOff:Ne,fullscreenOn:Fe,fullscreenWebOff:He,fullscreenWebOn:We,switchOn:tn,switchOff:Qe,error:De,close:_e,airplay:Ie,...t.option.icons};for(const r in n)v(this,r,{get:()=>Mt(r,n[r])})}}class an extends j{constructor(t){super(t),this.name="info",M||this.init()}init(){const{proxy:t,constructor:n,template:{$infoPanel:r,$infoClose:o,$video:i}}=this.art;t(o,"click",()=>{this.show=!1});let a=null;const s=ot("[data-video]",r)||[];this.art.on("destroy",()=>clearTimeout(a));function c(){for(let l=0;l<s.length;l++){const d=s[l],h=i[d.dataset.video],u=typeof h=="number"?h.toFixed(2):h;d.textContent!==u&&(d.textContent=u)}a=setTimeout(c,n.INFO_LOOP_TIME)}c()}}class sn extends j{constructor(t){super(t);const{option:n,template:{$layer:r}}=t;this.name="layer",this.$parent=r;for(let o=0;o<n.layers.length;o++)this.add(n.layers[o])}}class ln extends j{constructor(t){super(t),this.name="loading",g(t.template.$loading,t.icons.loading)}}class cn extends j{constructor(t){super(t),this.name="mask";const{template:n,icons:r,events:o}=t,i=g(n.$state,r.state),a=g(n.$state,r.error);p(a,"display","none"),t.on("destroy",()=>{p(i,"display","none"),p(a,"display",null)}),o.proxy(n.$state,"click",()=>t.play())}}class dn{constructor(t){this.art=t,this.timer=null,t.on("destroy",()=>this.destroy())}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null)}set show(t){const{constructor:n,template:{$player:r,$noticeInner:o}}=this.art;t?(o.textContent=t instanceof Error?t.message.trim():t,w(r,"art-notice-show"),clearTimeout(this.timer),this.timer=setTimeout(()=>{o.textContent="",I(r,"art-notice-show")},n.NOTICE_TIME)):I(r,"art-notice-show")}get show(){const{template:{$player:t}}=this.art;return t.classList.contains("art-notice-show")}}function pn(e){const{i18n:t,notice:n,proxy:r,template:{$video:o}}=e;let i=!0;window.WebKitPlaybackTargetAvailabilityEvent&&o.webkitShowPlaybackTargetPicker?r(o,"webkitplaybacktargetavailabilitychanged",a=>{switch(a.availability){case"available":i=!0;break;case"not-available":i=!1;break}}):i=!1,v(e,"airplay",{value(){i?(o.webkitShowPlaybackTargetPicker(),e.emit("airplay")):n.show=t.get("AirPlay Not Available")}})}function hn(e){const{i18n:t,notice:n,template:{$video:r,$player:o}}=e;v(e,"aspectRatio",{get(){return o.dataset.aspectRatio||"default"},set(i){if(i||(i="default"),i==="default")p(r,"width",null),p(r,"height",null),p(r,"margin",null),delete o.dataset.aspectRatio;else{const a=i.split(":").map(Number),{clientWidth:s,clientHeight:c}=o,l=s/c,d=a[0]/a[1];l>d?(p(r,"width",`${d*c}px`),p(r,"height","100%"),p(r,"margin","0 auto")):(p(r,"width","100%"),p(r,"height",`${s/d}px`),p(r,"margin","auto 0")),o.dataset.aspectRatio=i}n.show=`${t.get("Aspect Ratio")}: ${i==="default"?t.get("Default"):i}`,e.emit("aspectRatio",i)}})}function un(e){const{template:{$video:t}}=e;v(e,"attr",{value(n,r){if(r===void 0)return t[n];t[n]=r}})}function fn(e){const{template:{$container:t,$video:n}}=e;v(e,"autoHeight",{value(){const{clientWidth:r}=t,{videoHeight:o,videoWidth:i}=n,a=o*(r/i);p(t,"height",`${a}px`),e.emit("autoHeight",a)}})}function mn(e){const{$container:t,$player:n,$video:r}=e.template;v(e,"autoSize",{value(){const{videoWidth:o,videoHeight:i}=r,{width:a,height:s}=N(t),c=o/i;if(a/s>c){const d=s*c/a*100;p(n,"width",`${d}%`),p(n,"height","100%")}else{const d=a/c/s*100;p(n,"width","100%"),p(n,"height",`${d}%`)}e.emit("autoSize",{width:e.width,height:e.height})}})}function gn(e){const{$player:t}=e.template;v(e,"cssVar",{value(n,r){return r?t.style.setProperty(n,r):getComputedStyle(t).getPropertyValue(n)}})}function vn(e){const{$video:t}=e.template;v(e,"currentTime",{get:()=>t.currentTime||0,set:n=>{n=Number.parseFloat(n),!Number.isNaN(n)&&(t.currentTime=O(n,0,e.duration))}})}function yn(e){v(e,"duration",{get:()=>{const{duration:t}=e.template.$video;return t===1/0?0:t||0}})}function bn(e){const{i18n:t,notice:n,option:r,constructor:o,proxy:i,template:{$player:a,$video:s,$poster:c}}=e;let l=0;for(let d=0;d<tt.events.length;d++)i(s,tt.events[d],h=>{e.emit(`video:${h.type}`,h)});e.on("video:canplay",()=>{l=0,e.loading.show=!1}),e.once("video:canplay",()=>{e.loading.show=!1,e.controls.show=!0,e.mask.show=!0,e.isReady=!0,e.emit("ready")}),e.on("video:ended",()=>{r.loop?(e.seek=0,e.play(),e.controls.show=!1,e.mask.show=!1):(e.controls.show=!0,e.mask.show=!0)}),e.on("video:error",async d=>{l<o.RECONNECT_TIME_MAX?(await K(o.RECONNECT_SLEEP_TIME),l+=1,e.url=r.url,n.show=`${t.get("Reconnect")}: ${l}`,e.emit("error",d,l)):(e.mask.show=!0,e.loading.show=!1,e.controls.show=!0,w(a,"art-error"),await K(o.RECONNECT_SLEEP_TIME),n.show=t.get("Video Load Failed"))}),e.on("video:loadedmetadata",()=>{e.emit("resize"),M&&(e.loading.show=!1,e.controls.show=!0,e.mask.show=!0)}),e.on("video:loadstart",()=>{e.loading.show=!0,e.mask.show=!1,e.controls.show=!0}),e.on("video:pause",()=>{e.controls.show=!0,e.mask.show=!0}),e.on("video:play",()=>{e.mask.show=!1,p(c,"display","none")}),e.on("video:playing",()=>{e.mask.show=!1}),e.on("video:progress",()=>{e.playing&&(e.loading.show=!1)}),e.on("video:seeked",()=>{e.loading.show=!1,e.mask.show=!0}),e.on("video:seeking",()=>{e.loading.show=!0,e.mask.show=!1}),e.on("video:timeupdate",()=>{e.mask.show=!1}),e.on("video:waiting",()=>{e.loading.show=!0,e.mask.show=!1})}function wn(e){const{template:{$player:t},i18n:n,notice:r}=e;v(e,"flip",{get(){return t.dataset.flip||"normal"},set(o){o||(o="normal"),o==="normal"?delete t.dataset.flip:t.dataset.flip=o,r.show=`${n.get("Video Flip")}: ${n.get(ht(o))}`,e.emit("flip",o)}})}const xt=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],X=(()=>{if(typeof document>"u")return!1;const e=xt[0],t={};for(const n of xt)if(n[1]in document){for(const[o,i]of n.entries())t[e[o]]=i;return t}return!1})(),kt={change:X.fullscreenchange,error:X.fullscreenerror},z={request(e=document.documentElement,t){return new Promise((n,r)=>{const o=()=>{z.off("change",o),n()};z.on("change",o);const i=e[X.requestFullscreen](t);i instanceof Promise&&i.then(o).catch(r)})},exit(){return new Promise((e,t)=>{if(!z.isFullscreen){e();return}const n=()=>{z.off("change",n),e()};z.on("change",n);const r=document[X.exitFullscreen]();r instanceof Promise&&r.then(n).catch(t)})},toggle(e,t){return z.isFullscreen?z.exit():z.request(e,t)},onchange(e){z.on("change",e)},onerror(e){z.on("error",e)},on(e,t){const n=kt[e];n&&document.addEventListener(n,t,!1)},off(e,t){const n=kt[e];n&&document.removeEventListener(n,t,!1)},raw:X};Object.defineProperties(z,{isFullscreen:{get:()=>!!document[X.fullscreenElement]},element:{enumerable:!0,get:()=>document[X.fullscreenElement]},isEnabled:{enumerable:!0,get:()=>!!document[X.fullscreenEnabled]}});function xn(e){const{i18n:t,notice:n,template:{$video:r,$player:o}}=e,i=s=>{z.on("change",()=>{s.emit("fullscreen",z.isFullscreen),z.isFullscreen?(s.state="fullscreen",w(o,"art-fullscreen")):I(o,"art-fullscreen"),s.emit("resize")}),z.on("error",c=>{s.emit("fullscreenError",c)}),v(s,"fullscreen",{get(){return z.isFullscreen},async set(c){c?await z.request(o):await z.exit()}})},a=s=>{s.on("document:webkitfullscreenchange",()=>{s.emit("fullscreen",s.fullscreen),s.emit("resize")}),v(s,"fullscreen",{get(){return document.fullscreenElement===r},set(c){c?(s.state="fullscreen",r.webkitEnterFullscreen()):r.webkitExitFullscreen()}})};e.once("video:loadedmetadata",()=>{z.isEnabled?i(e):r.webkitSupportsFullscreen?a(e):v(e,"fullscreen",{get(){return!1},set(){n.show=t.get("Fullscreen Not Supported")}}),v(e,"fullscreen",Ot(e,"fullscreen"))})}function kn(e){const{constructor:t,template:{$container:n,$player:r}}=e;let o="";v(e,"fullscreenWeb",{get(){return H(r,"art-fullscreen-web")},set(i){i?(o=r.style.cssText,t.FULLSCREEN_WEB_IN_BODY&&g(document.body,r),e.state="fullscreenWeb",p(r,"width","100%"),p(r,"height","100%"),w(r,"art-fullscreen-web"),e.emit("fullscreenWeb",!0)):(t.FULLSCREEN_WEB_IN_BODY&&g(n,r),o&&(r.style.cssText=o,o=""),I(r,"art-fullscreen-web"),e.emit("fullscreenWeb",!1)),e.emit("resize")}})}function $n(e){const{$video:t}=e.template;v(e,"loaded",{get:()=>e.loadedTime/t.duration}),v(e,"loadedTime",{get:()=>t.buffered.length?t.buffered.end(t.buffered.length-1):0})}function Tn(e){const{icons:t,proxy:n,storage:r,template:{$player:o,$video:i}}=e;let a=!1,s=0,c=0;function l(){const{$mini:m}=e.template;m&&(I(o,"art-mini"),p(m,"display","none"),o.prepend(i),e.emit("mini",!1))}function d(m,f){e.playing?(p(m,"display","none"),p(f,"display","flex")):(p(m,"display","flex"),p(f,"display","none"))}function h(){const{$mini:m}=e.template;if(m)return g(m,i),p(m,"display","flex");{const f=S("div");w(f,"art-mini-popup"),g(document.body,f),e.template.$mini=f,g(f,i);const y=g(f,'<div class="art-mini-close"></div>');g(y,t.close),n(y,"click",l);const b=g(f,'<div class="art-mini-state"></div>'),$=g(b,t.play),C=g(b,t.pause);return n($,"click",()=>e.play()),n(C,"click",()=>e.pause()),d($,C),e.on("video:playing",()=>d($,C)),e.on("video:pause",()=>d($,C)),e.on("video:timeupdate",()=>d($,C)),n(f,"mousedown",L=>{a=L.button===0,s=L.pageX,c=L.pageY}),e.on("document:mousemove",L=>{if(a){w(f,"art-mini-dragging");const x=L.pageX-s,T=L.pageY-c;p(f,"transform",`translate(${x}px, ${T}px)`)}}),e.on("document:mouseup",()=>{if(a){a=!1,I(f,"art-mini-dragging");const L=N(f);r.set("left",L.left),r.set("top",L.top),p(f,"left",`${L.left}px`),p(f,"top",`${L.top}px`),p(f,"transform",null)}}),f}}function u(){const{$mini:m}=e.template,f=N(m),y=window.innerHeight-f.height-50,b=window.innerWidth-f.width-50;r.set("top",y),r.set("left",b),p(m,"top",`${y}px`),p(m,"left",`${b}px`)}v(e,"mini",{get(){return H(o,"art-mini")},set(m){if(m){e.state="mini",w(o,"art-mini");const f=h(),y=r.get("top"),b=r.get("left");typeof y=="number"&&typeof b=="number"?(p(f,"top",`${y}px`),p(f,"left",`${b}px`),gt(f)||u()):u(),e.emit("mini",!0)}else l()}})}function En(e){const{option:t,storage:n,template:{$video:r,$poster:o}}=e;for(const a in t.moreVideoAttr)e.attr(a,t.moreVideoAttr[a]);t.muted&&(e.muted=t.muted),t.volume&&(r.volume=O(t.volume,0,1));const i=n.get("volume");typeof i=="number"&&(r.volume=O(i,0,1)),t.poster&&p(o,"backgroundImage",`url(${t.poster})`),t.autoplay&&(r.autoplay=t.autoplay),t.playsInline&&(r.playsInline=!0,r["webkit-playsinline"]=!0),t.theme&&(t.cssVar["--art-theme"]=t.theme);for(const a in t.cssVar)e.cssVar(a,t.cssVar[a]);e.url=t.url}function Cn(e){const{template:{$video:t},i18n:n,notice:r}=e;v(e,"pause",{value(){const o=t.pause();return r.show=n.get("Pause"),e.emit("pause"),o}})}function Ln(e){const{template:{$video:t},proxy:n,notice:r}=e;t.disablePictureInPicture=!1,v(e,"pip",{get(){return document.pictureInPictureElement},set(o){o?(e.state="pip",t.requestPictureInPicture().catch(i=>{throw r.show=i,i})):document.exitPictureInPicture().catch(i=>{throw r.show=i,i})}}),n(t,"enterpictureinpicture",()=>{e.emit("pip",!0)}),n(t,"leavepictureinpicture",()=>{e.emit("pip",!1)})}function Mn(e){const{$video:t}=e.template;t.webkitSetPresentationMode("inline"),v(e,"pip",{get(){return t.webkitPresentationMode==="picture-in-picture"},set(n){n?(e.state="pip",t.webkitSetPresentationMode("picture-in-picture"),e.emit("pip",!0)):(t.webkitSetPresentationMode("inline"),e.emit("pip",!1))}})}function Sn(e){const{i18n:t,notice:n,template:{$video:r}}=e;document.pictureInPictureEnabled?Ln(e):r.webkitSupportsPresentationMode?Mn(e):v(e,"pip",{get(){return!1},set(){n.show=t.get("PIP Not Supported")}})}function zn(e){const{template:{$video:t},i18n:n,notice:r}=e;v(e,"playbackRate",{get(){return t.playbackRate},set(o){if(o){if(o===t.playbackRate)return;t.playbackRate=o,r.show=`${n.get("Rate")}: ${o===1?n.get("Normal"):`${o}x`}`}else e.playbackRate=1}})}function In(e){v(e,"played",{get:()=>e.currentTime/e.duration})}function Rn(e){const{$video:t}=e.template;v(e,"playing",{get:()=>typeof t.playing=="boolean"?t.playing:t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2})}function Pn(e){const{i18n:t,notice:n,option:r,constructor:{instances:o},template:{$video:i}}=e;v(e,"play",{async value(){const a=await i.play();if(n.show=t.get("Play"),e.emit("play"),r.mutex)for(let s=0;s<o.length;s++){const c=o[s];c!==e&&c.pause()}return a}})}function An(e){const{template:{$poster:t}}=e;v(e,"poster",{get:()=>{try{return t.style.backgroundImage.match(/"(.*)"/)[1]}catch{return""}},set(n){p(t,"backgroundImage",`url(${n})`)}})}function On(e){v(e,"quality",{set(t){const{controls:n,notice:r,i18n:o}=e,i=t.find(a=>a.default)||t[0];n.update({name:"quality",position:"right",index:10,style:{marginRight:"10px"},html:i?.html||"",selector:t,async onSelect(a){return await e.switchQuality(a.url),r.show=`${o.get("Switch Video")}: ${a.html}`,a.html}})}})}function _n(e){v(e,"rect",{get:()=>N(e.template.$player)});const t=["bottom","height","left","right","top","width"];for(let n=0;n<t.length;n++){const r=t[n];v(e,r,{get:()=>e.rect[r]})}v(e,"x",{get:()=>e.left+window.pageXOffset}),v(e,"y",{get:()=>e.top+window.pageYOffset})}function Vn(e){const{notice:t,template:{$video:n}}=e,r=S("canvas");v(e,"getDataURL",{value:()=>new Promise((o,i)=>{try{r.width=n.videoWidth,r.height=n.videoHeight,r.getContext("2d").drawImage(n,0,0),o(r.toDataURL("image/png"))}catch(a){t.show=a,i(a)}})}),v(e,"getBlobUrl",{value:()=>new Promise((o,i)=>{try{r.width=n.videoWidth,r.height=n.videoHeight,r.getContext("2d").drawImage(n,0,0),r.toBlob(a=>{o(URL.createObjectURL(a))})}catch(a){t.show=a,i(a)}})}),v(e,"screenshot",{value:async o=>{const i=await e.getDataURL(),a=o||`artplayer_${F(n.currentTime)}`;return Pt(i,`${a}.png`),e.emit("screenshot",i),i}})}function Dn(e){const{notice:t}=e;v(e,"seek",{set(n){e.currentTime=n,e.duration&&(t.show=`${F(e.currentTime)} / ${F(e.duration)}`),e.emit("seek",e.currentTime,n)}}),v(e,"forward",{set(n){e.seek=e.currentTime+n}}),v(e,"backward",{set(n){e.seek=e.currentTime-n}})}function Yn(e){const t=["mini","pip","fullscreen","fullscreenWeb"];v(e,"state",{get:()=>t.find(n=>e[n])||"standard",set(n){for(let r=0;r<t.length;r++){const o=t[r];o!==n&&e[o]&&(e[o]=!1)}}})}function Nn(e){const{notice:t,i18n:n,template:r}=e;v(e,"subtitleOffset",{get(){return r.$track?.offset||0},set(o){const{cues:i}=e.subtitle;if(!r.$track||i.length===0)return;const a=O(o,-10,10);r.$track.offset=a;for(let s=0;s<i.length;s++){const c=i[s];c.originalStartTime=c.originalStartTime??c.startTime,c.originalEndTime=c.originalEndTime??c.endTime,c.startTime=O(c.originalStartTime+a,0,e.duration),c.endTime=O(c.originalEndTime+a,0,e.duration)}e.subtitle.update(),t.show=`${n.get("Subtitle Offset")}: ${o}s`,e.emit("subtitleOffset",o)}})}function Fn(e){function t(n,r){return new Promise((o,i)=>{if(n===e.url){o();return}const{playing:a,aspectRatio:s,playbackRate:c}=e;e.pause(),e.url=n,e.notice.show="";const l={};l.error=d=>{e.off("video:canplay",l.canplay),e.off("video:loadedmetadata",l.metadata),i(d)},l.metadata=()=>{e.currentTime=r},l.canplay=async()=>{e.off("video:error",l.error),e.playbackRate=c,e.aspectRatio=s,a&&await e.play(),e.notice.show="",o()},e.once("video:error",l.error),e.once("video:loadedmetadata",l.metadata),e.once("video:canplay",l.canplay)})}v(e,"switchQuality",{value:n=>t(n,e.currentTime)}),v(e,"switchUrl",{value:n=>t(n,0)}),v(e,"switch",{set:e.switchUrl})}function Hn(e){v(e,"theme",{get(){return e.cssVar("--art-theme")},set(t){e.cssVar("--art-theme",t)}})}function Wn(e){const{option:t,template:{$progress:n,$video:r}}=e;let o=null,i=!1,a=null;function s(){clearTimeout(o),o=null,i=!1,a=null}function c(l){const d=e.controls?.thumbnails;if(!d)return;const{number:h,column:u,width:m,height:f,scale:y}=t.thumbnails,b=m*y||a.naturalWidth/u,$=f*y||b/(r.videoWidth/r.videoHeight),C=n.clientWidth/h,L=Math.floor(l/C),x=Math.ceil(L/u)-1,T=L%u||u-1;p(d,"backgroundImage",`url(${a.src})`),p(d,"height",`${$}px`),p(d,"width",`${b}px`),p(d,"backgroundPosition",`-${T*b}px -${x*$}px`),l<=b/2?p(d,"left",0):l>n.clientWidth-b/2?p(d,"left",`${n.clientWidth-b}px`):p(d,"left",`${l-b/2}px`)}e.on("setBar",async(l,d,h)=>{const u=e.controls?.thumbnails,{url:m,scale:f}=t.thumbnails;if(!u||!m)return;if(l==="hover"||l==="played"&&h&&M){if(!a&&!i&&(i=!0,a=await It(m,f),i=!1),!a)return;const b=n.clientWidth*d;b>0&&b<n.clientWidth&&c(b)}}),v(e,"thumbnails",{get(){return e.option.thumbnails},set(l){l.url&&!e.option.isLive&&(e.option.thumbnails=l,s())}})}function Bn(e){v(e,"toggle",{value(){return e.playing?e.pause():e.play()}})}function Xn(e){v(e,"type",{get(){return e.option.type},set(t){e.option.type=t}})}function jn(e){const{option:t,template:{$video:n}}=e;v(e,"url",{get(){return n.src},async set(r){if(r){const o=e.url,i=t.type||nt(r),a=t.customType[i];i&&a?(await K(),e.loading.show=!0,a.call(e,n,r,e)):(URL.revokeObjectURL(o),n.src=r),o!==e.url&&(e.option.url=r,e.isReady&&o&&e.once("video:canplay",()=>{e.emit("restart",r)}))}else await K(),e.loading.show=!0}})}function Un(e){const{template:{$video:t},i18n:n,notice:r,storage:o}=e;v(e,"volume",{get:()=>t.volume||0,set:i=>{t.volume=O(i,0,1),r.show=`${n.get("Volume")}: ${Number.parseInt(t.volume*100,10)}`,t.volume!==0&&o.set("volume",t.volume)}}),v(e,"muted",{get:()=>t.muted,set:i=>{t.muted=i,e.emit("muted",i)}})}class qn{constructor(t){jn(t),un(t),Pn(t),Cn(t),Bn(t),Dn(t),Un(t),vn(t),yn(t),Fn(t),zn(t),hn(t),Vn(t),xn(t),kn(t),Sn(t),$n(t),In(t),Rn(t),mn(t),_n(t),wn(t),Tn(t),An(t),fn(t),gn(t),Hn(t),Xn(t),Yn(t),Nn(t),pn(t),On(t),Wn(t),bn(t),En(t)}}function Gn(e){const{notice:t,constructor:n,template:{$player:r,$video:o}}=e,i="art-auto-orientation",a="art-auto-orientation-fullscreen";let s=!1;function c(){const h=document.documentElement.clientWidth,u=document.documentElement.clientHeight;p(r,"width",`${u}px`),p(r,"height",`${h}px`),p(r,"transform-origin","0 0"),p(r,"transform",`rotate(90deg) translate(0, -${h}px)`),w(r,i),e.isRotate=!0,e.emit("resize")}function l(){p(r,"width",""),p(r,"height",""),p(r,"transform-origin",""),p(r,"transform",""),I(r,i),e.isRotate=!1,e.emit("resize")}function d(){const{videoWidth:h,videoHeight:u}=o,m=document.documentElement.clientWidth,f=document.documentElement.clientHeight;return h>u&&m<f||h<u&&m>f}return e.on("fullscreenWeb",h=>{if(h){if(d()){const u=Number(n.AUTO_ORIENTATION_TIME??0);setTimeout(()=>{e.fullscreenWeb&&!H(r,i)&&c()},u)}}else H(r,i)&&l()}),e.on("fullscreen",async h=>{const u=!!screen?.orientation?.lock;if(h){if(u&&d())try{const f=screen.orientation.type.startsWith("portrait")?"landscape":"portrait";await screen.orientation.lock(f),s=!0,w(r,a)}catch(m){s=!1,t.show=m}}else if(H(r,a)&&I(r,a),u&&s){try{screen.orientation.unlock()}catch{}s=!1}}),{name:"autoOrientation",get state(){return H(r,i)}}}function Kn(e){const{i18n:t,icons:n,storage:r,constructor:o,proxy:i,template:{$poster:a}}=e,s=e.layers.add({name:"auto-playback",html:`
            <div class="art-auto-playback-close"></div>
            <div class="art-auto-playback-last"></div>
            <div class="art-auto-playback-jump"></div>
        `}),c=A(".art-auto-playback-last",s),l=A(".art-auto-playback-jump",s),d=A(".art-auto-playback-close",s);g(d,n.close);let h=null;e.on("video:timeupdate",()=>{if(e.playing){const m=r.get("times")||{},f=Object.keys(m);f.length>o.AUTO_PLAYBACK_MAX&&delete m[f[0]],m[e.option.id||e.option.url]=e.currentTime,r.set("times",m)}});function u(){const f=(r.get("times")||{})[e.option.id||e.option.url];clearTimeout(h),p(s,"display","none"),f&&f>=o.AUTO_PLAYBACK_MIN&&(p(s,"display","flex"),c.textContent=`${t.get("Last Seen")} ${F(f)}`,l.textContent=t.get("Jump Play"),i(d,"click",()=>{p(s,"display","none")}),i(l,"click",()=>{e.seek=f,e.play(),p(a,"display","none"),p(s,"display","none")}),e.once("video:timeupdate",()=>{h=setTimeout(()=>{p(s,"display","none")},o.AUTO_PLAYBACK_TIMEOUT)}))}return e.on("ready",u),e.on("restart",u),{name:"auto-playback",get times(){return r.get("times")||{}},clear(){return r.del("times")},delete(m){const f=r.get("times")||{};return delete f[m],r.set("times",f),f}}}function Zn(e){const{constructor:t,proxy:n,template:{$player:r,$video:o}}=e;let i=null,a=!1,s=1;const c=d=>{d.touches.length===1&&e.playing&&!e.isLock&&(i=setTimeout(()=>{a=!0,s=e.playbackRate,e.playbackRate=t.FAST_FORWARD_VALUE,w(r,"art-fast-forward")},t.FAST_FORWARD_TIME))},l=()=>{clearTimeout(i),a&&(a=!1,e.playbackRate=s,I(r,"art-fast-forward"))};return n(o,"touchstart",c),e.on("document:touchmove",l),e.on("document:touchend",l),{name:"fastForward",get state(){return H(r,"art-fast-forward")}}}function Jn(e){const{layers:t,icons:n,template:{$player:r}}=e;function o(){return H(r,"art-lock")}function i(){w(r,"art-lock"),e.isLock=!0,e.emit("lock",!0)}function a(){I(r,"art-lock"),e.isLock=!1,e.emit("lock",!1)}return t.add({name:"lock",mounted(s){const c=g(s,n.lock),l=g(s,n.unlock);p(c,"display","none"),e.on("lock",d=>{d?(p(c,"display","inline-flex"),p(l,"display","none")):(p(c,"display","none"),p(l,"display","inline-flex"))})},click(){o()?a():i()}}),{name:"lock",get state(){return o()},set state(s){s?i():a()}}}function Qn(e){return e.on("control",t=>{t?I(e.template.$player,"art-mini-progress-bar"):w(e.template.$player,"art-mini-progress-bar")}),{name:"mini-progress-bar"}}class tr{constructor(t){this.art=t,this.id=0;const{option:n}=t;n.miniProgressBar&&!n.isLive&&this.add(Qn),n.lock&&M&&this.add(Jn),n.autoPlayback&&!n.isLive&&this.add(Kn),n.autoOrientation&&M&&this.add(Gn),n.fastForward&&M&&!n.isLive&&this.add(Zn);for(let r=0;r<n.plugins.length;r++)this.add(n.plugins[r])}add(t){this.id+=1;const n=t.call(this.art,this.art);return n instanceof Promise?n.then(r=>this.next(t,r)):this.next(t,n)}next(t,n){const r=n&&n.name||t.name||`plugin${this.id}`;return V(!et(this,r),`Cannot add a plugin that already has the same name: ${r}`),v(this,r,{value:n}),this}}function er(e){const{i18n:t,icons:n,constructor:{SETTING_ITEM_WIDTH:r,ASPECT_RATIO:o}}=e;function i(s){return s==="default"?t.get("Default"):s}function a(){const s=e.setting.find(`aspect-ratio-${e.aspectRatio}`);e.setting.check(s)}return{width:r,name:"aspect-ratio",html:t.get("Aspect Ratio"),icon:n.aspectRatio,tooltip:i(e.aspectRatio),selector:o.map(s=>({value:s,name:`aspect-ratio-${s}`,default:s===e.aspectRatio,html:i(s)})),onSelect(s){return e.aspectRatio=s.value,s.html},mounted:()=>{a(),e.on("aspectRatio",()=>a())}}}function nr(e){const{i18n:t,icons:n,constructor:{SETTING_ITEM_WIDTH:r,FLIP:o}}=e;function i(s){return t.get(ht(s))}function a(){const s=e.setting.find(`flip-${e.flip}`);e.setting.check(s)}return{width:r,name:"flip",html:t.get("Video Flip"),tooltip:i(e.flip),icon:n.flip,selector:o.map(s=>({value:s,name:`flip-${s}`,default:s===e.flip,html:i(s)})),onSelect(s){return e.flip=s.value,s.html},mounted:()=>{a(),e.on("flip",()=>a())}}}function rr(e){const{i18n:t,icons:n,constructor:{SETTING_ITEM_WIDTH:r,PLAYBACK_RATE:o}}=e;function i(s){return s===1?t.get("Normal"):s.toFixed(1)}function a(){const s=e.setting.find(`playback-rate-${e.playbackRate}`);e.setting.check(s)}return{width:r,name:"playback-rate",html:t.get("Play Speed"),tooltip:i(e.playbackRate),icon:n.playbackRate,selector:o.map(s=>({value:s,name:`playback-rate-${s}`,default:s===e.playbackRate,html:i(s)})),onSelect(s){return e.playbackRate=s.value,s.html},mounted:()=>{a(),e.on("video:ratechange",()=>a())}}}function or(e){const{i18n:t,icons:n,constructor:r}=e;return{width:r.SETTING_ITEM_WIDTH,name:"subtitle-offset",html:t.get("Subtitle Offset"),icon:n.subtitle,tooltip:"0s",range:[0,-10,10,.1],onChange(o){return e.subtitleOffset=o.range[0],`${o.range[0]}s`},mounted:(o,i)=>{e.on("subtitleOffset",a=>{i.$range.value=a,i.tooltip=`${a}s`})}}}class ir extends j{constructor(t){super(t);const{option:n,controls:r,template:{$setting:o}}=t;this.name="setting",this.$parent=o,this.id=0,this.active=null,this.cache=new Map,this.option=[...this.builtin,...n.settings],n.setting&&(this.format(),this.render(),t.on("blur",()=>{this.show&&(this.show=!1,this.render())}),t.on("focus",i=>{const a=q(i,r.setting),s=q(i,this.$parent);this.show&&!a&&!s&&(this.show=!1,this.render())}),t.on("resize",()=>this.resize()))}get builtin(){const t=[],{option:n}=this.art;return n.playbackRate&&t.push(rr(this.art)),n.aspectRatio&&t.push(er(this.art)),n.flip&&t.push(nr(this.art)),n.subtitleOffset&&t.push(or(this.art)),t}traverse(t,n=this.option){for(let r=0;r<n.length;r++){const o=n[r];t(o),o.selector?.length&&this.traverse(t,o.selector)}}check(t){t&&(t.$parent.tooltip=t.html,this.traverse(n=>{n.default=n===t,n.default&&n.$item&&Y(n.$item,"art-current")},t.$option),this.render(t.$parents))}format(t=this.option,n,r,o=[]){for(let i=0;i<t.length;i++){const a=t[i];if(a?.name?(V(!o.includes(a.name),`The [${a.name}] already exists in [setting]`),o.push(a.name)):a.name=`setting-${this.id++}`,!a.$formatted){v(a,"$parent",{get:()=>n}),v(a,"$parents",{get:()=>r}),v(a,"$option",{get:()=>t});const s=[];v(a,"$events",{get:()=>s}),v(a,"$formatted",{get:()=>!0})}this.format(a.selector||[],a,t,o)}this.option=t}find(t=""){let n=null;return this.traverse(r=>{r.name===t&&(n=r)}),n}resize(){const{controls:t,constructor:{SETTING_WIDTH:n,SETTING_ITEM_HEIGHT:r},template:{$player:o,$setting:i}}=this.art;if(t.setting&&this.show){const a=this.active[0]?.$parent?.width||n,{left:s,width:c}=N(t.setting),{left:l,width:d}=N(o),h=s-l+c/2-a/2,u=this.active===this.option?this.active.length*r:(this.active.length+1)*r;if(p(i,"height",`${u}px`),p(i,"width",`${a}px`),this.art.isRotate||M)return;h+a>d?(p(i,"left",null),p(i,"right",null)):(p(i,"left",`${h}px`),p(i,"right","auto"))}}inactivate(t){for(let n=0;n<t.$events.length;n++)this.art.events.remove(t.$events[n]);t.$events.length=0}remove(t){const n=this.find(t);V(n,`Can't find [${t}] in the [setting]`);const r=n.$option.indexOf(n);n.$option.splice(r,1),this.inactivate(n),n.$item&&dt(n.$item),this.render()}update(t){const n=this.find(t.name);return n?(this.inactivate(n),Object.assign(n,t),this.format(),this.createItem(n,!0),this.render(),n):this.add(t)}add(t,n=this.option){return n.push(t),this.format(),this.createItem(t),this.render(),t}createHeader(t){if(!this.cache.has(t.$option))return;const n=this.cache.get(t.$option),{proxy:r,icons:{arrowLeft:o},constructor:{SETTING_ITEM_HEIGHT:i}}=this.art,a=S("div");p(a,"height",`${i}px`),w(a,"art-setting-item"),w(a,"art-setting-item-back");const s=g(a,'<div class="art-setting-item-left"></div>'),c=S("div");w(c,"art-setting-item-left-icon"),g(c,o),g(s,c),g(s,t.$parent.html);const l=r(a,"click",()=>this.render(t.$parents));t.$parent.$events.push(l),g(n,a)}createItem(t,n=!1){if(!this.cache.has(t.$option))return;const r=this.cache.get(t.$option),o=t.$item;let i="selector";et(t,"switch")&&(i="switch"),et(t,"range")&&(i="range"),et(t,"onClick")&&(i="button");const{icons:a,proxy:s,constructor:c}=this.art,l=S("div");w(l,"art-setting-item"),p(l,"height",`${c.SETTING_ITEM_HEIGHT}px`),l.dataset.name=t.name||"",l.dataset.value=t.value||"";const d=g(l,'<div class="art-setting-item-left"></div>'),h=g(l,'<div class="art-setting-item-right"></div>'),u=S("div");switch(w(u,"art-setting-item-left-icon"),i){case"button":case"switch":case"range":g(u,t.icon||a.config);break;case"selector":t.selector?.length?g(u,t.icon||a.config):g(u,a.check);break}g(d,u),v(t,"$icon",{configurable:!0,get:()=>u}),v(t,"icon",{configurable:!0,get(){return u.innerHTML},set(y){u.innerHTML="",g(u,y)}});const m=S("div");w(m,"art-setting-item-left-text"),g(m,t.html||""),g(d,m),v(t,"$html",{configurable:!0,get:()=>m}),v(t,"html",{configurable:!0,get(){return m.innerHTML},set(y){m.innerHTML="",g(m,y)}});const f=S("div");switch(w(f,"art-setting-item-right-tooltip"),g(f,t.tooltip||""),g(h,f),v(t,"$tooltip",{configurable:!0,get:()=>f}),v(t,"tooltip",{configurable:!0,get(){return f.innerHTML},set(y){f.innerHTML="",g(f,y)}}),i){case"switch":{const y=S("div");w(y,"art-setting-item-right-icon");const b=g(y,a.switchOn),$=g(y,a.switchOff);p(t.switch?$:b,"display","none"),g(h,y),v(t,"$switch",{configurable:!0,get:()=>y});let C=t.switch;v(t,"switch",{configurable:!0,get:()=>C,set(L){C=L,L?(p($,"display","none"),p(b,"display",null)):(p($,"display",null),p(b,"display","none"))}});break}case"range":{const y=S("div");w(y,"art-setting-item-right-icon");const b=g(y,'<input type="range">');b.value=t.range[0],b.min=t.range[1],b.max=t.range[2],b.step=t.range[3],w(b,"art-setting-range"),g(h,y),v(t,"$range",{configurable:!0,get:()=>b});let $=[...t.range];v(t,"range",{configurable:!0,get:()=>$,set(C){$=[...C],b.value=C[0],b.min=C[1],b.max=C[2],b.step=C[3]}})}break;case"selector":if(t.selector?.length){const y=S("div");w(y,"art-setting-item-right-icon"),g(y,a.arrowRight),g(h,y)}break}switch(i){case"switch":{if(t.onSwitch){const y=s(l,"click",async b=>{t.switch=await t.onSwitch.call(this.art,t,l,b)});t.$events.push(y)}break}case"range":{if(t.$range){if(t.onRange){const y=s(t.$range,"change",async b=>{t.range[0]=t.$range.valueAsNumber,t.tooltip=await t.onRange.call(this.art,t,l,b)});t.$events.push(y)}if(t.onChange){const y=s(t.$range,"input",async b=>{t.range[0]=t.$range.valueAsNumber,t.tooltip=await t.onChange.call(this.art,t,l,b)});t.$events.push(y)}}break}case"selector":{const y=s(l,"click",async b=>{t.selector?.length?this.render(t.selector):(this.check(t),t.$parent.onSelect&&(t.$parent.tooltip=await t.$parent.onSelect.call(this.art,t,l,b)))});t.$events.push(y),t.default&&w(l,"art-current")}break;case"button":if(t.onClick){const y=s(l,"click",async b=>{t.tooltip=await t.onClick.call(this.art,t,l,b)});t.$events.push(y)}break}v(t,"$item",{configurable:!0,get:()=>l}),n?vt(l,o):g(r,l),t.mounted&&setTimeout(()=>t.mounted.call(this.art,t.$item,t),0)}render(t=this.option){if(this.active=t,this.cache.has(t)){const n=this.cache.get(t);Y(n,"art-current")}else{const n=S("div");this.cache.set(t,n),w(n,"art-setting-panel"),g(this.$parent,n),Y(n,"art-current"),t[0]?.$parent&&this.createHeader(t[0]);for(let r=0;r<t.length;r++)this.createItem(t[r])}this.resize()}}class ar{constructor(){this.name="artplayer_settings",this.settings={}}get(t){try{const n=JSON.parse(window.localStorage.getItem(this.name))||{};return t?n[t]:n}catch{return t?this.settings[t]:this.settings}}set(t,n){try{const r=Object.assign({},this.get(),{[t]:n});window.localStorage.setItem(this.name,JSON.stringify(r))}catch{this.settings[t]=n}}del(t){try{const n=this.get();delete n[t],window.localStorage.setItem(this.name,JSON.stringify(n))}catch{delete this.settings[t]}}clear(){try{window.localStorage.removeItem(this.name)}catch{this.settings={}}}}const Wt=`.art-video-player {
  --art-theme: #f00;
  --art-font-color: #fff;
  --art-background-color: #000;
  --art-text-shadow-color: rgba(0, 0, 0, 0.5);
  --art-transition-duration: 0.2s;
  --art-padding: 10px;
  --art-border-radius: 3px;
  --art-progress-height: 6px;
  --art-progress-color: rgba(255, 255, 255, 0.25);
  --art-progress-top-gap: 10px;
  --art-hover-color: rgba(255, 255, 255, 0.25);
  --art-loaded-color: rgba(255, 255, 255, 0.25);
  --art-state-size: 80px;
  --art-state-opacity: 0.8;
  --art-bottom-height: 100px;
  --art-bottom-offset: 20px;
  --art-bottom-gap: 5px;
  --art-highlight-width: 8px;
  --art-highlight-color: rgba(255, 255, 255, 0.5);
  --art-control-height: 46px;
  --art-control-opacity: 0.75;
  --art-control-icon-size: 36px;
  --art-control-icon-scale: 1.1;
  --art-volume-height: 120px;
  --art-volume-handle-size: 14px;
  --art-lock-size: 36px;
  --art-indicator-scale: 0;
  --art-indicator-size: 16px;
  --art-fullscreen-web-index: 9999;
  --art-settings-icon-size: 24px;
  --art-settings-max-height: 300px;
  --art-selector-max-height: 300px;
  --art-contextmenus-min-width: 250px;
  --art-subtitle-font-size: 20px;
  --art-subtitle-gap: 5px;
  --art-subtitle-bottom: 15px;
  --art-subtitle-border: #000;
  --art-widget-background: rgba(0, 0, 0, 0.85);
  --art-tip-background: rgba(0, 0, 0, 0.7);
  --art-scrollbar-size: 4px;
  --art-scrollbar-background: rgba(255, 255, 255, 0.25);
  --art-scrollbar-background-hover: rgba(255, 255, 255, 0.5);
  --art-mini-progress-height: 2px;
}
.art-bg-cover {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.art-bottom-gradient {
  background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0.4), transparent);
  background-repeat: repeat-x;
  background-position: center bottom;
}
.art-backdrop-filter {
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(0, 0, 0, 0.75) !important;
}
.art-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.art-video-player {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  outline: 0;
  zoom: 1;
  padding: 0;
  text-align: left;
  direction: ltr;
  font-size: 14px;
  line-height: 1.3;
  user-select: none;
  box-sizing: border-box;
  color: var(--art-font-color);
  background-color: var(--art-background-color);
  text-shadow: 0 0 2px var(--art-text-shadow-color);
  font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, Roboto, Arial, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  -ms-high-contrast-adjust: none;
}
.art-video-player *,
.art-video-player *::before,
.art-video-player *::after {
  box-sizing: border-box;
}
.art-video-player ::-webkit-scrollbar {
  width: var(--art-scrollbar-size);
  height: var(--art-scrollbar-size);
}
.art-video-player ::-webkit-scrollbar-thumb {
  background-color: var(--art-scrollbar-background);
}
.art-video-player ::-webkit-scrollbar-thumb:hover {
  background-color: var(--art-scrollbar-background-hover);
}
.art-video-player img {
  max-width: 100%;
  vertical-align: top;
}
.art-video-player svg {
  fill: var(--art-font-color);
}
.art-video-player a {
  color: var(--art-font-color);
  text-decoration: none;
}
.art-icon {
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.art-video-player.art-backdrop .art-contextmenus,
.art-video-player.art-backdrop .art-info,
.art-video-player.art-backdrop .art-settings,
.art-video-player.art-backdrop .art-layer-auto-playback,
.art-video-player.art-backdrop .art-selector-list,
.art-video-player.art-backdrop .art-volume-inner {
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(0, 0, 0, 0.75) !important;
}
.art-video {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.art-poster {
  position: absolute;
  inset: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  pointer-events: none;
}
.art-video-player .art-subtitle {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 20;
  width: 100%;
  padding: 0 5%;
  text-align: center;
  pointer-events: none;
  gap: var(--art-subtitle-gap);
  bottom: var(--art-subtitle-bottom);
  font-size: var(--art-subtitle-font-size);
  transition: bottom var(--art-transition-duration) ease;
  text-shadow: var(--art-subtitle-border) 1px 0 1px, var(--art-subtitle-border) 0 1px 1px, var(--art-subtitle-border) -1px 0 1px, var(--art-subtitle-border) 0 -1px 1px, var(--art-subtitle-border) 1px 1px 1px, var(--art-subtitle-border) -1px -1px 1px, var(--art-subtitle-border) 1px -1px 1px, var(--art-subtitle-border) -1px 1px 1px;
}
.art-video-player.art-subtitle-show .art-subtitle {
  display: flex;
}
.art-video-player.art-control-show .art-subtitle {
  bottom: calc(var(--art-control-height) + var(--art-subtitle-bottom));
}
.art-danmuku {
  position: absolute;
  inset: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}
.art-video-player .art-layers {
  position: absolute;
  inset: 0;
  z-index: 40;
  width: 100%;
  height: 100%;
  display: none;
  pointer-events: none;
}
.art-video-player .art-layers .art-layer {
  pointer-events: auto;
}
.art-video-player.art-layer-show .art-layers {
  display: flex;
}
.art-video-player .art-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.art-video-player .art-mask .art-state {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(2);
  width: var(--art-state-size);
  height: var(--art-state-size);
  transition: all var(--art-transition-duration) ease;
}
.art-video-player.art-mask-show .art-state {
  pointer-events: auto;
  opacity: var(--art-state-opacity);
  transform: scale(1);
}
.art-video-player.art-loading-show .art-state {
  display: none;
}
.art-video-player .art-loading {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 70;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.art-video-player.art-loading-show .art-loading {
  display: flex;
}
.art-video-player.art-loading-show .art-mask {
  display: none;
}
.art-video-player .art-bottom {
  position: absolute;
  inset: 0;
  z-index: 60;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  padding: 0 var(--art-padding);
  transition: all var(--art-transition-duration) ease;
  background-size: 100% var(--art-bottom-height);
  background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0.4), transparent);
  background-repeat: repeat-x;
  background-position: center bottom;
}
.art-video-player .art-bottom .art-controls,
.art-video-player .art-bottom .art-progress {
  transform: translateY(var(--art-bottom-offset));
  transition: transform var(--art-transition-duration) ease;
}
.art-video-player.art-control-show .art-bottom,
.art-video-player.art-hover .art-bottom {
  opacity: 1;
}
.art-video-player.art-control-show .art-bottom .art-controls,
.art-video-player.art-hover .art-bottom .art-controls,
.art-video-player.art-control-show .art-bottom .art-progress,
.art-video-player.art-hover .art-bottom .art-progress {
  transform: translateY(0);
}
.art-bottom .art-progress {
  position: relative;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  padding-top: var(--art-progress-top-gap);
  padding-bottom: var(--art-bottom-gap);
}
.art-bottom .art-progress .art-control-progress {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--art-progress-height);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner {
  display: flex;
  align-items: center;
  position: relative;
  height: 50%;
  width: 100%;
  transition: height var(--art-transition-duration) ease;
  background-color: var(--art-progress-color);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-hover {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  width: 0%;
  background-color: var(--art-hover-color);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-loaded {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  width: 0%;
  background-color: var(--art-loaded-color);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-played {
  position: absolute;
  inset: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  width: 0%;
  background-color: var(--art-theme);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight {
  position: absolute;
  inset: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight span {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  right: auto;
  pointer-events: auto;
  width: var(--art-highlight-width) !important;
  transform: translateX(calc(var(--art-highlight-width) / -2));
  background-color: var(--art-highlight-color);
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 40;
  left: 0;
  border-radius: 50%;
  width: var(--art-indicator-size);
  height: var(--art-indicator-size);
  transform: scale(var(--art-indicator-scale));
  margin-left: calc(var(--art-indicator-size) / -2);
  transition: transform var(--art-transition-duration) ease;
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator .art-icon {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:hover {
  transform: scale(1.2) !important;
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:active {
  transform: scale(1) !important;
}
.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-tip {
  transform-origin: bottom center;
  transform: scale(0.5);
  opacity: 0;
  position: absolute;
  z-index: 50;
  top: -25px;
  left: 0;
  padding: 3px 5px;
  line-height: 1;
  font-size: 12px;
  border-radius: var(--art-border-radius);
  white-space: nowrap;
  background-color: var(--art-tip-background);
  transition: transform var(--art-transition-duration) ease, opacity var(--art-transition-duration) ease;
}
.art-bottom .art-progress .art-control-thumbnails {
  transform-origin: bottom center;
  transform: scale(0.5);
  opacity: 0;
  position: absolute;
  bottom: calc(var(--art-bottom-gap) + 10px);
  left: 0;
  border-radius: var(--art-border-radius);
  pointer-events: none;
  background-color: var(--art-widget-background);
  transition: transform var(--art-transition-duration) ease, opacity var(--art-transition-duration) ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2);
}
.art-bottom .art-progress:hover .art-control-progress .art-control-progress-inner {
  height: 100%;
}
.art-bottom:hover .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator {
  transform: scale(1);
}
.art-progress-hover .art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-tip,
.art-progress-hover .art-bottom .art-progress .art-control-thumbnails {
  transform: scale(1);
  opacity: 1;
}
.art-video-player .art-controls {
  position: relative;
  z-index: 10;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--art-control-height);
}
.art-video-player .art-controls .art-controls-left,
.art-video-player .art-controls .art-controls-right {
  display: flex;
  height: 100%;
}
.art-video-player .art-controls .art-controls-center {
  display: none;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 10px;
}
.art-video-player .art-controls .art-controls-right {
  justify-content: flex-end;
}
.art-video-player .art-controls .art-control {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  white-space: nowrap;
  opacity: var(--art-control-opacity);
  min-height: var(--art-control-height);
  min-width: var(--art-control-height);
  transition: opacity var(--art-transition-duration) ease;
}
.art-video-player .art-controls .art-control .art-icon {
  height: var(--art-control-icon-size);
  width: var(--art-control-icon-size);
  transform: scale(var(--art-control-icon-scale));
  transition: transform var(--art-transition-duration) ease;
}
.art-video-player .art-controls .art-control .art-icon:active {
  transform: scale(calc(var(--art-control-icon-scale) * 0.8));
}
.art-video-player .art-controls .art-control:hover {
  opacity: 1;
}
.art-control-volume {
  position: relative;
}
.art-control-volume .art-volume-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 5px;
  font-size: 12px;
  text-align: center;
  cursor: default;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  bottom: var(--art-control-height);
  width: var(--art-control-height);
  height: var(--art-volume-height);
  transition: all var(--art-transition-duration) ease;
}
.art-control-volume .art-volume-panel .art-volume-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px 0 12px;
  border-radius: var(--art-border-radius);
  background-color: var(--art-widget-background);
}
.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider {
  flex: 1;
  width: 100%;
  display: flex;
  cursor: pointer;
  position: relative;
  justify-content: center;
}
.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle {
  position: relative;
  display: flex;
  justify-content: center;
  width: 2px;
  border-radius: var(--art-border-radius);
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.25);
}
.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle .art-volume-loaded {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: var(--art-theme);
}
.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-indicator {
  position: absolute;
  width: var(--art-volume-handle-size);
  height: var(--art-volume-handle-size);
  margin-top: calc(var(--art-volume-handle-size) / -2);
  flex-shrink: 0;
  transform: scale(1);
  border-radius: 100%;
  background-color: var(--art-theme);
  transition: transform var(--art-transition-duration) ease;
}
.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider:active .art-volume-indicator {
  transform: scale(0.9);
}
.art-control-volume:hover .art-volume-panel {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.art-video-player .art-notice {
  display: none;
  position: absolute;
  inset: 0;
  z-index: 80;
  width: 100%;
  height: 100%;
  height: auto;
  bottom: auto;
  padding: var(--art-padding);
  pointer-events: none;
}
.art-video-player .art-notice .art-notice-inner {
  display: inline-flex;
  padding: 5px;
  line-height: 1;
  border-radius: var(--art-border-radius);
  background-color: var(--art-tip-background);
}
.art-video-player.art-notice-show .art-notice {
  display: flex;
}
.art-video-player .art-contextmenus {
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 120;
  padding: 5px 0;
  border-radius: var(--art-border-radius);
  font-size: 12px;
  background-color: var(--art-widget-background);
  min-width: var(--art-contextmenus-min-width);
}
.art-video-player .art-contextmenus .art-contextmenu {
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.art-video-player .art-contextmenus .art-contextmenu span {
  padding: 0 8px;
}
.art-video-player .art-contextmenus .art-contextmenu span:hover,
.art-video-player .art-contextmenus .art-contextmenu span.art-current {
  color: var(--art-theme);
}
.art-video-player .art-contextmenus .art-contextmenu:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.art-video-player .art-contextmenus .art-contextmenu:last-child {
  border-bottom: none;
}
.art-video-player.art-contextmenu-show .art-contextmenus {
  display: flex;
}
.art-video-player .art-settings {
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 90;
  left: auto;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: var(--art-border-radius);
  max-height: var(--art-settings-max-height);
  right: var(--art-padding);
  bottom: var(--art-control-height);
  transition: all var(--art-transition-duration) ease;
  background-color: var(--art-widget-background);
}
.art-video-player .art-settings .art-setting-panel {
  display: none;
  flex-direction: column;
}
.art-video-player .art-settings .art-setting-panel.art-current {
  display: flex;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color var(--art-transition-duration) ease;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current {
  color: var(--art-theme);
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-icon-check {
  visibility: hidden;
  height: 15px;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current .art-icon-check {
  visibility: visible;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 5px;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left .art-setting-item-left-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--art-settings-icon-size);
  width: var(--art-settings-icon-size);
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 12px;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-tooltip {
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.5);
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  height: 24px;
}
.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-range {
  height: 3px;
  width: 80px;
  outline: none;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.2);
}
.art-video-player .art-settings .art-setting-panel .art-setting-item-back {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.art-video-player.art-setting-show .art-settings {
  display: flex;
}
.art-video-player .art-info {
  display: none;
  position: absolute;
  left: var(--art-padding);
  top: var(--art-padding);
  z-index: 100;
  padding: 10px;
  font-size: 12px;
  border-radius: var(--art-border-radius);
  background-color: var(--art-widget-background);
}
.art-video-player .art-info .art-info-panel {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.art-video-player .art-info .art-info-panel .art-info-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
.art-video-player .art-info .art-info-panel .art-info-item .art-info-title {
  width: 100px;
  text-align: right;
}
.art-video-player .art-info .art-info-panel .art-info-item .art-info-content {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: all;
}
.art-video-player .art-info .art-info-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.art-video-player.art-info-show .art-info {
  display: flex;
}
.art-hide-cursor * {
  cursor: none !important;
}
.art-video-player[data-aspect-ratio] {
  overflow: hidden;
}
.art-video-player[data-aspect-ratio] .art-video {
  object-fit: fill;
  box-sizing: content-box;
}
.art-fullscreen {
  --art-progress-height: 8px;
  --art-indicator-size: 20px;
  --art-control-height: 60px;
  --art-control-icon-scale: 1.3;
}
.art-fullscreen-web {
  --art-progress-height: 8px;
  --art-indicator-size: 20px;
  --art-control-height: 60px;
  --art-control-icon-scale: 1.3;
  position: fixed;
  inset: 0;
  z-index: var(--art-fullscreen-web-index);
  width: 100%;
  height: 100%;
}
.art-mini-popup {
  position: fixed;
  z-index: 9999;
  width: 320px;
  height: 180px;
  background: #000;
  border-radius: var(--art-border-radius);
  cursor: move;
  user-select: none;
  overflow: hidden;
  transition: opacity 0.2s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.art-mini-popup svg {
  fill: #fff;
}
.art-mini-popup .art-video {
  pointer-events: none;
}
.art-mini-popup .art-mini-close {
  position: absolute;
  z-index: 20;
  right: 10px;
  top: 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.art-mini-popup .art-mini-state {
  position: absolute;
  inset: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: rgba(0, 0, 0, 0.25);
}
.art-mini-popup .art-mini-state .art-icon {
  opacity: 0.75;
  cursor: pointer;
  transform: scale(3);
  pointer-events: auto;
  transition: transform 0.2s ease;
}
.art-mini-popup .art-mini-state .art-icon:active {
  transform: scale(2.5);
}
.art-mini-popup.art-mini-dragging {
  opacity: 0.9;
}
.art-mini-popup:hover .art-mini-close,
.art-mini-popup:hover .art-mini-state {
  opacity: 1;
}
.art-video-player[data-flip='horizontal'] .art-video {
  transform: scaleX(-1);
}
.art-video-player[data-flip='vertical'] .art-video {
  transform: scaleY(-1);
}
.art-video-player .art-layer-lock {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  transform: translateY(-50%);
  height: var(--art-lock-size);
  width: var(--art-lock-size);
  left: var(--art-padding);
  background-color: var(--art-tip-background);
}
.art-video-player .art-layer-auto-playback {
  display: none;
  gap: 10px;
  align-items: center;
  position: absolute;
  border-radius: var(--art-border-radius);
  padding: 10px;
  line-height: 1;
  left: var(--art-padding);
  bottom: calc(var(--art-control-height) + var(--art-bottom-gap) + 10px);
  background-color: var(--art-widget-background);
}
.art-video-player .art-layer-auto-playback .art-auto-playback-close {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.art-video-player .art-layer-auto-playback .art-auto-playback-close svg {
  width: 15px;
  height: 15px;
  fill: var(--art-theme);
}
.art-video-player .art-layer-auto-playback .art-auto-playback-jump {
  color: var(--art-theme);
  cursor: pointer;
}
.art-video-player.art-lock .art-subtitle {
  bottom: var(--art-subtitle-bottom) !important;
}
.art-video-player.art-mini-progress-bar .art-bottom,
.art-video-player.art-lock .art-bottom {
  opacity: 1;
  padding: 0;
  background-image: none;
}
.art-video-player.art-mini-progress-bar .art-bottom .art-controls,
.art-video-player.art-lock .art-bottom .art-controls,
.art-video-player.art-mini-progress-bar .art-bottom .art-progress,
.art-video-player.art-lock .art-bottom .art-progress {
  transform: translateY(calc(var(--art-control-height) + var(--art-bottom-gap) + var(--art-progress-height) / 4));
}
.art-video-player.art-mini-progress-bar .art-bottom .art-progress-indicator,
.art-video-player.art-lock .art-bottom .art-progress-indicator {
  display: none !important;
}
.art-video-player.art-control-show .art-layer-lock {
  display: flex;
}
.art-control-selector {
  position: relative;
  display: flex;
  justify-content: center;
}
.art-control-selector .art-selector-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  border-radius: var(--art-border-radius);
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  bottom: var(--art-control-height);
  max-height: var(--art-selector-max-height);
  background-color: var(--art-widget-background);
  transition: all var(--art-transition-duration) ease;
}
.art-control-selector .art-selector-list .art-selector-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  flex-shrink: 0;
  line-height: 1;
}
.art-control-selector .art-selector-list .art-selector-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.art-control-selector .art-selector-list .art-selector-item:hover,
.art-control-selector .art-selector-list .art-selector-item.art-current {
  color: var(--art-theme);
}
.art-control-selector:hover .art-selector-list {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.art-video-player {
  /*! Hint.css - v2.7.0 - 2021-10-01
    * https://kushagra.dev/lab/hint/
    * Copyright (c) 2021 Kushagra Gour */
  /*-------------------------------------*\\
        HINT.css - A CSS tooltip library
    \\*-------------------------------------*/
  /**
    * HINT.css is a tooltip library made in pure CSS.
    *
    * Source: https://github.com/chinchang/hint.css
    * Demo: http://kushagragour.in/lab/hint/
    *
    */
  /**
    * source: hint-core.scss
    *
    * Defines the basic styling for the tooltip.
    * Each tooltip is made of 2 parts:
    * 	1) body (:after)
    * 	2) arrow (:before)
    *
    * Classes added:
    * 	1) hint
    */
  /**
    * source: hint-position.scss
    *
    * Defines the positoning logic for the tooltips.
    *
    * Classes added:
    * 	1) hint--top
    * 	2) hint--bottom
    * 	3) hint--left
    * 	4) hint--right
    */
  /**
    * set default color for tooltip arrows
    */
  /**
    * top tooltip
    */
  /**
    * bottom tooltip
    */
  /**
    * right tooltip
    */
  /**
    * left tooltip
    */
  /**
    * top-left tooltip
    */
  /**
    * top-right tooltip
    */
  /**
    * bottom-left tooltip
    */
  /**
    * bottom-right tooltip
    */
  /**
    * source: hint-sizes.scss
    *
    * Defines width restricted tooltips that can span
    * across multiple lines.
    *
    * Classes added:
    * 	1) hint--small
    * 	2) hint--medium
    * 	3) hint--large
    *
    */
  /**
    * source: hint-theme.scss
    *
    * Defines basic theme for tooltips.
    *
    */
  /**
    * source: hint-color-types.scss
    *
    * Contains tooltips of various types based on color differences.
    *
    * Classes added:
    * 	1) hint--error
    * 	2) hint--warning
    * 	3) hint--info
    * 	4) hint--success
    *
    */
  /**
    * Error
    */
  /**
    * Warning
    */
  /**
    * Info
    */
  /**
    * Success
    */
  /**
    * source: hint-always.scss
    *
    * Defines a persisted tooltip which shows always.
    *
    * Classes added:
    * 	1) hint--always
    *
    */
  /**
    * source: hint-rounded.scss
    *
    * Defines rounded corner tooltips.
    *
    * Classes added:
    * 	1) hint--rounded
    *
    */
  /**
    * source: hint-effects.scss
    *
    * Defines various transition effects for the tooltips.
    *
    * Classes added:
    * 	1) hint--no-animate
    * 	2) hint--bounce
    *
    */
}
.art-video-player [class*='hint--'] {
  position: relative;
  display: inline-block;
  font-style: normal;
  /**
        * tooltip arrow
        */
  /**
        * tooltip body
        */
}
.art-video-player [class*='hint--']:before,
.art-video-player [class*='hint--']:after {
  position: absolute;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  visibility: hidden;
  opacity: 0;
  z-index: 1000000;
  pointer-events: none;
  -webkit-transition: 0.3s ease;
  -moz-transition: 0.3s ease;
  transition: 0.3s ease;
  -webkit-transition-delay: 0ms;
  -moz-transition-delay: 0ms;
  transition-delay: 0ms;
}
.art-video-player [class*='hint--']:hover:before,
.art-video-player [class*='hint--']:hover:after {
  visibility: visible;
  opacity: 1;
}
.art-video-player [class*='hint--']:hover:before,
.art-video-player [class*='hint--']:hover:after {
  -webkit-transition-delay: 100ms;
  -moz-transition-delay: 100ms;
  transition-delay: 100ms;
}
.art-video-player [class*='hint--']:before {
  content: '';
  position: absolute;
  background: transparent;
  border: 6px solid transparent;
  z-index: 1000001;
}
.art-video-player [class*='hint--']:after {
  background: #000000;
  color: white;
  padding: 8px 10px;
  font-size: 12px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 12px;
  white-space: nowrap;
}
.art-video-player [class*='hint--'][aria-label]:after {
  content: attr(aria-label);
}
.art-video-player [class*='hint--'][data-hint]:after {
  content: attr(data-hint);
}
.art-video-player [aria-label='']:before,
.art-video-player [aria-label='']:after,
.art-video-player [data-hint='']:before,
.art-video-player [data-hint='']:after {
  display: none !important;
}
.art-video-player .hint--top-left:before {
  border-top-color: #000000;
}
.art-video-player .hint--top-right:before {
  border-top-color: #000000;
}
.art-video-player .hint--top:before {
  border-top-color: #000000;
}
.art-video-player .hint--bottom-left:before {
  border-bottom-color: #000000;
}
.art-video-player .hint--bottom-right:before {
  border-bottom-color: #000000;
}
.art-video-player .hint--bottom:before {
  border-bottom-color: #000000;
}
.art-video-player .hint--left:before {
  border-left-color: #000000;
}
.art-video-player .hint--right:before {
  border-right-color: #000000;
}
.art-video-player .hint--top:before {
  margin-bottom: -11px;
}
.art-video-player .hint--top:before,
.art-video-player .hint--top:after {
  bottom: 100%;
  left: 50%;
}
.art-video-player .hint--top:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--top:after {
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
}
.art-video-player .hint--top:hover:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--top:hover:after {
  -webkit-transform: translateX(-50%) translateY(-8px);
  -moz-transform: translateX(-50%) translateY(-8px);
  transform: translateX(-50%) translateY(-8px);
}
.art-video-player .hint--bottom:before {
  margin-top: -11px;
}
.art-video-player .hint--bottom:before,
.art-video-player .hint--bottom:after {
  top: 100%;
  left: 50%;
}
.art-video-player .hint--bottom:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--bottom:after {
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
}
.art-video-player .hint--bottom:hover:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--bottom:hover:after {
  -webkit-transform: translateX(-50%) translateY(8px);
  -moz-transform: translateX(-50%) translateY(8px);
  transform: translateX(-50%) translateY(8px);
}
.art-video-player .hint--right:before {
  margin-left: -11px;
  margin-bottom: -6px;
}
.art-video-player .hint--right:after {
  margin-bottom: -14px;
}
.art-video-player .hint--right:before,
.art-video-player .hint--right:after {
  left: 100%;
  bottom: 50%;
}
.art-video-player .hint--right:hover:before {
  -webkit-transform: translateX(8px);
  -moz-transform: translateX(8px);
  transform: translateX(8px);
}
.art-video-player .hint--right:hover:after {
  -webkit-transform: translateX(8px);
  -moz-transform: translateX(8px);
  transform: translateX(8px);
}
.art-video-player .hint--left:before {
  margin-right: -11px;
  margin-bottom: -6px;
}
.art-video-player .hint--left:after {
  margin-bottom: -14px;
}
.art-video-player .hint--left:before,
.art-video-player .hint--left:after {
  right: 100%;
  bottom: 50%;
}
.art-video-player .hint--left:hover:before {
  -webkit-transform: translateX(-8px);
  -moz-transform: translateX(-8px);
  transform: translateX(-8px);
}
.art-video-player .hint--left:hover:after {
  -webkit-transform: translateX(-8px);
  -moz-transform: translateX(-8px);
  transform: translateX(-8px);
}
.art-video-player .hint--top-left:before {
  margin-bottom: -11px;
}
.art-video-player .hint--top-left:before,
.art-video-player .hint--top-left:after {
  bottom: 100%;
  left: 50%;
}
.art-video-player .hint--top-left:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--top-left:after {
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  transform: translateX(-100%);
}
.art-video-player .hint--top-left:after {
  margin-left: 12px;
}
.art-video-player .hint--top-left:hover:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--top-left:hover:after {
  -webkit-transform: translateX(-100%) translateY(-8px);
  -moz-transform: translateX(-100%) translateY(-8px);
  transform: translateX(-100%) translateY(-8px);
}
.art-video-player .hint--top-right:before {
  margin-bottom: -11px;
}
.art-video-player .hint--top-right:before,
.art-video-player .hint--top-right:after {
  bottom: 100%;
  left: 50%;
}
.art-video-player .hint--top-right:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--top-right:after {
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  transform: translateX(0);
}
.art-video-player .hint--top-right:after {
  margin-left: -12px;
}
.art-video-player .hint--top-right:hover:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--top-right:hover:after {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--bottom-left:before {
  margin-top: -11px;
}
.art-video-player .hint--bottom-left:before,
.art-video-player .hint--bottom-left:after {
  top: 100%;
  left: 50%;
}
.art-video-player .hint--bottom-left:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--bottom-left:after {
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  transform: translateX(-100%);
}
.art-video-player .hint--bottom-left:after {
  margin-left: 12px;
}
.art-video-player .hint--bottom-left:hover:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--bottom-left:hover:after {
  -webkit-transform: translateX(-100%) translateY(8px);
  -moz-transform: translateX(-100%) translateY(8px);
  transform: translateX(-100%) translateY(8px);
}
.art-video-player .hint--bottom-right:before {
  margin-top: -11px;
}
.art-video-player .hint--bottom-right:before,
.art-video-player .hint--bottom-right:after {
  top: 100%;
  left: 50%;
}
.art-video-player .hint--bottom-right:before {
  left: calc(50% - 6px);
}
.art-video-player .hint--bottom-right:after {
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  transform: translateX(0);
}
.art-video-player .hint--bottom-right:after {
  margin-left: -12px;
}
.art-video-player .hint--bottom-right:hover:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--bottom-right:hover:after {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--small:after,
.art-video-player .hint--medium:after,
.art-video-player .hint--large:after {
  white-space: normal;
  line-height: 1.4em;
  word-wrap: break-word;
}
.art-video-player .hint--small:after {
  width: 80px;
}
.art-video-player .hint--medium:after {
  width: 150px;
}
.art-video-player .hint--large:after {
  width: 300px;
}
.art-video-player [class*='hint--'] {
  /**
        * tooltip body
        */
}
.art-video-player [class*='hint--']:after {
  text-shadow: 0 -1px 0px black;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
}
.art-video-player .hint--error:after {
  background-color: #b34e4d;
  text-shadow: 0 -1px 0px #592726;
}
.art-video-player .hint--error.hint--top-left:before {
  border-top-color: #b34e4d;
}
.art-video-player .hint--error.hint--top-right:before {
  border-top-color: #b34e4d;
}
.art-video-player .hint--error.hint--top:before {
  border-top-color: #b34e4d;
}
.art-video-player .hint--error.hint--bottom-left:before {
  border-bottom-color: #b34e4d;
}
.art-video-player .hint--error.hint--bottom-right:before {
  border-bottom-color: #b34e4d;
}
.art-video-player .hint--error.hint--bottom:before {
  border-bottom-color: #b34e4d;
}
.art-video-player .hint--error.hint--left:before {
  border-left-color: #b34e4d;
}
.art-video-player .hint--error.hint--right:before {
  border-right-color: #b34e4d;
}
.art-video-player .hint--warning:after {
  background-color: #c09854;
  text-shadow: 0 -1px 0px #6c5328;
}
.art-video-player .hint--warning.hint--top-left:before {
  border-top-color: #c09854;
}
.art-video-player .hint--warning.hint--top-right:before {
  border-top-color: #c09854;
}
.art-video-player .hint--warning.hint--top:before {
  border-top-color: #c09854;
}
.art-video-player .hint--warning.hint--bottom-left:before {
  border-bottom-color: #c09854;
}
.art-video-player .hint--warning.hint--bottom-right:before {
  border-bottom-color: #c09854;
}
.art-video-player .hint--warning.hint--bottom:before {
  border-bottom-color: #c09854;
}
.art-video-player .hint--warning.hint--left:before {
  border-left-color: #c09854;
}
.art-video-player .hint--warning.hint--right:before {
  border-right-color: #c09854;
}
.art-video-player .hint--info:after {
  background-color: #3986ac;
  text-shadow: 0 -1px 0px #1a3c4d;
}
.art-video-player .hint--info.hint--top-left:before {
  border-top-color: #3986ac;
}
.art-video-player .hint--info.hint--top-right:before {
  border-top-color: #3986ac;
}
.art-video-player .hint--info.hint--top:before {
  border-top-color: #3986ac;
}
.art-video-player .hint--info.hint--bottom-left:before {
  border-bottom-color: #3986ac;
}
.art-video-player .hint--info.hint--bottom-right:before {
  border-bottom-color: #3986ac;
}
.art-video-player .hint--info.hint--bottom:before {
  border-bottom-color: #3986ac;
}
.art-video-player .hint--info.hint--left:before {
  border-left-color: #3986ac;
}
.art-video-player .hint--info.hint--right:before {
  border-right-color: #3986ac;
}
.art-video-player .hint--success:after {
  background-color: #458746;
  text-shadow: 0 -1px 0px #1a321a;
}
.art-video-player .hint--success.hint--top-left:before {
  border-top-color: #458746;
}
.art-video-player .hint--success.hint--top-right:before {
  border-top-color: #458746;
}
.art-video-player .hint--success.hint--top:before {
  border-top-color: #458746;
}
.art-video-player .hint--success.hint--bottom-left:before {
  border-bottom-color: #458746;
}
.art-video-player .hint--success.hint--bottom-right:before {
  border-bottom-color: #458746;
}
.art-video-player .hint--success.hint--bottom:before {
  border-bottom-color: #458746;
}
.art-video-player .hint--success.hint--left:before {
  border-left-color: #458746;
}
.art-video-player .hint--success.hint--right:before {
  border-right-color: #458746;
}
.art-video-player .hint--always:after,
.art-video-player .hint--always:before {
  opacity: 1;
  visibility: visible;
}
.art-video-player .hint--always.hint--top:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--always.hint--top:after {
  -webkit-transform: translateX(-50%) translateY(-8px);
  -moz-transform: translateX(-50%) translateY(-8px);
  transform: translateX(-50%) translateY(-8px);
}
.art-video-player .hint--always.hint--top-left:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--always.hint--top-left:after {
  -webkit-transform: translateX(-100%) translateY(-8px);
  -moz-transform: translateX(-100%) translateY(-8px);
  transform: translateX(-100%) translateY(-8px);
}
.art-video-player .hint--always.hint--top-right:before {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--always.hint--top-right:after {
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  transform: translateY(-8px);
}
.art-video-player .hint--always.hint--bottom:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--always.hint--bottom:after {
  -webkit-transform: translateX(-50%) translateY(8px);
  -moz-transform: translateX(-50%) translateY(8px);
  transform: translateX(-50%) translateY(8px);
}
.art-video-player .hint--always.hint--bottom-left:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--always.hint--bottom-left:after {
  -webkit-transform: translateX(-100%) translateY(8px);
  -moz-transform: translateX(-100%) translateY(8px);
  transform: translateX(-100%) translateY(8px);
}
.art-video-player .hint--always.hint--bottom-right:before {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--always.hint--bottom-right:after {
  -webkit-transform: translateY(8px);
  -moz-transform: translateY(8px);
  transform: translateY(8px);
}
.art-video-player .hint--always.hint--left:before {
  -webkit-transform: translateX(-8px);
  -moz-transform: translateX(-8px);
  transform: translateX(-8px);
}
.art-video-player .hint--always.hint--left:after {
  -webkit-transform: translateX(-8px);
  -moz-transform: translateX(-8px);
  transform: translateX(-8px);
}
.art-video-player .hint--always.hint--right:before {
  -webkit-transform: translateX(8px);
  -moz-transform: translateX(8px);
  transform: translateX(8px);
}
.art-video-player .hint--always.hint--right:after {
  -webkit-transform: translateX(8px);
  -moz-transform: translateX(8px);
  transform: translateX(8px);
}
.art-video-player .hint--rounded:after {
  border-radius: 4px;
}
.art-video-player .hint--no-animate:before,
.art-video-player .hint--no-animate:after {
  -webkit-transition-duration: 0ms;
  -moz-transition-duration: 0ms;
  transition-duration: 0ms;
}
.art-video-player .hint--bounce:before,
.art-video-player .hint--bounce:after {
  -webkit-transition: opacity 0.3s ease, visibility 0.3s ease, -webkit-transform 0.3s cubic-bezier(0.71, 1.7, 0.77, 1.24);
  -moz-transition: opacity 0.3s ease, visibility 0.3s ease, -moz-transform 0.3s cubic-bezier(0.71, 1.7, 0.77, 1.24);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s cubic-bezier(0.71, 1.7, 0.77, 1.24);
}
.art-video-player .hint--no-shadow:before,
.art-video-player .hint--no-shadow:after {
  text-shadow: initial;
  box-shadow: initial;
}
.art-video-player .hint--no-arrow:before {
  display: none;
}
.art-video-player.art-mobile {
  --art-bottom-gap: 10px;
  --art-control-height: 38px;
  --art-control-icon-scale: 1;
  --art-state-size: 60px;
  --art-settings-max-height: 180px;
  --art-selector-max-height: 180px;
  --art-indicator-scale: 1;
  --art-control-opacity: 1;
}
.art-video-player.art-mobile .art-controls-left {
  margin-left: calc(var(--art-padding) / -1);
}
.art-video-player.art-mobile .art-controls-right {
  margin-right: calc(var(--art-padding) / -1);
}
`;class sr extends j{constructor(t){super(t),this.name="subtitle",this.option=null,this.destroyEvent=()=>null,this.init(t.option.subtitle);let n=!1;t.on("video:timeupdate",()=>{if(!this.url)return;const r=this.art.template.$video.webkitDisplayingFullscreen;typeof r=="boolean"&&r!==n&&(n=r,this.createTrack(r?"subtitles":"metadata",this.url))})}get url(){return this.art.template.$track.src}set url(t){this.switch(t)}get textTrack(){return this.art.template.$video?.textTracks?.[0]}get activeCues(){return this.textTrack?Array.from(this.textTrack.activeCues):[]}get cues(){return this.textTrack?Array.from(this.textTrack.cues):[]}style(t,n){const{$subtitle:r}=this.art.template;return typeof t=="object"?pt(r,t):p(r,t,n)}update(){const{option:{subtitle:t},template:{$subtitle:n}}=this.art;n.innerHTML="",this.activeCues.length&&(this.art.emit("subtitleBeforeUpdate",this.activeCues),n.innerHTML=this.activeCues.map((r,o)=>r.text.split(/\r?\n/).filter(i=>i.trim()).map(i=>`<div class="art-subtitle-line" data-group="${o}">
                                ${t.escape?At(i):i}
                            </div>`).join("")).join(""),this.art.emit("subtitleAfterUpdate",this.activeCues))}async switch(t,n={}){const{i18n:r,notice:o,option:i}=this.art,a={...i.subtitle,...n,url:t},s=await this.init(a);return n.name&&(o.show=`${r.get("Switch Subtitle")}: ${n.name}`),s}createTrack(t,n){const{template:r,proxy:o,option:i}=this.art,{$video:a,$track:s}=r,c=S("track");c.default=!0,c.kind=t,c.src=n,c.label=i.subtitle.name||"Artplayer",c.track.mode="hidden",c.onload=()=>{this.art.emit("subtitleLoad",this.cues,this.option)},this.art.events.remove(this.destroyEvent),s.onload=null,dt(s),g(a,c),r.$track=c,this.destroyEvent=o(this.textTrack,"cuechange",()=>this.update())}async init(t){const{notice:n,template:{$subtitle:r}}=this.art;if(!this.textTrack)return null;if(Q(t,ft.subtitle),!!t.url)return this.option=t,this.style(t.style),fetch(t.url).then(o=>o.arrayBuffer()).then(o=>{const a=new TextDecoder(t.encoding).decode(o);switch(t.type||nt(t.url)){case"srt":{const s=_t(a),c=t.onVttLoad(s);return st(c)}case"ass":{const s=Vt(a),c=t.onVttLoad(s);return st(c)}case"vtt":{const s=t.onVttLoad(a);return st(s)}default:return t.url}}).then(o=>(r.innerHTML="",this.url===o||(URL.revokeObjectURL(this.url),this.createTrack("metadata",o)),o)).catch(o=>{throw r.innerHTML="",n.show=o,o})}}class lt{constructor(t){this.art=t;const{option:n,constructor:r}=t;n.container instanceof Element?this.$container=n.container:(this.$container=A(n.container),V(this.$container,`No container element found by ${n.container}`)),V(zt(),"The current browser does not support flex layout");const o=this.$container.tagName.toLowerCase();V(o==="div",`Unsupported container element type, only support 'div' but got '${o}'`),V(r.instances.every(i=>i.template.$container!==this.$container),"Cannot mount multiple instances on the same dom element"),this.query=this.query.bind(this),this.$container.dataset.artId=t.id,this.init()}static get html(){return`
          <div class="art-video-player art-subtitle-show art-layer-show art-control-show art-mask-show">
            <video class="art-video">
              <track default kind="metadata" src=""></track>
            </video>
            <div class="art-poster"></div>
            <div class="art-subtitle"></div>
            <div class="art-danmuku"></div>
            <div class="art-layers"></div>
            <div class="art-mask">
              <div class="art-state"></div>
            </div>
            <div class="art-bottom">
              <div class="art-progress"></div>
              <div class="art-controls">
                <div class="art-controls-left"></div>
                <div class="art-controls-center"></div>
                <div class="art-controls-right"></div>
              </div>
            </div>
            <div class="art-loading"></div>
            <div class="art-notice">
              <div class="art-notice-inner"></div>
            </div>
            <div class="art-settings"></div>
            <div class="art-info">
              <div class="art-info-panel">
                <div class="art-info-item">
                  <div class="art-info-title">Player version:</div>
                  <div class="art-info-content">${mt}</div>
                </div>
                <div class="art-info-item">
                  <div class="art-info-title">Video url:</div>
                  <div class="art-info-content" data-video="currentSrc"></div>
                </div>
                <div class="art-info-item">
                  <div class="art-info-title">Video volume:</div>
                  <div class="art-info-content" data-video="volume"></div>
                </div>
                <div class="art-info-item">
                  <div class="art-info-title">Video time:</div>
                  <div class="art-info-content" data-video="currentTime"></div>
                </div>
                <div class="art-info-item">
                  <div class="art-info-title">Video duration:</div>
                  <div class="art-info-content" data-video="duration"></div>
                </div>
                <div class="art-info-item">
                  <div class="art-info-title">Video resolution:</div>
                  <div class="art-info-content">
                    <span data-video="videoWidth"></span> x <span data-video="videoHeight"></span>
                  </div>
                </div>
              </div>
              <div class="art-info-close">[x]</div>
            </div>
            <div class="art-contextmenus"></div>
          </div>
        `}query(t){return A(t,this.$container)}init(){const{option:t}=this.art;if(t.useSSR||(this.$container.innerHTML=lt.html),this.$player=this.query(".art-video-player"),this.$video=this.query(".art-video"),this.$track=this.query("track"),this.$poster=this.query(".art-poster"),this.$subtitle=this.query(".art-subtitle"),this.$danmuku=this.query(".art-danmuku"),this.$bottom=this.query(".art-bottom"),this.$progress=this.query(".art-progress"),this.$controls=this.query(".art-controls"),this.$controlsLeft=this.query(".art-controls-left"),this.$controlsCenter=this.query(".art-controls-center"),this.$controlsRight=this.query(".art-controls-right"),this.$layer=this.query(".art-layers"),this.$loading=this.query(".art-loading"),this.$notice=this.query(".art-notice"),this.$noticeInner=this.query(".art-notice-inner"),this.$mask=this.query(".art-mask"),this.$state=this.query(".art-state"),this.$setting=this.query(".art-settings"),this.$info=this.query(".art-info"),this.$infoPanel=this.query(".art-info-panel"),this.$infoClose=this.query(".art-info-close"),this.$contextmenu=this.query(".art-contextmenus"),t.proxy){const n=t.proxy.call(this.art,this.art);V(n instanceof HTMLVideoElement||n instanceof HTMLCanvasElement,"Function 'option.proxy' needs to return 'HTMLVideoElement' or 'HTMLCanvasElement'"),vt(n,this.$video),n.className="art-video",this.$video=n}t.backdrop&&w(this.$player,"art-backdrop"),M&&w(this.$player,"art-mobile")}destroy(t){t?this.$container.innerHTML="":w(this.$player,"art-destroy")}}class $t{on(t,n,r){const o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:n,ctx:r}),this}once(t,n,r){const o=this;function i(...a){o.off(t,i),n.apply(r,a)}return i._=n,this.on(t,i,r)}emit(t,...n){const r=((this.e||(this.e={}))[t]||[]).slice();for(let o=0;o<r.length;o+=1)r[o].fn.apply(r[o].ctx,n);return this}off(t,n){const r=this.e||(this.e={}),o=r[t],i=[];if(o&&n)for(let a=0,s=o.length;a<s;a+=1)o[a].fn!==n&&o[a].fn._!==n&&i.push(o[a]);return i.length?r[t]=i:delete r[t],this}}let lr=0;const it=[];class k extends $t{constructor(t,n){if(super(),!ct)throw new Error("Artplayer can only be used in the browser environment");this.id=++lr;const r=ut(k.option,t);if(r.container=t.container,this.option=Q(r,ft),this.isLock=!1,this.isReady=!1,this.isFocus=!1,this.isInput=!1,this.isRotate=!1,this.isDestroy=!1,this.template=new lt(this),this.events=new Me(this),this.storage=new ar(this),this.icons=new on(this),this.i18n=new ze(this),this.notice=new dn(this),this.player=new qn(this),this.layers=new sn(this),this.controls=new ve(this),this.contextmenu=new ae(this),this.subtitle=new sr(this),this.info=new an(this),this.loading=new ln(this),this.hotkey=new Se(this),this.mask=new cn(this),this.setting=new ir(this),this.plugins=new tr(this),typeof n=="function"&&this.on("ready",()=>n.call(this,this)),k.DEBUG){const o=i=>console.log(`[ART.${this.id}] -> ${i}`);o(`Version@${k.version}`);for(let i=0;i<tt.events.length;i++)this.on(`video:${tt.events[i]}`,a=>o(`Event@${a.type}`))}it.push(this)}static get instances(){return it}static get version(){return mt}static get config(){return tt}static get utils(){return Qt}static get scheme(){return ft}static get Emitter(){return $t}static get validator(){return Q}static get kindOf(){return Q.kindOf}static get html(){return lt.html}static get option(){return{id:"",container:"#artplayer",url:"",poster:"",type:"",theme:"#f00",volume:.7,isLive:!1,muted:!1,autoplay:!1,autoSize:!1,autoMini:!1,loop:!1,flip:!1,playbackRate:!1,aspectRatio:!1,screenshot:!1,setting:!1,hotkey:!0,pip:!1,mutex:!0,backdrop:!0,fullscreen:!1,fullscreenWeb:!1,subtitleOffset:!1,miniProgressBar:!1,useSSR:!1,playsInline:!0,lock:!1,gesture:!0,fastForward:!1,autoPlayback:!1,autoOrientation:!1,airplay:!1,proxy:void 0,layers:[],contextmenu:[],controls:[],settings:[],quality:[],highlight:[],plugins:[],thumbnails:{url:"",number:60,column:10,width:0,height:0,scale:1},subtitle:{url:"",type:"",style:{},name:"",escape:!0,encoding:"utf-8",onVttLoad:t=>t},moreVideoAttr:{controls:!1,preload:Tt?"auto":"metadata"},i18n:{},icons:{},cssVar:{},customType:{},lang:navigator?.language.toLowerCase()}}get proxy(){return this.events.proxy}get query(){return this.template.query}get video(){return this.template.$video}reset(){this.video.removeAttribute("src"),this.video.load()}destroy(t=!0){k.REMOVE_SRC_WHEN_DESTROY&&this.reset(),this.events.destroy(),this.template.destroy(t),it.splice(it.indexOf(this),1),this.isDestroy=!0,this.emit("destroy")}}k.STYLE=Wt;k.DEBUG=!1;k.CONTEXTMENU=!0;k.NOTICE_TIME=2e3;k.SETTING_WIDTH=250;k.SETTING_ITEM_WIDTH=200;k.SETTING_ITEM_HEIGHT=35;k.RESIZE_TIME=200;k.SCROLL_TIME=200;k.SCROLL_GAP=50;k.AUTO_PLAYBACK_MAX=10;k.AUTO_PLAYBACK_MIN=5;k.AUTO_PLAYBACK_TIMEOUT=3e3;k.RECONNECT_TIME_MAX=5;k.RECONNECT_SLEEP_TIME=1e3;k.CONTROL_HIDE_TIME=3e3;k.DBCLICK_TIME=300;k.DBCLICK_FULLSCREEN=!0;k.MOBILE_DBCLICK_PLAY=!0;k.MOBILE_CLICK_PLAY=!1;k.AUTO_ORIENTATION_TIME=200;k.INFO_LOOP_TIME=1e3;k.FAST_FORWARD_VALUE=3;k.FAST_FORWARD_TIME=1e3;k.TOUCH_MOVE_RATIO=.5;k.VOLUME_STEP=.1;k.SEEK_STEP=5;k.PLAYBACK_RATE=[.5,.75,1,1.25,1.5,2];k.ASPECT_RATIO=["default","4:3","16:9"];k.FLIP=["normal","horizontal","vertical"];k.FULLSCREEN_WEB_IN_BODY=!0;k.LOG_VERSION=!0;k.USE_RAF=!1;k.REMOVE_SRC_WHEN_DESTROY=!0;ct&&(St("artplayer-style",Wt),setTimeout(()=>{k.LOG_VERSION&&console.log(`%c ArtPlayer %c ${k.version} %c https://artplayer.org`,"color: #fff; background: #5f5f5f","color: #fff; background: #4bc729","")},100));export{k as default};
