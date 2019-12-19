import * as React from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';

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
    fontSize: 40,
  },
});

export default class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    isCompleted: false,
    errorMessage: false,
  };


  startLoading = () => this.setState({ isLoading: true });
  endLoading = () => this.setState({ isLoading: false });
  setError = errorMessage => this.setState({ errorMessage });
  clearError = () => this.setState({ errorMessage: null });

 //handler der opdaterer state når indholdet i feltet bliver ændret
  handleChangeEmail = email => this.setState({ email });
  handleChangePassword = password => this.setState({ password });

  handleSubmit = async () => {
    // læser værdier fra state
    const { email, password} = this.state;
    try {
      this.startLoading();
      this.clearError();
      // kalder den rette funktion fra firebase til at tilføje værdier til auth
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(result);
      this.endLoading();
      this.setState({ isCompleted: true });
    } catch (error) {
      this.setError(error.message);
      this.endLoading();
    }
  };


  render = () => {
    const { errorMessage, email, password, isCompleted } = this.state;
    if (isCompleted) {
      this.props.navigation.navigate('SignUpInfo');
    }
    return (
      <View>
        <Text style={styles.header}>Sign up</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={this.handleChangeEmail}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={this.handleChangePassword}
          secureTextEntry
          style={styles.inputField}
        />
        {errorMessage && (
          <Text style={styles.error}>Error: {errorMessage}</Text>
        )}
        {this.renderButton()}
      </View>
    );
  };

  renderButton = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return <Button onPress={this.handleSubmit} title="Create user" />;
  };
}
