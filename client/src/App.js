import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthFunction } from "./context/front-auth";
import { TokenStatusFunction } from "./context/tokenStatus";
import { StatesFunction } from "./context/States";
import { EditProfileContextFunc } from "./context/EditProfile";
import { TaskContextFun } from "./context/TaskContext"
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import AssignedUnassigned from "./pages/AssignedUnassigned"
import TaskArchieve from "./pages/Task-Archieve"
import MyTasks from "./pages/MyTasks"
import HeaderLayout from "./Layout/HeaderLayout";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_AUTH_CLIENT_ID}>
        <StatesFunction>
          <TokenStatusFunction>
            <AuthFunction>
              <TaskContextFun>
                <EditProfileContextFunc>
                  <Router>
                    <Routes>
                      <Route exact path="/" element={<LandingPage />} />
                      <Route exact path="/login" element={<LoginPage />} />
                      <Route exact path="/signup" element={<SignUp />} />
                      <Route
                        exact
                        path="/account/:name"
                        element={<><HeaderLayout /><UserProfile /></>}
                      />
                      <Route
                        exact
                        path="/account/edit-profile"
                        element={<><HeaderLayout /><EditProfile /></>}
                      />
                      <Route
                        exact
                        path="/assigned-unassigned-tasks/:name"
                        element={<><HeaderLayout /><AssignedUnassigned /></>}
                      />
                      <Route
                        exact
                        path="/task-archieve"
                        element={<><HeaderLayout /><TaskArchieve /></>}
                      />
                      <Route
                        exact
                        path="/my-tasks/:name"
                        element={<><HeaderLayout /><MyTasks /></>}
                      />
                      <Route exact path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Router>
                </EditProfileContextFunc>
              </TaskContextFun>
              <ToastContainer autoClose={2000} transition={Slide} />
            </AuthFunction>
          </TokenStatusFunction>
        </StatesFunction>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
