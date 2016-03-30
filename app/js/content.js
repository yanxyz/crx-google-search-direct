/**
 * The search result is updated via AJAX,
 * MutationObserver is used to wait for it to complete.
 *
 * ver 2 automatically adds links but sometimes is failed,
 * maybe adding links by hand is the ultimate solution:
 * Click page action icon to add links
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

addLinks()
observe()

function observe () {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

function addLinks () {
  if (document.querySelector('._g_s_d')) return

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
