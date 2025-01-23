const  {taskRecommender} = require("../services/taskRecommender");

const router = require("express").Router();

// GET /api/recommender/
const getTaskSuggestions = async (req, res) => {
    console.log("Getting task suggestions");
    const suggestions = await taskRecommender();
    res.status(200).json(suggestions);
}

router.get("/", getTaskSuggestions);

module.exports = router;