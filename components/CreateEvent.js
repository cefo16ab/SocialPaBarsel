import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as React from 'react';
import DatePicker from 'react-native-datepicker'
import TimePicker from 'react-native-simple-time-picker';
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
  TouchableOpacity,

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
  buttonView: {
    width: "95%", 
    margin: 10, 
    backgroundColor: '#DDF0F5', 
    
  },
  buttonHover: {
    marginTop: 10,
    borderRadius:25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    shadowColor: 'rgba(162, 191, 191, 0.4)',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20 ,
    shadowOffset : { width: 1, height: 13},
    backgroundColor: '#A2BFBF',
    color: '#FFFFFF'
  }
 
});

export default class createEvent extends React.Component {
  state = {
    title: '',
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
  handleChangeDate = date => this.setState({date});
 
  componentDidMount() {
    this.getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return(
            <View >
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
    const imageName = "Event-image-"+Math.random()
    console.log(imageName)
    var ref = firebase.storage().ref().child(imageName); 
    await ref.put(blob);
    return await ref.getDownloadURL()
  }
  handleSubmit = async () => {
    // Læser værdier fra state
    const { title, time, description, address, postnr, date, image } = this.state;
    try {
      this.startLoading();
      this.clearError();
      const imageUrl=  await this.uploadImage (image)
    //  console.log(uploadResult);


      // Her kalder vi den rette funktion fra firebase auth
      const result = await firebase
        //.auth()
        .database()
        .ref('/Events/'+ postnr)
        .push({title, time, description, address, postnr, date, imageUrl });
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

  constructor(props){
    super(props)
    this.state = {date:"16-12-2019"},
    this.state = {time:"10.30"}
  }


  render = () => {
   
    const { errorMessage, title, time, description, address, postnr, date, image, isCompleted } = this.state;
    if (isCompleted) {
      return <Text>You are now signed up</Text>;
    }
  
    return (
      <ScrollView>
         
         <Text style={styles.header}>Create event</Text>
         <TouchableOpacity style={styles.buttonHover}>
       <Button
          title="Vælg et billede fra kamerarullen"
         color='black'
          onPress={this.pickImage}
        /></TouchableOpacity>
       
         
          {image&& <Image style={{ width: 320, height: 320}} source={{uri:image}} />}
         

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={this.handleChangeTitle}
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
<View style={{flexDirection:'row',  justifyContent:'center'}}>
<DatePicker
        style={{width: 160}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY" 
        minDate="01-12-2019" 
        maxDate="01-04-2020"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={this.handleChangeDate}
      />

<DatePicker
        style={{width: 160}}
        time={this.state.time}
        mode="time"
        placeholder="select time"
        format="hh.mm" 
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
       
        onTimeChange={this.handleChangeTime}

      />

</View>



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
    return <Button onPress={this.handleSubmit} title="Create event" color="black"/>;
  };
}
