(self.webpackChunkBankApp=self.webpackChunkBankApp||[]).push([[1297],{1297:(t,e,s)=>{"use strict";s.r(e),s.d(e,{ion_reorder:()=>n,ion_reorder_group:()=>l});var r=s(5133),o=s(4973),i=s(6887);const n=class{constructor(t){(0,r.r)(this,t)}onClick(t){const e=this.el.closest("ion-reorder-group");t.preventDefault(),e&&e.disabled||t.stopImmediatePropagation()}render(){const t=(0,o.b)(this);return(0,r.h)(r.H,{class:t},(0,r.h)("slot",null,(0,r.h)("ion-icon",{name:"ios"===t?"reorder-three-outline":"reorder-two-sharp",lazy:!1,class:"reorder-icon",part:"icon"})))}get el(){return(0,r.i)(this)}};n.style={ios:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}",md:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}"};const l=class{constructor(t){(0,r.r)(this,t),this.ionItemReorder=(0,r.e)(this,"ionItemReorder",7),this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}disabledChanged(){this.gesture&&this.gesture.enable(!this.disabled)}async connectedCallback(){const t=this.el.closest("ion-content");t&&(this.scrollEl=await t.getScrollElement()),this.gesture=(await Promise.resolve().then(s.bind(s,4366))).createGesture({el:this.el,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:t=>this.canStart(t),onStart:t=>this.onStart(t),onMove:t=>this.onMove(t),onEnd:()=>this.onEnd()}),this.disabledChanged()}disconnectedCallback(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}complete(t){return Promise.resolve(this.completeSync(t))}canStart(t){if(this.selectedItemEl||0!==this.state)return!1;const e=t.event.target.closest("ion-reorder");if(!e)return!1;const s=c(e,this.el);return!!s&&(t.data=s,!0)}onStart(t){t.event.preventDefault();const e=this.selectedItemEl=t.data,s=this.cachedHeights;s.length=0;const r=this.el,o=r.children;if(!o||0===o.length)return;let n=0;for(let i=0;i<o.length;i++){const t=o[i];n+=t.offsetHeight,s.push(n),t.$ionIndex=i}const l=r.getBoundingClientRect();if(this.containerTop=l.top,this.containerBottom=l.bottom,this.scrollEl){const t=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=t.top+h,this.scrollElBottom=t.bottom-h}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=a(e),this.selectedItemHeight=e.offsetHeight,this.state=1,e.classList.add(m),(0,i.a)()}onMove(t){const e=this.selectedItemEl;if(!e)return;const s=this.autoscroll(t.currentY),r=this.containerTop-s,o=Math.max(r,Math.min(t.currentY,this.containerBottom-s)),n=s+o-t.startY,l=this.itemIndexForTop(o-r);if(l!==this.lastToIndex){const t=a(e);this.lastToIndex=l,(0,i.b)(),this.reorderMove(t,l)}e.style.transform=`translateY(${n}px)`}onEnd(){const t=this.selectedItemEl;if(this.state=2,!t)return void(this.state=0);const e=this.lastToIndex,s=a(t);e===s?this.completeSync():this.ionItemReorder.emit({from:s,to:e,complete:this.completeSync.bind(this)}),(0,i.h)()}completeSync(t){const e=this.selectedItemEl;if(e&&2===this.state){const s=this.el.children,r=s.length,o=this.lastToIndex,i=a(e);o===i||void 0!==t&&!0!==t||this.el.insertBefore(e,i<o?s[o+1]:s[o]),Array.isArray(t)&&(t=p(t,i,o));for(let t=0;t<r;t++)s[t].style.transform="";e.style.transition="",e.classList.remove(m),this.selectedItemEl=void 0,this.state=0}return t}itemIndexForTop(t){const e=this.cachedHeights;for(let s=0;s<e.length;s++)if(e[s]>t)return s;return e.length-1}reorderMove(t,e){const s=this.selectedItemHeight,r=this.el.children;for(let o=0;o<r.length;o++){let i="";o>t&&o<=e?i=`translateY(${-s}px)`:o<t&&o>=e&&(i=`translateY(${s}px)`),r[o].style.transform=i}}autoscroll(t){if(!this.scrollEl)return 0;let e=0;return t<this.scrollElTop?e=-d:t>this.scrollElBottom&&(e=d),0!==e&&this.scrollEl.scrollBy(0,e),this.scrollEl.scrollTop-this.scrollElInitial}render(){const t=(0,o.b)(this);return(0,r.h)(r.H,{class:{[t]:!0,"reorder-enabled":!this.disabled,"reorder-list-active":0!==this.state}})}get el(){return(0,r.i)(this)}static get watchers(){return{disabled:["disabledChanged"]}}},a=t=>t.$ionIndex,c=(t,e)=>{let s;for(;t;){if(s=t.parentElement,s===e)return t;t=s}},h=60,d=10,m="reorder-selected",p=(t,e,s)=>{const r=t[e];return t.splice(e,1),t.splice(s,0,r),t.slice()};l.style=".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}"}}]);