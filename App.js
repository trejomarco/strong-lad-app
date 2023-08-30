import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext, useContext} from 'react';
import TabScreen from './screens/TabScreen';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import RootStackScreen from './screens/RootStackScreen';
import {onAuthStateChanged} from 'firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth} from './firebase';
import DrawerContent from './screens/DrawerContent';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';

const Drawer = createDrawerNavigator();
const AuthenticatedUserContext = createContext({});
const RootStack = createStackNavigator();

global.db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~SQLite.db',
  },
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'blue',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="HomeDrawer"
        component={TabScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <RootStack.Navigator
      defaultScreenOptions={SignInScreen}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};

function RootNavigator() {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async authenticatedUser => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};

export default App;

// <NavigationContainer>
//   <RootStackScreen>
//         <TabScreen/>
//   </RootStackScreen>
// </NavigationContainer>
