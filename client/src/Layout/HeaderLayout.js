import React from "react";
import Logo from "../components/Header/Logo";
import SearchBar from "../components/Header/SearchBar";
import Avatar from "../components/Header/Avatar";
import { useNavigate } from "react-router-dom";

export default function HeaderLayout() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  return (
    <header
      className={`fixed top-0 z-10 flex w-screen justify-center bg-white py-4 `}
    >
      <div className={`flex w-screen max-w-screen-xl justify-evenly items-center`}>
        <Logo />
        <SearchBar />
        <Avatar />
      </div>
    </header>
  );
}
