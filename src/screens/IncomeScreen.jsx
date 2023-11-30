import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Alert, Modal } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const IncomeScreen = ({ navigation }) => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [incomeCategory, setIncomeCategory] = useState('Salary');
    const [amount, setAmount] = useState('');
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [monthModalVisible, setMonthModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [incomeList, setIncomeList] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const categories = ['Salary', 'Dividend', 'Stock Gain', 'Interest'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleAddIncome = () => {
        if (!isNaN(amount) && parseFloat(amount) >= 0) {
            const newIncome = {
                category: incomeCategory,
                amount: parseFloat(amount).toFixed(2),
            };
            setIncomeList([...incomeList, newIncome]); // Add the new income entry
            const newTotalIncome = parseFloat(totalIncome) + parseFloat(amount);
            setTotalIncome(newTotalIncome.toFixed(2));
            setAmount('');
        } else {
            Alert.alert('Invalid Amount', 'Please enter a valid number.');
        }
    };

    const handleEditIncome = (index) => {
        // Set the editIndex state to the index of the entry being edited
        setEditIndex(index);
        // Pre-fill the edit form with the data from the entry being edited
        setIncomeCategory(incomeList[index].category);
        setAmount(incomeList[index].amount);
    };

    const handleModifyIncome = () => {
        // Make sure the new amount is valid
        if (!isNaN(amount) && parseFloat(amount) >= 0) {
            // Create a copy of the income list
            const updatedIncomeList = [...incomeList];
            // Update the income entry at the editIndex with the new data
            updatedIncomeList[editIndex] = {
                category: incomeCategory,
                amount: parseFloat(amount).toFixed(2),
            };
            // Update the income list with the modified entry
            setIncomeList(updatedIncomeList);
            // Recalculate the total income
            const newTotalIncome = updatedIncomeList.reduce(
                (total, entry) => total + parseFloat(entry.amount),
                0
            );
            setTotalIncome(newTotalIncome.toFixed(2));
            // Reset the editIndex and clear the form
            setEditIndex(-1);
            setIncomeCategory('Salary');
            setAmount('');
        } else {
            Alert.alert('Invalid Amount', 'Please enter a valid number.');
        }
    };

    const handleDeleteIncome = (index) => {
        // Create a copy of the income list
        const updatedIncomeList = [...incomeList];
        // Remove the income entry at the specified index
        updatedIncomeList.splice(index, 1);
        // Update the income list
        setIncomeList(updatedIncomeList);
        // Recalculate the total income
        const newTotalIncome = updatedIncomeList.reduce(
            (total, entry) => total + parseFloat(entry.amount),
            0
        );
        setTotalIncome(newTotalIncome.toFixed(2));
        // Reset the editIndex
        setEditIndex(-1);
    };

    

    const handleCameraAccessRequest = () => {
        Alert.alert(
            "Expense Tracker would like to access the camera",
            "",
            [
                {
                    text: "Don't Allow",
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                {
                    text: "OK",
                    onPress: () => console.log('Permission granted'),
                },
            ],
            { cancelable: false }
        );
    };

    const renderDropdown = (data, onSelect, closeModal) => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => closeModal()}
            animationType="slide"
        >
            <View style={styles.dropdown}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => {
                            onSelect(item);
                            closeModal();
                        }}
                    >
                        <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    );      

    const renderIncomeEntries = () => {
        return incomeList.map((item, index) => (
            <View key={index} style={styles.incomeEntryContainer}>
                <Text style={styles.incomeEntryCategory}>{item.category}</Text>
                <Text style={styles.incomeEntryAmount}>${item.amount}</Text>
                <View style={styles.editDeleteButtons}>
                    <TouchableOpacity
                        onPress={() => handleEditIncome(index)} // Call edit function with the index
                        style={[styles.editButton, styles.button]}
                    >
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteIncome(index)} // Call delete function with the index
                        style={[styles.deleteButton, styles.button]}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    return (
        <MainLayout navigation={navigation}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Income</Text>

                <View style={styles.totalIncomeContainer}>
                    <Text style={styles.totalIncome}>${totalIncome}</Text>
                </View>

                {/* Display Income Entries */}
                {incomeList.length > 0 && (
                    <View style={styles.incomeEntriesContainer}>
                        <Text style={styles.incomeHeader}>Income Entries</Text>
                        {renderIncomeEntries()}
                    </View>
                )}

                {/* Edit Form */}
                {editIndex !== -1 && (
                    <View style={styles.editForm}>
                        <Text>Edit Income Entry</Text>
                        <View style={styles.inlineContainer}>
                            <Text style={styles.inlineLabel}>Income Category</Text>
                            <TouchableOpacity
                                onPress={() => setCategoryModalVisible(true)}
                                style={styles.inlineDropdown}
                            >
                                <Text style={styles.pickerText}>{incomeCategory}</Text>
                            </TouchableOpacity>
                        </View>
                        {categoryModalVisible && renderDropdown(
                            categories,
                            setIncomeCategory,
                            () => setCategoryModalVisible(false)
                        )}
                        <View style={styles.inlineContainer}>
                            <Text style={styles.inlineLabel}>Amount</Text>
                            <TextInput
                                style={styles.inlineInput}
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="$"
                                keyboardType="numeric"
                            />
                        </View>
                        <Button title="Modify" onPress={handleModifyIncome} color="#556B2F" />
                    </View>
                )}

                <Text>Add New Income</Text>
                <View style={styles.monthDropdown}>
                    <TouchableOpacity onPress={() => setMonthModalVisible(true)}>
                        <Text style={styles.pickerText}>{months[parseInt(selectedMonth)]}</Text>
                    </TouchableOpacity>
                </View>
                {monthModalVisible && renderDropdown(
                    months,
                    (selected) => setSelectedMonth(months.indexOf(selected).toString()),
                    () => setMonthModalVisible(false)
                )}

                <View style={styles.inlineContainer}>
                    <Text style={styles.inlineLabel}>Income Category</Text>
                    <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.inlineDropdown}>
                        <Text style={styles.pickerText}>{incomeCategory}</Text>
                    </TouchableOpacity>
                </View>
                {categoryModalVisible && renderDropdown(
                    categories,
                    setIncomeCategory,
                    () => setCategoryModalVisible(false)
                )}

                <View style={styles.inlineContainer}>
                    <Text style={styles.inlineLabel}>Amount</Text>
                    <TextInput
                        style={styles.inlineInput}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="$"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inlineContainer}>
                    <Text style={styles.inlineLabel}>Photo / Receipt</Text>
                    <TouchableOpacity onPress={handleCameraAccessRequest} style={[styles.inlineButton, styles.button]}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                </View>

                <Button title="Add" onPress={handleAddIncome} color="#556B2F" />
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    pickerText: {
        fontSize: 18,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        textAlign: 'center',
    },
    monthDropdown: {
        marginBottom: 10,
    },
    totalIncomeContainer: {
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#808080',
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
    },
    totalIncome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    inlineLabel: {
        fontSize: 16,
        color: 'black',
        marginRight: 2,
        width: '30%',
    },
    inlineDropdown: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        height: 45,
        width: '70%',
    },
    inlineInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: 'black',
        height: 45,
        width: '70%',
    },
    inlinePhotoButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        width: '70%',
    },
    dropdown: {
        marginTop: 50,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    dropdownText: {
        fontSize: 16,
    },
    photoButton: {
        alignSelf: 'flex-end',
        padding: 8,
        margin: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    addButton: {
        marginTop: 15,
        backgroundColor: 'turquoise',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    incomeEntriesContainer: {
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 5,
    },
    incomeHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    incomeEntryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingRight: 10, // Add right padding to the income entry container
    },
    editDeleteButtons: {
        flexDirection: 'row', // Arrange buttons horizontally
    },
    button: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: '#ADD8E6', // You can style the Edit button as needed
    },
    deleteButton: {
        backgroundColor: '#FFB6C1', // You can style the Delete button as needed
    },
    inlineButton: {
        backgroundColor: '#BDB76B',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: '40%',
    },
});

export default IncomeScreen;
