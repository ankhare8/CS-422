import firebase from 'firebase/app';
import 'firebase/firestore';

const fetchShoppingList = async () => {
  const db = firebase.firestore();
  const shoppingList = [];

  try {
    const querySnapshot = await db.collection('shoppinglist').get();
    querySnapshot.forEach((doc) => {
      shoppingList.push({ id: doc.id, ...doc.data() });
    });
    return shoppingList;
  } catch (error) {
    console.error('Error fetching shopping list data: ', error);
    throw error;
  }
};

export default fetchShoppingList;
