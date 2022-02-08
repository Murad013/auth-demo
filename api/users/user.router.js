//This file just includes the routes for each of the endpoints

const {createUser,getUserByUserId,getUsers,updateUser,deleteUser,login,logout} = require('./user.controller');
const router = require('express').Router();
const {checkToken} = require('../../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/:id', checkToken, getUserByUserId);
router.get('/', checkToken, getUsers);
router.patch('/', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login',login); //Shouldn't require token here because you will give it to the browser AFTER logging in
//router.get('/logout',logout);

module.exports = router;