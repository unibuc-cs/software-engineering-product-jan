const { getUserActivities, createActivity, deleteActivity, editActivity, completeActivity } = require("../controllers/taskController");


//server base route : api/activities/


const router = require("express").Router();

router.get("/:id", getUserActivities);
router.post("/", createActivity);
router.delete("/:id", deleteActivity);
router.put("/:id", editActivity);
router.put("/complete/:id", completeActivity);

module.exports = router;
