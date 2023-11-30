import React, { useState, useEffect} from 'react';
import { Alert, View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const HomeScreen = ({ navigation }) => {
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expensedAmount, setExpensedAmount] = useState(0);
  const [savingGoal, setSavingGoal] = useState('1000.00');
  const [calculatedRemainingAmount, setCalculatedRemainingAmount] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[currentDate.getMonth()];
    setCurrentMonth(currentMonthName);
  }, []);
  
  const updateIncomeAmount = (text) => {
    setIncomeAmount(parseFloat(text) || 0);
  };

  const updateExpensedAmount = (text) => {
    setExpensedAmount(parseFloat(text) || 0);
  };

  const updateAndCheckGoal = () => {
    const newRemainingAmount = incomeAmount - expensedAmount;
    setCalculatedRemainingAmount(newRemainingAmount);
    if (newRemainingAmount < parseFloat(savingGoal)) {
      Alert.alert(
        "Reminder",
        "Your remaining amount is less than your monthly saving goal!",
        [{ text: "OK", onPress: () => console.log("Alert closed") }]
      );
    }
  };

  return (
    <MainLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Home</Text>
        <Text style={styles.month}>{currentMonth}</Text>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Remaining Amount</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amount}>${calculatedRemainingAmount.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.goalLabel}>Your Monthly Saving Goal</Text>
        <View style={styles.sliderContainer}>
          <TextInput
            style={styles.sliderValue}
            value={`$${savingGoal}`}
            onChangeText={text => setSavingGoal(text.replace('$', ''))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Total Income</Text>
          <TextInput
            style={styles.input}
            placeholder="$"
            keyboardType="numeric"
            onChangeText={updateIncomeAmount}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Total Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="$"
            keyboardType="numeric"
            onChangeText={updateExpensedAmount}
          />
        </View>

        <Button 
          title="Update" 
          onPress={updateAndCheckGoal} 
          color='#BDB76B'
        />

        <View style={styles.aboutButtonContainer}>
          <Button title="About the App" onPress={() => navigation.navigate('About')} color='#B8860B'/>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  month: {
    fontSize: 20,
    textAlign: 'center',
  },
  amountContainer: {
    backgroundColor: '#808080',
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },  
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  goalLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom:10,
    color: 'black',
    height: 45,
    width: '60%',
  },
  aboutButtonContainer: {
    marginTop: 80, 
    color:'#BDB76B'
  },
});

export default HomeScreen;