import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const CustomButton = ({ onPress, title, isActive }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButton, isActive ? styles.activeButton : styles.inactiveButton]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
    const [reminder, setReminder] = useState(true);
    const [recurring, setRecurring] = useState(true);
    const [dataBackup, setDataBackup] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [notificationPreference, setNotificationPreference] = useState({
        email: true,
        push: true,
    });

    const saveSettings = () => {
        Alert.alert('Settings Saved');
    };

    const handleReminderToggle = (value) => {
        setReminder(value);
        if (!value) {
            setNotificationPreference({ email: false, push: false });
        }
    };

    const handleNotificationPreferenceToggle = (type) => {
        setNotificationPreference((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));

        if (!reminder && (!notificationPreference.email || !notificationPreference.push)) {
            setReminder(true);
        }
    };

    const handleRecurringToggle = (value) => {
        setRecurring(value);
        if (!value) {
            setSelectedDays([]);
        }
    };

    const handleDayToggle = (day) => {
        if (!recurring) {
            setRecurring(true);
        }

        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    

    return (
        <MainLayout navigation={navigation}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Settings</Text>
                
                <View style={styles.row}>
                    <Text>Enable Reminder</Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton title="On" onPress={() => handleReminderToggle(true)} isActive={reminder} />
                        <CustomButton title="Off" onPress={() => handleReminderToggle(false)} isActive={!reminder} />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text>Notification</Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Email" onPress={() => handleNotificationPreferenceToggle('email')} isActive={notificationPreference.email} disabled={!reminder} />
                        <CustomButton title="Push" onPress={() => handleNotificationPreferenceToggle('push')} isActive={notificationPreference.push} disabled={!reminder} />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text>Data Backup</Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton title="On" onPress={() => setDataBackup(true)} isActive={dataBackup} />
                        <CustomButton title="Off" onPress={() => setDataBackup(false)} isActive={!dataBackup} />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text>Recurring Reminder</Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Yes" onPress={() => handleRecurringToggle(true)} isActive={recurring} />
                        <CustomButton title="No" onPress={() => handleRecurringToggle(false)} isActive={!recurring} />
                    </View>
                </View>

                <Text>Select days</Text>
                <View style={styles.daysContainer}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <TouchableOpacity 
                            key={day} 
                            style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDay]}
                            onPress={() => handleDayToggle(day)}
                            disabled={!recurring}>
                            <Text style={styles.dayButtonText}>{day}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <CustomButton title="Save Settings" onPress={saveSettings} isActive={true} />                
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: '#969867',
        padding: 6,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    customButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    activeButton: {
        backgroundColor: '#BDB76B',
    },
    inactiveButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    disabledText: {
        color: 'gray', 
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    dayButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        backgroundColor: 'gray',
        margin: 2,
        flexBasis: '13%',
    },
    selectedDay: {
        backgroundColor: '#BDB76B',
    },
    dayButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default SettingsScreen;
