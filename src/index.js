const createApp = require('./createApp');
const createWs = require('./createWs');

const port = 3030;
const wsPort = 5000;

const app = createApp(port);
createWs(app, wsPort);
