import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

export default class AssetExample extends React.Component {
  handleGoToCreate = () => {
    this.props.navigation.navigate('CreateEvent');
  };
  
  render() {
    return (
      <View style={styles.buttonView}>
        <Button title="Opret event" onPress={this.handleGoToCreate}  color="black" />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
    height: 128,
    width: 128,
  }
});
