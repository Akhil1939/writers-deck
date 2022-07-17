const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // const newUser = new User(req.body)
    const newUser = new User({
      username: req.body.username,  
      email: req.body.email,
      password: hashPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
   console.log(err)
  }
});

// Login..

router.post("/login", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid Details");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Invalid Details");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
