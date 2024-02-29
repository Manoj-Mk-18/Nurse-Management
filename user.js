const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")



 router.get("/", userController.view);
 router.post("/", userController.find);


 router.get("/adduser", userController.adduser);
 router.post("/adduser", userController.save);


router.get("/edituser/:id", userController.edituser);
router.post("/edituser/:id", userController.edit);


router.get("/deleteuser/:id", userController.delete);

 module.exports = router;
