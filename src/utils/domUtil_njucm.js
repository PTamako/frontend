export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
export const domAppName = '到账经费管理系统'
export const domCompName = '南京中医药大学财务处'
export const domCompWebUrl = 'http://cwc.njucm.edu.cn/'
export const domTitle = '到账经费管理系统-南京中医药大学'
