/**
 * The search page is totally reloaded or partially loaded via AJAX.
 * If it's updated via AJAX then code should wait it update the DOM.
 *
 * The tab url will change in every searching,
 * it may change the location hash or not.
 * So here instead of hashchange event chrome.tabs.onUpdated event is used.
 *
 */

/* global MutationObserver */

'use strict'

// console.log(0)
const observer = new MutationObserver(change)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log(message)

  change()
  observer.observe(document.getElementById('search'), {
    childList: true
  })

  sendResponse('test')
})

function change (mutations, observer) {
  // console.log(1)
  if (document.querySelector('._g_s_d')) return

  const cites = document.querySelectorAll('#search ._Rm')
  // console.log(2)

  if (cites.length) {
    // console.log(3)
    Array.prototype.forEach.call(cites, function (el) {
      const a = lookup(el)
      if (!a) {
        // console.log(el)
        return
      }
      el.innerHTML = `<a href="${a.href}" class="_g_s_d">${el.innerHTML}</a>`
    })
  }
}

function lookup (el) {
  let node = el.parentElement
  while (node !== document.body) {
    if (node.classList.contains('g')) {
      return node.querySelector('a')
    }
    node = node.parentElement
  }
  return null
}
