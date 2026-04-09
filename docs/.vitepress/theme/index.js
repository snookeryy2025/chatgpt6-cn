import DefaultTheme from 'vitepress/theme'
import HomeContent from '../components/HomeContent.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeContent', HomeContent)
  }
} 