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
      const response = await axios.post("http://192.168.0.115:8000/api/login", {
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.access_token;
      if (token) {
        await AsyncStorage.setItem('token', token);
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
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      <Text>{error && <Text style={styles.error}>{error}</Text>}</Text>
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
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
});

export default LoginPage;