import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('partials/common/dashboard', {
        title: 'Dashboard'
    });
});

export default router;