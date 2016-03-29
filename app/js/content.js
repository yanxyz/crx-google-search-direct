/**
 * The search result is updated via AJAX,
 * MutationObserver is used to wait for it to complete.
 *
 * The tab url is changed whenever searching,
 * however the location hash is changed only when it has '#q=' at the end.
 * So instead of hashchange event chrome.tabs.onUpdated event is used.
 *
 */

/* global MutationObserver */

'use strict'

// Because this script is executed many times, so 'var' is used
var fn = debounce(addLinks, 10)
var observer = new MutationObserver((mutations, observer) => {
  // console.log(mutations)
  mutations.forEach((mutation, i) => {
    if (mutation.target.id === 'search') {
      // console.log(i, mutations.length, mutation)
      fn()
    }
  })
})

if (document.body) {
  // console.log('body')
  observe()
} else {
  document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    observe()
  })
}

function observe () {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

function addLinks () {
  const cites = document.querySelectorAll('#search ._Rm')

  if (cites.length) {
    // NodeList has forEach method in Chrome
    cites.forEach((el) => {
      const a = lookup(el)
      if (!a) {
        // console.log(el)
        return
      }
      el.innerHTML = `<a href="${a.href}" class="_g_s_d" style="color: currentColor">${el.innerHTML}</a>`
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

function debounce (fn, delay) {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn(arguments), delay)
  }
}
