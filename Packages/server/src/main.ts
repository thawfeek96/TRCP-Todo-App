import express, { Application, NextFunction, Request, Response } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'

import cors from 'cors'
import { appRoute } from './controller/todoRouter'

const app: Application = express()
app.use(cors())


app.use('/trcp', trpcExpress.createExpressMiddleware({
  router: appRoute
}))


const PORT: number = Number(process.env.PORT) || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`)
})