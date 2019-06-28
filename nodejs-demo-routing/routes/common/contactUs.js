import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('partials/common/contact_us', {
        title: 'Contact Us'
    });
});


export default router;