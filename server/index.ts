import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import CreateHttpError from "http-errors";
import swaggerUi from "swagger-ui-express";
import { ConfigServer } from './types/config.server';
import Logger from './libs/logger'
import MorganMiddleware from './middleware/morgan.middleware'
import Router from './routes';


class Server {
    server: Express;

    constructor() {
        this.server = express();
    }

    setup = ( config: ConfigServer) => {
        this.server.set('env', config.env);
        this.server.set('hostname', config.hostname);
        this.server.set('port', config.port);

        this.server.use(MorganMiddleware);

        // Then pass these options to cors:
        const allowedOrigins = ['http://localhost:3000'];
        const options: cors.CorsOptions = {
            origin:  allowedOrigins
        };
        this.server.use(cors(options));

        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false}));
        this.server.use(cookieParser());
        this.server.use(express.static("public"));

        this.server.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
            url: "/swagger.json",
            },
        })
        );

        this.server.use('/', Router);

        this.server.use((req, res, next) => {
          next(CreateHttpError(404));
        });
    
        this.server.use((err: { message: any; status: any; }, 
                        req: express.Request,
                        res: express.Response,
                        next: express.NextFunction  ) => {
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
          res.status(err.status || 500);
          res.render('error');
        });
    }

    start = () => {
        let hostname = this.server.get('hostname');
        let port = this.server.get('port');
        this.server.listen(port, () => {
            Logger.debug(`Express server listening on  - http://${hostname}:${port}`);
        });
    } 
    
}

export default new Server();