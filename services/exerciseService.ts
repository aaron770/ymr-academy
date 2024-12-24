import { doc, setDoc, getDoc,  collection, query, where, getDocs  } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";
import { Student } from '../interfaces/users.interface';

const $exerciseCollection = "exercise";
export const addExerciseToDoc = async (exerciseData) => {
    try {
      console.log('exerciseData in service', exerciseData)
    const docRef = await setDoc(doc(FIRESTORE_DB, `${$exerciseCollection}/${exerciseData.id}`), 
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

export const getExercises  = async () => {
  // TODO get document of user if not document then send user to setup
  //firestore().collection('yourCollectionName').get();
  //const q = query(collection(FIRESTORE_DB, "exerciseCollection"), where("capital", "==", true));
  const q = query(collection(FIRESTORE_DB, `${$exerciseCollection}`));

  //db.collection("users")
  const exerciseRef = await  getDocs(q);
  return exerciseRef

}

export const updateStudentExersises = async (exercise: Exercise, student, status?, points?, gottenWrong?) => {
  // id: string,
  // description?: string,
  // subject?: string,
  // status?: StudentExerciseStatus
  //maybe check if Id same if so make update to status
  student.exercises = student.exercises ? student.exercises : [];
  let userData : Pick<Student, "exercises" | "points">
  if(student.exercises.find(studentexercise => studentexercise.id === exercise.id)) {
    const currentExersise = student.exercises.find(studentexercise => studentexercise.id === exercise.id)
    currentExersise.status = status;
    if(gottenWrong?.length > 0) {
      currentExersise.gottenWrong = gottenWrong;
    }
    console.log("student.exercises after update", student.exercises)
    userData = {
      exercises: [...student.exercises],
      points: student.points ? student.points + points: points
    }
  } else
   userData = {
      exercises: [...student.exercises, {id: exercise.id, description: exercise.type, subject: exercise.language, status: "incomplete"}]
  }
  try {
    const docRef = await setDoc(doc(FIRESTORE_DB, `users/${student.uid}`), 
      userData,
      { merge: true }
    )
      // TODO UpDate user
      // setUser(...student, ...userData);
  } catch (error) {
    console.error('There was an error creating user information:', error);
  } finally {

  }
  
};