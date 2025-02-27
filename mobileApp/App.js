import React from "react";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AuthContextProvider,
  useAuthContext,
} from "./src/contexts/auth.context";
import { SuggestionsProvider } from "./src/contexts/suggestions.context.jsx";
import Navbar from "./src/components/Navbar";
import LoadingScreen from "./src/screens/LoadingScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import JourneyScreen from "./src/screens/JourneyScreen";
import HomeScreen from "./src/screens/HomeScreen";
import QuestsScreen from "./src/screens/QuestsScreen";
import TasksScreen from "./src/screens/TasksScreen";
import TaskCreationScreen1 from "./src/screens/CreateTaskWelcomeScreen.js";
import NewTaskCreation from "./src/screens/NewTaskCreation.js";
import NewRecurrentTask from "./src/screens/NewRecurrentTask.js";
import NewHabitCreation from "./src/screens/NewHabitCreation.js";
import SuggestionsScreen from "./src/screens/SuggestionsScreen";
import TaskScreen from "./src/screens/SingularActivityInfoScreen.js";
import LoginScreen from "./src/screens/LoginScreen";
import { TasksContextProvider } from "./src/contexts/tasks.context.jsx";
import OnboardingScreen from "./src/screens/OnboardingScreen.js";
import BuddiesScreen from "./src/screens/BuddiesScreen.js";
import AddBuddiesScreen from "./src/screens/AddBuddiesScreen.js";
import AddCharacterScreen from "./src/screens/AddCharacterScreen.js";
import SendChallengeScreen from "./src/screens/SendChallengeScreen.js";
import EditHabitScreen from "./src/screens/EditHabitScreen.js";
import EditRecurrentTaskScreen from "./src/screens/EditRecurrenttaskScreen.js";
import EditTaskScreen from "./src/screens/EditTaskScreen.js";
import {
  FriendsContext,
  FriendsContextProvider,
} from "./src/contexts/friends.context.jsx";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { isLoading, user, logout } = useAuthContext();
  const routes = useNavigationState((state) => state?.routes || []);
  const currentRoute = routes[routes.length - 1]?.name;

  if (isLoading) {
    return <LoadingScreen />;
  }

  const shouldShowNavbar =
    currentRoute !== "Login" &&
    currentRoute !== "Register" &&
    currentRoute !== "Onboarding";
  currentRoute !== "Login" &&
    currentRoute !== "Register" &&
    currentRoute !== "Onboarding";

  return (
    <>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quests"
              component={QuestsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Journey"
              component={JourneyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OngoingTasks"
              component={TasksScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TasksMenu1"
              component={TaskCreationScreen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewTaskCreation"
              component={NewTaskCreation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewHabitCreation"
              component={NewHabitCreation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewRecurrentTask"
              component={NewRecurrentTask}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Suggestions"
              component={SuggestionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Task"
              component={TaskScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Buddies"
              component={BuddiesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddBuddies"
              component={AddBuddiesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddCharacter"
              component={AddCharacterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SendChallenge"
              component={SendChallengeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditTask"
              component={EditTaskScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditHabit"
              component={EditHabitScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditRecurrentTask"
              component={EditRecurrentTaskScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      {shouldShowNavbar && user && <Navbar />}
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <FriendsContextProvider>
        <TasksContextProvider>
          <SuggestionsProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </SuggestionsProvider>
        </TasksContextProvider>
      </FriendsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
