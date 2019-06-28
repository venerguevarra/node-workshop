import { Router } from 'express';
import __debug from 'debug';
import uuidv4 from 'uuid/v4';
import { check, validationResult } from 'express-validator';


const debug = __debug('app:routes:user');
const router = Router();

router.get('/', (req, res) => {
    try {
        if(req.context.models.users) {
            res.status(200).json(req.context.models.users);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(500).json({ message: error.toString(), status: 'error' });
    }
});

router.get('/:id', function (req, res) {
    try {
        let id = req.params.id;
        let existingUser = req.context.models.users.find(i => i.id == id);
        if (existingUser) {
            res.status(200).json(existingUser);
        } else {
            res.status(404).json({ message: `user_${id}_not_found`, status: 'resource_not_found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.toString(), status: 'error' });
    }
});

router.post('/', [
  check('username').isEmail().withMessage('username must be an email'),
  check('firstName').isLength({ min: 5, max: 50 }).withMessage('firstName length must be between 5 and 50'),
  check('lastName').isLength({ min: 5, max: 50 }).withMessage('lastName length must be between 5 and 50')
], (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = uuidv4();
        const user = {
            id,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        req.context.models.users.push(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.toString(), status: 'error' });
    }
});

router.put('/:id', function (req, res) {
    try {
        let id = req.params.id;
        let existingUser = req.context.models.users.find(i => i.id == id);
        if (existingUser) {
            let existingUsers = req.context.models.users.filter(i => i.id != id);
            let updatedUser = {
                id,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };
            existingUsers.push(updatedUser);

            req.context.models.users = existingUsers;
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: `user_${id}_not_found`, status: 'resource_not_found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.toString(), status: 'error' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        let id = req.params.id;
        let existingUser = req.context.models.users.find(i => i.id == id);
        if (existingUser) {
            const {
                [req.params.id]: user,
                ...otherUsers
            } = req.context.models.users;

            req.context.models.users = otherUsers;
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `user_${id}_not_found`, status: 'resource_not_found' });
        }

    } catch(error) {
        res.status(500).json({ message: error.toString(), status: 'error' });
    }
});


export default router;