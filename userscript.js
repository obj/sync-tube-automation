// ==UserScript==
// @name         Sync-Tube.de Automation
// @version      0.1
// @author       obj
// @match        *://*.youtube.com/*
// @match        *://sync-tube.de/rooms/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';
  let currentUrl = document.location.href;
  let linkFromStorage = GM_getValue('link', '');
  let fieldForLink = ''

  const allStyles = `
.download-button {
    background-color: var(--yt-spec-10-percent-layer);
    color: var(--yt-spec-text-secondary);
    border-radius: 2px;
    padding: var(--yt-button-padding);
    margin: auto var(--ytd-subscribe-button-margin, 4px);
    white-space: nowrap;
    font-size: var(--ytd-tab-system_-_font-size);
    font-weight: var(--ytd-tab-system_-_font-weight);
    letter-spacing: var(--ytd-tab-system_-_letter-spacing);
    text-transform: var(--ytd-tab-system_-_text-transform);
    display: flex;
    flex-direction: row;
    cursor: pointer;
}
.download-text {
    --yt-formatted-string-deemphasize-color: var(--yt-spec-text-secondary);
    --yt-formatted-string-deemphasize_-_margin-left: 4px;
    --yt-formatted-string-deemphasize_-_display: initial;
}`;

  if (currentUrl.includes('sync-tube.de/rooms') && linkFromStorage != '') {
    document.querySelector('[placeholder="Enter YouTube URL here"]').value = linkFromStorage;
    fieldForLink = document.querySelector('[placeholder="Enter YouTube URL here"]')
    sleep(500).then(() => {
      fieldForLink.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'Enter'
      }));
    });
    GM_setValue('link', '');
  }else{
      sleep(500).then(() => {
          addStyle();
          addButton();
      });
  }

  function addStyle() {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = allStyles;
    document.head.appendChild(style);
  }

  function addButton() {
    document.querySelectorAll("#analytics-button:not(.download-panel)").forEach(panel => {
      panel.classList.add("download-panel");
      const button = document.createElement("div");
      button.classList.add("download-button");
      button.addEventListener("click", onClick);

      const text = document.createElement("span");
      text.classList.add("download-text");
      text.innerHTML = "SYNC-TUBE";

      panel.insertBefore(button, panel.firstElementChild);
      button.appendChild(text);
    });
  }

  function onClick() {
    GM_setValue('link', document.location.href);
    window.open("https://sync-tube.de/create");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
