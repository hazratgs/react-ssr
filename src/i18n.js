import i18next from 'i18next'

import en from './public/lang/en.json'

const lang = !__SSR__ && window.localStorage.getItem('lang') // eslint-disable-line
if (!lang && !__SSR__) window.localStorage.setItem('lang', 'en') // eslint-disable-line

i18next.init({
  lng: lang || 'en',
  resources: {
    en: en
  }
})
