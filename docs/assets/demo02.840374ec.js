import"./menu.e42b7f5c.js";/* empty css              */const m="button, a",A=o=>{const u=o.querySelectorAll(m);return Array.from(u)},r=(o,u)=>{if(!o)throw new Error("\u8981\u7D20\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F");const e=A(o);e.length>0&&(console.log(e[u?0:e.length-1]),e[u?0:e.length-1].focus()),e[0].focus()},g=(o,u,e)=>{if(console.log("dialogFocusHandler"),!!u)switch(o.code){case"Enter":case"Space":break;case"Escape":e&&e();break;case"Tab":{const c=A(u),l=c.findIndex(t=>t===document.activeElement);if(c.length===1){console.log("\u30D5\u30A9\u30FC\u30AB\u30B9\u53EF\u80FD\u306A\u8981\u7D20\u304C1\u3064\u3057\u304B\u306A\u3044\u5834\u5408\u3001\u305D\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3057\u7D9A\u3051\u308B"),o.preventDefault(),o.stopImmediatePropagation(),r(u,!0);break}l===0?o.shiftKey&&(console.log("\u30E2\u30FC\u30C0\u30EB\u753B\u9762\u4EE5\u5916\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u5F53\u305F\u3063\u3066\u3044\u305F\u3089\u30A4\u30D9\u30F3\u30C8\u3092\u7121\u52B9\u5316"),o.preventDefault(),o.stopImmediatePropagation(),r(u,!1)):l>=c.length-1?o.shiftKey||(console.log("\u6700\u5F8C\u306E\u8981\u7D20\u306B\u3075\u308C\u3066\u3044\u305F\u30891\u756A\u76EE\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u3042\u3066\u308B"),o.preventDefault(),o.stopImmediatePropagation(),r(u,!0)):l===-1&&(console.log("\u3082\u3057\u753B\u9762\u5916\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u3042\u305F\u3063\u3066\u3044\u305F\u30891\u756A\u76EE\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u3042\u3066\u308B"),r(u,!0));break}}},C="is-can-scroll",D=o=>{const u=o.target;u!==null&&(console.log(u.scrollTop),u.scrollTop+u.clientHeight===u.scrollHeight&&(u.scrollTop=u.scrollTop-1),u.scrollTop===0&&(u.scrollTop=1))},F=o=>{const u=o.querySelector(`.${C}`);u!==null&&u&&u.addEventListener("scroll",D)},h=o=>o.clientHeight<o.scrollHeight,a=o=>{var e;const u=(e=o.target)==null?void 0:e.closest(`.${C}`);if(u===null){o.preventDefault();return}console.log(u.clientHeight,u.scrollHeight),u&&h(u)?(console.log("\u5BFE\u8C61\u306E\u8981\u7D20\u304C\u3042\u308A\u3001\u305D\u306E\u8981\u7D20\u304C\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u3067\u3042\u308C\u3070\u3001\u30B9\u30AF\u30ED\u30FC\u30EB\u3092\u8A31\u53EF\u3059\u308B"),o.stopPropagation()):(console.log("\u5BFE\u8C61\u306E\u8981\u7D20\u306F\u30B9\u30AF\u30ED\u30FC\u30EB\u7981\u6B62"),o.preventDefault())},d="is-show-dialog",E="is-fixed-scroll",f=o=>{const u=t=>{t.classList.remove(d),document.body.classList.remove(E),window.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("touchmove",a)},e=t=>g(t,o,()=>u(o));return{show:t=>{console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u8868\u793A"),o.classList.add(d),document.body.classList.add(E),window.addEventListener("keydown",e,{capture:!0}),F(o),document.addEventListener("touchmove",a,{passive:!1}),t&&t()},close:t=>{console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u975E\u8868\u793A"),u(o),t&&t()}}},s=document.querySelector("#js-menu-header"),n=document.querySelector("#js-menu-button"),B=f(s);n.addEventListener("click",()=>{s.classList.contains("is-show-dialog")?B.close(()=>{s.removeAttribute("role"),s.removeAttribute("aria-modal"),n.textContent="\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F"}):B.show(()=>{s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),n.textContent="\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B"})});const L=document.querySelector("#js-modal-button"),S=document.querySelector("#js-modal-close"),y=document.querySelector("#js-modal-overlay"),p=document.querySelector("#js-modal"),i=f(p);L.addEventListener("click",()=>i.show());S.addEventListener("click",()=>i.close());y.addEventListener("click",()=>i.close());