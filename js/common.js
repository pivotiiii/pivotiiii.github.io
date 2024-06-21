export async function get_desc(url, key) {
    let desc = "";
    await fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json) {
            desc = json[key];
        });
    return desc;
}

export function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
        callback();
        return;
      }
      else {
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
            return;
          loopSearch();
        }, checkFrequencyInMs);
      }
    })();
  }