import 'normalize.css'
import './assets/fonts.css'

const fontLink = document.createElement('link')
fontLink.rel = 'preload'
fontLink.href = '/fonts/ONY-FORMDigital-PROFI-Regular.woff'
fontLink.as = 'font'
fontLink.type = 'font/woff'
fontLink.crossOrigin = 'anonymous'
document.head.appendChild(fontLink)

const fontLinkMedium = document.createElement('link')
fontLinkMedium.rel = 'preload'
fontLinkMedium.href = '/fonts/ONY-FORMDigital-PROFI-Medium.woff'
fontLinkMedium.as = 'font'
fontLinkMedium.type = 'font/woff'
fontLinkMedium.crossOrigin = 'anonymous'
document.head.appendChild(fontLinkMedium)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
