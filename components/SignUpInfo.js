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
  state = {
    name: '',
    number:'',
   
   


    isLoading: false,
    isCompleted: false,
    errorMessage: null,
  };
export default class SignUpInfo extends React.Component {
// Kaldes når vi starter en operation der skal vise en spinner
startLoading = () => this.setState({ isLoading: true });
// Kaldes når en operation er færdig
endLoading = () => this.setState({ isLoading: false });
// Kaldes når der er sket en fejl og den skal vises
setError = errorMessage => this.setState({ errorMessage });
// Kaldes når vi prøver igen og aktuelle fejl skal fjernes
clearError = () => this.setState({ errorMessage: null });

handleChangeName = name => this.setState({ name });
  handleChangeNumber = number => this.setState({ title });
  
  handleSubmit = async () => {
    // Læser værdier fra state
    const { name, number } = this.state;
    try {
      this.startLoading();
      this.clearError();

   // Her kalder vi den rette funktion fra firebase auth
   const result = await firebase
   //.auth()
   .database()
   .ref('/Users/')
   .push({name, number });
 console.log(result);
 this.endLoading();
 this.setState({ isCompleted: true });
} catch (error) {
 // Vi sender `message` feltet fra den error der modtages, videre. 
 console.error(error);
 this.setError(error.message);
 this.endLoading();
}
}; 

render = () => {
   
    const { errorMessage, name, number, isCompleted } = this.state;
    if (isCompleted) {
      return <Text>You are now signed up</Text>;
    }
  
    return (
      <ScrollView>
         
         <Text style={styles.header}>Create event</Text>
        

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={this.handleChangeName}
          style={styles.inputField}
        />
       
        
        <TextInput
          placeholder="Telefonnummer"
          value={number}
          onChangeText={this.handleChangeNumber}
          style={styles.inputField}
        />



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
    return <Button onPress={this.handleSubmit} title="OK" color="black"/>;
  };

}
