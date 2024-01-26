import styles from '../../../styles/module.css/allPages/categories.module.css';
import React, { useEffect, useState } from 'react';
import { setLocalStorageProp_ } from '../../../components/localStorage';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ItemsContainer = ({ theItemsData, setSelectedItem, changeSearchPage}) => {
  const router = useRouter(); 
  const the_items = theItemsData;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(the_items);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = the_items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleselected = (item) => {
    setLocalStorageProp_('selecteditem', item);
    setSelectedItem(item);
    console.log('clicked');
    console.log('item:', item);
  };

  const returnCard = (item, index) => {
    return (
      <div className={styles.card} key={index} onClick={() => handleselected(item)}>
        <article>
          <Image src={item.image} alt={item.name} width={40} height={40} />
        </article>
        <aside>
          <p>{item.description}</p>
          <p>{item.amount} rwf</p>
          <p>Dib</p>
          <p>Wish <i className="fa fa-heart"></i></p>
        </aside>
      </div>
    );
  };

    return (
        <div className={styles.containerGrid}>
            <div className={styles.searchAndFilter}>
                  <input id={styles.searchBar} type="text" placeholder="Q mouse" onClick={()=>changeSearchPage(false)}/>
                  <button
                    className={styles.filterButton}
                    onClick={() => router.push('/filter')} 
                    >
                    <i className="fa fa-filter" />
                </button>            
            </div>
        {filteredItems.map((item, index) => (
            returnCard(item, index)
        ))}
        </div>
    );
    };

    export default ItemsContainer;
