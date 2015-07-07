/* global MutationObserver */

/**
 * if search by the search input in search page, the results is loaded by xhr.
 * So here is the question: how to determin the results is ready?
 */

'use strict'

var observer = new MutationObserver(modify)
var modified = false
observer.observe(document.body, {
  childList: true
})

window.addEventListener('hashchange', function (e) {
  observer.observe(document.getElementById('search'), {
    childList: true
  })
  modified = false
})

function modify () {
  var els = document.querySelectorAll('.r a:first-child')
  if (els.length && !modified) {
    Array.prototype.forEach.call(els, function (a) {
      var html = '<a href="' + a.href + '" target="_blank" class="_direct_link"></a>'
      a.insertAdjacentHTML('afterend', html)
    })
    modified = true
    observer.disconnect()
  }
}
