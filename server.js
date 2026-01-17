
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { Server } = require('socket.io');
const { nanoid } = require('nanoid');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 9002;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Store transaction data in memory (for prototype purposes)
const transactions = {};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  // API endpoint to create a transaction
  server.post('/api/transaction/create', (req, res) => {
    const { buyerPhone, sellerPhone, description, amount } = req.body;
    
    if (!buyerPhone || !sellerPhone || !description || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transactionId = nanoid(12);
    transactions[transactionId] = {
      description,
      amount,
      buyerPhone,
      sellerPhone,
      createdAt: new Date(),
    };
    
    console.log(`Transaction created: ${transactionId}`, transactions[transactionId]);
    res.status(200).json({ transactionId });
  });

  // API endpoint to get transaction details
  server.get('/api/transaction/:id', (req, res) => {
    const { id } = req.params;
    const transaction = transactions[id];
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  });


  // Socket.io connection handling
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('join-room', (transactionId) => {
      socket.join(transactionId);
      console.log(`Socket ${socket.id} joined room ${transactionId}`);
    });

    socket.on('send-message', ({ transactionId, message, senderId, senderName }) => {
      const messageData = {
        id: nanoid(8),
        text: message,
        senderId,
        senderName,
        timestamp: new Date(),
      };
      io.to(transactionId).emit('receive-message', messageData);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
