import { View, Text,  Button, StyleSheet, Platform,  } from "react-native";
// import styles from '../../../../assets/styles/login_styles';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as Sharing from 'expo-sharing';
import { transcribeSpeech } from "../../../../utils/transcribeSpeech";
import { recordSpeech } from "../../../../utils/recordSpeech";
export default function StudentExercise({ isVisible, step = undefined, onClose, onSubmit }) {
    const { stepId } = useLocalSearchParams();
  const router = useRouter();
  const [recording, setRecording] = React.useState(null);
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");

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



  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      // if (permission.status === "granted") {
      //   await Audio.setAudioModeAsync({
      //     allowsRecordingIOS: true,
      //     playsInSilentModeIOS: true
      //   });

      if (Platform.OS === "web") {
      // if (isWebFocused) {
        const getMicAccess = async () => {
          console.log('get mic acess')
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
      const speechTranscript = await transcribeSpeech(audioRecordingRef);
      console.log('speechTranscript', speechTranscript)
      setTranscribedSpeech(speechTranscript || "");
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranscribing(false);
    }
  };

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button  onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
                //   <View >
                //   <TouchableOpacity
                //       style={generalStyles.button}
                //       onPress={() => pickImage("preStep")}>
                //       <Text style={generalStyles.buttonTitle}>Add Image</Text>
                //   </TouchableOpacity>
                // </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
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