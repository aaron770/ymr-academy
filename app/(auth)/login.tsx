

import { Link, useRouter } from "expo-router";
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../assets/styles/login_styles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { FIREBASE_AUTH, FIRESTORE_DB  } from '../../config/firebase'
import { useAuth } from "../../context/AuthProvider"//"../../../context/AuthProvider";
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "../../interfaces/users.interface";

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const router = useRouter();
    const onFooterLinkPress = async () => {
        setLoading(true);
        const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((response) => {
            // navigate to userTYpe
            setUser(response.user as any) 
            router.push('userType');
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
        .catch(error => {
            alert(error)
        });
    }
    const onLoginPress = async () => {
        try {
            setLoading(true);
            const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            console.log('user logged in ',user?.user)
            getUserInformation(user?.user as User)
          } catch (error) {
            console.error('There was an error logging in:', Object.values(error));
            if (Object.values(error).includes('auth/invalid-email')) {
                alert('There was an error logging in please check your email to make sure it is correct.')
            } else if (Object.values(error).includes('auth/missing-password')) {
                //There was an error logging in: ["auth/missing-password", {}, "FirebaseError"]
                alert('You forgot to enter a password.')
            } else if (Object.values(error).includes('auth/wrong-password')) {
                //There was an error logging in: ["auth/wrong-password", {}, "FirebaseError"]
                alert('You have neterrred an incorrect password.')
            }
          } finally {
            setLoading(false);
          }
    }
    const getUserInformation = async (user: User) => {
        console.log('userCollectionRef before q')
        // TODO get document of user if not document then send user to setup
        const userCollectionRef = await getDoc(doc(FIRESTORE_DB, `users/${user.uid}`));
        console.log('userCollectionRef after q', `users/${user.uid}`, (userCollectionRef).data())
        if ( (userCollectionRef).exists()) {
            // setUser((userCollectionRef).data() as User)
            console.log('no docs')
            setUser(user as User)
        } else {
            console.log('no docs')
            setUser(user as User)
        }
        // const unsubscribe = onSnapshot(q, (users: DocumentData) => {
        //     const messages = users.docs.map((doc) => {
        //             console.log('doc.data()', doc.data())
        //           return { id: doc.id, ...doc.data() };
        //         });
        //     console.log('users?.docs', users)
        //     if (users?.docs?.length < 1) {
        //         console.log('no docs')
        //         setUser(user as User)
        //     } else {
        //         const userInDocs = users?.docs.filter((userDoc) => {
        //             userDoc.uid === user.uid;
        //         })
        //         console.log('yes docs', userInDocs)

        //         setUser(userInDocs as User)
        //     }
            // const messages = users.docs.map((doc) => {
            //     setUser(user?.user as User)
            //   return { id: doc.id, ...doc.data() };
            // });
        
        // })
    }
    return (
        <View style={styles.container}>
             <Spinner visible={loading} />
            <KeyboardAwareScrollView
                style={styles.center_container}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? You can create an account with the above email and password</Text>
                    
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onFooterLinkPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

