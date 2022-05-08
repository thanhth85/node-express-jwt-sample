
import { ServerConfig } from './config/server.config'
import server from './server';
const config = ServerConfig;

server.setup(config.development);
server.start();