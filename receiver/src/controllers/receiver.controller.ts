import {Request, Response} from 'express';
import USERMODEL from '../models/user.model';
import KEYMODEL from '../models/key.model';
import generateApiKey from '../utils/generate-api-key';
import hashApiKey from '../utils/hash-api-key';

export async function register(req: Request, res: Response): Promise<void> {
  if (!requestVerification(req, res)) return;
  const {email, projectName} = req.body;

  try {
    const user = await USERMODEL.create({email, projectName});
    const newKey = generateApiKey();
    await KEYMODEL.create({
      userId: user._id,
      key: hashApiKey(newKey),
    });

    res.status(201).json({key: newKey});
  } catch (error: any) {
    console.error(error.message);
    if (error.code === 11000) {
      res.status(400).json({message: 'User already exists'});
      return;
    }
    res.status(500).json({message: 'Internal server error'});
  }
}

const requestVerification = (req: Request, res: Response): boolean => {
  const {email, projectName} = req.body;

  if (!email || !projectName) {
    res
      .status(400)
      .json({message: 'Please specify an email and a project name'});
    return false;
  }

  if (typeof email !== 'string' || typeof projectName !== 'string') {
    res.status(400).json({message: 'Invalid email or project name'});
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({message: 'Invalid email'});
    return false;
  }

  return true;
};
