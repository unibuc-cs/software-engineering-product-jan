const  {taskRecommender} = require("../services/taskRecommender");

const router = require("express").Router();

// GET /api/recommender/
const getTaskSuggestions = async (req, res) => {

    const db = req.app.locals.db;
    const id = req.params.id;
    console.log("Getting task suggestions");

    const suggestions = await taskRecommender(id, db);
    res.status(200).json(suggestions);
}

router.get("/:id", getTaskSuggestions);

module.exports = router;