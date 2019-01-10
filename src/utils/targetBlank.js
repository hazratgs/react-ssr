export default function (selector) {
  const find = document.querySelectorAll(selector)
  if (find.length) {
    const links = [...find]
    links.map(item => {
      if (item.href.indexOf('https://crypterium.com') !== -1) {
        item.removeAttribute('target')
      } else {
        item.setAttribute('target', '_blank')
      }
    })
  }
}
