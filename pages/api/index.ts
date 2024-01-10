import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    
    res.status(400).json({error: 'Invalid api Request'})
    
}