import React, {Component} from 'react';
import HomeTab from './tabs/HomeTab';
import CalendarTab from './tabs/CalendarTab';
import TemplateScreen from './tabs/TemplateScreen';
import AddExerciseScreen from './tabs/AddExerciseScreen';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';


import Table from './tabs/Table';

const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{backgroundColor: '#01ab9d'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          tabBarLabel: 'Calendar',
          style: {backgroundColor: '#01ab9d'},
          tabBarIcon: ({color}) => (
            <Icon name="ios-calendar" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#01ab9d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeTab}
      options={{
        title: 'Home',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#01ab9d"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen name="TemplateScreen" component={TemplateScreen} />
    <HomeStack.Screen name="AddExerciseScreen" component={AddExerciseScreen} />
    <HomeStack.Screen name="Table" component={Table}
    />
  </HomeStack.Navigator>
);

const CalendarStackScreen = ({navigation}) => (
  <CalendarStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#01ab9d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CalendarStack.Screen
      name="Calendar"
      component={CalendarTab}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#01ab9d"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </CalendarStack.Navigator>
);
