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
export default function StudentExercise({ isVisible, step = undefined, onClose, onSubmit }) {
    const { stepId } = useLocalSearchParams();
  const router = useRouter();
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  //const [studentExercise, setStudentExercise] = useState("יַ,יָ,יִ,יֵ,יֶ,יֹ,יוּ,יֻ,יְ,טַ,טָ,טִ,טֵ,טֶ,טֹ,טוּ,טֻ,טְ,חַ,חָ,חִ,חֵ,חֶ,חֹ,חוּ,חֻ,חְ,זַ,זָ,זִ,זֵ,זֶ,זֹ,זוּ,זֻ,זְ,וַ,וָ,וִ,וֵ,וֶ,וֹ,ווּ,וֻ,וְ,הַ,הָ,הִ,הֵ,הֶ,הֹ,הוּ,הֻ,הְ,דַ,דָ,דִ,דֵ,דֶ,דֹ,דוּ,דֻ,דְ,גַ,גָ,גִ,גֵ,גֶ,גֹ,גוּ,גֻ,גְ,בַּ,בָּ,בִּ,בֵּ,בֶּ,בֹּ,בּוּ,בֻּ,בְּ,בַ,בָ,בִ,בֵ,בֶ,בֹ,בוּ,בֻ,בְ,אַ,אָ,אִ,אֵ,אֶ,אֹ,אוּ,אֻ,אְ");
  const [studentExercise, setStudentExercise] = useState("א,ב,ג,ד,ה,ו,ז,ח,ט,י,כ,ל,מ,נ,ס,ע,פ,צ,ק,ר,ש,ת");

  const [exerciseType, setExerciseType] = useState('hebrewLetter');
  const [currentChallengeNum, setCurrentChallengeNum] = useState(0);
  const currentChallenge = studentExercise.split(',')[currentChallengeNum];
  const [correctAnswer, setcorrectAnswer] = useState(null);
  
  const prepare =  function(challenge) {
    if(typeof challenge === "string" && challenge.includes(",") ){ 
      return challenge.split(',');
    }
  }

  return (
    <View style={styles.container}>
      {exerciseType === 'hebrewVowel' ? (
        <SpeechToText studentExercise={prepare(studentExercise)} type="hebrewVowel"></SpeechToText>
      ) : exerciseType === 'hebrewLetter' ? (
        <SpeechToText studentExercise={prepare(studentExercise)} type="hebrewLetter"></SpeechToText>
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