chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const {status} = changeInfo
  const {url} = tab

  // console.log(changeInfo)
  // console.log(tab)
  // console.log('--------------------')

  if (status === 'loading' &&
    url && url.startsWith('https://www.google.') && url.includes('q=')
    ) {
    // console.log(url)
    chrome.tabs.executeScript(tabId, {
      file: 'js/content.js',
      runAt: 'document_start'
    })
  }
})
