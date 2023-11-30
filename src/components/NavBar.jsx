import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = ({ navigation }) => {
  const handlePress = (screen) => {
      navigation.navigate(screen);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => handlePress('Home')} style={styles.navItem}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Income')} style={styles.navItem}>
        <Text>Income</Text> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Expense')} style={styles.navItem}>
        <Text>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Settings')} style={styles.navItem}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#969867',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  }
});

export default NavBar;