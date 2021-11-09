import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export const render = async (url) => {
  try {
    const { app, router } = createApp()
    router.push(url)
    await router.isReady()
    const ctx = {}
    const html = await renderToString(app, ctx)
    return html
  } catch (error) {
    // console.log(error)
  }
}
