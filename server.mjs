import { readFileSync } from 'fs'
import { resolve } from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const createServer = async () => {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // 使用vite这个中间件
  app.use(vite.middlewares)
  app.use('*', async (req, res) => {
    try {
      // 服务 index.html - 下面我们来处理这个问题
      const url = req.originalUrl
      let template = readFileSync(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const { render } = await vite.ssrLoadModule('./src/entry-server.js')
      const { html: appHtml, data } = await render(url)
      // 拼接标签，把data序列化插入到文档中
      const html = template.replace(`<!--ssr-outlet-->`, `${appHtml}<script>window.__data__=${JSON.stringify(data)}</script>`)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000)
}

createServer()
