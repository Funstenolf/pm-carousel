!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const i=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,o)=>{const a=new URL(t,i);if(self[e].moduleMap[a])return s(self[e].moduleMap[a]);const r=new Blob([`import * as m from '${a}';`,`${e}.moduleMap['${a}']=m;`],{type:"text/javascript"}),h=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){o(new Error(`Failed to import: ${t}`)),n(h)},onload(){s(self[e].moduleMap[a]),n(h)}});document.head.appendChild(h)})),self[e].moduleMap={}}}("/assets/");const t="data-pm-carousel";var e={attr:t,attrPaging:`${t}-paging`,attrWrapper:`${t}-wrapper`,attrOverflow:`${t}-overflow`,attrItem:`${t}-item`,attrPrev:`${t}-prev`,attrNext:`${t}-next`,attrPlaystop:`${t}-playstop`,transition:"transform .5s ease-in-out",activeClass:"is-active"};var s={extend:function t(){const e={};let s=!1,i=0;const n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(s=arguments[0],i++);for(var o=function(i){for(let n in i)Object.prototype.hasOwnProperty.call(i,n)&&(s&&"[object Object]"===Object.prototype.toString.call(i[n])?e[n]=t(!0,e[n],i[n]):e[n]=i[n])};i<n;i++){o(arguments[i])}return e},returnJson:function(t){try{return JSON.parse(t)}catch(e){return{}}}};function i(t){let s=this.active,i=t.target;if(i.closest(`[${e.attr}-playstop]`))this.toggleAutoplay();else{if(i.closest(`[${e.attr}-prev]`))s--;else if(i.closest(`[${e.attr}-next]`))s++;else{if(!i.closest(`[${e.attr}-paging]`))return;{let t=i.closest(`[${e.attr}-paging] li`);s=this.nodes.pages.indexOf(t)}}this.stop(),this.changeActive(s)}}var n={_onTouchStart:function(t){this.nodes.overflow.style.transition="none",this._touchstartX=Math.round(t.touches[0].pageX),this._slideWidth=this.nodes.wrapper.offsetWidth},_onTouchMove:function(t){this._touchmoveX=Math.round(t.touches[0].pageX),this._moveX=this._touchstartX-this._touchmoveX,this.nodes.overflow.style.transform=`translateX(${-this._distance-this._moveX/2}px)`},_onTouchEnd:function(t){let s=this.active;if(this.nodes.overflow.style.transition=e.transition,this._moveX>this._slideWidth/3)s++;else{if(!(this._moveX<-this._slideWidth/3))return void(this.nodes.overflow.style.transform=`translateX(${-this._distance}px)`);s--}this.changeActive(s)}};function o(){let t=this.settings.responsive.find((t=>window.matchMedia(t.mq).matches));return t?s.extend(this.settings.config,t):this.settings.config}function a(){this.config=o.call(this),this.config.disable?this.disable():this.refresh()}const r={buttons:function(){this.nodes.playstop.hidden=!this.config.autoplay},wrappers:function(){var t=this.config.noStartSpace?0:this.config.spaceAround;this.nodes.overflow.style.transform=`translateX(${-100*this.active+t}%)`,this.config.noStartSpace?this.nodes.overflow.style.paddingRight=this.config.spaceAround+"%":(this.nodes.overflow.style.paddingRight=t+"%",this.nodes.overflow.style.paddingLeft=t+"%"),this.nodes.overflow.style.transition=e.transition,this.nodes.overflow.style.display="flex",this.nodes.wrapper.style.overflow="hidden",this.el.classList.add(e.activeClass)},slides:function(){const t=[];for(this.nodes.items.forEach(((t,s)=>{t.setAttribute("tabindex","-1"),t.setAttribute(e.attr+"-item",s),t.style.flex=`1 0 ${100/this.config.group}%`,t.style.overflow="hidden"}));this.nodes.items.length>0;)t.push(this.nodes.items.splice(0,this.config.group));this.nodes.items=t,this.slideLength=this.nodes.items.length},paging:function(){let t,e,s;e=document.createDocumentFragment(),this.nodes.paging.innerHTML="",this.nodes.pages=[],this.nodes.items.forEach(((i,n)=>{s=this.pagingBtnString,t=document.createElement("div"),t.innerHTML=s.replace("{nbr}",n+1),this.nodes.pages.push(t.firstElementChild),e.appendChild(t.firstElementChild)})),this.nodes.paging.append(e)}};function h(t=[]){t.forEach((t=>r[t].call(this)))}function l(){this.config=this.settings.config,this.settings.responsive&&(this.config=o.call(this),this.settings.responsive.forEach((t=>{window.matchMedia(t.mq).addListener(a.bind(this))}))),h.call(this,["slides","wrappers","buttons","paging"]),this.el.addEventListener("click",i.bind(this)),this.nodes.wrapper.addEventListener("touchstart",n._onTouchStart.bind(this)),this.nodes.wrapper.addEventListener("touchmove",n._onTouchMove.bind(this)),this.nodes.wrapper.addEventListener("touchend",n._onTouchEnd.bind(this)),this.config.autoplay?(this.config.loop=!0,this.autoplayStatus="play",this.play(),this.el.addEventListener("mouseenter",this.pause.bind(this)),this.el.addEventListener("mouseleave",this.play.bind(this))):this.changeActive(this.active)}function c(){this._slideWidth=this.activeSlides[0].offsetWidth*this.config.group,this._distance=this.active*this._slideWidth,this.active===this.slideLength-1&&(this._distance=this.nodes.overflow.scrollWidth-this._slideWidth,this.config.spaceAround&&(this._distance-=parseInt(window.getComputedStyle(this.nodes.overflow).getPropertyValue("padding-right"),10))),this.nodes.overflow.style.transform=`translateX(${-this._distance}px`}function d(){if(!this.nodes.prev)return;const t=this.prevString;this.nodes.prev.innerHTML=t.replace("{text}",0===this.active?this.texts.prevFirst:this.texts.prev),this.config.loop?this.nodes.prev.hidden=!1:this.nodes.prev.hidden=0===this.active}function p(){if(!this.nodes.next)return;const t=this.nextString;this.nodes.next.innerHTML=t.replace("{text}",this.active===this.slideLength-1?this.texts.nextLast:this.texts.next),this.config.loop?this.nodes.next.hidden=!1:this.nodes.next.hidden=this.active===this.slideLength-1}function u(){this.activeSlides=[],this.nodes.pages.forEach(((t,s)=>{let i="BUTTON"===t.tagName?t:t.querySelector("button");s===this.active?(i.setAttribute("aria-current","true"),t.classList.add(e.activeClass)):(i.removeAttribute("aria-current"),t.classList.remove(e.activeClass))})),this.nodes.items.forEach(((t,e)=>{t.forEach(((t,s)=>{e===this.active?(0===s&&"play"!==this.autoplayStatus&&t.focus({preventScroll:!0}),t.setAttribute("aria-hidden","false"),this.activeSlides.push(t)):t.setAttribute("aria-hidden","true")}))})),c.call(this),d.call(this),p.call(this)}var g={resetSlides:function(){const t=[];for(this.nodes.items=[...this.clonedItems],this.nodes.items.forEach(((t,s)=>{t.setAttribute("tabindex","-1"),t.setAttribute(e.attr+"-item",s),t.style.flex=`1 0 ${100/this.config.group}%`,t.style.overflow="hidden"}));this.nodes.items.length>0;)t.push(this.nodes.items.splice(0,this.config.group));this.nodes.items=t,this.slideLength=this.nodes.items.length}};const f={config:{loop:!0,group:1,spaceAround:0,noStartSpace:!1,autoplay:0}};class v{constructor(t,i){this.el=t;const n=s.returnJson(this.el.getAttribute(e.attr));this.settings=s.extend(!0,f,i,n),this.nodes={paging:this.el.querySelector(`[${e.attrPaging}]`),wrapper:this.el.querySelector(`[${e.attrWrapper}]`),overflow:this.el.querySelector(`[${e.attrOverflow}]`),items:[].slice.call(this.el.querySelectorAll(`[${e.attrItem}]`)),prev:this.el.querySelector(`[${e.attrPrev}]`),next:this.el.querySelector(`[${e.attrNext}]`),playstop:this.el.querySelector(`[${e.attrPlaystop}]`)},this.clonedItems=[...this.nodes.items],this.pagingBtnString=this.nodes.paging.children[0].outerHTML,this.playstopString=this.nodes.playstop.children[0].outerHTML,this.prevString=this.nodes.prev.children[0].outerHTML,this.nextString=this.nodes.next.children[0].outerHTML;const o=this.nodes.playstop.getAttribute(e.attrPlaystop).split("|"),a=this.nodes.prev.getAttribute(e.attrPrev).split("|"),r=this.nodes.next.getAttribute(e.attrNext).split("|");this.texts={stop:o[0],play:o[1],prev:a[0],prevFirst:a[1],next:r[0],nextLast:r[1]},this.active=0,this._interval=null,this.autoplayStatus="stop",this._slideWidth=0,this._touchstartX=0,this._touchmoveX=0,this._moveX=0,l.call(this)}refresh(){g.resetSlides.call(this),h.call(this,["paging"]),this.active=0,u.call(this)}play(){if("stop"===this.autoplayStatus)return;this.pause(),this.autoplayStatus="play",this.nodes.playstop.classList.add("is-playing");const t=this.playstopString;this.nodes.playstop.innerHTML=t.replace("{text}",this.texts.play);let e=this.active;this._interval=window.setInterval((()=>{e++,e>this.slideLength-1&&(e=0),this.changeActive(e)}),this.config.autoplay)}pause(){window.clearInterval(this._interval)}stop(){this.autoplayStatus="stop",this.nodes.playstop.classList.remove("is-playing");const t=this.playstopString;this.nodes.playstop.innerHTML=t.replace("{text}",this.texts.stop),window.clearInterval(this._interval)}toggleAutoplay(){"play"===this.autoplayStatus?this.stop():"stop"===this.autoplayStatus&&(this.autoplayStatus="play",this.play())}changeActive(t){this.active=t,this.active<0&&(this.active=this.config.loop?this.slideLength-1:0),this.active>this.slideLength-1&&(this.active=this.config.loop?0:this.slideLength-1),u.call(this)}}v.prototype.disable=function(){console.log("disable",this)};const y=function(t={}){document.querySelectorAll(`[${e.attr}]`).forEach((s=>s[e.pluginName]=new v(s,t)))};export{y as p};
