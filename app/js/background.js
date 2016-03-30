chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlPrefix: 'https://www.google.'
            }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ])
  })
})

chrome.pageAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: 'js/content.js',
    runAt: 'document_end'
  })
})
