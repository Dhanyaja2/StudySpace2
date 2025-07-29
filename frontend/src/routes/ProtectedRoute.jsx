import React, { useContext } from 'react'
import { StoreContext } from '../components/context/StoreContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

    const {isAuthenticated} = useContext(StoreContext);

    if(!isAuthenticated){
        return <Navigate to='/' replace />
    }

  return children;
}

export default ProtectedRoute
