
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.100.60:3000/websocket'); //do this only once

class App extends Component<Props> {

  name = "";
  alamat = "";

  handleAdd(  ){
      Meteor.call('Chat.insert', { name: this.name,alamat: this.alamat, ktp: "009"}, (err, res) => {
          console.log('err res ', err, res)
      } )
  }

  renderItem( { item, index }){
      return(
          <View key={ index } style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'blue'}}>
              <Text>{ item.name }</Text>
              <Text>{ item.alamat }</Text>
          </View>
      )
  }

  render() {
      console.log(this.alamat);
      console.log('render ', this.props )
    return (
      <View style={styles.container}>
          <TextInput placeholder="name" style={{ borderBottomWidth:1 }}
              onChangeText = { ( text ) => {
                  this.name = text;
              }}
          />
      <TextInput placeholder="alamat" style={{ borderBottomWidth:1 }}
                  onChangeText = { ( text ) => {
                      this.alamat = text;
                  }}
              />
          <TouchableOpacity
              style={{ borderColor:'blue', borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 5, width: 70, height: 50, margin: 20 }}
              onPress={ this.handleAdd.bind(this) }
          >
              <Text>Insert</Text>
          </TouchableOpacity>

          <FlatList
              data={ this.props.chats }
              renderItem={ this.renderItem.bind(this) }
              keyExtractor={ ({ item, index }) => { return index }}
          />
      </View>
    );
  }
}

export default withTracker(params => {
  const handle = Meteor.subscribe('chat');

  return {
    todosReady: handle.ready(),
    chats: Meteor.collection('chat').find({}),
  };
})(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
