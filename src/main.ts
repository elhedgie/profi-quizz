import 'normalize.css'

// Import fonts
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/pixelify-sans/400.css'
import '@fontsource/pixelify-sans/500.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Import additional fonts
import '@fontsource/butcherman/400.css'
import '@fontsource/griffy/400.css'
import '@fontsource/black-ops-one/400.css'
import '@fontsource/audiowide/400.css'
import '@fontsource/orbitron/400.css'
import '@fontsource/orbitron/700.css'

import '@fontsource/russo-one/400.css'

// Import 80s style fonts
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/comfortaa/400.css'
import '@fontsource/comfortaa/500.css'
import '@fontsource/press-start-2p'

import '@fontsource/vt323'
import '@fontsource/audiowide'
import '@fontsource/share-tech-mono'
import '@fontsource/raleway'
import '@fontsource/courier-prime'
import '@fontsource/libre-baskerville'
import '@fontsource/bodoni-moda'
