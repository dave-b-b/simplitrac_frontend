import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from "../context/AppContext.jsx";
import {useForm, Controller} from 'react-hook-form';
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import BackButton from "./BackButton.jsx";
import '../App.css';
import {Button} from "@chakra-ui/react";
import EditTransactionsJoyride from './EditTransactionJoyride.jsx';
import HamburgerMenuEdit from "./HamburgerMenuEdit.jsx";
<<<<<<< HEAD
import {Spinner} from "react-bootstrap";
=======
import HamburgerMenu from './HamburgerMenu.jsx';
import { Spinner } from "react-bootstrap";
>>>>>>> bfe7ccff7d6479095698cec9640f24be6bd0a674
import HomeButton from './HomeButton.jsx';

const EditTransactionsPage = () => {
    const {
        user,
        setUser,
        setScreen,
        setServerResponse,
        runEditTransactionsTour,
        setRunEditTransactionsTour
    } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [deletedTransactions, setDeletedTransactions] = useState([]);

    useEffect(() => {
        if (user && user.transactions) {
            setTransactions(user.transactions);
        }
        if (user && user.categories) {
            // Ensure we have a "Select Category" option
            setCategories(["Select Category", ...user.categories.map(cat => cat.category_name)]);
        }
    }, [user])

    useEffect(() => {
        transactions.forEach(transaction => {
            setValue()
        })
    }, [transactions])

    const {control, handleSubmit, watch, setValue} = useForm(
        // {
        //     defaultValues: {
        //         vendor: 'Select Vendor',
        //         category: 'Select Category',
        //         date: new Date().toISOString().split('T')[0],
        //         total: '',
        //     }
        // }
    );

    const getCategoryByCategoryId = (catId) => {
        return user.categories.find(category => category.categoryId === catId)
    }

    const toProperCase = (string) => {
        if (string === undefined) return
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const onSubmit = async (data) => {
        const updatedTransactions = transactions.map((transaction, index) => {
            const updatedTransaction = new Transaction(transaction);
            updatedTransaction.vendor = data[`vendor-${index}`];
            updatedTransaction.amount = parseFloat(data[`amount-${index}`]);
            updatedTransaction.category = {name: data[`category-${index}`]};
            updatedTransaction.createdAt = data[`date-${index}`];
            return updatedTransaction;
        });

        const updatedUser = new User(user);
        updatedUser.transactions = updatedTransactions;

        const result = await updatedUser.deleteTransactions();

        if (result instanceof User) {
            setUser(result);
            setServerResponse('Transactions Successfully Updated');
            localStorage.clear()
            localStorage.setItem('user', result)
            setScreen('landing');
        }
    };

    const handleCancel = () => {
        setScreen('landing');
    };

    const handleDelete = async (transactionId) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            const updatedTransactions = transactions.filter(t => t.transactionId !== transactionId);
            setTransactions(updatedTransactions);
            setDeletedTransactions()

            const updatedUser = new User(user);
            updatedUser.transactions = updatedTransactions;
            const result = await updatedUser.updateFirebase();

            if (result instanceof User) {
                setUser(result);
                setServerResponse('Transaction Successfully Deleted');
            }
        }
    };
    const startTour = () => {
        setRunEditTransactionsTour(true);
    }

    return (
        <>
<<<<<<< HEAD
            <HamburgerMenuEdit/>
            <EditTransactionsJoyride/>
            <Spinner/>
            <HomeButton onClick={() => setScreen('home')}/>
            <div style={{marginTop: '3rem'}}>
                <form onSubmit={handleSubmit(onSubmit)} data-tour="edit-transactions-form">
                    <div className="edit-buttons">
                        <div className="edit-left-button">
                            <Button type="button" className="custom-button"
                                    style={{backgroundColor: '#415a77', width: "80px", padding: "12px 20px"}}
                                    onClick={handleCancel} data-tour="cancel-button">Cancel</Button>
                            <Button type="button" className="custom-button"
                                    style={{backgroundColor: '#415a77', width: "80px", padding: "12px 20px"}}
                                    onClick={handleCancel}>Back</Button>
                        </div>
                        <div className="edit-right-button">
                            <Button type="submit" className="custom-button"
                                    style={{backgroundColor: '#415a77', width: "130px", padding: "12px 20px"}}
                                    data-tour="save-changes">Save Changes</Button>
                            <Button type="button" className="custom-button"
                                    style={{backgroundColor: '#415a77', width: "130px", padding: "12px 20px"}}
                                    onClick={startTour}>Start Tour</Button>

                        </div>
=======
        <HamburgerMenu/>
        <EditTransactionsJoyride />
        <Spinner />
        <HomeButton onClick={() => setScreen('home')} />
          <div style={{ marginTop: '3rem' }}> 
            <form onSubmit={handleSubmit(onSubmit)} data-tour="edit-transactions-form">
                <div className="edit-buttons">
                    <div className="edit-left-button">
                        <Button type="button" className="custom-button" style={{backgroundColor: '#415a77',width:"80px", padding: "12px 20px"}} onClick={handleCancel} data-tour="cancel-button">Cancel</Button>
                        <Button type="button" className="custom-button" style={{backgroundColor: '#415a77',width:"80px", padding: "12px 20px"}} onClick={handleCancel}>Back</Button>
                    </div>
                    <div className="edit-right-button">
                        <Button type="submit" className="custom-button" style={{backgroundColor: '#415a77',width:"130px", padding: "12px 20px"}} data-tour="save-changes">Save Changes</Button>
                        <Button type="button" className="custom-button" style={{backgroundColor: '#415a77',width:"130px", padding: "12px 20px"}} onClick={startTour}>Start Tour</Button>
>>>>>>> bfe7ccff7d6479095698cec9640f24be6bd0a674
                    </div>
                    <h1 style={{textAlign: 'center', margin: '0px 0 30px 0'}}><b>Edit Transactions</b></h1>

                    <table className="edit-table" style={{width: '100%', borderCollapse: 'collapse'}}
                           data-tour="transaction-list">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vendor</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.transactionId}>
                                <td>
                                    <Controller
                                        name={`date-${index}`}
                                        control={control}
                                        defaultValue={transaction.createdAt}
                                        render={({field}) => <input type="date" {...field} data-tour="date-field"/>}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`vendor-${index}`}
                                        control={control}
                                        defaultValue={transaction.vendor}
                                        render={({field}) => <input type="text" {...field} data-tour="vendor-field"/>}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`amount-${index}`}
                                        control={control}
                                        defaultValue={transaction.amount}
                                        render={({field}) => <input type="number" step="0.01" {...field}
                                                                    data-tour="amount-field"/>}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`category-${index}`}
                                        control={control}
                                        defaultValue={transaction.category_name || "Select Category"}
                                        render={({field}) => (
                                            <select {...field} data-tour="category-field">
                                                {categories.map(category => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        className="custom-button delete-button"
                                        onClick={() => handleDelete(transaction.transactionId)}
                                        data-tour="delete-button"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default EditTransactionsPage;
    