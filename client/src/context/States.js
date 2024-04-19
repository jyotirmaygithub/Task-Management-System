import React, { useContext, createContext, useState } from "react";

const AppStates = createContext();

export function StatesFunction(props) {
  // Stores current user data.
  const [userDocument, setUserDocument] = useState({});

  return (
    <AppStates.Provider
      value={{ userDocument, setUserDocument }}
    >
      {props.children}
    </AppStates.Provider>
  );
}

export function StateContext() {
  return useContext(AppStates);
}
