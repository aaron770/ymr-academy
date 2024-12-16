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
export default function SpeechToText({ studentExercise, type='hebrew' }) {
  const { stepId } = useLocalSearchParams();
  const router = useRouter();
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  // const [studentExercise, setStudentExercise] = useState("יַ,יָ,יִ,יֵ,יֶ,יֹ,יוּ,יֻ,יְ,טַ,טָ,טִ,טֵ,טֶ,טֹ,טוּ,טֻ,טְ,חַ,חָ,חִ,חֵ,חֶ,חֹ,חוּ,חֻ,חְ,זַ,זָ,זִ,זֵ,זֶ,זֹ,זוּ,זֻ,זְ,וַ,וָ,וִ,וֵ,וֶ,וֹ,ווּ,וֻ,וְ,הַ,הָ,הִ,הֵ,הֶ,הֹ,הוּ,הֻ,הְ,דַ,דָ,דִ,דֵ,דֶ,דֹ,דוּ,דֻ,דְ,גַ,גָ,גִ,גֵ,גֶ,גֹ,גוּ,גֻ,גְ,בַּ,בָּ,בִּ,בֵּ,בֶּ,בֹּ,בּוּ,בֻּ,בְּ,בַ,בָ,בִ,בֵ,בֶ,בֹ,בוּ,בֻ,בְ,אַ,אָ,אִ,אֵ,אֶ,אֹ,אוּ,אֻ,אְ");
  const [currentChallengeNum, setCurrentChallengeNum] = useState(0);
  const currentChallenge = studentExercise.split(',')[currentChallengeNum];
  const [correctAnswer, setcorrectAnswer] = useState(null);
  //for debounce button
  const [isWaiting, setIsWaiting] = useState(false);
  const [transcribedSpeech, setTranscribedSpeech] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  // const isWebFocused = useWebFocus();
  const audioRecordingRef = useRef(new Audio.Recording());
  const webAudioPermissionsRef = useRef<MediaStream | null>(null);

  // useEffect(() => {
  //   if (isWebFocused) {
  //     const getMicAccess = async () => {
  //       const permissions = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       webAudioPermissionsRef.current = permissions;
  //     };
  //     if (!webAudioPermissionsRef.current) getMicAccess();
  //   } else {
  //     if (webAudioPermissionsRef.current) {
  //       webAudioPermissionsRef.current
  //         .getTracks()
  //         .forEach((track) => track.stop());
  //       webAudioPermissionsRef.current = null;
  //     }
  //   }
  // }, [isWebFocused]);
  function incrementExcerse() {
    setCurrentChallengeNum(currentChallengeNum + 1);
  }

  function getPathFromState(phrase: string) {
    const obj = HebrewVowels.find(o => o.Vowel == phrase);
    return obj.English;
 }

 const debouncedRecordOnPress = () => {
   if (!isWaiting) {
    startRecording();
     setIsWaiting(true);
     setTimeout(() => {
       setIsWaiting(false);
     }, 1000);
   }
 };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      // if (permission.status === "granted") {
      //   await Audio.setAudioModeAsync({
      //     allowsRecordingIOS: true,
      //     playsInSilentModeIOS: true
      //   });

      if (Platform.OS === "web") {
        setcorrectAnswer(null)
      // if (isWebFocused) {
        const getMicAccess = async () => {
          const permissions = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          webAudioPermissionsRef.current = permissions;
        };
        if (!webAudioPermissionsRef.current) getMicAccess();
      } else {
        if (webAudioPermissionsRef.current) {
          webAudioPermissionsRef.current
            .getTracks()
            .forEach((track) => track.stop());
          webAudioPermissionsRef.current = null;
        }
      }
        console.log('webAudioPermissionsRef', webAudioPermissionsRef)
        // const { recording } = await Audio.Recording.createAsync(
        //   // Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        //   // Audio.PitchCorrectionQuality.High
        // );  
        //const startRecording = async () => {
          setIsRecording(true);
          await recordSpeech(
            audioRecordingRef,
            setIsRecording,
            //!!webAudioPermissionsRef.current
            permission.status === "granted"
          );
        //};
        // setRecording(recording);
        setRecording(audioRecordingRef);
      // } else {
      //   setMessage("Please grant permission to app to access microphone");
      // }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // async function stopRecording() {
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();

  //   let updatedRecordings = [...recordings];
  //   const { sound, status } = await recording.createNewLoadedSoundAsync();
  //   updatedRecordings.push({
  //     sound: sound,
  //     duration: getDurationFormatted(status.durationMillis),
  //     file: recording.getURI()
  //   });

  //   setRecordings(updatedRecordings);
  // }


  const stopRecording = async () => {

    setRecording(undefined);
    setIsRecording(false);
    setIsTranscribing(true);
    try {
      console.log('speech to text')
      const speechTranscript = await transcribeSpeech(audioRecordingRef, currentChallenge);
      console.log('speechTranscript', speechTranscript)
      setTranscribedSpeech(speechTranscript || "");
      let updatedRecordings = [...recordings];
      
      // const { sound, status } = await audioRecordingRef.current.createNewLoadedSoundAsync();
      // updatedRecordings.push({
      //   sound: sound,
      //   duration: getDurationFormatted(status.durationMillis),
      //   file: audioRecordingRef?.current?.getURI()
      // });
      setRecordings(updatedRecordings);
      audioRecordingRef.current = new Audio.Recording();
      console.log('current challenge', getPathFromState(currentChallenge)?.toLowerCase())
      console.log('transcribedSpeech', speechTranscript?.toLowerCase())
      console.log('current challenge', getPathFromState(currentChallenge)?.toLowerCase() == speechTranscript?.toLowerCase())
      const isCorrect = speechTranscript?.toLowerCase().includes(getPathFromState(currentChallenge)?.toLowerCase())
      setcorrectAnswer(isCorrect);
      setAnswers([...answers, {num: currentChallengeNum, isCorrect: isCorrect }]);
      incrementExcerse();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranscribing(false);
    }
  };

  // function getDurationFormatted(millis) {
  //   const minutes = millis / 1000 / 60;
  //   const minutesDisplay = Math.floor(minutes);
  //   const seconds = Math.round((minutes - minutesDisplay) * 60);
  //   const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
  //   return `${minutesDisplay}:${secondsDisplay}`;
  // }

  // function getRecordingLines() {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index} style={styles.row}>
  //         <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
  //         <Button  onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
  //         <Button onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
  //       </View>
  //     );
  //   });
  // }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>currentChallenge</Text>
      <Text style={{ fontSize: 50, paddingBottom: 30 }}>{currentChallenge}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : debouncedRecordOnPress} />
      {currentChallengeNum != 0 && correctAnswer == null && <View style={{ paddingTop: 20 }}><ActivityIndicator size="large" /></View>}
      {correctAnswer != null && <Text style={{ fontSize: 50, color: 'green' }}>{correctAnswer ? 'You are correct': 'Try again'}</Text> }
      
      {/* {getRecordingLines()} */}

      <StatusBar style="auto" />
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