export default function newsFilter (data, sort) {
  if (sort === 'updates') sort = 'news'
  if (sort === 'market-news') sort = 'marketNews'

  const array = [...data]
  const defaultTopNews = array.filter(item => item.categories.includes('Image News Default'))
  const topLinks = array.filter(item => item.categories.includes('topLinks')).slice(0, 4)
  const items = sort ? array.filter(item => item.type === sort) : array
  const recentArticles = items.filter(item => item.categories.includes('Recent Articles')).slice(0, 6)
  const [topNews] = !sort ? defaultTopNews : items.filter(item => item.priority === 'Top').slice(0, 1)
  const mainpageNews = [...items.filter(item => item.categories.includes('topLinksMainPage'))].slice(0, 4)
  const [imageMainpageNews] = items.filter(item => item.categories.includes('imageNewsMainPage'))

  return {
    topNews,
    topLinks,
    recentArticles,
    items,
    mainpageNews,
    imageMainpageNews
  }
}
