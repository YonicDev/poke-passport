(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[485],{4184:function(n,e){var o;!function(){"use strict";var t={}.hasOwnProperty;function r(){for(var n=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var s=typeof o;if("string"===s||"number"===s)n.push(o);else if(Array.isArray(o)){if(o.length){var i=r.apply(null,o);i&&n.push(i)}}else if("object"===s)if(o.toString===Object.prototype.toString)for(var a in o)t.call(o,a)&&o[a]&&n.push(a);else n.push(o.toString())}}return n.join(" ")}n.exports?(r.default=r,n.exports=r):void 0===(o=function(){return r}.apply(e,[]))||(n.exports=o)}()},4527:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[game]/[pokemon]",function(){return o(7384)}])},7384:function(n,e,o){"use strict";o.r(e),o.d(e,{__N_SSG:function(){return _},default:function(){return k}});var t=o(5893),r=o(7294),s=o(9008),i=o(1664),a=o(4184),c=o.n(a),l=o(1151),u=o(3899),d=o(699),m=o(8394),f=o.n(m);function h(n,e,o){return e in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function p(n){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},t=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter((function(n){return Object.getOwnPropertyDescriptor(o,n).enumerable})))),t.forEach((function(e){h(n,e,o[e])}))}return n}var g={visc:/(alola|galar|hisui)/},_=!0;function k(n){var e,o,a,m,h=n.game,_=n.pokemon,k=n.index,x=n.notes,w=n.prevPokemon,j=n.nextPokemon,b=(0,r.useReducer)((function(){return function(n){var e;if("swsh"===n)return"original";var o=new URLSearchParams(window.location.search).get("region");return(null===(e=g[n])||void 0===e?void 0:e.test(o))?o:"original"}(h)}),"original"),P=b[0],y=b[1];(0,r.useEffect)((function(){y()}));var I=null==P||"original"==P,N=I||null==_.forms?_:_.forms.find((function(n){return new RegExp("-".concat(P,"$")).test(n.id)})),C=N.status,S={swsh:"Pok\xe9mon Sword & Pok\xe9mon Shield",visc:"Pok\xe9mon Scarlet & Pok\xe9mon Violet"},E={galar:{id:"swsh",size:"80px"},alola:{id:"alola",size:"90px"},original:{id:"visc",size:"90px"},hisui:{id:"arceus",size:"90px"}},O={swsh:{backgroundImage:'url("/poke-passport/logo-visc.svg"), url("/poke-passport/bg-swsh.svg")',backgroundBlendMode:"overlay, hard-light",backgroundSize:"".concat((null===(e=E[P])||void 0===e?void 0:e.size)||E.original.size,", 150px")},visc:{backgroundImage:'url("/poke-passport/logo-'.concat((null===(o=E[P])||void 0===o?void 0:o.id)||E.original.id,'.svg"), url("/poke-passport/bg-visc.svg")'),backgroundBlendMode:"overlay, multiply",backgroundSize:"".concat((null===(a=E[P])||void 0===a?void 0:a.size)||E.original.size,", 150px")}},M={swsh:{base:"Since launch",armor:"Since Isle of Armor",crown:"Since Crown Tundra",other:"Other",no:"Untransferable"},visc:{confirmed:"Confirmed",guaranteed:"Guaranteed",possible:"Possible",no:"Untransferable",unknown:"Unknown"}},z={a:function(n){return(0,t.jsx)("a",p({},n,{target:"_blank",rel:"noreferrer"}))}},F={alola:"Alolan",galar:"Galarian",hisui:"Hisuian"},D=null===(m=_.forms)||void 0===m?void 0:m.map((function(n){var e=g[h].exec(n.id)[1];if(e!==P)return(0,t.jsx)("div",{className:c()(f().formLink,f()[n.status],f()["".concat(h,"-").concat(n.status)]),children:(0,t.jsx)(i.default,{href:"/".concat(h,"/").concat(_.id,"?region=").concat(e),children:(0,t.jsx)("a",{title:"".concat(F[e]," form"),children:(0,t.jsx)("img",{alt:n.id,src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/".concat(n.id,".png")})})})},n.id)}));null==D||I||D.unshift((0,t.jsx)("div",{className:c()(f().formLink,f()[_.status],f()["".concat(h,"-").concat(_.status)]),children:(0,t.jsx)(i.default,{href:"/".concat(h,"/").concat(_.id),children:(0,t.jsx)("a",{title:"Original form",children:(0,t.jsx)("img",{alt:_.id,src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/".concat(_.id,".png")})})})},_.id));var T="swsh"===h?"Pok\xe9Passport does not record the history of Sword & Shield availability.":"No history has been recorded yet for this Pok\xe9mon.";return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("center",{children:[(0,t.jsxs)("h1",{children:["Info for ",S[h]]}),(0,t.jsx)(i.default,{href:"/".concat(h).concat(I?"":"?region=".concat(P)),children:(0,t.jsx)("a",{children:"\u2191 Back to list"})})]}),(0,t.jsxs)(s.default,{children:[(0,t.jsxs)("title",{children:["Status of ",N.name," in ",S[h]," - Pok\xe9Passport"]}),(0,t.jsx)("meta",{name:"description",content:"Check if ".concat(N.name," can be transfered to ").concat(S[h])})]}),(0,t.jsxs)("div",{className:f().pageContainer,children:[(0,t.jsx)(v,{game:h,pokemon:w,direction:"left",number:k-1,preferredForm:P}),(0,t.jsxs)("div",{className:f().container,children:[(0,t.jsx)("div",{className:c()(f().iconContainer,f()[C],f()[h+"-"+C]),style:O[h],children:(0,t.jsx)("img",{className:f().icon,alt:_.name,src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/".concat(N.id,".png")})}),(0,t.jsxs)("h1",{className:f().name,children:["#",(0,d.u)(k,3)," ",N.name]}),(0,t.jsx)("div",{className:f().forms,children:D}),(0,t.jsx)("div",{className:c()(f().status,f()[C],f()[h+"-"+C]),children:M[h][C]||"Invalid tag"}),(0,t.jsxs)("div",{className:f().date,children:["Last updated on",(0,t.jsx)("br",{}),N.lastUpdated]}),(0,t.jsxs)("div",{className:f().details,children:[(0,t.jsx)("h3",{children:"Notes"}),(0,t.jsx)(l.Zo,{components:z,children:(0,t.jsx)(u.R,p({},x[P||"original"].main))})]}),(0,t.jsxs)("div",{className:_.history.length>0?f().history:f().historyEmpty,children:[(0,t.jsx)("h3",{children:"History"}),_.history.length<=0?(0,t.jsx)("small",{children:T}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("small",{children:"Dates are written in format Year / Month / Day."}),(0,t.jsxs)("table",{className:f().historyTable,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Date"}),(0,t.jsx)("th",{children:"Status"}),(0,t.jsx)("th",{children:"Notes"})]})}),(0,t.jsx)("tbody",{children:N.history.map((function(n,e){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)("center",{children:n.date})}),(0,t.jsx)("td",{className:c()(f().statusTable,f()[n.status],f()[h+"-"+n.status]),children:M[h][n.status]}),(0,t.jsx)("td",{children:(0,t.jsx)(l.Zo,{components:z,children:(0,t.jsx)(u.R,p({},x[P||"original"].history[e]))})})]},e)}))})]})]})]})]}),(0,t.jsx)(v,{game:h,pokemon:j,direction:"right",number:k+1,preferredForm:P})]})]})}function v(n){var e=n.game,o=n.pokemon,r=n.number,s=n.direction,a=n.preferredForm,l={left:"\u2190",right:"\u2192"},u=null==a||"original"===a;if(null!=o){var d,m=p({},o),h="original";return!u&&(null===(d=o.forms)||void 0===d?void 0:d.length)>0&&(m=o.forms.find((function(n){return new RegExp("-(?:".concat(a,")")).test(n.id)})),h=a),(0,t.jsx)(i.default,{href:"/".concat(e,"/").concat(o.id).concat("original"!==h?"?region=".concat(h):""),passHref:!0,children:(0,t.jsx)("a",{className:f().navPokemon,children:(0,t.jsxs)("div",{children:[(0,t.jsx)("img",{alt:m.name,className:c()(f().navIcon,f()[m.status],f()[e+"-"+m.status]),src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/".concat(m.id,".png")}),(0,t.jsxs)("div",{children:[l[s]," #",r," ",m.name]})]})})})}return(0,t.jsxs)("div",{className:f().navPokemon,children:[(0,t.jsx)("img",{alt:"Unknown",className:c()(f().navIcon,f().unknown),style:{width:"68px",height:"56px"},src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown.png"}),(0,t.jsxs)("div",{children:[l[s]," ",{left:"First Pok\xe9mon",right:"Last Pok\xe9mon"}[s]]})]})}},699:function(n,e,o){"use strict";function t(n,e){for(var o=n.toString();o.length<e;)o="0"+o;return o}o.d(e,{u:function(){return t}})},8394:function(n){n.exports={pageContainer:"PokemonInfo_pageContainer__f6Fwd",container:"PokemonInfo_container__hZgNb",icon:"PokemonInfo_icon__l_f0d",iconContainer:"PokemonInfo_iconContainer__1B7BB",swsh:"PokemonInfo_swsh__zoHM5",visc:"PokemonInfo_visc__q9s84",status:"PokemonInfo_status__7ouMY",name:"PokemonInfo_name__rShvE",forms:"PokemonInfo_forms__xBfph",formLink:"PokemonInfo_formLink__Rgm96",details:"PokemonInfo_details__ox_b1",date:"PokemonInfo_date__LVAyG",history:"PokemonInfo_history__fPVI2",historyEmpty:"PokemonInfo_historyEmpty__2514q",statusTable:"PokemonInfo_statusTable__snmqa",navPokemon:"PokemonInfo_navPokemon__Vk3np",navIcon:"PokemonInfo_navIcon__4ZKMO",unknown:"PokemonInfo_unknown___kYiO",confirmed:"PokemonInfo_confirmed__EM98a",guaranteed:"PokemonInfo_guaranteed__mUFuC",possible:"PokemonInfo_possible__HFpiW","not-available":"PokemonInfo_not-available__IEQyo",no:"PokemonInfo_no__yGL2_","swsh-base":"PokemonInfo_swsh-base__ZAESM","swsh-armor":"PokemonInfo_swsh-armor__mGks4","swsh-crown":"PokemonInfo_swsh-crown__qBIrY","swsh-other":"PokemonInfo_swsh-other__DnVzZ"}},1151:function(n,e,o){"use strict";o.d(e,{pC:function(){return r},NF:function(){return s},ah:function(){return i},Zo:function(){return c}});var t=o(7294);const r=t.createContext({});function s(n){return function(e){const o=i(e.components);return t.createElement(n,{...e,allComponents:o})}}function i(n){const e=t.useContext(r);return t.useMemo((()=>"function"===typeof n?n(e):{...e,...n}),[e,n])}const a={};function c({components:n,children:e,disableParentContext:o}){let s=i(n);return o&&(s=n||a),t.createElement(r.Provider,{value:s},e)}},3899:function(n,e,o){"use strict";o.d(e,{R:function(){return c}});var t={};o.r(t),o.d(t,{MDXContext:function(){return a.pC},MDXProvider:function(){return a.Zo},useMDXComponents:function(){return a.ah},withMDXComponents:function(){return a.NF}});var r=o(7294),s=o(5893),i=o.t(s,2),a=o(1151);function c({compiledSource:n,frontmatter:e,scope:o,components:s={},lazy:c}){const[l,u]=(0,r.useState)(!c||"undefined"===typeof window);(0,r.useEffect)((()=>{if(c){const n=window.requestIdleCallback((()=>{u(!0)}));return()=>window.cancelIdleCallback(n)}}),[]);const d=(0,r.useMemo)((()=>{const r=Object.assign({opts:{...t,...i}},{frontmatter:e},o),s=Object.keys(r),a=Object.values(r),c=Reflect.construct(Function,s.concat(`${n}`));return c.apply(c,a).default}),[o,n]);if(!l)return r.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});const m=r.createElement(a.Zo,{components:s},r.createElement(d,null));return c?r.createElement("div",null,m):m}"undefined"!==typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(n){var e=Date.now();return setTimeout((function(){n({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-e))}})}),1)},window.cancelIdleCallback=window.cancelIdleCallback||function(n){clearTimeout(n)})}},function(n){n.O(0,[774,888,179],(function(){return e=4527,n(n.s=e);var e}));var e=n.O();_N_E=e}]);