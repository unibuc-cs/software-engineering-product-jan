import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDgWzwPVeVyASwxIYTAwzba3nEH_68Ztx8",
	authDomain: "gamifylife-810f8.firebaseapp.com",
	projectId: "gamifylife-810f8",
	storageBucket: "gamifylife-810f8.appspot.com",
	messagingSenderId: "202382868927",
	appId: "1:202382868927:web:53776240f2683cb34fa10a",
	measurementId: "G-BKT0TVZ3HX"
};

const app = initializeApp(firebaseConfig);

const lStorage = getReactNativePersistence(AsyncStorage);

const auth = initializeAuth(app, {
	persistence: lStorage
});
