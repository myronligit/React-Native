/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

global.PaymentRequest = require('react-native-payments').PaymentRequest;
type Props = {};
export default class App extends Component<Props> {
  handlePress(){
    const METHOD_DATA = [{
      supportedMethods: ['android-pay'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        currencyCode: 'USD',
        environment: 'TEST', // defaults to production
        paymentMethodTokenizationParameters: {
          tokenizationType: 'NETWORK_TOKEN',
          parameters: {
            publicKey: 'your-pubic-key'
          }
        }
      }
    }];

    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Movie Ticket',
          amount: { currency: 'USD', value: '15.00' }
        }
      ],
      total: {
        label: 'Merchant Name',
        amount: { currency: 'USD', value: '15.00' }
      }
    };

    const OPTIONS = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true
    };

    const pr = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

    pr.show().then(paymentResponse => paymentResponse.complete('success'));

    /*pr.show()
      .then(paymentResponse => {
        const { getPaymentToken } = paymentResponse.details;

        return getPaymentToken()
          .then(paymentToken => fetch('...', {
            method: 'POST',
            body: {
              paymentToken
            }
          })
          .then(res => res.json())
          .then(successHandler)
          .catch(errorHandler);
        });
      });*/
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Buy Now" onPress={this.handlePress} />
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
