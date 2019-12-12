import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

//import { SearchBar } from 'react-native-paper';
export default class EventProfile extends React.Component {
    state = { event: null };

    componentDidMount() {
      // Vi udlæser ID fra navgation parametre og loader bilen når komponenten starter
      const id = this.props.navigation.getParam('id');
      this.loadEvent(id);
    }
  
    loadEvent = id => {
      firebase
        .database()
        // ID fra funktionens argument sættes ind i stien vi læser fra
        .ref(`/Events/${id}`)
        .on('value', snapshot => {
          this.setState({ event: snapshot.val() });
        });
    };
  
    render() {
        const { event } = this.state;
        if (!evet) {
          return <Text>No data</Text>;
        }
        return (
          <View style={styles.container}>
          
            <View style={styles.row}>
              <Text style={styles.label}>Brand</Text>
              <Text style={styles.value}>{event.brand}</Text>
            </View>
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
    