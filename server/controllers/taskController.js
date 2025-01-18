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

async function completeActivity(req, res) {


    const db = req.app.locals.db;
    const id = req.params.id;

    const {parameter} = req.body;

    const activityRef = db.collection("activities").doc(id);

    const activity = await activityRef.get();

    if (!activity.exists) {
        return res.status(404).json({ error: "Activity not found" });
    }
    else{
        const activityData = activity.data();
        const date = new Date();
        const timestamp = date.getTime();
        activityData.last_completed_at = timestamp;
        
        if (parameter == "done") {
            activityData.done = true;
        }
        else{
            activityData.done = false;
        }

        try {
            await activityRef.update(activityData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: "Activity completed" });
    }



}

/*

{
  "activity_id": "string",          // Unique identifier for the activity
  "user_id": "string",              // ID of the user who owns the activity
  "title": "string",                // Title of the activity
  "description": "string",          // (Optional) Detailed description
  "type": "string",                 // "one-time" or "recurring"
  "frequency": "integer or null",    // (Optional) Once every how many weeks the recurring tasks / habit happens
  "days_of_the_week": "string or null" // Marks the days of the week a recurring task / habit happens
  "due_date": "timestamp or null",  // (Optional) Specific due date for the activity
  "status": "bool",                 // Current status: done or not
  "from_buddy": "string or null",   // (Optional) ID of the buddy who recommended the activity
  "created_at": "timestamp",        // Timestamp when the activity was created
  "last_completed_at": "timestamp or null", // (Optional) Timestamp of the last completion
  "completion_history": [           // (Optional) Array of completion records
    {
      "date": "timestamp",          // When the activity was completed or skipped
      "status": "string"            // "completed" or "skipped"
    }
    // ... more records
  ],
  "stats": {
		"fitness": "integer",
		"skill": "integer",
		"wellness": "integer",
		"inteligence": "integer",
	},
	"emoji": "string",
}

*/



async function editActivity(req, res) {
    const db = req.app.locals.db;

    const id = req.params.id;

    const {...changes} = req.body;

    console.log(changes);

    const activityFieldsToChange = Object.keys(changes);

    const activity = await db.collection("activities").doc(id).get();

    if (!activity.exists) {
        return res.status(404).json({ error: "Activity not found" });
    }

    const activityData = activity.data();

    activityFieldsToChange.forEach((field) => {
        activityData[field] = changes[field];
    });

    try {
        await db.collection("activities").doc(id).update(activityData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Activity updated" });
}


async function createActivity(req, res) {
    const db = req.app.locals.db;
    const {
      from_app,
      from_buddy,
      type,
      created_at,
      done,
      description,
      title,
      user_id,
      category,
      fitness,
      skill,
      wellness,
      inteligence,
      emoji,
      days_of_the_week,
      due_date,
      week_interval
    } = req.body;

    console.log(req.body);

    const activitiesRef = db.collection("activities");
    
    try {
        // Add the document and get a reference to it
        const docRef = await activitiesRef.add({
            from_app,
            from_buddy,
      type,
      created_at,
      done,
      description,
      title,
      user_id,
      category,
      fitness,
      skill,
      wellness,
      inteligence,
      emoji,
      days_of_the_week,
      due_date,
      week_interval
        });
        
        const newActivityId = docRef.id;

        await docRef.update({ id: newActivityId });

        res.status(200).json({ message: "Activity created", id: newActivityId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
    deleteActivity,
    editActivity,
    completeActivity
}