import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

class MusicDB {
    constructor() {
        this.db = null,
            this.isAvailable = false
    }

    open() {
        return new Promise((resolve, reject) => {
            try {
                const firebaseConfig = {
                    apiKey: "AIzaSyBbOtFqcRRMPhM4RlUYdTC_VRTmdeULLJw",
                    authDomain: "music-app-606f7.firebaseapp.com",
                    projectId: "music-app-606f7",
                    storageBucket: "music-app-606f7.appspot.com",
                    messagingSenderId: "628047394333",
                    appId: "1:628047394333:web:56984df820b9bf1afd78f4"
                };

                // Initialize Firebase
                const app = initializeApp(firebaseConfig);

                // Initialize Cloud Firestore and get a reference to the service
                const db = getFirestore(app)
                if (db) {
                    this.db = db;
                    this.isAvailable = true
                    resolve()
                } else {
                    reject('DB is not Available')
                }
                console.log('Open DB:',)
            }
            catch (error) {
                reject(error.message)
            }
        })
    }

    add(artist, numberOfLikes, title) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject("Database not opened")
            }
            // Create the song object to be added

            const song = {
                artist: artist,
                numberOfLikes: numberOfLikes,
                title: title
            }

            // Connect to the Firebase collection  
            const dbCollection = collection(this.db, "MusicApp")

            //  Include the new object to the collection
            addDoc(dbCollection, song)
                .then((docRef) => {
                    console.log('Firebase saved', docRef.id)
                    resolve()
                })
                .catch((error) => {
                    reject(error.message)
                })
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened');
            }

            // Connects to the Firebase collection.
            const dbCollection = collection(this.db, 'MusicApp')

            // Gets the date from the collection
            getDocs(dbCollection)
                .then((querySnapShot) => {
                    const result = [];
                    querySnapShot.forEach((doc) => {
                        const data = doc.data()
                        data.id = doc.id  //include id into the data oblect
                        result.push(data)
                    });
                    resolve(result);
                })
                .catch((error) => {
                    reject(error.message)
                })
        })
    }

    update(updateSong) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject("Database not found")
            }
            // Get the document reference
            const docRef = doc(this.db, 'MusicApp', updateSong.id)

            // Update the document
            updateDoc(docRef, { numberOfLikes: updateSong.numberOfLikes })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error.message)
                })
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable) {
                reject('Database not opened!')
            }

            // Get the document reference
            const docRef = doc(this.db, 'MusicApp', id)

            // Delete the document
            deleteDoc(docRef)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error.message)
                })

        })
    }

}
export default new MusicDB();