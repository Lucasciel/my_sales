//AQUI FICARA O TRATAMENTO DE ERROS GLOBAIS DA APLICAÇÃO

import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

class ErrorHandleMiddleware {
  public static haddleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      type: "error",
      message: "Erro interno no servidor",
    });
  }
}

export default ErrorHandleMiddleware;
