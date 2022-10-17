import 'dotenv/config';
import routes from './routes';
import { initializeServer } from './Server';

const startServer = initializeServer(routes);

export default startServer;
