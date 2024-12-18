import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { readBlobAsBase64 } from "./readBlobAsBase64";
import { getFunctions, httpsCallable } from "firebase/functions";
import { HebrewVowels } from "./hebrewVowels";
import { HebrewLetters } from "./hebrewLetters";

export const transcribeSpeech = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
  
  phrase?: string,
  typeOfExercise?,
  
) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    const isPrepared = audioRecordingRef?.current?._canRecord;
    if (isPrepared || true) {
      await audioRecordingRef?.current?.stopAndUnloadAsync();

      const recordingUri = audioRecordingRef?.current?.getURI() || "";
      let base64Uri = "";
      // maybe on load get permission https://github.com/aaron770/speech-to-text/blob/main/client/app/index.tsx#L25
      if (Platform.OS === "web") {
        const blob = await fetch(recordingUri).then((res) => res.blob());
        const foundBase64 = (await readBlobAsBase64(blob)) as string;
        // Example: data:audio/wav;base64,asdjfioasjdfoaipsjdf
        const removedPrefixBase64 = foundBase64.split("base64,")[1];
        base64Uri = removedPrefixBase64;
      } else {
        base64Uri = await FileSystem.readAsStringAsync(recordingUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const dataUrl = base64Uri;

      const audioConfig = {
        encoding:
          Platform.OS === "android"
            ? "AMR_WB"
            : Platform.OS === "web"
            ? "WEBM_OPUS"
            : "LINEAR16",
        sampleRateHertz:
          Platform.OS === "android"
            ? 16000
            : Platform.OS === "web"
            ? 48000
            : 41000,
        languageCode: "en-US",
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: true,
      };

      if (recordingUri && dataUrl) {
        const deData = {
          file: dataUrl,
          languageCode:  "en",
        }
        //type
        if (phrase) {
          console.log(typeOfExercise)
          if(typeOfExercise == 'hebrewVowel') {
          const obj = HebrewVowels.find(o => o.Vowel == phrase);
          deData['prompt'] = `I am testing the pronounciation of syllable *${obj.English}*`;
          }
          if(typeOfExercise == 'hebrewLetter') {
            const obj = HebrewLetters.find(o => o.hebrew == phrase);
            console.log('hebrew object', obj)
            if(Array.isArray(obj.transliteration)) {
              let prompt = `The hebrew letter is`;
              obj.transliteration.forEach((transliteration) => {
                prompt += ` *${transliteration}*`
              })
              deData['prompt'] = prompt;
            }
            if(typeof obj.transliteration === 'string') {
              deData['prompt'] = `The hebrew letter is *${obj.transliteration}*`;
            }
          }
        }

          // https://us-central1-torah-academy.cloudfunctions.net/speechToTextValidate
          const functions = getFunctions();
          const addMessageValidate = httpsCallable(functions, 'speechToTextValidate');

          const serverResponse = await addMessageValidate(deData)
          .then((result) => {
            // Read result of the Cloud Function.
            /** @type {any} */
            const data: any = result?.data;
            return  data;
          }).catch((e: Error) => console.error(e));

        const results = serverResponse?.text;
        if (results) {
          return results;
        } else {
          console.error("No transcript found");
          return undefined;
        }
      }
    } else {
      console.error("Recording must be prepared prior to unloading");
      return undefined;
    }
  } catch (e) {
    console.error("Failed to transcribe speech!", e);
    return undefined;
  }
};