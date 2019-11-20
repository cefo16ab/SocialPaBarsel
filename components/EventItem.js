import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import PropTypes from 'prop-types';





  
const styles = StyleSheet.create({
  
    label: { fontWeight: 'normal' },

     
    imageView: {
     
        height: 150,
        margin: 5,
        resizeMode:'cover',
       
     
    },
     
    textView: {
     
        width:'50%', 
        textAlignVertical:'center',
        padding:10,
        color: '#000'
     
    },
  });
  
  export default class EventItem extends Component {
    handlePress = () => {
      // Her pakker vi ting ud fra props
      const {id, onSelect} = this.props
      // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
      onSelect(id)
    };
  
    render() {
      const { event } = this.props;
      return (
        <TouchableOpacity style={{flex:1/2, aspectRatio:1}} onPress={this.handlePress}>
         
           <Image style={styles.imageView} source={{ uri: event.imageUrl }} />
          <Text style={styles.textView}>
            {event.title} {event.time}
            
          </Text>
         
        </TouchableOpacity>
      );
    }
  }
  