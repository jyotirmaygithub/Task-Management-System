import React, { useEffect } from "react";
import Logo from "../components/Header/Logo";
import Avatar from "../components/Header/Avatar";
import SwitchBtn from "../components/Header/SwitchBtn";
import { FrontAuthContext } from "../context/front-auth";

export default function HeaderLayout() {
  const {handleExistingUserData} = FrontAuthContext()
  useEffect(()=>{
    handleExistingUserData()
  },[])
  return (
    <header
      className={`flex  justify-center bg-white py-4 `}
    >
      <div
        className={`flex w-screen max-w-screen-xl justify-between items-center`}
      >
        <Logo />
        <div className="flex justify-center items-center gap-6">
          <SwitchBtn />
          <Avatar />
        </div>
      </div>
    </header>
  );
}
