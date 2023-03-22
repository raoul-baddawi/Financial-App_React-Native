import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.108:8000/api/login', {
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.access_token;
      if (token) {
        await AsyncStorage.setItem('token', token);
        console.log(token);
        navigation.navigate('Home'); // Navigate to home page after successful login
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password.'); // Display error message to user
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.circle}>
          <Text style={styles.text}>Login?</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) =>
            setCredentials({ ...credentials, email: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
        />
        <Button title="Login" onPress={handleLogin} style={styles.btn}/>
        <Text>{error && <Text style={styles.error}>{error}</Text>}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '65vh'
  },
  input: {
    width: '80%',
    height: '3.3rem',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    borderRadius: 5
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width : '100%',
    backgroundColor: '#000'
  }, 
  header: {
    height: '35vh',
    backgroundColor: 'rgb(0, 140, 255)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    position: 'relative'
  },
  circle: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    transform: 'translate(-40%, -40%)'
  },
  text: {
    color: 'rgb(0, 140, 255)',
    fontSize: 'xx-large',
    marginLeft: '90px',
    marginTop: '140px',
    fontWeight: 'bold'
  },
  welcome: {
    paddingBottom: '50px',
    margin: '0px',
    marginTop: '-60px',
    fontSize: 'larger',
    fontWeight: 'bold'
  }
});

export default LoginPage;