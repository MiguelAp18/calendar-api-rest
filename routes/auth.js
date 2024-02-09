/*
    Routes of Users / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();



router.post(
    '/new', 
    [ // middlewares
        check('name', 'The name is mandatory').not().isEmpty(),
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'The password must have 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    createUser 
);

router.post(
    '/',
    [
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'The password must have 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser 
);


router.get('/renew', validateJWT ,revalidateToken );




module.exports = router;