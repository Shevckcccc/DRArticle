import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import AppColors from '../../commons/AppColors';

export default class FollowingPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title= {{title: this.props.title, tintColor: 'white'}} 
          titleTextColor='white'
          statusBar={{style: 'light-content'}}
          tintColor={AppColors.major}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1
  },

  listView: {
     flex:1,
     marginTop: 0,
     backgroundColor: '#f5f5f5',
     marginBottom: 0,
  }
});
