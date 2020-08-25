import { connect, connection, ConnectionOptions, set } from 'mongoose';

export default class DB {
    private readonly dbURI: string;

    private dbOptions: {} = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    constructor() {
        const { DB_PROTOCOL, DB_HOST, DB_PORT, DB_DATABASE, DB_OPTIONS } = process.env;

        const _protocol = DB_PROTOCOL || 'mongodb';
        const _port = DB_PORT ? `:${DB_PORT}` : '';
        const _options = DB_OPTIONS ? `?${DB_OPTIONS}` : '';

        this.dbURI = `${_protocol}://${DB_HOST}${_port}/${DB_DATABASE}${_options}`;
        this.init();
    }

    async init(): Promise<void> {
        this.listening();
        await this.connect();
    }

    public async connect(): Promise<void> {
        console.log(this.dbURI);
        const { DB_USER, DB_PASSWORD, DB_MAX_POOL_SIZE, NODE_ENV } = process.env;
        const poolSize = DB_MAX_POOL_SIZE ? parseInt(DB_MAX_POOL_SIZE) : 2;

        if (NODE_ENV !== 'production') {
            set('debug', function(coll: string, method: string, query: object, doc: object) {
                console.log(
                    'MongoDB query',
                    `\n\t[collection]: ${coll}`,
                    `\n\t[method]: ${method}`,
                    `\n\t[query]: ${JSON.stringify(query)}`,
                    `\n\t[document]: ${JSON.stringify(doc)}`
                );
            });
        }

        const options: ConnectionOptions = {
            ...this.dbOptions,
            user: DB_USER,
            pass: DB_PASSWORD,
            poolSize: poolSize,
        };

        let connection;
        do {
            try {
                connection = await connect(
                    this.dbURI,
                    options
                );
            } catch (e) {
                console.log('error DB');
                console.log(e);
            }
        } while (!connection);
    }

    public listening(): void {
        connection.on('connecting', () => {
            console.log('connecting to Database...');
        });

        connection.on('error', async (error: Error) => {
            console.error('Error in Database connection: ' + error);
        });

        connection.on('connected', () => {
            console.log(`Database ${process.env.DB_DATABASE} connected in ${process.env.DB_HOST}`);
        });

        connection.once('open', () => {
            console.log('Database connection opened!');
        });

        connection.on('reconnected', () => {
            console.log('Database reconnected!');
        });

        connection.on('disconnected', () => {
            console.log('Database disconnected!');
        });
    }
}
