import { Request, Response, NextFunction } from 'express';

import { URL } from 'core/url';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.cookies.authCookie &&
    Object.values(URL).find((url) => url.protected && url.path === req.url)
  ) {
    res.redirect(URL.SIGNIN.path);
    return;
  }

  next();
};
