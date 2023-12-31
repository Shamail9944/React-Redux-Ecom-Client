import React from 'react'
import { selectLoggedInUser } from '../authSlice.js'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedAdmin({ children }) {

  const user = useSelector(selectLoggedInUser)

  if (!user) { return <Navigate to="/login" replace={true}></Navigate> }
  if (user && user.role !== 'admin') { return <Navigate to="/" replace={true}></Navigate> }

  return children
}

export default ProtectedAdmin