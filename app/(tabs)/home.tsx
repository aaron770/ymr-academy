import { View, Text, TouchableOpacity } from "react-native";
import styles from '../../assets/styles/login_styles';
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const createExercise = () => {
    console.log('creatExercise')
    router.push('(aux)/createStep');
  }
  const createClass = () => {
    console.log('creatClass')
    router.push('(tabs)/createClass');
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => createExercise()}>
          <Text style={styles.buttonTitle}>Create Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.button}
          onPress={() => createClass()}>
          <Text style={styles.buttonTitle}>Set up class.</Text>
      </TouchableOpacity>
    </View>
  );
}
