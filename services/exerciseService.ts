
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";

const $exerciseCollection = "exercise";
export const addExerciseToDoc = async (exerciseData) => {
    try {
      console.log('exerciseData in service', exerciseData)
    const docRef = await setDoc(doc(FIRESTORE_DB, `${$exerciseCollection}/${exerciseData.uid}`), 
    exerciseData,
      { merge: true }
    )
  } catch (error) {
    console.error('There was an error creating $exerciseCollection information:', error);
  } finally {

  }
}
export const getExercise  = async (exerciseID) => {
    // TODO get document of user if not document then send user to setup
    const exerciseRef = await getDoc(doc(FIRESTORE_DB, `${$exerciseCollection}/${exerciseID}`));
    return exerciseRef

}