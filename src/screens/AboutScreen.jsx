import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const AboutScreen = ({ navigation }) => {
  return (
    <MainLayout navigation={navigation}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Name of App: Expense Tracker App</Text>
        <Text>Author: Fardin, Billy, Nathan, Felix</Text>
        <Text>Current Date: {new Date().toLocaleDateString()}</Text>
      </View>
    </MainLayout>
  );
};

export default AboutScreen;
