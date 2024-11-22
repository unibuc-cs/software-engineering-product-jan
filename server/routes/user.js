const router = require("express").Router();
const { createUser,getUsers, getUser,updateStats } = require("../controllers/userController");

//server base route : api/user/
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id/stats", updateStats);





module.exports = router;