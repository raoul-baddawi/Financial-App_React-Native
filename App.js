import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setLoading(false);
      setToken(savedToken);
    };

    getToken();
  }, []);

  if (loading) {
    return null; // or a loading indicator
  }

  return (
    <AuthProvider token={token}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginPage {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

AppRegistry.registerComponent('MyApp', () => App);

export default App;