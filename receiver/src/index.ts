require('dotenv').config();

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import appRoutes from './routes/reciever.routes';

const app = express();

const environment = process.env.NODE_ENV;
const DB_URI =
  environment === 'production'
    ? process.env.DB_URI_PROD
    : environment === 'staging'
    ? process.env.DB_URI_STAGING
    : process.env.DB_URI_LOCAL || 'mongodb://localhost:27017';

// register middlewares
const maxNumberOfProxies = 1; // the nginx proxy
app.set('trust proxy', maxNumberOfProxies);
app.use(cors());
app.use(compression());
app.use(express.json());

const PORT = process.env.PORT || 6000;

async function main() {
  console.log('Connecting to database...');
  await mongoose.connect(DB_URI as string);
  console.log('Connected to database');

  console.log('Registering routes...');
  app.use('', appRoutes);

  app.all('*', (_, res) => {
    res.status(404).json({message: 'Route not found'});
  });
  console.log('Registered routes');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch(err => {
  console.error(err);
});
