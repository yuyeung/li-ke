import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as morgan from 'koa-morgan';
import * as koaStatic from 'koa-static-cache';
import * as validate from 'koa-validate';
import * as path from 'path';
import errorHandler from './middleware/errorHandler';
import model from './model';
import api from './router/api';

const app = new Koa();

// logger
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));

// error handler
app.use(errorHandler);

// params binding and validation
app.use(koaBody({
  formLimit: 10 * 1024 * 1024,
  formidable: {
    keepExtensions: true,
    maxFieldsSize: 10 * 1024 * 1024,
  },
  multipart: true,
}));
validate(app);

// static files
app.use(koaStatic(path.resolve(__dirname, '..', 'public'), {
  dynamic: true,
  prefix: '/static',
  preload: false,
}));

// tslint:disable-next-line
model; // To init sequelize and load models.

// routes
app
  .use(api.routes())
  .use(api.allowedMethods());

export default app;
