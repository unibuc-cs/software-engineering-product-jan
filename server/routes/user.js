const router = require("express").Router();
const { createUser,getUsers, getUser } = require("../controllers/userController");


//server base route : api/user/



router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);





module.exports = router;