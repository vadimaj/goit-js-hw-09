!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n=null;function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}function e(){t.startBtn.disabled?(t.startBtn.disabled=!1,t.stopBtn.disabled=!0):(t.startBtn.disabled=!0,t.stopBtn.disabled=!1)}t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){n=setInterval(a,1e3),e()})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),e()}))}();
//# sourceMappingURL=01-color-switcher.72cbf780.js.map