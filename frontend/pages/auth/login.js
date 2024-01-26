import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/module.css/authenticate.module.css';
import AuthLayout from './layout';
import { getUserFromLocalStorage, setLocalStorageProp_ } from '../../components/localStorage';
import Link from 'next/link';
import { handlePost } from '../../components/data/handleData';
const Login = ({ setUserDetails, setLoading, setUserID }) => {
  const [correctUser, setCorrectUser] = useState(false)

  useEffect(() => {
    if (correctUser) {
      setLoading(true)
    }
  }, [correctUser])

  const [loginError, setLoginError] = useState('');
  const [details, setDetails] = useState({
    email: '', password: ''
  });
  const handleLogin = async () => {
    console.log('Login handle');
    const try_login = () => {
      setCorrectUser(true)
      const try_user = { _id: 'buyer--J3344S543435643AD3j', type: 'buyer', email: details.email }
      setUserDetails(try_user)
      setUserID(try_user._id)
      console.log('login details: ', try_user)
      localStorage.setItem('logged_ECOSWAP_user', JSON.stringify(try_user));
      setLoginError('');
      console.log('trial user that is logging: ', getUserFromLocalStorage('logged_ECOSWAP_user'))
    }
    //try_login()
    try {
      const response = await handlePost('login', details)
      console.log('response: ', response)
      if (response.status === 200) {
        setCorrectUser(true)
        const logged_user = {}
        Object.keys(response).map(key => {
          if (key === 'id') {
            logged_user['_id'] = response[key]
          } else {
            logged_user[key] = response[key]
          }
        })
        console.log('logged user: ', logged_user)
        setLocalStorageProp_('logged_ECOSWAP_user', logged_user)
        setUserDetails(logged_user)
        setUserID(logged_user._id)
        setLoginError('');
        console.log('user that is logging: ', getUserFromLocalStorage('logged_ECOSWAP_user'))
        setLoginError('Successful Login')
      } else {
        console.log('error to log in, status:', response.status)
      }
    } catch (error) {
      setLoginError('Invalid email or password');
      console.log('error logging in')
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayout >
      <form id={styles.login}>
        <h4>Login</h4>
        <input
          placeholder="Enter Email"
          value={details.email}
          onChange={handleChange}
          name="email"
          type="email"
          autoComplete="current-email"
          required
        />
        <input
          placeholder="Enter Password"
          value={details.password}
          onChange={handleChange}
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <button type="button" onClick={handleLogin}>
          LOGIN
        </button>
        <div className={styles.theLinks}>
          <p><span>Create Account</span></p>
          <p><span>Forgot Password? </span></p>
        </div>
        {loginError && <p className="error">{loginError}</p>}
        {correctUser && <p>Successfull log in</p>}
      </form>
    </AuthLayout>
  );
};

export default Login;
