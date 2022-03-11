const $siteList = $('.siteList')
const $lastLi = $('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {
    logo: 'A',
    url: 'https://www.acfun.cn/',
  },
  {
    logo: 'B',
    url: 'https://www.bilibili.com/',
  },
]
const simplifyUrl = (url) => {
  return url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`
          <li>
            <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
        </li>
  `).insertBefore($lastLi)
    $li.on('click', () => open(node.url, '_self'))
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$('.addButton').on('click', () => {
  let url = window.prompt('请输入你想添加网站的网址')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: 'text',
    url: url,
  })
  render()
})
window.onbeforeunload = () => {
  console.log('页面关闭')
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

var timeOutEvent = 0 //定时器
//开始按
function gTouchStart() {
  timeOutEvent = setTimeout('longPress()', 500) //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
  return false
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
function gTouchEnd() {
  clearTimeout(timeOutEvent) //清除定时器
  if (timeOutEvent != 0) {
    //这里写要执行的内容（尤如onclick事件）
    alert('你这是点击，不是长按')
  }
  return false
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
function gTouchMove() {
  clearTimeout(timeOutEvent) //清除定时器
  timeOutEvent = 0
}

//真正长按后应该执行的内容
function longPress() {
  timeOutEvent = 0
  //执行长按要执行的内容，如弹出菜单
  alert('长按事件触发发')
}
