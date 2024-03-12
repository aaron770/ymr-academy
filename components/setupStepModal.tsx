import { Modal, View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import generalStyles from '../assets/styles/login_styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { addExercise, addStep } from '../context/reducers/classCreationReducer';


/*
  a step has multiple Exercises 
*/
export default function SetupStepModal({ isVisible, step = undefined, onClose, onSubmit }) {
  let nextExercise = 0;
  let currentStep: Step;
  const [description, setDescription] = useState<Step["description"]>('')
  const [preStep, setPreStep] = useState<Step["preStep"]>({})
  // const [setuptExercise, setSetuptExercise] = useState<Exercise[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [exercise, setExercise] = useState<Exercise>({})
  const [exerciseType, setExerciseType] = useState<ExerciseType["type"]>('voice');
  const [postStep, setPostStep] = useState<Step["postStep"]>({})

  //inisial step need to move to parent
  useEffect(() => {
    currentStep = {id: uuidv4()};
    addStep(currentStep)
  },[])
  
  const handlePreStepChange = e => {
    const { name, value } = e;
    setPreStep(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  
  const addExerciseToLesson = (exercise: Exercise) => {
    // exercise.answer string
    // exercise.challenge 
    // exercise.language
    // exercise.options
    // exercise.type
    const exerciseToAdd  = { 
      id: uuidv4(), 
      stepId: currentStep.id, 
      type: exerciseType, 
      ...exercise }
    setExercises([
      ...exercises,
      exerciseToAdd
    ]);
    addExercise(exercise as any);
    setExercise({})
  }

  const pickImage = async (step) => {
    //TODO: custom image picker function https://stackoverflow.com/questions/75419320/how-to-upload-images-on-firebase-storage-using-react-native-expo
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // DOTO: only image .Images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && step == "preStep") {
      setPreStep(prevState => ({
        ...prevState,
        image: result.assets[0].uri
      }));
    } else if (!result.canceled && step == "postStep") {
      setPostStep(prevState => ({
        ...prevState,
        image: result.assets[0].uri
      }));
    }
  };
  const handlePostStepChange = e => {
    const { name, value } = e;
    setPreStep(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  
  const submit = () => {
    const step: Step = {
      
    }
    // step.setuptExercises
    
    // step.description
    // step.preStep 
        // sound?: string;
        // image?: string;
        // text?: string;
    // step.setuptExercise
    // step.postStep
    onSubmit()
  }
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
      <KeyboardAwareScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tell us about this course.</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          <View >
            <Text style={styles.title}>Please describe your course.</Text>
            <TextInput
                style={generalStyles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDescription(text)}
                value={description}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
          </View>
          <View >
            <Text style={styles.title}>Setup what your student will see before the Excersise.</Text>
            <TextInput
                style={generalStyles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => handlePreStepChange({name: "text", value: text})}
                value={preStep.text}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
          </View>
          <View >
            <TouchableOpacity
                style={generalStyles.button}
                onPress={() => pickImage("preStep")}>
                <Text style={generalStyles.buttonTitle}>Add Image</Text>
            </TouchableOpacity>
          </View>
          <View >
          <View >
            <TouchableOpacity
                style={generalStyles.button}
                onPress={() => pickImage("preStep")}>
                <Text style={generalStyles.buttonTitle}>Add Audio</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TextInput
                style={generalStyles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(sound) => handlePreStepChange({name: "sound", value: sound})}
                value={preStep.sound}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
          </View>
          <View >
            <Text style={styles.title}>Setup the Excersise.</Text>
            {/* TODO: set up conditons for different types of exercises */}
            <Text style={styles.title}>Please leave a list of values seperated by a "," such as A,B,C,D.</Text>
            <TextInput
                style={generalStyles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setExercise({challenge: text})}
                value={preStep.text}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
          </View>
          <View >
            <Text style={styles.title}>Setup what your student will see after the Excersise.</Text>
            <TextInput
                style={generalStyles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => handlePostStepChange({name: "text", value: text})}
                value={preStep.text}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
          </View>
          <View >
            <TouchableOpacity
                style={generalStyles.button}
                onPress={() => pickImage("postStep")}>
                <Text style={generalStyles.buttonTitle}>Add Image</Text>
            </TouchableOpacity>
          </View>
          </View>
          <View >
          <View >
            <TouchableOpacity
                style={generalStyles.button}
                onPress={() => pickImage("postStep")}>
                <Text style={generalStyles.buttonTitle}>Add Audio</Text>
            </TouchableOpacity>
          </View>
          </View>
          </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '80%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '7%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
  });