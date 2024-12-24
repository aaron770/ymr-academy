import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Student } from "../../interfaces/users.interface";
import { useEffect, useState } from "react";
import { getExercises, updateStudentExersises } from "../../services/exerciseService";
import styles from '../../assets/styles/login_styles';


export default function ExerciseList() {
  const router = useRouter();

  const { setUser, user  } = useAuth();
  const [exerciseList, setexerciseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getExercises()
        const snapshot = await getExercises() //firestore().collection('yourCollectionName').get();
        const dataList = snapshot.docs.map(doc => doc.data());
        setexerciseList(dataList);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const gotoExercise = (id) => {
    console.log('creatExercise')
    router.push(`(aux)/studentExercise/${id}`); 
  }
  const addExerciseToStudent = (exercise) => {
    console.log('creatExercise')
    updateStudentExersises(exercise, user);
    
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>User Exercises</Text>
      <Text>{ user && user.displayName }</Text>
      {(user as Student)?.exercises && (user as Student).exercises.map((r) => {
          return (
            <Text key={r.id} >{r.id}, {r.description}, {r.status.status}
              <TouchableOpacity
                style={styles.button}
                onPress={() => gotoExercise(r.id)}>
                  <Text style={styles.buttonTitle}>Test Exercise.</Text>
              </TouchableOpacity>
            
            </Text>
          );
        })}
    <Text>Exercises</Text>
      {exerciseList && exerciseList.map((r) => {
          return (
            <Text key={r.id} >
              <Text>{r.id}, {r.type}, {r.language}</Text>
              <TouchableOpacity
              style={styles.button}
              onPress={() => gotoExercise(r.id)}>
                <Text style={styles.buttonTitle}>Test Exercise.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addExerciseToStudent(r)}>
                <Text style={styles.buttonTitle}>Add Exercise to student</Text>
              </TouchableOpacity>
            </Text>
            
          );
        })}
    </View>
    
  );
}
