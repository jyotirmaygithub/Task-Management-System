import React from 'react'
import {StateContext} from "../context/States"

export default function Welcome() {
    const {userDocument} = StateContext()
  return (
    <div>
      <h2 className='font-bold'>Welcome Back : {userDocument.name} </h2>
    </div>
  )
}
