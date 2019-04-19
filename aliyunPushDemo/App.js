/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AliyunPush from 'react-native-aliyun-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    componentDidMount() {
        AliyunPush.addListener(this.handleAliyunPushMessage);

        AliyunPush.getDeviceId()
            .then((deviceId)=>{
                console.log("deviceId:"+deviceId);
            })
            .catch((error)=>{
                console.log("getDeviceId() failed");
            });
    }

    componentWillUnmount() {
        AliyunPush.removeListener(this.handleAliyunPushMessage);
    }

    handleAliyunPushMessage = (e) => {
        console.log("Message Received. " + JSON.stringify(e));
    };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native with Aliyun Push Demo!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Author: Myron Li</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
