const WebSocket = require('ws');
const passport = require('passport');

const app = require('./app');
const config = require('./env.json');
const port = config.WS_PORT;

const wss = new WebSocket.Server({
  server: app,
  port,
});

wss.on('connection', (ws, req) => {
  // get token from url:  ..url..?token=your_JWT_TOKEN
  const params = require('url').parse(req.url, true).query;
  const { token } = params;

  // add token to headers (could be done on frontend)
  req.headers.authorization = `Bearer ${token}`;

  // look for the user with token
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user, info) => {
      // If no user close websocket
      if (!user) {
        console.log('Websocket disconnected due to invalid token');
        ws.send('Websocket disconnected due to invalid token');
        ws.close();
      }
    }
  )(req);
});

console.log(`Websocket ready on ws://localhost:${port}`);

module.exports = wss;
