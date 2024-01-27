import { useEffect, useState } from 'react';
import pagestyles from '../../../styles/module.css/allPages/app_pages.module.css';
import styles from '../../../styles/module.css/allPages/categories.module.css';
import { useRouter } from 'next/router';
import Layout from './Layout';
import Image from 'next/image';
const TheItemContainer = ({ selectedItem, setSelectedItem}) => {
    const [displaydescription, setdisplay] = useState(false)
    return (
        <Layout main_page = 'true'>
            <div className={pagestyles.page}>
                <div className={styles.theItem}>
                    <section className={styles.theHead} style={{backgroundColor: 'indigo'}}>
                        <div onClick={()=>setSelectedItem(null)}>
                            <i className='fa fa-arrow-left'/> back
                        </div>
                        <div><h4>{selectedItem.name}</h4></div>
                        <div>
                            <i className='fa fa-ellipsis-v'/>menu
                        </div>
                    </section>
                    <section>
                        <Image src={selectedItem.image} height={'150px'} width={'260px'} alt={selectedItem.name}/>
                    </section>
                    <div className={styles.details}> 
                        <section className={styles.row1}>
                            <div style={{fontWeight:'bold'}}>{selectedItem.amount} rwf</div>
                            <div style={{textDecoration:'italic', color:'navy'}}>Seller: {selectedItem.seller}</div>
                            <div style={{textDecoration:'italic', color:'navy'}}>Wishlist</div>
                        </section>
                        <div className={styles.row2}>
                            <p onClick={()=>setdisplay(!displaydescription)} style={{cursor:'pointer'}}>
                                About <span style={{color:'navy', textDecoration:'italic !important'}}>click to view</span>
                            </p>
                            {displaydescription && (
                                <p>{selectedItem.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TheItemContainer;
