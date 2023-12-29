import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {AuthStatus} from '../hooks/AuthStatus';
import Loader from '../loader-img/Loader';

const PrivateRoute = () => {
    const {loggedIn,checkingStatus} = AuthStatus()
    if(checkingStatus){
        return <Loader/>
    }
  return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute
