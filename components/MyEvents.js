import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import firebase from 'firebase';
export default class AssetExample extends React.Component {
  //handler der håndtere navigation
  handleGoToCreate = () => {
    this.props.navigation.navigate('CreateEvent');
  };
  alertHandler=()=>{
    //funktion der laver simpel alert
    alert('Du er frameldt eventet');
  }
 
 

 

  handleLogOut = async () => {
    await firebase.auth().signOut();
    
  };
 
  
  
  
  render() {
    
    // Hvis der ikke er en bruger logget ind, vises der ingenting
   
    return (
   
      <ScrollView>
      <View>
        <TouchableOpacity style={styles.buttonHover}>
        <Button title="Opret event" onPress={this.handleGoToCreate}  color="black" />
        </TouchableOpacity>
        
 
       
          <Text>

          </Text>
        <Text>Tilmeldte events</Text>
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
          <Text>Title</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            Description of the image
          </Text>
          <Button title="Frameld" onPress={this.alertHandler}></Button>
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
          <Text>Title</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            Oprettede events
          </Text>
          <Button title="Frameld" onPress={this.alertHandler}></Button>
        </View>
     
      </View>
      
      </View>
      <Text>Tilmeldte events</Text>
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
          <Text>Title</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            Description of the image
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
          <Text>Title</Text>
          <Text style={{ color: "#777", paddingTop: 5 }}>
            Description of the image
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
  rightButton: {
    width: 100,
    height: 37,
    position: 'absolute',
    bottom: 8,
    right: 2,
    padding: 8
  },

});
