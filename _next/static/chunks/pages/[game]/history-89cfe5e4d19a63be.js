(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[841],{4184:function(e,n){var t;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t)){if(t.length){var i=o.apply(null,t);i&&e.push(i)}}else if("object"===a)if(t.toString===Object.prototype.toString)for(var s in t)r.call(t,s)&&t[s]&&e.push(s);else e.push(t.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(t=function(){return o}.apply(n,[]))||(e.exports=t)}()},5038:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[game]/history",function(){return t(8759)}])},8759:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return p},default:function(){return g}});var r=t(5893),o=t(9008),a=t(1664),i=t(1151),s=t(3899),c=t(4184),l=t.n(c),u=t(699),d=t(8315),f=t.n(d);function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function h(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){m(e,n,t[n])}))}return e}var p=!0;function g(e){var n=e.pokemonList,t=e.history,a=e.game,i=e.gameName;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsxs)("title",{children:[i," transferability history - Pok\xe9Passport"]}),(0,r.jsx)("meta",{name:"description",content:"In this page you can check the full history of changes of the ".concat(i," Transfer Table")})]}),(0,r.jsxs)("center",{children:[(0,r.jsxs)("h2",{children:["Table history for ",i]}),"swsh"===a?(0,r.jsx)(_,{game:a,gameName:i}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"This table orders the changes to the Transfer Table the most recent to oldest. The date is displayed in a YYYY/MM/DD format."}),(0,r.jsx)(x,{game:a})]})]}),a&&"swsh"!==a&&(0,r.jsx)("div",{className:f().articleWrapper,children:(0,r.jsx)(j,{history:t,game:a,pokemonList:n})})]})}function _(e){var n=e.game,t=e.gameName;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["Pok\xe9Passport does not record the changes history for ",t]}),(0,r.jsx)(x,{game:n})]})}function x(e){var n=e.game;return(0,r.jsxs)("nav",{className:f().navigation,children:[(0,r.jsx)(a.default,{href:"/".concat(n),children:(0,r.jsx)("a",{children:"Back to the table"})}),(0,r.jsx)(a.default,{href:"/",children:(0,r.jsx)("a",{children:"Back to index"})})]})}function j(e){var n=e.history,t=e.game,o=e.pokemonList;return(0,r.jsxs)("table",{className:f().historyTable,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:f().fieldDate,children:"Date"}),(0,r.jsx)("th",{className:f().fieldPokemon,children:"Pok\xe9mon"}),(0,r.jsx)("th",{className:f().fieldForm,children:"Region"}),(0,r.jsx)("th",{className:f().fieldStatus,children:"Status"}),(0,r.jsx)("th",{children:"Notes"})]})}),(0,r.jsx)("tbody",{children:n.map((function(e,n){var a=o.find((function(n){return n.id===e.pokemon})),i=o.indexOf(a)+1;return(0,r.jsx)(y,h({form:e.form||"original",game:t,pokemonInfo:a,dexNumber:i},e),n)}))})]})}function y(e){var n=e.date,t=e.pokemonInfo,o=e.region,c=e.dexNumber,d=e.status,m=e.details,p=e.game,g={original:{tag:"Original",icon:"/poke-passport/logo-visc.svg"},alola:{tag:"Alola",icon:"/poke-passport/logo-alola.svg"},galar:{tag:"Galar",icon:"/poke-passport/logo-swsh.svg"},hisui:{tag:"Hisui",icon:"/poke-passport/logo-arceus.svg"}},_={a:function(e){return(0,r.jsx)("a",h({},e,{target:"_blank",rel:"noreferrer"}))}};return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{className:f().fieldDate,children:n}),(0,r.jsx)("td",{className:l()(f().fieldPokemon,f()[d],f()[o]),children:(0,r.jsx)(a.default,{href:"/".concat(p,"/").concat(t.id).concat(o&&"original"!=o?"?region=".concat(o):""),children:(0,r.jsxs)("a",{title:t.name,className:f().pokemonThumbnail,children:[(0,r.jsx)("span",{className:f().dexNumber,children:(0,u.u)(c,3)}),(0,r.jsx)("img",{alt:t.name,src:"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/".concat(t.id).concat(o&&"original"!=o?"-".concat(o):"",".png")})]})})}),(0,r.jsx)("td",{className:f().fieldForm,children:(0,r.jsxs)("div",{className:f().formWrapper,children:[(0,r.jsx)("img",{className:f().icon,alt:g[o].tag,src:g[o].icon}),(0,r.jsx)("span",{children:o?g[o].tag||"INVALID":"Original"})]})}),(0,r.jsx)("td",{className:f().fieldStatus,children:d?{confirmed:"Confirmed",guaranteed:"Guaranteed",possible:"Possible",no:"Untransferable",unknown:"Unknown"}[d]||"INVALID TAG":"No status"}),(0,r.jsx)("td",{children:(0,r.jsx)(i.Zo,{components:_,children:(0,r.jsx)(s.R,h({},m))})})]})}},699:function(e,n,t){"use strict";function r(e,n){for(var t=e.toString();t.length<n;)t="0"+t;return t}t.d(n,{u:function(){return r}})},8315:function(e){e.exports={articleWrapper:"History_articleWrapper__h2itA",historyTable:"History_historyTable__qB_ej",fieldDate:"History_fieldDate__IJFop",fieldPokemon:"History_fieldPokemon__sP6ZY",guaranteed:"History_guaranteed__CKHEK",no:"History_no__MdT0M",fieldForm:"History_fieldForm__0ExTa",pokemonThumbnail:"History_pokemonThumbnail__ipg5N",unknown:"History_unknown__QilO_",confirmed:"History_confirmed__q8f_0",possible:"History_possible__75W05","not-available":"History_not-available__aYyqH",navigation:"History_navigation__2YTxA",dexNumber:"History_dexNumber__wma7i",formWrapper:"History_formWrapper__xcprI",icon:"History_icon__Ypv_c"}},1151:function(e,n,t){"use strict";t.d(n,{pC:function(){return o},NF:function(){return a},ah:function(){return i},Zo:function(){return c}});var r=t(7294);const o=r.createContext({});function a(e){return function(n){const t=i(n.components);return r.createElement(e,{...n,allComponents:t})}}function i(e){const n=r.useContext(o);return r.useMemo((()=>"function"===typeof e?e(n):{...n,...e}),[n,e])}const s={};function c({components:e,children:n,disableParentContext:t}){let a=i(e);return t&&(a=e||s),r.createElement(o.Provider,{value:a},n)}},3899:function(e,n,t){"use strict";t.d(n,{R:function(){return c}});var r={};t.r(r),t.d(r,{MDXContext:function(){return s.pC},MDXProvider:function(){return s.Zo},useMDXComponents:function(){return s.ah},withMDXComponents:function(){return s.NF}});var o=t(7294),a=t(5893),i=t.t(a,2),s=t(1151);function c({compiledSource:e,frontmatter:n,scope:t,components:a={},lazy:c}){const[l,u]=(0,o.useState)(!c||"undefined"===typeof window);(0,o.useEffect)((()=>{if(c){const e=window.requestIdleCallback((()=>{u(!0)}));return()=>window.cancelIdleCallback(e)}}),[]);const d=(0,o.useMemo)((()=>{const o=Object.assign({opts:{...r,...i}},{frontmatter:n},t),a=Object.keys(o),s=Object.values(o),c=Reflect.construct(Function,a.concat(`${e}`));return c.apply(c,s).default}),[t,e]);if(!l)return o.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});const f=o.createElement(s.Zo,{components:a},o.createElement(d,null));return c?o.createElement("div",null,f):f}"undefined"!==typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout((function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})}),1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)})}},function(e){e.O(0,[774,888,179],(function(){return n=5038,e(e.s=n);var n}));var n=e.O();_N_E=n}]);