import { readFileSync } from 'fs'
import { resolve } from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const createServer = async () => {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  app.use('*', async (req, res) => {
    // 服务 index.html - 下面我们来处理这个问题
    const url = req.originalUrl
    let template = readFileSync(resolve('index.html'), 'utf-8')
    template = await vite.transformIndexHtml(url, template)
    const { render } = await vite.ssrLoadModule('./src/entry-server.js')
    const appHtml = await render(url)
    const html = template.replace(`<!--ssr-outlet-->`, appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })

  // 使用vite这个中间件
  app.use(vite.middlewares)
  app.listen(3000)
}

createServer()
