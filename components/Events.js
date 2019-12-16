import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  Platform,
  TextInput,
  Button,
  
} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
import EventItem from './EventItem';
import EventProfile from './EventProfile';
import { getTimeFieldValues } from 'uuid-js';




export default class Events extends React.Component {

  state = {
    events: {},
  };
  state = {
    inputPostnr: "",
  };


  componentDidMount() {
    firebase
      .database()
      .ref('/Events/'+ '2500')
      .once('value', snapshot => {
        this.setState({ events: snapshot.val() });
      });
  }

 handleSelectEvent = event => {
   this.props.navigation.navigate('EventProfile', { event });
 };


 handleChangeSearch = inputPostnr => this.setState({ inputPostnr });
 handleSearch = async () => {
  
    // Her kalder vi den rette funktion fra firebase auth
    firebase
      //.auth()
      .database()
      .ref('/Events/'+ inputPostnr)
      .once('value', snapshot => {
        this.setState({ events: snapshot.val() });
      });
};
  render() {
    const { inputPostnr } = this.state;
    const { events } = this.state;

    // Vi viser ingenting hvis der ikke er data
    if (!events) {
      return null;
    }
    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const eventArray = Object.values(events);
    // Vi skal også bruge alle IDer, så vi tager alle keys også.
    const eventKeys = Object.keys(events);
    return (

      <View style={styles.container}>
      <View style={{flexDirection:'row', backgroundColor:'#DDF0F5', borderColor: "black"}}> 
        <TextInput style={styles.inputSearch}
          placeholder="Skriv postnummer"
          value={inputPostnr}
          onChangeText={this.handleChangeSearch}
        />
       
        <Button color='black'  onPress={this.handleSearch} title="Press" backgroundColor='#DDF0F5'/>
        </View>
      
      
        <FlatList
          data={eventArray}
          // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
          keyExtractor={(item, index) => eventKeys[index]}
          numColumns={2}
          renderItem={({ item, index }) => (
            <EventItem
              event={item}
              id={eventKeys[index]}
              onSelect={this.handleSelectEvent}
            />
          )}
        />
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
container: {
  
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     margin: 5,
},
inputField: {
  borderWidth: 1,
  margin: 10,
  padding: 10,

},

buttonPostnr:{
//marginLeft: -50,
//height: 20,
//width: 50,
backgroundColor: '#DDF0F5',
//borderColor: '#DDF0F5',
//borderWidth: 1,
//color: 'white',
fontSize: 24,
//fontWeight: 'bold',
//overflow: 'hidden',
//textAlign:'center',
},
inputSearch:{
  width: 280,
  //height:20,
  //paddingRight:50,
  backgroundColor: '#DDF0F5',
},

buttonStyle:{
 backgroundColor:'#DDF0F5',
 color:'white',

},

});