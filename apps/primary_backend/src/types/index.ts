import  type {Request, Response, NextFunction } from "express"

 
export  type async_handler = (req: Request, res: Response, next: NextFunction) => Promise<type_for_responce | any>


export type tread_data = {
  symbol: string;
  price: number;
  quantity: number;
}

export type type_for_responce = {
  statuscode: number;
  data: object | null;
  message: string;
  success?: boolean;
  error?: Error | [];
  stack ?: string | null
};