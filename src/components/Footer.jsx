import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Created by: CodeCartel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 40,
    width: '100%',
    backgroundColor: '#969867', 
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  text: {
    color: '#FFFFFF',
  },
});

export default Footer;