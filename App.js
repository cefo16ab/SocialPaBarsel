import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Constants from 'expo-constants';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Events from './components/Events';
import MyEvents from './components/MyEvents';
import CreateEvent from './components/CreateEvent';
import EventProfile from './components/EventProfile';


const MyEventsStack = createStackNavigator({
  MyEvents: {screen: MyEvents},
  CreateEvent: {screen: CreateEvent},
});

const MainTabNavigator = createMaterialTopTabNavigator({
  
  Events: {screen: Events},
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

  
    /* I defaultNavigationOptions definerer vi en funktion der returnerer en konfiguration
    til TabNavigator. Som argument modtager funktionen et objekt, der blandt andet
    indeholder feltet "navigation". Det pakker vi ud med ved at angive det inden i { }
    således at det er tilængeligt som variabel. */
    defaultNavigationOptions: ({ navigation }) => {
      // Vi returnerer nu en konfiguration, som er et objekt, hvor vi sætter tabBarIcon.
      return {
        /* Her definerer vi en funktion som modtager et object, hvorfra vi pakker
        tintColor ud. Denne farve bruges på knappen og skifter hvis den er aktiv. */
        tabBarIcon: ({ tintColor }) => {
          // Vi kalder en funktion, der giver os et ikon ud fra den aktive route.
          return getTabBarIcon(navigation.state.routeName, tintColor);
        },
      };
    },
  

});



const MainAppContainer = createAppContainer(MainTabNavigator);

const UnauthenticatedNavigator = createStackNavigator({
  Login: {screen: LoginForm},
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
    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    // Vi opsætter en event handler som udføres hver gang authentication state ændres,
    // Dvs når en bruger fx logger ind/ud/tilmelder sig
    this.authStateChangeUnsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log('onAuthStateChanged', { U: user });

        this.setState({ user });
      });
  }

  // Her nedlægger vi den funktion som lytter på om authentication state ændrer sig.
  // Dette er for at undgå at der bliver sat flere listeners op jo flere gange appen reloades.
  // Inden den kaldes kontrolleres det at unsubscribe-funktionen findes, dvs at der pt er sat en subscription op
  componentWillUnmount() {
    this.authStateChangeUnsubscribe && this.authStateChangeUnsubscribe();
  }

  // Unsubscribe funktionen deklareres og er tom til at starte med
  authStateChangeUnsubscribe = null;

 

  handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  

  // App komponenten har et user felt i sin state, som er den user som pt. er logget ind. Den er null hvis ingen user er logget ind
  state = {
    user: null,
  };

  render() {
    
    const {user} = this.state;
    if(user){
      
      return <MainAppContainer/>;

    
    } else{
      return <UnauthenticatedAppContainer/>;
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#DDF0F5',
    padding: 8,
  },
});
