import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Alert, Modal } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const ExpenseScreen = ({ navigation }) => {
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseCategory, setExpenseCategory] = useState('Food');
    const [amount, setAmount] = useState('');
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [monthModalVisible, setMonthModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [expenseList, setExpenseList] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleAddExpense = () => {
        if (!isNaN(amount) && parseFloat(amount) >= 0) {
            const newExpense = {
                category: expenseCategory,
                amount: parseFloat(amount).toFixed(2),
            };
            setExpenseList([...expenseList, newExpense]);
            const newTotalExpense = parseFloat(totalExpense) + parseFloat(amount);
            setTotalExpense(newTotalExpense.toFixed(2));
            setAmount('');
        } else {
            Alert.alert('Invalid Amount', 'Please enter a valid number.');
        }
    };

    const handleEditExpense = (index) => {
        setEditIndex(index);
        setExpenseCategory(expenseList[index].category);
        setAmount(expenseList[index].amount);
    };

    const handleModifyExpense = () => {
        if (!isNaN(amount) && parseFloat(amount) >= 0) {
            const updatedExpenseList = [...expenseList];
            updatedExpenseList[editIndex] = {
                category: expenseCategory,
                amount: parseFloat(amount).toFixed(2),
            };
            setExpenseList(updatedExpenseList);
            const newTotalExpense = updatedExpenseList.reduce(
                (total, entry) => total + parseFloat(entry.amount),
                0
            );
            setTotalExpense(newTotalExpense.toFixed(2));
            setEditIndex(-1);
            setExpenseCategory('Food');
            setAmount('');
        } else {
            Alert.alert('Invalid Amount', 'Please enter a valid number.');
        }
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenseList = [...expenseList];
        updatedExpenseList.splice(index, 1);
        setExpenseList(updatedExpenseList);
        const newTotalExpense = updatedExpenseList.reduce(
            (total, entry) => total + parseFloat(entry.amount),
            0
        );
        setTotalExpense(newTotalExpense.toFixed(2));
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

    const renderExpenseEntries = () => {
        return expenseList.map((item, index) => (
            <View key={index} style={styles.expenseEntryContainer}>
                <Text style={styles.expenseEntryCategory}>{item.category}</Text>
                <Text style={styles.expenseEntryAmount}>-${item.amount}</Text>
                <View style={styles.editDeleteButtons}>
                    <TouchableOpacity
                        onPress={() => handleEditExpense(index)}
                        style={[styles.editButton, styles.button]}
                    >
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteExpense(index)}
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
                <Text style={styles.header}>Expenses</Text>

                <View style={styles.totalExpenseContainer}>
                    <Text style={styles.totalExpense}>-${totalExpense}</Text>
                </View>

                {expenseList.length > 0 && (
                    <View style={styles.expenseEntriesContainer}>
                        <Text style={styles.expenseHeader}>Expense Entries</Text>
                        {renderExpenseEntries()}
                    </View>
                )}

                {editIndex !== -1 && (
                    <View style={styles.editForm}>
                        <Text>Edit Expense Entry</Text>
                        <View style={styles.inlineContainer}>
                            <Text style={styles.inlineLabel}>Expense Category</Text>
                            <TouchableOpacity
                                onPress={() => setCategoryModalVisible(true)}
                                style={styles.inlineDropdown}
                            >
                                <Text style={styles.pickerText}>{expenseCategory}</Text>
                            </TouchableOpacity>
                        </View>
                        {categoryModalVisible && renderDropdown(
                            categories,
                            setExpenseCategory,
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
                        <Button title="Modify" onPress={handleModifyExpense} color="#FA8072" />
                    </View>
                )}

                <Text>Add New Expense</Text>
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
                    <Text style={styles.inlineLabel}>Expense Category</Text>
                    <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.inlineDropdown}>
                        <Text style={styles.pickerText}>{expenseCategory}</Text>
                    </TouchableOpacity>
                </View>
                {categoryModalVisible && renderDropdown(
                    categories,
                    setExpenseCategory,
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

                <Button title="Add" onPress={handleAddExpense} color="#FA8072" />
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
    totalExpenseContainer: {
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#808080',
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
    },
    totalExpense: {
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
    expenseEntriesContainer: {
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 5,
    },
    expenseHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    expenseEntryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingRight: 10,
    },
    editDeleteButtons: {
        flexDirection: 'row',
    },
    button: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: '#ADD8E6',
    },
    deleteButton: {
        backgroundColor: '#FFB6C1',
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

export default ExpenseScreen;
