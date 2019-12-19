import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
  

import firebase from 'firebase';
import EventItem from './EventItem';




class SideMenu extends React.Component{
  render() {
    return (
      <TouchableOpacity onPress={this.menuHandler}>
      <Image
        source={require('../assets/hamburger.jpg')}
        style={{ width: 30, height: 30, margin: 5 }}
        
      />
      </TouchableOpacity>
    );
  }
}
menuHandler=()=>{
 

<MenuProvider style={{ flexDirection: "column", padding: 30 }}>
        <Menu onSelect={value => alert(`You Clicked : ${value}`)}>

          <MenuTrigger  >
          <Text style={styles.headerText}>DropDown Menu</Text>
          </MenuTrigger  >

          <MenuOptions>
            <MenuOption value={"Login"}>
              <Text style={styles.menuContent}>Login</Text>
            </MenuOption>
            <MenuOption value={"Register"}>
              <Text style={styles.menuContent}>Register</Text>
            </MenuOption>
            <MenuOption value={"Download"}>
              <Text style={styles.menuContent}>Download</Text>
            </MenuOption>
            <MenuOption value={"Logout"}>
              <Text style={styles.menuContent}>Logout</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true}>
              <Text style={styles.menuContent}>Disabled Menu</Text>
            </MenuOption>
          </MenuOptions>

        </Menu>
      </MenuProvider>

}
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
 // handler der håndtere navigation
 handleSelectEvent = event => {
   this.props.navigation.navigate('EventProfile', { event });
 };

 //handler der opdaterer state når indholdet i feltet bliver ændret
 handleChangeSearch = inputPostnr => this.setState({ inputPostnr });
 
 // search fungere ikke
 handleSearch = async () => {
  
    firebase
      .database()
      .ref('/Events/'+ inputPostnr)
      .once('value', snapshot => {
        this.setState({ events: snapshot.val() });
      });
};

static navigationOptions = ({ navigation }) => ({

  title: '2500 Valby',
  headerRight: () => <SideMenu/>,
 
  });

  render() {
    const { inputPostnr } = this.state;
    const { events } = this.state;

    // hvis der ikke er data, vises der ingenting
    if (!events) {
      return null;
    }
    //tager alle values fra events objekt og bruger som array i listen
   
    const eventArray = Object.values(events);
    //skal bruge id, så vi tager alle keys.
    const eventKeys = Object.keys(events);
    return (

      <View style={styles.container}>
      <TouchableOpacity style={styles.buttonPostnr}> 
        <TextInput style={styles.inputField} 
          placeholder="Skriv postnummer                  søg"
          value={inputPostnr}
          onChangeText={this.handleChangeSearch}
        />
        </TouchableOpacity>
      <Text>
        
      </Text>
      
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
  paddingTop: (Platform.OS) === 'ios' ? 5 : 0,
  margin: 5,
    
},
inputField: {
  borderWidth: 2,
  margin: 5,
  padding: 5,
  borderColor: '#99B6B6',
},

buttonPostnr:{
  marginTop: 1,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 1,
  paddingRight: 1,
  flexDirection: 'row',
  shadowColor: 'rgba(162, 191, 191, 0.4)',
  shadowOpacity: 1.5,
  
  shadowRadius: 20 ,
  shadowOffset : { width: 1, height: 10},
  backgroundColor: '#A2BFBF',
  color: '#FFFFFF'
//marginLeft: -50,
//height: 20,
//width: 50,
//backgroundColor: '#DDF0F5',
//borderColor: '#DDF0F5',
//borderWidth: 1,
//color: 'white',
//fontSize: 24,
//fontWeight: 'bold',
//overflow: 'hidden',
//textAlign:'center',
},

});