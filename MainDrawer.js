import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import Dashboard from '../Component/Dashboard';
import Profile from './Profile';
import Help from './Help';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native'; 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


// const DashboardIcon =({focused, color, size})=><Ionicons name='person' size={size} color={color} />
const ProfileIcon =({focused, color, size})=><Ionicons name="person-circle-outline" size={size} color={color} />
const HelpdIcon =({focused, color, size})=><Ionicons name='information-circle' size={size} color={color} />
// const ProfitIcon =({focused, color, size})=><Ionicons name='md-cart' size={size} color={color} />


const MainDrawer = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDashboard">
        {() => (
          <Drawer.Navigator 
          screenOptions={{
            drawerStyle:{
              backgroundColor:'green',   //change bg color
              width:230    //change width of sidebar 
            }
          }}
          >
            {/* <Drawer.Screen name="Dashboard" component={Dashboard} options={{ drawerIcon: DashboardIcon }} /> */}
            <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: ProfileIcon }} />
            <Drawer.Screen name="Help" component={Help} options={{ drawerIcon: HelpdIcon }} />
          </Drawer.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>

  );
};

export default MainDrawer;

