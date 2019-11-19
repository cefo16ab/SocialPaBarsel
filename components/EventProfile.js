import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

//import { SearchBar } from 'react-native-paper';
export default class EventProfile extends React.Component {
 /*   state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };
*/

    render() {
        const { search } = this.state;
        return (
          <View style={styles.container}>
        
            <Text style={styles.paragraph}>
              Local files and assets can be imported by dragging and dropping them into the editor
            </Text>
           
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      },
      paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      }
    });
    