import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Expense Tracker App" />
      <View style={styles.content}>
        {React.Children.map(children, child => React.cloneElement(child, { navigation }))}
      </View>
      <NavBar navigation={navigation} />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainLayout;