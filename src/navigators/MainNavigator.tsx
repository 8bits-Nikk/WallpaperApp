import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Liked from '../screens/Liked';
import Wallpaper from '../screens/Wallpaper';
import {MainStackParams} from '../types/Navigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParams>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Liked" component={Liked} />
        <Stack.Screen name="Wallpaper" component={Wallpaper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
