import * as React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';


export default class EventProfile extends React.Component {
  alertHandler=()=>{
    //function der laver en simpel alert
    alert('Du er tilmeldt');
  }

  render(){
    const event = this.props.navigation.getParam('event');
    // viser en fejlbesked hvis et event ikke er defineret
    if (!event) {
      return <Text>Der er ikke et speciferet event i navigation parametret</Text>;
    }
    return (
      <View style={styles.container}>
      <View style={styles.containerTo}>
        <Image style={styles.image} source={{ uri: event.imageUrl }} />
        <View style={{ padding: 10, width: 300, alignItems: 'center', }}>
          <Text style={styles.header}>
            {event.title} 
            
          </Text>
        <Text>{event.description}</Text>
        <Text style={{fontSize: 17, padding: 7}}>Tidspunkt</Text> 
        <Text>{event.date} kl.{event.time}</Text>
        <Text style={{fontSize: 17, padding: 7}}>Adresse</Text> 
        <Text>{event.address}, {event.postnr}</Text>
        
        <View>
          <Button title="Tilmeld" onPress={this.alertHandler}></Button>
        </View>

        </View>
      </View>
      </View>
    );
  }
}
    
    const styles = StyleSheet.create({
     
      image: {
        width: 300,
        height: 300,
      },
      container: {
       
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#eee", 
        borderRadius: 2, 
        overflow: "hidden"
      },

      containerTo: {
        alignItems: "center", 
        justifyContent:'space-around', 
        margin: 5
      },
      header: {
        fontSize: 20,
      },
    });