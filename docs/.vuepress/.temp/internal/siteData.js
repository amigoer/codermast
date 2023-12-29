export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"编程桅杆\",\"description\":\"\",\"head\":[[\"script\",{},\"var _hmt = _hmt || [];\\n    (function() {\\n      var hm = document.createElement(\\\"script\\\");\\n      hm.src = \\\"https://hm.baidu.com/hm.js?32371a71caaa9940216104814b1449b6\\\";\\n      var s = document.getElementsByTagName(\\\"script\\\")[0]; \\n      s.parentNode.insertBefore(hm, s);\\n    })();\"],[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
