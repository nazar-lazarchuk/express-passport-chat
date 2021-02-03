const express = require('express');
const router = express.Router();

const WebSocket = require('ws');
const wss = require('../createWs');

const { MessageModel } = require('../models/message');
const { messageSelector } = require('../selectors/message');

router.post('/create', async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body.content || typeof req.body.content !== 'string')
    return res.sendStatus(400);

  const {
    user: { _id: userId },
  } = req;
  const { content } = req.body;

  const messageObj = await MessageModel.create({ userId, content });

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: 'message_created',
          data: messageSelector(messageObj),
        })
      );
    }
  });

  return res.send(messageSelector(messageObj));
});

router.patch('/update', async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body._id || typeof req.body._id !== 'string')
    return res.sendStatus(400);
  if (!req.body.content || typeof req.body.content !== 'string')
    return res.sendStatus(400);

  const {
    user: { _id: userId },
    body: { _id, content },
  } = req;

  const messageObj = await MessageModel.findOne({ _id, userId });
  if (!messageObj) return res.sendStatus(404);

  if (messageSelector(messageObj).content === content) {
    return res.send(messageSelector(messageObj));
  }

  await MessageModel.updateOne(
    { _id },
    {
      $set: {
        content,
      },
    }
  );

  const updatedMessage = await MessageModel.findOne({ _id, userId });

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: 'message_updated',
          data: messageSelector(updatedMessage),
        })
      );
    }
  });

  return res.send(messageSelector(updatedMessage));
});

module.exports = router;
