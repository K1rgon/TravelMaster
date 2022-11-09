const express = require('express');
const { Comment } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, message } = req.body;
  console.log(id, message);
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
  });
  res.json(allComment);
});

module.exports = router;
