chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const {status} = changeInfo
  const {url} = tab
  const re = /^https:\/\/www\.google\.[a-z.]+\/.+/

  if (status === 'complete' &&
    url && url.includes('q=') && re.test(url)
    ) {
    chrome.tabs.sendMessage(tabId, 'tab url is changed', null, (message) => {
      // console.log(message)
    })
  }
})
