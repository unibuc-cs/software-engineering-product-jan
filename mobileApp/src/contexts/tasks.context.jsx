import { useContext, createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./auth.context";

export const TasksContext = createContext({});

export const useTasksContext = () => {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return tasksContext;
};

export const TasksContextProvider = ({ children }) => {

  const { user } = useAuthContext();

  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [recurrentTasks, setRecurrentTasks] = useState([]);

  const getAllUserActivities = async () => {
  //  console.log("User", user);
    try {
      const response = await axios.get(
        `http://192.168.50.156:4000/api/activities/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    //  console.log("Activities response:", response.data); // Log the response
      setActivities(response.data);
      filterByType();
      return response.data;
    } catch (error) {
      console.log(
        "Error fetching user activities:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filterByType = () => {

    setHabits(activities.filter((activity) => activity.type === "habit"));
    setRecurrentTasks(
      activities.filter((activity) => activity.type === "reccuring")
    );
    setTasks(activities.filter((activity) => activity.type === "one-time"));

  }



  /*

  Activity structure:

  // activities collection schema
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


  const createNewActivity = async (activity) => {
    try {
      const response = await axios.post(
        `http://192.168.50.156:4000/api/activities`,
        activity,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create activity response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error creating activity:",
        error.response ? error.response.data : error.message
      );
    }
  }


  const deleteActivity = async (activityId) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.6:4000/api/activities/${activityId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete activity response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log(
        "Error deleting activity:",
        error.response ? error.response.data : error.message
      );
    }
  }

  //expected changes structure: [{ "field1": "value1", "field2": "value2", ... }] 
  const editActivity = async (activityId, changes = {}) => {

    try {
      const response = await axios.put(
        `http://192.168.10.3:4000/api/activities/${activityId}`,
        changes,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Edit activity response:", response.data); // Log the response
      return response.data;

  }
  catch (error) {
    console.log(
      "Error editing activity:",
      error.response ? error.response.data : error.message
    );
  }

}


const completeActivity = async (activityId, isDone) => {
  try {
    const response = await axios.put(
      `http://192.168.50.156:4000/api/activities/complete/${activityId}`,
      { parameter: isDone ? "done" : "undone" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Update local state after completion
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId ? { ...activity, done: isDone } : activity
      )
    );
  } catch (error) {
    console.log(
      "Error completing activity:",
      error.response ? error.response.data : error.message
    );
  }
};


  //stats object : { "creativity": "value1", "inteligence": "value2", ... }

  const increaseStats = async (stats = {}) => {
    try {
      const response = await axios.put(
        `http://192.168.1.11:4000/api/user/stats/${user.uid}`,
        stats,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Increase stats response:", response.data); 
    } catch (error) {
      console.log(
        "Error increasing stats:",
        error.response ? error.response.data : error.message
      );
    }
  }


  const state = {
    activities,
    tasks,
    habits,
    recurrentTasks,
    createNewActivity,
    getAllUserActivities,
    deleteActivity,
    editActivity,
    completeActivity,
    increaseStats
  };

  return (
    <TasksContext.Provider value={state}>{children}</TasksContext.Provider>
  );
};
