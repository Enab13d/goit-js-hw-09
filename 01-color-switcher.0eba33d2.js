const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e=null,o=!1;t.startBtn.addEventListener("click",(()=>{o||(o=!0,e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3))})),t.stopBtn.addEventListener("click",(()=>{clearInterval(e),o=!1}));
//# sourceMappingURL=01-color-switcher.0eba33d2.js.map