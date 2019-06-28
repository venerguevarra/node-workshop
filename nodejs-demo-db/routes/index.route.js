import { Router } from 'express';
const router = Router();

let data = {
    message: 'hello world'
}
router.get('/', (req, res) => {
    res.json(data);
});

export default router;