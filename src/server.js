import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { env } from './utils/env.js';

import {
  getAllWaterTracker,
  getWaterTrackerById,
} from './services/waterTracker.js';

const PORT = env('PORT');

export const startServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(cors());
  app.use(logger);
  app.use(express.json());

  // routes
  app.get('/waterTracker', async (req, res) => {
    try {
      const data = await getAllWaterTracker();

      res.json({
        status: 200,
        message: `Seccessfully found waterTracker`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  app.get('/waterTracker/id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = await getWaterTrackerById(id);

      if (!id) {
        return res.status(404).json({
          message: `waterTracker with id: ${id} not found`,
        });
      }

      res.json({
        status: 200,
        message: `WaterTracker with id: ${id} was seccessfully found`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
    next();
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
};
