import express from 'express';
import { checkConnection } from './config/db';
import { errorMiddleware } from './middleware/error-middleware';
import { publicRouter } from './routes/public-api';
import { apiRouter } from './routes/api';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);

checkConnection();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});