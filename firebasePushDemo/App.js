/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    this.checkPermission();
    this.createChannel();
    this.createTokenRefreshListener();
    this.createMessageListener();
    this.createNotificationListeners();
  }

    //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.messageListener();
    this.notificationListener();
    this.notificationDisplayedListener();
    this.notificationOpenedListener();
  }

  createChannel() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  createTokenRefreshListener() {
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log(`Token: ${fcmToken}`);
    });
  }

  createMessageListener() {
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      // Process your message as required
      console.log(`Message: ${RemoteMessage}`);
    });
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        notification.android.setChannelId('test-channel');
        firebase.notifications().displayNotification(notification);
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        notification.android.setChannelId('test-channel');
        firebase.notifications().displayNotification(notification);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        notificationOpen.notification.android.setChannelId('test-channel');
        firebase.notifications().displayNotification(notificationOpen.notification);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        notificationOpen.notification.android.setChannelId('test-channel');
        firebase.notifications().displayNotification(notificationOpen.notification);
    }
  }

  async checkPermission() {
    try{
        const enabled = await firebase.messaging().hasPermission();
        console.log(`check permission: ${enabled}`);
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    } catch (error) {
        console.log('reject permission');
    }
  }

  async getToken() {
      try{
          const fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
              console.log(`Token: ${fcmToken}`);
          } else {
              console.log('no Token');
          }
      } catch (error) {
          console.log("reject get token.");
      }
    }

  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native with Firebase Push Notification!</Text>
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
