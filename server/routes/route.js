const express = require("express");
const { signin, login } = require("../controllers/user.controller");
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({msg:"hello from server"})
})

router.post("/signin", signin);
router.post("/login", login);

module.exports = router;