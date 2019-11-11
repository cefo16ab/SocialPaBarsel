import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
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

export default class createEvent extends React.Component {
  state = {
    title: '',
    time: '',
    description:'',
    address:'',
    postnr: '',
    image: null,
   


    isLoading: false,
    isCompleted: false,
    errorMessage: null,
  };

// Kaldes når vi starter en operation der skal vise en spinner
  startLoading = () => this.setState({ isLoading: true });
  // Kaldes når en operation er færdig
  endLoading = () => this.setState({ isLoading: false });
  // Kaldes når der er sket en fejl og den skal vises
  setError = errorMessage => this.setState({ errorMessage });
  // Kaldes når vi prøver igen og aktuelle fejl skal fjernes
  clearError = () => this.setState({ errorMessage: null });

  // Event handlers som opdaterer state hver gang feltets indhold ændres
  handleChangeTitle = title => this.setState({ title });
  handleChangeTime = time => this.setState({ time });
  handleChangeDescription = description => this.setState({ description });
  handleChangeAddress = address => this.setState({ address }); 
  handleChangePostnr = postnr => this.setState({ postnr });
  //uploadImage = image => this.setState({ image });
 
  componentDidMount() {
    this.getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return(
            <View>
          <Text>No access to camera.</Text>
           <Button
          style={styles.button}
          title="Gå til settings"
          onPress={openSettings}
        />
        </View>
        );
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("Event-image");
    return ref.put(blob);
  }
  handleSubmit = async () => {
    // Læser værdier fra state
    const { title, time, description, address, postnr, image } = this.state;
    try {
      this.startLoading();
      this.clearError();
      const uploadResult=  await uploadImage (this.image)
     console.log(uploadResult);


      // Her kalder vi den rette funktion fra firebase auth
      const result = await firebase
        //.auth()
        .database()
        .ref('/Event/'+ postnr)
        .push({title, time, description, address, postnr, imageUrl });
      console.log(result);
      this.endLoading();
      this.setState({ isCompleted: true });
    } catch (error) {
      // Vi sender `message` feltet fra den error der modtages, videre. 
      this.setError(error.message);
      this.endLoading();
    }
  };


  render = () => {
    const { errorMessage, title, time, description, address, postnr, image, isCompleted } = this.state;
    if (isCompleted) {
      return <Text>You are now signed up</Text>;
    }
    return (
      <View>
          <Text style={styles.header}>Create event</Text>
          <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
          {image&& <Image style={{ width: 320, height: 320}} source={{uri:image}} />}
        
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={this.handleChangeTitle}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Time"
          value={time}
          onChangeText={this.handleChangeTime}
          style={styles.inputField}
        />
        
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={this.handleChangeDescription}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={this.handleChangeAddress}
          style={styles.inputField}
        />

        <TextInput
          placeholder="Post nr."
          value={postnr}
          onChangeText={this.handleChangePostnr}
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
    return <Button onPress={this.handleSubmit} title="Create event" />;
  };
}
