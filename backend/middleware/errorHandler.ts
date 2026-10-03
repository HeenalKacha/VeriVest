import type { NextFunction, Request, Response } from 'express';

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Backend error:', error.message);
  res.status(500).json({
    success: false,
    error: 'Backend processing failed. Please check the request data and try again.',
  });
}
