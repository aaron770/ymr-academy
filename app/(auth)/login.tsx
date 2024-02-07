

import { Link, useRouter } from "expo-router";
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../assets/styles/login_styles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { FIREBASE_AUTH  } from '../../config/firebase'
import { useAuth } from "../../context/AuthProvider"//"../../../context/AuthProvider";

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
        })
        .catch(error => {
            alert(error)
        });
    }
    const onLoginPress = async () => {
        try {
            setLoading(true);
            const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((response) => {
                console.log(response)
                // TODO get document of user if not document then send user to setup
                setUser(response?.user as any)
                
            })
            .catch(error => {
                alert(error)
            });
          } catch (error) {
            console.error('There was an error logging in:', error);
          } finally {
            setLoading(false);
          }
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
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

