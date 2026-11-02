const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to enable CORS
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Random Ideas API' });
});

const ideasRouter = require('./router/ideas');
app.use('/api/ideas', ideasRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(
      'Failed to start the server because MongoDB could not be reached.',
    );
    if (error.code === 'ECONNREFUSED' && error.syscall === 'querySrv') {
      console.error(
        `DNS refused the SRV lookup for ${error.hostname}. Check your network and DNS settings.`,
      );
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
};

startServer();
