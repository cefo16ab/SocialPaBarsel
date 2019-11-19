import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';





  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      margin: 5,
      padding: 5,
      height: 50,
      justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
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
        <TouchableOpacity style={styles.container} onPress={this.handlePress}>
          <Text style={styles.label}>
            {event.title} {event.time}
          </Text>
        </TouchableOpacity>
      );
    }
  }
  