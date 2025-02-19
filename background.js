
console.log("run");

chrome.runtime.onInstalled.addListener(function () {
console.log("running background");

  chrome.action.onClicked.addListener(function (tab) {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "normal",
      focused: true,
    });
  });
});
