import * as React from 'react';

import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Constants from 'expo-constants';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignUpInfo from './components/SignUpInfo';
import LoginForm from './components/LoginForm';
import Events from './components/Events';
import MyEvents from './components/MyEvents';
import CreateEvent from './components/CreateEvent';
import EventProfile from './components/EventProfile';

const EventProfileStack = createStackNavigator({
  Events: {screen: Events},
  EventProfile: {screen: EventProfile},
});

const MyEventsStack = createStackNavigator({
  MyEvents: {screen: MyEvents},
  CreateEvent: {screen: CreateEvent},
});

const LoginStack = createStackNavigator({
  LoginForm: {screen: LoginForm},
  SignUpForm: {screen: SignUpForm},
  SignUpInfo: {screen: SignUpInfo},
});

const MainTabNavigator = createMaterialTopTabNavigator({
  Events: {screen: EventProfileStack},
  MyEvents: {screen: MyEventsStack},
},
{
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  
  tabBarOptions: {
    activeTintColor: '#373838',
    inactiveTintColor: '#b0b0b0',

    style: {
      backgroundColor: '#00fffb',
      paddingTop: Constants.statusBarHeight,  
    },
    labelStyle: {
      textAlign: 'center',
    },
    indicatorStyle: {
      borderBottomColor: '#87B56A',
      borderBottomWidth: 2, 
    },
  },
});

const MainAppContainer = createAppContainer(MainTabNavigator);

const UnauthenticatedNavigator = createStackNavigator({
  LoginFrom: {screen: LoginStack},
})
const UnauthenticatedAppContainer = createAppContainer(UnauthenticatedNavigator);




export default class App extends React.Component {
  componentWillMount() {
    const firebaseConfig = {
  
        apiKey: "AIzaSyBS-X0RfUd3xpq7uzZE2C9fXkXOZ8fdMGI",
        authDomain: "spbl-30568.firebaseapp.com",
        databaseURL: "https://spbl-30568.firebaseio.com",
        projectId: "spbl-30568",
        storageBucket: "spbl-30568.appspot.com",
        messagingSenderId: "338726840479",
        appId: "1:338726840479:web:3be187c00a4a189f3d1aaa"
      };
    // kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    // event handler som udføres hver gang authentication state ændres,
    // fx logger ind/ud/tilmelder 
    this.authStateChangeUnsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log('onAuthStateChanged', { U: user });

        this.setState({ user });
      });
  }

  componentWillUnmount() {
    this.authStateChangeUnsubscribe && this.authStateChangeUnsubscribe();
  }

  authStateChangeUnsubscribe = null;

 

  handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  

  // null hvis ingen user er logget ind
  state = {
    user: null,
  };

  //viser forskelle AppContainer, hvis user er null eller logget ind
  render() {
    
    const {user} = this.state;
    if(user){
      
      return <MainAppContainer/>;

    
    } else{
      return <UnauthenticatedAppContainer/>;
    }
  }

}

