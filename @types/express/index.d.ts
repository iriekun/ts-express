// must be <module-name>/index.d.ts
declare namespace Express {
  export interface Request {
    user: any;
  }
}
