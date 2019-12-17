import * as React from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import {KeyboardAvoidingView} from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 30,
  },
  text:{
fontSize: 20,
textAlign: 'center',
  },

  welcome:{
    fontSize: 23,
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',

  },

  logo:{
   marginTop: 30, 
   marginLeft: 35,
   marginRight: 30,
   
  },
  textField: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'blue',
    padding: 10,
    margin: 10,
  },
  LoginView:{
    flex:1,
  },
});


// Denne komponent er en 99% kopi af SignupForm
// Eneste forskel er at der udføres en anden funktion når man trykker på submit knappen.
// Man kunne også lave én komponent som klarer begge opgaver, med 2 submit-knapper eller lign.
export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    isCompleted: false,
    errorMessage: null,
  };

  startLoading = () => this.setState({ isLoading: true });
  endLoading = () => this.setState({ isLoading: false });
  setError = errorMessage => this.setState({ errorMessage });
  clearError = () => this.setState({ errorMessage: null });
  handleChangeEmail = email => this.setState({ email });
  handleChangePassword = password => this.setState({ password });

  handleSubmit = async () => {
    const { email, password } = this.state;
    try {
      this.startLoading();
      this.clearError();
      // Her kalder vi den rette funktion i firebase auth
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      console.log(result);
      this.endLoading();
      this.setState({ isCompleted: true });
    } catch (error) {
      this.setError(error.message);
      this.endLoading();
    }
  };

  HandleGoToSignup = () => {
    this.props.navigation.navigate('SignUpForm');
  };

  render = () => {
    const { errorMessage, email, password, isCompleted } = this.state;
    if (isCompleted) {
      return <Text>You are now logged in</Text>;
    }
    return (
      <ScrollView style={styles.LoginView}>
      
      
       <Text style={styles.welcome}>
          Velkommen til social på barsel
        </Text>
              <Image style={styles.logo} source={require('../assets/Logo1.png')} />
              <Text style={styles.text}>
           Don't have an account?
         </Text>
              <Button title="Sign up" onPress={this.HandleGoToSignup} />
        <Text style={styles.header}> Log in</Text>
        <KeyboardAvoidingView behavior="padding">   
        <TextInput 
          placeholder="email"
          value={email}
          onChangeText={this.handleChangeEmail}
          style={styles.textField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={this.handleChangePassword}
          secureTextEntry
          style={styles.textField}
        />
         </KeyboardAvoidingView>
        
        {errorMessage && (
          <Text style={styles.error}>Error: {errorMessage}</Text>
        )}
        {this.renderButton()}
        
        
      
       
        </ScrollView>
    );
  };

  renderButton = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return <Button onPress={this.handleSubmit} title="Log in" />;
  };
}
