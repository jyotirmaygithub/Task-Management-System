import React from 'react'
import Header from "./HeaderLayout"
// import  Hotels from "../pages/Hotels";
import AddTask from "./AddTask"

export default function FrontPage() {
  return (
    <div>
      <Header/>
      <AddTask/>
      {/* <Footer/> */}
    </div>
  )
}
