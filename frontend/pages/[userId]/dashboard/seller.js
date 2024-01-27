// SellerDashboard.js
import styles from '../../../styles/module.css/allPages/Dashboard.module.css';
import React from 'react';
import Row1 from './seller/row1';
import Row2 from './seller/row2';
import { DashHead } from './seller/dashHead';
const SellerDashboard = ({appData, changeSearchPage}) => {
    const row1Data = appData?.categories 
    const row2Data = appData?.items 
    console.log('this is seller dashboard')
    return (
        <>
            <DashHead changeSearchPage={changeSearchPage}/>
            <div id={styles.content}>
                <div className={styles.a_row}>
                    <Row1 row1Data={row1Data}/>
                </div>
                <div className={styles.a_row}>
                    <h2>Mew items</h2>
                    <Row2 row2Data ={row2Data}/>
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
