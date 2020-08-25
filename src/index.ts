import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();
import morgan from 'morgan';
import DB from './db/db';
import cors from 'cors';
import Routes from './routes/Routes';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 80;
const BASE_URL_PATH = process.env.BASE_URL_PATH || '';
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

class Server {
    public app: Application;

    public db: DB;

    constructor() {
        this.app = express();
        this.config().then();
        this.connectDB();
        this.routes();
    }

    async config(): Promise<void> {
        this.app.set('port', PORT);
        this.app.use(morgan(ENVIRONMENT));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    connectDB(): void {
        this.db = new DB();
    }

    routes(): void {
        const routes = new Routes();
        this.app.use(BASE_URL_PATH, routes.router);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => console.log(`backend nodeJs is running in http://${HOST}:${PORT}`));
    }
}

const connect = new Server();
connect.start();
