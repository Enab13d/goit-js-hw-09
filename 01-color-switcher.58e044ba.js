const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e=null,r=!1;t.stopBtn.setAttribute("disabled",!0);t.startBtn.addEventListener("click",(()=>{r||(r=!0,t.startBtn.setAttribute("disabled",!0),t.stopBtn.removeAttribute("disabled"),e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3))})),t.stopBtn.addEventListener("click",(()=>{clearInterval(e),r=!1,t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.58e044ba.js.map