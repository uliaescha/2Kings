import React from "react";
import { useAuth } from "../../context/AuthContext";
import {Navigate} from "react-router-dom";
import "./Profile.scss";
import Header from "../../components/header/Header";

function Profile() {
  const {  logout } = useAuth();
  return (
    <>
        <div className="profile-page">
          <Header />
          <div className="profile-content">
            <div className="profile-info">
              <h2 className="user-name">Your name</h2>
              <p className="user-email">example@gmail.com</p>
              <div className="bttns">
                <button className="history-btn">HISTORY OF PURCHASES</button>
                <div className="action-buttons">
                  <button className="logout-btn" onClick={logout}>
                    log out
                  </button>
                  <button className="delete-btn">delete</button>
                </div>
              </div>
            </div>
            <div className="profile-footer">
              <h2 className="chess-title">CHESS</h2>
              <h2 className="chess-subtitle">master</h2>
            </div>
          </div>
        </div>
    </>
  );
}
export default Profile;
