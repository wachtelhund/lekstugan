// @deno-types="npm:@types/express@4"
import "https://deno.land/std@0.182.0/dotenv/load.ts"
import express, { Request, Response, NextFunction } from 'npm:express@4.18.2'
const app = express()
const port = Deno.env.get('PORT') || 3000

app.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('Middleware');
  next();
})
app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('Hello World')
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})