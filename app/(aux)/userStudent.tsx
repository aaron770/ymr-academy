import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from '../../assets/styles/login_styles';
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { UserCredential } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../config/firebase";
import { userType } from "../../config/userType.enum";
import { User } from "../../interfaces/users.interface";

export default function UserStudent() {
    const {setUser, user } = useAuth();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [displayName, setlastDisplayName] = useState('')
    const [loading, setLoading] = useState(false);
    
    const createUserInformation = async () => {
        const userData = {
            firstName,
            lastName,
            displayName,
            uid: user.uid, 
            userType: userType.STUDENT,
            email: user.email
        }
        try {
          const docRef = await setDoc(doc(FIRESTORE_DB, `users/${user.uid}`), 
            userData,
            { merge: true }
          )
            setUser(userData);
        //   setUser()
        } catch (error) {
          console.error('There was an error creating user information:', error);
        } finally {

        }
        
      };
  return (
    <View style={styles.container}>
        
        <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always">
            <Image
                style={styles.logo}
                source={require('../../assets/icon.png')}
            />
            <Text >Email: { user.email }</Text>
            <TextInput
                style={styles.input}
                placeholder='First name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                
                placeholder='Last name'
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                
                placeholder='Display name'
                onChangeText={(text) => setlastDisplayName(text)}
                value={displayName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => createUserInformation()}>
                <Text style={styles.buttonTitle}>Add user information</Text>
            </TouchableOpacity>
            {/* {need disclaimer Data} */}
        </KeyboardAwareScrollView>
    </View>
    );
}