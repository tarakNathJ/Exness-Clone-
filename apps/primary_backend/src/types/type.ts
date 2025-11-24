import  type {Request, Response, NextFunction } from "express"

 
export  type async_handler = (req: Request, res: Response, next: NextFunction) => Promise<responce_type>


export type responce_type = {
    success: boolean,
    message: string,
    data ?: any,
    error ?: any
    status ?: number
}