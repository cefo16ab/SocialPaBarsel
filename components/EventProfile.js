import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


export default class EventProfile extends React.Component {
  render(){
    const event = this.props.navigation.getParam('event');
    // Og viser en fejlbesked hvis user ikke er defineret
    if (!event) {
      return <Text>No event specified in navigation params</Text>;
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: event.imageUrl }} />
          <Text style={styles.header}>
            {event.title} {event.time}
            
          </Text>
        <Text>{event.description}</Text>
        <Text>{event.date}</Text>
        <Text>
        {event.address}
        </Text>
      </View>
    );
  }
}
    
    const styles = StyleSheet.create({
      // Man skal altid angive størrelsen på billeeder som loades fra netværk
      image: {
        width: 300,
        height: 300,
        marginRight: 10,
      },
      container: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      header: {
        fontSize: 24,
      },
    });