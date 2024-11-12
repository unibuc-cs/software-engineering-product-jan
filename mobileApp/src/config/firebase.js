import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyArqKXXoiJz_wWVucQJLy8nqYeEcMsQKwg",
    authDomain: "questify-5ec23.firebaseapp.com",
    projectId: "questify-5ec23",
    storageBucket: "questify-5ec23.firebasestorage.app",
    messagingSenderId: "764084079201",
    appId: "1:764084079201:web:d7bf3bd2f723ba45f0f820",
    measurementId: "G-4BY65LZSPK"
};

// Ensure Firebase is only initialized once
let app;
let auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} else {
    app = getApp();
    auth = getAuth(app);
}

export { app, auth };
