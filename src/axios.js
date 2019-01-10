import axios from 'axios'

axios.defaults.headers.common['X-Authorization'] = `${X_Authorization}` // eslint-disable-line
axios.defaults.headers.common['X-UserId'] = `${X_UserId}` // eslint-disable-line
