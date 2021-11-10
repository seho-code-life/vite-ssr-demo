import { createApp } from './main'
const { app, router } = createApp()

router.isReady().then(() => {
  const component = router.currentRoute.value.matched[0].components.default
  // component.data = () => {
  //   let _data = {}
  //   // 判断是否是函数
  //   if (typeof component.data === 'function') {
  //     _data = component.data.call()
  //   }
  //   // 判断是否有脱水的data
  //   if (window.__data__) {
  //     _data = {
  //       ...component.data,
  //       ...window.__data__
  //     }
  //   }
  //   return _data
  // }
  // 这个是具体的vue组件
  console.log(router.currentRoute.value.matched[0])
  app.mount('#app')
})
