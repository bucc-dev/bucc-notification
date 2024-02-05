import {Request, Response} from 'express';
import USERMODEL from '../models/user.model';
import KEYMODEL from '../models/key.model';
import {randomBytes, createHash} from 'crypto';

/**
 * Registers a new user and returns an API key
 * @param {Request} req
 * @param {Response} res
 * @returns Promise<void>
 */
export async function register(req: Request, res: Response): Promise<void> {
  if (!requestVerification(req, res)) return;
  const {email, projectName} = req.body;

  try {
    const user = await USERMODEL.create({email, projectName});
    const newKey = await KEYMODEL.create({
      userId: user._id,
      key: randomBytes(32).toString('hex'),
    });

    res.status(201).json({key: hashFunction(newKey.key)});
  } catch (error: any) {
    console.error(error.message);
    if (error.code === 11000) {
      res.status(400).json({message: 'User already exists'});
      return;
    }
    res.status(500).json({message: 'Internal server error'});
  }
}

const hashFunction = (key: string): string => {
  return createHash('sha256').update(key).digest('hex');
};

/**
 * Verifies the request body
 * @param {Request} req
 * @param {Response} res
 * @returns {boolean} true if the request is valid, false otherwise
 */
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
