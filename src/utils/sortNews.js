const strip = require('strip')

module.exports = (data) => {
  const news = data
    .filter(item => (
      item.type === 'news' ||
      item.type === 'insights' ||
      item.type === 'howtodo' ||
      item.type === 'marketNews'
    ))
    .map(item => ({
      ...item,
      label: item.type === 'news' ? '#Updates' : `#${item.type}`,
      description: strip(item.contentHtml).replace(/<\/?[^>]+(>|$)/g, '').substring(0, 190) + '...'
    }))
    .sort((a, b) => {
      if (b.date < a.date) return -1
      if (b.date > a.date) return 1
      return 0
    })

  return news
}
