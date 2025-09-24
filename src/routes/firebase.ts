// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: 'AIzaSyC-vjiFNwNsP8d-tx-KzigMPvUSLt9EPks',
	authDomain: 'see-word-count.firebaseapp.com',
	projectId: 'see-word-count',
	storageBucket: 'see-word-count.firebasestorage.app',
	messagingSenderId: '734685838265',
	appId: '1:734685838265:web:b4c3a331acefb43a2b5468',
	measurementId: 'G-BEDS63TE48'
};

// Initialize Firebase and its services
const app = initializeApp(firebaseConfig);

let analytics: ReturnType<typeof getAnalytics> | null = null;
let performance: ReturnType<typeof getPerformance> | null = null;

if (browser) {
	analytics = getAnalytics(app);
	performance = getPerformance(app);
}

export { app, analytics, performance };
