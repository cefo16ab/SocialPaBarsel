import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import firebase from 'firebase';

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

export default class MyEvents extends React.Component {
  //handler der håndtere navigation
  handleGoToCreate = () => {
    this.props.navigation.navigate('CreateEvent');
  };
 
 
 

 

  handleLogOut = async () => {
    await firebase.auth().signOut();
    
  };
 
  
  static navigationOptions =
  {
    title: 'Mine events',
    headerRight: () => <SideMenu/>,
  };
 
  
  render() {
    const { user } = firebase.auth();
    // Hvis der ikke er en bruger logget ind, vises der ingenting
   
    return (
     
      <ScrollView>
      <View>
    
        
        <TouchableOpacity style={styles.buttonHover}>
        <Button title="Opret event" onPress={this.handleGoToCreate}  color="black" />
        </TouchableOpacity>
        
 
       
          <Text>

          </Text>
          <Text style={styles.textSize}>Tilmeldte events</Text>
        <Text>____________________________________________</Text>
      <View style={{ alignItems: "center", flexDirection: 'row', justifyContent:'space-between', margin: 5 }}>
      <View style={{ backgroundColor: "#eee", borderRadius: 2, overflow: "hidden" }}>
        
        <View>
          <Image
            source={require('../assets/gaatur.jpg')}
            style={{
              height: 175,
              width: 175
            }}
          />
        </View>
        <View style={{ padding: 10, width: 175 }}>
          <Text>Gårtur i Søndermarken</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            dato: 08-01-2020
          </Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            Kl.10.30
          </Text>
        </View>
     
      </View>
      <View style={{ backgroundColor: "#eee", borderRadius: 2, overflow: "hidden" }}>
        <View>
          <Image
            source={require('../assets/coffee.jpg')}
            style={{
              height: 175,
              width: 175
            }}
          />
        </View>
        <View style={{ padding: 10, width: 175 }}>
          <Text>Kom til kaffe og kage hos mig</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            dato: 04-01-2020
          </Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            kl.10
          </Text>
        </View>
     
      </View>
      
      </View>
      <Text style={styles.textSize}>Oprettede events</Text>
        <Text>____________________________________________</Text>
      <View style={{ alignItems: "center", flexDirection: 'row', justifyContent:'space-between', margin: 5 }}>
      <View style={{ backgroundColor: "#eee", borderRadius: 2, overflow: "hidden" }}>
        
        <View>
          <Image
            source={require('../assets/baby_svom.jpg')}
            style={{
              height: 175,
              width: 175
            }}
          />
        </View>
        <View style={{ padding: 10, width: 175 }}>
       
          <Text>Babysvømning (6-9 mdr.)</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            dato: 10-01-2020
          </Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            kl. 12.00
          </Text>
        </View>
     
      </View>
      
     
  
      
      </View>
      <Button onPress={this.handleLogOut} title="Log out" />
      
    </View>
    
    </ScrollView>
     
    );
  }
}

const styles = StyleSheet.create({

  buttonHover: {
    marginTop: 10,
    borderRadius:1,
    marginLeft: 4,
    marginRight: 4,
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
  },
  top:{
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    top: 0,
    height: 64,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'relative',
  },
  text:{
    marginTop:20,
  },
  textSize:{
    fontSize: 25,
  },
  rightButton: {
    width: 100,
    height: 37,
    position: 'absolute',
    bottom: 8,
    right: 2,
    padding: 8
  },

});
