import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Events from './components/Events';
import MyEvents from './components/MyEvents';


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

  // App komponenten har et user felt i sin state, som er den user som pt. er logget ind. Den er null hvis ingen user er logget ind
  state = {
    user: null,
  };

  handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  // Her renderes login og signup-formularerne
  renderLoginSignup = () => {
    const { user } = this.state;

    // Hvis der allerede er en user defineret, vises de ikke
    if (user) {
      return null;
    }
    return (
      <ScrollView>
          <LoginForm />
          
          
      </ScrollView>
    );
  };

  // Her renderes den aktuelle bruger som er logget ind
  renderCurrentUser = () => {
    const { user } = this.state;
    // Hvis der ikke er en bruger logget ind, vises der ingenting
    if (!user) {
      return null;
    }
    // Man kan med fordel lave en separat kompomnent til dette, som modtager user som prop  
    return (
      <View>
        <Text>Current user: {user.email}</Text>
        
        <Button onPress={this.handleLogOut} title="Log out" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        
        {this.renderCurrentUser()}
        {this.renderLoginSignup()}
       
      </View>
    );
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
