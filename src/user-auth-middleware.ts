import { Request, Response, NextFunction } from 'express';

import { URL } from 'core/url';
import { axiosInstance } from 'network/http';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.cookie) {
    delete axiosInstance.defaults.headers.common.cookie;
  } else {
    axiosInstance.defaults.headers.common = {
      ...axiosInstance.defaults.headers.common,
      cookie: req.headers.cookie,
    };
  }

  if (
    !req.headers.cookie &&
    Object.values(URL).find((url) => url.protected && url.path === req.url)
  ) {
    res.redirect(URL.SIGNIN.path);
    return;
  }

  next();
};
