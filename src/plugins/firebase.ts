import firebase from 'firebase';
import { VueConstructor } from 'vue';
import * as firebaseui from 'firebaseui';

declare module 'vue/types/vue' {
    interface Vue {
        $firebase: firebase.app.App;
        $firestore: firebase.firestore.Firestore;
        $storage: firebase.storage.Storage;
        $auth: firebase.auth.Auth;
        $ui: firebaseui.auth.AuthUI;
        $functions: firebase.functions.Functions;
    }
}

const firebaseConfig = {
    apiKey: 'AIzaSyBLndwQkXf9rqkhZ7-xUsLsFLXyEjtzWpY',
    authDomain: 'monportail-test.firebaseapp.com',
    databaseURL: 'https://monportail-test.firebaseio.com',
    projectId: 'monportail-test',
    storageBucket: 'monportail-test.appspot.com',
    messagingSenderId: '126796368333',
    appId: '1:126796368333:web:1c9ed7d646425755d21c84',
    measurementId: 'G-9X57FKCVLQ'
};

export default {
    install(Vue: VueConstructor) {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        const firebaseAuth = firebaseApp.auth();
        const firestore = firebaseApp.firestore();
        const storage = firebaseApp.storage();
        const functions = firebaseApp.functions();
        firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

        if (location.hostname === 'localhost') {
            firestore.useEmulator('localhost', 8084);
            storage.useEmulator('localhost', 9199);
            functions.useEmulator('localhost', 5001);
        }

        Vue.prototype.$firebase = firebaseApp;
        Vue.prototype.$firestore = firestore;
        Vue.prototype.$storage = storage;
        Vue.prototype.$auth = firebaseAuth;
        Vue.prototype.$functions = functions;
        Vue.prototype.$ui = new firebaseui.auth.AuthUI(firebaseAuth);
    }
};
