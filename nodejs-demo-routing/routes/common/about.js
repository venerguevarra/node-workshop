import { Router } from 'express';
const router = Router();

router.get('/', (request, response) => {
    response.render('partials/common/about', {
        title: 'About Us'
    });
});

export default router;