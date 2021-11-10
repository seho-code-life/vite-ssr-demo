import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export const render = async (url) => {
  try {
    const { app, router } = createApp()
    router.push(url)
    await router.isReady()
    let data = {}
    if (router.currentRoute.value.matched[0].components.default.asyncData) {
      const asyncFunc = router.currentRoute.value.matched[0].components.default.asyncData
      data = asyncFunc.call()
    }
    const html = await renderToString(app)
    return { html, data }
  } catch (error) {
    // console.log(error)
  }
}
