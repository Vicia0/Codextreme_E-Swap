import { AppPages } from '../components/navigation/page_links';
import styles from '../styles/module.css/App.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/global.css';
import AppLayout from './Layout';
import {getUserFromLocalStorage} from '../components/localStorage';
import { backendhost } from '../components/navigation/routes';
import { startComponents_ } from '../components/some_components';
import LoadingPage from './authentication/load';
import SearchPage from '../components/pages/search';

function App({ Component, pageProps }) {

  const [currentPage, setCurrentPage] = useState(null);
  const starting_Components = startComponents_()
  const router = useRouter()
  const { pathname } = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserID] = useState(null);
  const [appData, setappData] = useState(starting_Components)
  const [missingData, setMissing] = useState(true)
  const missing_data =()=>{
    if(!appData.items || !appData.categories || !appData.wishlist || !appData.cart||
      !appData.purchases || !appData.sold_items){
        return true
      }
    else{return false}
  }
  const fetchData = ()=>{
    
  }
  useEffect(()=>{
    if(missingData && userId && userDetails){
      if(missing_data()){
        fetchData(); 
      }else{setMissing(false)}    }
  },[missingData, userId, userDetails])

  useEffect(() => {
    const the_user = getUserFromLocalStorage('logged_ECOSWAP_user');
    const loginPage = AppPages.find(page => page.name === 'Login').path;
    if (!the_user && !pathname.endsWith(loginPage)) {
      router.push(loginPage)
    } else {
      if(!userDetails && the_user){
        setUserDetails(the_user)
        setUserID(the_user._id)
      }
    }
  },[pathname, userId, userDetails]);

  const [searchCall, setSearchCall] = useState(false)
  const changeSearchPage = ()=>{
    setSearchCall(!searchCall)
  }
  return (
    <AppLayout searchCall={searchCall}
      userDetails={userDetails}
      userId={userId}
      setUserDetails={setUserDetails}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      <section className={styles.content}>
        {pathname === '' || pathname === '/' ? (
          <Component
            {...pageProps}
            backendhost={backendhost}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setUserID={setUserID}
            userId={userId}
          />
        ) : (
          <>
            {missingData ? (
              <>
                {LoadingPage()}
              </>
            ) : (
              searchCall ? (
                <SearchPage changeSearchPage={changeSearchPage} />
              ) : (
                <Component
                  {...pageProps}
                  backendhost={backendhost}
                  userDetails={userDetails}
                  userId={userId}
                  appData={appData}
                  changeSearchPage={changeSearchPage}
                />
              )
            )}
          </>
        )}
      </section>
    </AppLayout>
  );
  
}

export default App;
