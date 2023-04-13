import { initializeApp } from 'firebase/app'

import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where, orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import{
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBokZ00Ot9fbs1vE1vYpvM22fqxTfh8Zlw",
    authDomain: "budgetapp-98454.firebaseapp.com",
    databaseURL: "https://budgetapp-98454-default-rtdb.firebaseio.com",
    projectId: "budgetapp-98454",
    storageBucket: "budgetapp-98454.appspot.com",
    messagingSenderId: "155193614939",
    appId: "1:155193614939:web:e0e63bd3f7e9db5847d57e",
    measurementId: "G-WVFFLZSZ0F"
  }

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'listItems') //different from previous versions of firebase

  // queries

  // get docs from collection if priority is 1
 // const priority = query(colRef, where("priority", ">=", "1"), orderBy('priority', 'asc')) 

   // get docs from collection in order of entry
   const priority = query(colRef, orderBy('createdAt')) 

  // grab data and listen for changes
  const unsubCol = onSnapshot(priority, (snapshot)  => {
    let itemList = []
    snapshot.docs.forEach(doc => {
        itemList.push({ ...doc.data(), id: doc.id })
    })
    console.log(itemList)
  })

  // adding item
const addItemForm = document.querySelector('.add')
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    name: addItemForm.name.value,
    price: addItemForm.price.value,
    priority: addItemForm.priority.value,
    quantity: addItemForm.quantity.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addItemForm.reset()
  })
})

// deleting item
const deleteItemForm = document.querySelector('.delete')
deleteItemForm.addEventListener('submit', (e) => {
  e.preventDefault() //so page doesn't refresh

  const docRef = doc(db, 'listItems', deleteItemForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteItemForm.reset()
    })
})

// get a single document
const docRef =  doc(db, 'listItems', '6tSFMuK8ks8xgspFYXqt')

const unSubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'listItems', updateForm.name.value)


    updateDoc(docRef, {
        name: 'new name'
    })
    .then(() => {
        updateForm.reset()

    })
})

//signing user up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
        console.log('user created:', cred.user)
        signupForm.reset()
    })
    .catch(err => {
    console.log(err.message)

    })
})

//logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() =>{
 //       console.log('You are signed out')
    })
    .catch(err => {
        console.log(err.message)
    })

})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
  //      console.log('user logged in:', cred.user)
        loginForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

// unscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubCol()
    unsubAuth()
    unSubDoc()



})