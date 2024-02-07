import { View, Text, TouchableOpacity } from "react-native";
import { userType } from "../../config/userType.enum";
import styles from '../../assets/styles/login_styles';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

export default function UserType() {
    const router = useRouter();
    const onUserTypePress = (userType) => {
        console.log('userType', userType)
        router.replace("/account");
    }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 30 }}>
        <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always">
            {/* TODO need to add text for user type choice */}
            <Text style={styles.footerText}>This will take a minute as we gather your information.</Text>
            <Text style={styles.footerText}>Please select a user type.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onUserTypePress(userType.STUDENT)}>
                <Text style={styles.buttonTitle}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onUserTypePress(userType.TEACHER)}>
                <Text style={styles.buttonTitle}>Teacher</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    </View>
  );
}