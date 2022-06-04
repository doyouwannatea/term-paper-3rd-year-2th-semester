import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
  try {
    res
      .cookie('password', '', {
        maxAge: -1,
        httpOnly: true,
      })
      .cookie('email', '', {
        maxAge: -1,
        httpOnly: true,
      })
      .send({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
