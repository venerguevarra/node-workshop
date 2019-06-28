import { Router } from 'express';
const router = Router();

let fruits = [
    { name: 'apple', id: 1, price: 100 },
    { name: 'orange', id: 2, price: 50 },
    { name: 'pear', id:3, price: 65 }
];

// template = default.hbs
router.get('/', (req, res) => {
    res.render('partials/fruits/list', {
        title: 'Fruit List',
        fruits
    });
});

router.get('/:name', function (req, res) {
    res.render('partials/fruits/details', {
        fruit: req.params.name,
        title: 'Fruit Details'
    });
});

export default router;