import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import gobalErrorHandilers from './app/middlwares/gogbalerrorhandiler';
import notFount from './app/middlwares/notfound';
import router from './app/routers';
import cookieParser from 'cookie-parser';
const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(gobalErrorHandilers);
app.use(notFount);

export default app;
