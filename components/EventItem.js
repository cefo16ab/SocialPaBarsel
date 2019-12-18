import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import PropTypes from 'prop-types';





  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      margin: 15,
      padding: 5,
      height: 50,
      justifyContent:'center'
    },
    label: { fontWeight: 'normal' },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
       
      },
      MainContainer :{
 
        justifyContent: 'space-between',
        flex:0.5,
        margin: 5,
        backgroundColor: '#ddd',
        maxWidth: '50%'
       
        
     
    },
     
    imageView: {
     
     
        height: 175,
        width: 175,
        
        
       
     
    },
     
    textView: {
     
        width:'50%', 
        textAlignVertical:'center',
        padding:10,
        color: '#000'
     
    },
    textStyle:{
      color: "#777", 
      paddingTop: 5
    },
  });
  
  export default class EventItem extends Component {
   // handlePress = () => {
      // Her pakker vi ting ud fra props
   //   const {id, onSelect} = this.props
      // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
     // onSelect(id)
  //  };
  handleSelect = () => {
    const { event, onSelect } = this.props;
    onSelect(event);
  };
    render() {
      const { event } = this.props;
      console.log(event.imageUrl);
      return (
        <TouchableOpacity style={{flex:1/2, aspectRatio:1, alignItems: "center", justifyContent:'space-between', marginBottom: 120 }} onPress={this.handleSelect}>
         <View style={{ backgroundColor: "#eee", borderRadius: 2, overflow: "hidden"}}>
           <Image style={styles.imageView} source={{ uri: event.imageUrl }} />
           <View style={{ padding: 10, width: 175 }}>
            <Text>{event.title}</Text>
             
             <Text style={styles.textStyle}>
             dato: {event.date} 
             </Text>
             <Text style={styles.textStyle}>
             kl. {event.time}
             </Text>
          </View>
          </View>
          
        </TouchableOpacity>
      );
    }
  }
  