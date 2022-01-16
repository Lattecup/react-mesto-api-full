const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUserById, getMyProfile, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/me', getMyProfile);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar:
      Joi.string().pattern(/(http|https):\/\/(.www)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/),
  }),
}), updateUserAvatar);

module.exports = router;
