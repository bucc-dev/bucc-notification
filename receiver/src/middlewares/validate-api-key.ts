import { Request, Response, NextFunction } from 'express';
import KEYMODEL from '../models/key.model';

async function validateApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
  const apiKey: string | undefined = req.headers['api-key'] as string;

  if (!apiKey) {
    res.status(401).json({ error: 'API key is missing' });
    return;
  }

  try {
    const keyDocument = await KEYMODEL.findOne({ key: apiKey, status: 'active' });

    if (!keyDocument) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }


    next();
  } catch (error) {
    console.error('Error validating API key:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
}

export default validateApiKey;
