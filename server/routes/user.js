const router = require("express").Router();
const { createUser,getUsers, getUser,updateStats,suggestUserTask} = require("../controllers/userController");


//base route : api/user/


router.post("/", createUser);

router.get("/recommend", suggestUserTask);

// Place dynamic routes like `/:id` before generic ones like `/`
router.get("/:id", getUser);

router.put("/stats/:id", updateStats);

// Generic route should come last to avoid conflicts
router.get("/", getUsers);


module.exports = router;