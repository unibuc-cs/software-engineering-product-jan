async function getUserActivities(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const activities = [];
    const activitiesRef = db.collection("activities");

    try {
        const snapshot = await activitiesRef.where("user_id", "==", id).get();
        
        snapshot.forEach((doc) => {
            activities.push(doc.data());
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(activities);
}


async function createActivity(req, res) {
    const db = req.app.locals.db;
    const { user_id, name, points, date } = req.body;
    const activitiesRef = db.collection("activities");
    const activity = {
        user_id,
        name,
        points,
        date
    };

    try {
        await activitiesRef.add(activity);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "Activity created" });
}


async function deleteActivity(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        await db.collection("activities").doc(id).delete();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Activity deleted" });
}


module.exports = {
    getUserActivities,
    createActivity,
    deleteActivity
}