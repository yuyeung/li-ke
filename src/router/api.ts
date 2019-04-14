import * as koaBody from 'koa-body';
import * as Router from 'koa-router';

import * as prototype from '../controller/prototype';
import * as published from '../controller/published';
import * as teacher from '../controller/teacher';
import auth from '../middleware/auth';

const router = new Router();
router.prefix('/api');
router.put('/teachers', auth, teacher.update);
router.put('/published/:id', auth, published.update);
router.delete('/published/:id', published.destroy);
router.get('/published/:id', published.findOne);
router.get('/published', auth, published.findAll);
router.post('/prototypes', auth, prototype.create);
router.put('/prototypes/:id', auth, prototype.update);
router.del('/prototypes/:id', auth, prototype.remove);
router.get('/prototypes/:id', auth, prototype.getMessage);
router.get('/prototypes', prototype.getList);

export default router;
