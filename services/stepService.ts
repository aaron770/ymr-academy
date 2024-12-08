// TODO need to have a way to add and to get

import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";

const addStep = async (stepData) => {
    try {
    const docRef = await setDoc(doc(FIRESTORE_DB, `users/${user.uid}`), 
    stepData,
      { merge: true }
    )
  } catch (error) {
    console.error('There was an error creating user information:', error);
  } finally {

  }
}


// const getUserInformation = async (user: User) => {

//    get document of user if not document then send user to setup
//     const userCollectionRef = await getDoc(doc(FIRESTORE_DB, `users/${user.uid}`));

//     if ( (userCollectionRef).exists()) {
//         setUser((userCollectionRef).data() as User)
//         // setUser(user as User)
//     } else {
//         console.log('no docs')
//         setUser(user as User)
//     }
// }