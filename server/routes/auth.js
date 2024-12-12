const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const {id, name, email, photo} = req.body.user;

  try {
    let user = await User.findOne({id})

    if(user) {
      console.log('user already exists', user)
      return res.status(200).json({message: 'user already exists', user: user})
    }

      const newUser = new User({
        id,
        name,
        email,
        avatar: photo
      });
      await newUser.save();

    res.status(201).json({message: 'Login successfully', newUser});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
})

module.exports = router;
