import { Router } from 'express';
import models from '../models';
import config from '../config';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(new models.gtg(config.environment, config.version));
});

export default router;