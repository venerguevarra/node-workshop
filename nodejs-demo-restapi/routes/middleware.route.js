import { Router } from 'express';
import __debug from 'debug';

const debug = __debug('app:routes:middleware');
const router = Router();

router.get('/', (req, res) => {
    throw new Error("Opps!! Something went wrong");
});

// routing level middleware
router.get('/forbidden', function (req, res, next) {
    let err = new Error('forbidden'); // Sets error message, includes the requester's ip address!
    err.statusCode = 403;
    next(err);
});

// middleware in routing level
router.get("/test", (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
}, (req, res) => {
    res.status(200).json({
        status: true,
        name: req.query.name
    });
})

export default router;