import { StyleSheet, Text, View, Button} from 'react-native';
import ThreeCrds from '../components/ThreeCrds'
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Chart from '../components/Chart';

function HomePage() {
  const { token, logout} = useContext(AuthContext);
  const navigation = useNavigation();

  // Check if there is no token, redirect to the login page
  if (!token) {
    navigation.navigate('Login');
    return null;
  }

  return (
    <View style={styles.container}>
      <ThreeCrds />
      <Chart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: '30px'
  },
});

export default HomePage;