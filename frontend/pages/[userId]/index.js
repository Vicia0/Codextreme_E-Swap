// Index.js
import styles from '../../styles/module.css/allPages/Dashboard.module.css';
import React from 'react';
import FacilityLayout from './Layout';
import BuyerDashboard from './dashboard/buyer';
import SellerDashboard from './dashboard/seller';

const Index = ({ appData, changeSearchPage, userDetails }) => {
    const userType = userDetails?.type;
    const dashcontent = {
        buyer: <BuyerDashboard changeSearchPage={changeSearchPage} appData={appData} />,
        seller: <SellerDashboard changeSearchPage={changeSearchPage} appData={appData} />,
    };
    
    console.log('this is dashboard');
    
    return (
        <FacilityLayout page_name="Dashboard">
            <div id={styles.Dashboard}>
                {userType && dashcontent[userType]}
            </div>
        </FacilityLayout>
    );
};

export default Index;
