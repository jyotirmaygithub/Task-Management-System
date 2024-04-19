import React from "react";
import Logo from "../components/Header/Logo";
import Avatar from "../components/Header/Avatar";
import SwitchBtn from "../components/Header/SwitchBtn";

export default function HeaderLayout() {
  return (
    <header
      className={`flex w-screen justify-center bg-white py-4 `}
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
