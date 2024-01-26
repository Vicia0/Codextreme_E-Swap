// DashHead component
import { useState, useEffect } from 'react';
import PageHeadLayout from '../../../components/pages/pageHead';
import styles from '../../../styles/module.css/allPages/DashHead.module.css';

export const DashHead = ({changeSearchPage}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const changeIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(contents).length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeIndex();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const contents = {
    newly_added: { heading: 'Newly Added', subheading: 'Check items >>' },
    most_bought_category: { heading: 'Most Bought Category', subheading: 'Check items >>' },
    eco_swap_choosing: { heading: 'Eco Swap Choosing', subheading: 'Check items >>' },
  };
  
  return (
    <PageHeadLayout>
      <div id={styles.DashHead}>
        <div className={styles.searchHolder}>
          <input id={styles.searchBar} type="text" placeholder="Q mouse" onClick={()=>changeSearchPage()}/>
          <div id={styles.message} /> {/* Corrected the typo here */}
        </div>
        <div className={styles.contentsWrapper} onMouseEnter={changeIndex}>
          {Object.entries(contents).map(([key, content], index) => (
            <div key={key} className={`${styles.contentsContainer} ${index === currentIndex ? styles.current : ''}`}>
              <div className={styles.content}>
                  <h2>{content.heading}</h2>
                  <p>{content.subheading}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.circlesWrapper}>
          {Object.keys(contents).map((key, index) => (
            <div
              key={key}
              className={`${styles.circle} ${index === currentIndex ? styles.currentCircle : ''}`}
            />
          ))}
        </div>
      </div>
    </PageHeadLayout>
  );
};
