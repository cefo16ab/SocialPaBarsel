import * as React from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
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

startLoading = () => this.setState({ isLoading: true });
endLoading = () => this.setState({ isLoading: false });
setError = errorMessage => this.setState({ errorMessage });
clearError = () => this.setState({ errorMessage: null });

handleChangeName = name => this.setState({ name });
handleChangeNumber = number => this.setState({ title });
  
  handleSubmit = async () => {
 
    const { name, number } = this.state;
    try {
      this.startLoading();
      this.clearError();


   const result = await firebase
   .database()
   .ref('/Users/')
   .push({name, number });
 console.log(result);
 this.endLoading();
 this.setState({ isCompleted: true });
} catch (error) {
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
