import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';

export default class AssetExample extends React.Component {
  handleGoToCreate = () => {
    this.props.navigation.navigate('CreateEvent');
  };
  alertHandler=()=>{
    //function to make simple alert
    alert('Du er frameldt eventet');
  }
  
  render() {
    return (

      <View>
        <TouchableOpacity style={styles.buttonHover}>
        <Button title="Opret event" onPress={this.handleGoToCreate}  color="black" />
        </TouchableOpacity>
        <ScrollView>
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
      </ScrollView>
    </View>
    
  
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
     height: 150,
     width: 150,
      margin: 10,
  },

  containerNy: {
    
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'tomato'
 },


  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    width: "95%", 
    margin: 10, 
    backgroundColor: '#DDF0F5', 
    
  },
  logo: {
    height: 150,
    width: 150,
    margin: 10,
  },
  imageView: {
  
    height: 150,
    margin: 5,
    resizeMode:'cover',
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
