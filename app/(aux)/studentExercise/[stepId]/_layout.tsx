import { View, Text,  Button, StyleSheet, Platform, ActivityIndicator  } from "react-native";
// import styles from '../../../../assets/styles/login_styles';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as Sharing from 'expo-sharing';
import { transcribeSpeech } from "../../../../utils/transcribeSpeech";
import { recordSpeech } from "../../../../utils/recordSpeech";
import { HebrewVowels } from "../../../../utils/hebrewVowels";
import SpeechToText from "./speechToText";
import { getExercise, getExercises, updateStudentExersises } from "../../../../services/exerciseService";
import { useAuth } from "../../../../context/AuthProvider";
import { Exercise } from "../../../../interfaces/classes";
export default function StudentExercise({ isVisible, step = undefined, onClose, onSubmit }) {
  const { setUser, user  } = useAuth();
    const { stepId } = useLocalSearchParams();
  const router = useRouter();
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [exercise, setExercise] = useState({});
  //const [studentExercise, setStudentExercise] = useState("יַ,יָ,יִ,יֵ,יֶ,יֹ,יוּ,יֻ,יְ,טַ,טָ,טִ,טֵ,טֶ,טֹ,טוּ,טֻ,טְ,חַ,חָ,חִ,חֵ,חֶ,חֹ,חוּ,חֻ,חְ,זַ,זָ,זִ,זֵ,זֶ,זֹ,זוּ,זֻ,זְ,וַ,וָ,וִ,וֵ,וֶ,וֹ,ווּ,וֻ,וְ,הַ,הָ,הִ,הֵ,הֶ,הֹ,הוּ,הֻ,הְ,דַ,דָ,דִ,דֵ,דֶ,דֹ,דוּ,דֻ,דְ,גַ,גָ,גִ,גֵ,גֶ,גֹ,גוּ,גֻ,גְ,בַּ,בָּ,בִּ,בֵּ,בֶּ,בֹּ,בּוּ,בֻּ,בְּ,בַ,בָ,בִ,בֵ,בֶ,בֹ,בוּ,בֻ,בְ,אַ,אָ,אִ,אֵ,אֶ,אֹ,אוּ,אֻ,אְ");
  const [studentExercise, setStudentExercise] = useState("");
  console.log('stepId', stepId)
  const [exerciseType, setExerciseType] = useState('');
  const [currentChallengeNum, setCurrentChallengeNum] = useState(0);
  const currentChallenge = studentExercise.split(',')[currentChallengeNum];
  const [correctAnswer, setcorrectAnswer] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        const snapshot = await getExercise(stepId) //firestore().collection('yourCollectionName').get();
        if ( (snapshot).exists()) {
          //  as Exercise
          const data: Exercise = snapshot.data()
          console.log("exerciseList with challenge", data.challenge)
          setExercise(data)
          if(typeof data.challenge == "string") {
            setStudentExercise(data.challenge );
          }
          console.log("exercise.type", data.type)
          setExerciseType(data.type);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const prepare =  function(challenge) {
    if(typeof challenge === "string" && challenge.includes(",") ){ 
      return challenge.split(',');
    }
    return challenge;
  }

  const completeExercise = async (answers) => {
    const gottenCorrect = answers.filter((obj) => obj.isCorrect).length;
    const gottenWrong = answers.filter((obj) => !obj.isCorrect).reduce((accumulator ,item) => {
      if(item.hasOwnProperty('currentChallenge')){
        accumulator.push(item.currentChallenge);
      }
      return accumulator;
    }, [])
    // TODO: open up modal on bottom
    updateStudentExersises(exercise, user, "completed", gottenCorrect, gottenWrong);
    router.push('(protected)/exerciseList');
  }

  return (
    <View style={styles.container}>
      {exerciseType === 'hebrewVowel' ? (
        <SpeechToText studentExercise={prepare(studentExercise)} type="hebrewVowel"  onComplete={completeExercise}></SpeechToText>
      ) : exerciseType === 'hebrewLetter' ? (
        <SpeechToText studentExercise={prepare(studentExercise)} type="hebrewLetter" onComplete={completeExercise}></SpeechToText>
      ) : exerciseType === 'hebrewWord' ? (
        <SpeechToText studentExercise={prepare(studentExercise)} type="hebrewWord" onComplete={completeExercise}></SpeechToText>
      ) : <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});