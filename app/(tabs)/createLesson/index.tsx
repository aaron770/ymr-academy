import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from '../../../assets/styles/login_styles';
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import SetupStepModal from "../../../components/setupStepModal" // "../.././components/";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from 'uuid';

// import { UserCredential } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// import { FIRESTORE_DB } from "../../../config/firebase";
// import { userType } from "../../../config/userType.enum";
// import { User } from "../../../interfaces/users.interface";

export default function CreateLesson() {
  const router = useRouter();
  let nextStepId = 0;

  const {setUser, user } = useAuth();
  const [info, setInfo] = useState<Lesson["info"]>({})
  const [steps, setSteps] = useState<Lesson["steps"]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [showStepSetup, setShowStepSetup] = useState(false);
  const [displayName, setlastDisplayName] = useState('')
  const [loading, setLoading] = useState(false);
  const lesson: Lesson = {
    
  }
// info.descriptioninfo.instructor info.language info.level info.name info.subject
const handleInfoChange = e => {
  const { name, value } = e;
  setInfo(prevState => ({
      ...prevState,
      [name]: value
  }));
};

const addStep = (step) => {
  const stepId = uuidv4()
  router.push(`(aux)/createStep/${stepId}`);
  setSteps([
    ...steps,
    { id: stepId, ...step }
  ]);
}

const removeStep = () => {
  
}

const showStepSettup = () => {
  // TODO: get step Id 
  const stepId = uuidv4()
  router.push(`(aux)/createStep/${stepId}`);
  // setIsModalVisible(true)
}
const onModalClose = () => {
  setIsModalVisible(false);
};

const createClass = async () => {
  // try {
  //   const docRef = await setDoc(doc(FIRESTORE_DB, `users/${user.uid}`), 
  //     userData,
  //     { merge: true }
  //   )
  //     setUser(userData);
  // //   setUser()
  // } catch (error) {
  //   console.error('There was an error creating user information:', error);
  // } finally {

  // }
}

  return (
    <View style={styles.container}>
        
        <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always">
            <Image
                style={styles.logo}
                source={require('../../../assets/icon.png')}
            />
            <View>
            <TextInput
                style={styles.input}
                placeholder='Describe your Lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => handleInfoChange({name: "description", value: text})}
                value={info.description}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            /></View>
            <View>
            {/* <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                
                placeholder='Last name'
                onChangeText={(text) => handleInfoChange(text)}
                value={info?.instructor?.name}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            /> */}
            {/* need to inplement insructer id */}
            <TextInput
                style={styles.input}
                placeholder='Level of lesson'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => handleInfoChange({name: "level", value: text})}
                value={info.level}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            </View>
            <View>
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Name of lesson'
                onChangeText={(text) => handleInfoChange({name: "name", value: text})}
                value={info.name}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            </View>

            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                
                placeholder='Subject of lesson'
                onChangeText={(text) => handleInfoChange({name: "subject", value: text})}
                value={info.subject}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            {isModalVisible ? (
              <View />
            ) : (
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => showStepSettup()}>
                <Text style={styles.buttonTitle}>Add Exercise</Text>
            </TouchableOpacity>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={() => createClass()}>
                <Text style={styles.buttonTitle}>Add Class</Text>
            </TouchableOpacity>
            {/* {need disclaimer Data} */}
        </KeyboardAwareScrollView>
        <SetupStepModal isVisible={isModalVisible} onSubmit={addStep} onClose={onModalClose} step={undefined}>
        {/* A list of emoji component will go here */}
        </SetupStepModal>
    </View>
  );
}

