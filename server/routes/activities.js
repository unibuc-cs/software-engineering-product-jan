const { getUserActivities, createActivity, deleteActivity } = require("../controllers/taskController");


//server base route : api/activities/


const router = require("express").Router();

router.get("/:id", getUserActivities);
router.post("/", createActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
