import firebase from 'firebase'

export const app = 'chat'
let config = {
    apiKey: "AIzaSyDwdVu82MGlwZk-cj5yJeC_aH8jd8peORA",
    authDomain: "chat-9e391.firebaseapp.com",
    databaseURL: "https://chat-9e391.firebaseio.com",
    projectId: "chat-9e391",
    storageBucket: "chat-9e391.appspot.com",
    messagingSenderId: "508176079755"
};

firebase.initializeApp(config)

