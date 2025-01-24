const { getUserFriends, addFriend, deleteFriend, sendTaskToFriend } = require("../controllers/friendsController.js");


//server base route : api/friends/


const router = require("express").Router();

router.get("/:id", getUserFriends);
router.post("/:id", addFriend);
router.delete("/:id", deleteFriend);
router.put("/sendTask", sendTaskToFriend);

module.exports = router;
