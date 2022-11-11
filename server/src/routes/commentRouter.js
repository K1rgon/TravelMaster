const express = require('express');
const { Comment, User } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, message } = req.body;
  if (message.text !== '') {
    const newComment = await Comment.create({
      text: message.text,
      user_id: message.user_id,
      route_id: id,
    });
    newComment.save();
  }
  const allComment = await Comment.findAll({
    where: {
      route_id: id,
    },
    include: User,
  });
  res.json(allComment);
});

module.exports = router;
