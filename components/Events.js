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
 


  componentDidMount() {
    firebase
      .database()
      .ref('/Events/'+ '2500')
      .once('value', snapshot => {
        this.setState({ events: snapshot.val() });
      });
  }

 handleSelectEvent = id => {
   this.props.navigation.navigate('EventProfile', { id });
 };

  render() {
  
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
       <View style={{flexDirection:'row'}}> 
        <TextInput
          placeholder="Postnr"
          //value={inputPostnr}
          //onChangeText={this.handleChangeDescription}
          style={styles.inputField}
  
        />
        <Button style={styles.buttonPostnr} title="Press"/>
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
marginLeft: -50,
height: 20,
width: 50,

},
});