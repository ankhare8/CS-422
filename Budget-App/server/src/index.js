// THIS IS BROKEN BROKEN BROKEN!
require ('dotenv').config()

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

//init firebase app
initializeApp(process.env.firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'Users') 
  // queries

  // get docs from collection if priority is 1
 // const priority = query(colRef, where("priority", ">=", "1"), orderBy('priority', 'asc')) 

  // get docs from collection for the current user
  const priority = query(colRef, where("userId", "==", auth.currerntUser.uid), orderBy('createdAt'))
   
  // get docs from collection in order of entry
  //const priority = query(colRef, orderBy('createdAt')) 

  // grab data and listen for changes
  const unsubCol = onSnapshot(priority, (snapshot)  => {
    let itemList = []
    snapshot.docs.forEach(doc => {
      // push item objects into an array
        itemList.push({ ...doc.data(), id: doc.id })
    })
    console.log(itemList)
  })
  .catch(err =>{
    console.log(err.message)
  })

  // Create a new collection and add item
const createListForm = document.querySelector('.create-list');
createListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the form values
  const collectionList = createListForm['collection-list'].value;
  const itemName = createListForm['item-name'].value;
  const itemPrice = createListForm['item-price'].value;
  const itemQuantity = createListForm['item-quantity'].value;
  const itemPriority = createListForm['item-priority'].value;
  
  // Add the collection and item to the database
  addDoc(collection(db, 'Users', auth.currentUser.uid, collectionList), {
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity,
    priority: itemPriority,
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp()
  })
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
    createListForm.reset();
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });
});

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
        
        // add user data to the Users collection
        const uid = cred.user.uid
        const usersRef = collection(db, 'Users')
        addDoc(usersRef, {
          userId: uid,
          email: email
        })
        .then(() => {
          console.log('User added to Users collection')
        })
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
        console.log('user logged in:', cred.user)
        loginForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})

// // subscribing to auth changes
// const unsubAuth = onAuthStateChanged(auth, (user) => {
//     console.log('user status changed:', user)
// })

// // unscribing from changes (auth & db)
// const unsubButton = document.querySelector('.unsub')
// unsubButton.addEventListener('click', () => {
//     console.log('unsubscribing')
//     unsubCol()
//     unsubAuth()
//     unSubDoc()



//})

// Function to create a new collection with a given name and add items to it
async function createCollectionAndAddItems(collectionName, items) {
  // Get the authenticated user
  const user = auth.currentUser

  // Create a new collection with the given name and user ID as the document ID
  const collectionRef = doc(db, 'Users', user.uid, 'collections', collectionName)
  await setDoc(collectionRef, { name: collectionName })

  // Add the items to the collection
  for (const item of items) {
    await addDoc(collection(collectionRef, 'items'), item)
  }

  console.log('Collection created and items added successfully')
}
