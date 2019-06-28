import { Router } from 'express';

const router = Router();

let veggies = [
    { name: 'asparagus' },
    { name: 'carrot' },
    { name: 'spinach' }
];

router.get('/', (req, res) => {
    res.render('partials/veggies/list', {
        title: 'veggie list',
        veggies
    });
});


router.get('/details/:name', function (req, res) {
    res.render('partials/veggies/details', {
        title: 'Veggie Details',
        veggie: req.params.name,
    });
});


router.get('/explicit', (req, res) => {
    res.render('partials/veggies/list', {
        title: 'veggie list',
        veggies,
        layout: 'views/templates/defaultExplicit'
    });
});

export default router;