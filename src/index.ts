import express, { Application, Request, Response } from 'express';
import EventEmitter from 'events';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
import { greet } from './func';

dotenv.config();

const app: Application = express();
const eventEmitter: EventEmitter = new EventEmitter();
const port = process.env.PORT;

eventEmitter.on('load', () => {
   console.log('Page loaded 😎');
});

// Routes
app.get('/', (req: Request, res: Response): void => {
   res.json({ message: 'Express + TS Servers' });
   eventEmitter.emit('load');
});

app.get('/text', async (req: Request, res: Response) => {
   res.send(await readFile('./hello.txt', 'utf-8'));
   greet('George');
   eventEmitter.emit('load');
});

app.listen(port, (): void => {
   console.log(`Server is running on port ${port}`);
});
