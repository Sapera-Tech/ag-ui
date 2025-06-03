/**
 * This file contains type definitions for Express.js to avoid having to install the actual package for development.
 * In a real project, you would install the @types/express package.
 */

export interface Request {
  body: any;
  params: any;
  query: any;
  headers: any;
  on(event: string, callback: (...args: any[]) => void): void;
}

export interface Response {
  status(code: number): Response;
  json(body: any): Response;
  send(body: any): Response;
  setHeader(name: string, value: string): Response;
  write(data: string): boolean;
  end(): void;
}

export interface NextFunction {
  (err?: any): void;
}

export interface Express {
  use(middleware: any): void;
  get(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void;
  post(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void;
  put(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void;
  delete(path: string, handler: (req: Request, res: Response, next?: NextFunction) => void): void;
  listen(port: number, callback?: () => void): void;
  static(path: string): any;
}

export interface CorsOptions {
  origin?: string | string[] | boolean | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

export function express(): Express {
  // This is just a mock function for type checking
  return {} as Express;
}

export function json(): any {
  // This is just a mock function for type checking
  return {};
}

export function cors(options?: CorsOptions): any {
  // This is just a mock function for type checking
  return {};
}

export function serveStatic(path: string): any {
  // This is just a mock function for type checking
  return {};
}