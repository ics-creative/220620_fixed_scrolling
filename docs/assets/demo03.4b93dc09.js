import"./menu.e42b7f5c.js";const o=document.querySelector("#js-dialog"),e=document.querySelector("#js-dialog-open"),t=document.querySelector("#js-dialog-close");e.addEventListener("click",()=>{typeof o.showModal=="function"?(o.showModal(),document.body.classList.add("is-fixed-scroll")):alert("The <dialog> API is not supported by this browser")});t.addEventListener("click",()=>{o.close(),document.body.classList.remove("is-fixed-scroll"),alert("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u9589\u3058\u307E\u3057\u305F")});