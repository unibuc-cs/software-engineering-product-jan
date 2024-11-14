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
    console.log("User", user);
    try {
      const response = await axios.get(
        `http://192.168.1.3:4000/api/activities/${user.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Activities response:", response.data); // Log the response
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



  const createNewActivity = async (activity) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/activities`,
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
        `http://localhost:4000/api/user/activities/${activityId}`,
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


  const state = {
    activities,
    tasks,
    habits,
    recurrentTasks,
    createNewActivity,
    getAllUserActivities,
    deleteActivity
  };

  return (
    <TasksContext.Provider value={state}>{children}</TasksContext.Provider>
  );
};
