const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const {id, name, email, photo} = req.body.user;

  try {
    let user = await User.findOne({id})

    if(!user){
      user = new User({
        id,
        name,
        email,
        avatar: photo
      });
      await user.save();
    }

    res.status(200).json({message: 'Login successfully', user});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
})

module.exports = router;
