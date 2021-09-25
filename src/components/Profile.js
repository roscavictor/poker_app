import { Profiler } from "react";
import React, { useEffect, useState, useRef } from "react";
import avatar_girl from "../imgs/avatar_girl.png";
import avatar_boy from "../imgs/avatar_boy.png";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import styles from "./Profile.module.css";
function renderContent(profileInfo) {
    
    
    var pageRoute = "/MainPage";
    var buttonContent = "Pagina principala";
    var changeContextButton = "Dropdown 2";
    var changeFacultyButton = "Dropdown 2";
    
    let buttonToRednder = (
      <Link to={"/MainPage"}>
        <button className={styles.generalProfileButton}>{buttonContent}</button>
      </Link>
    );
    
    
    let changeContextRender = (
      <Dropdown>
        <Dropdown.Toggle className={styles.generalProfileButton} id="dropdown-basic">
          {changeContextButton}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Button 1 </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Button 2 </Dropdown.Item>
          <Dropdown.Item href="#/action-3">Button 3 </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
   
    let changeFacultyRender = (
      <Dropdown>
        <Dropdown.Toggle className={styles.generalProfileButton} id="dropdown-basic">
          {changeFacultyButton}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Button 1 </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Button 2 </Dropdown.Item>
          <Dropdown.Item href="#/action-3">Button 3 </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  
  
    if (profileInfo === undefined ) {
      return (
        <React.Fragment>
            <img
              src={ avatar_boy}
              className={`img-responsive ${styles.fitImage}`}
              />
          <div className={styles.loading}>Loading...</div>
          {buttonToRednder}
          <br />
          {changeContextRender}
          <br />
          {changeFacultyRender}
          <br />
        </React.Fragment>
      );
    } else if (profileInfo === false ) {
      return (
        <React.Fragment>
            <img
              src={avatar_boy}
              className={`img-responsive ${styles.fitImage}`}
              />
          <div className={styles.loading}>
            Data can't be loaded. Please try again later.
          </div>
          {buttonToRednder}
          <br />
          {changeContextRender}
          <br />
          {changeFacultyRender}
          <br />
         
        </React.Fragment>
      );
    }
    
      return profileInfo.map((info, index) => {
        return (
          <React.Fragment key={index}>
            <div className="text-center">
              <img
                src={info.sex === "Feminin" ? avatar_girl : avatar_boy}
                className={`img-responsive`}
                alt="Avatar"
              />
            </div>
            <div >
              <p >
                {info.firstName} {info.lastName}
              </p>
              
              <p >
                Meciuri castigate {info.gamesWon}
              </p>
            </div>
  
            <div
              className="text-center"
              style={{ color: "#002147", fontSize: "1vw" }}
            >
              <p className={styles.studentProfile}>Profil</p>
              <p>
                <strong>ELO Rating: </strong>
                {info.rating}
              </p>
              <p>
                <strong>Top % of players: </strong>
                {info.percentage}
              </p>
              {buttonToRednder}
              <br />
              {changeContextRender}
              <br />
              {changeFacultyRender}
              <br />
              
            </div>
          </React.Fragment>
        );
      });
    }
  
  
   function Profile(props) {
    const [profile, setProfile] = useState(undefined);
    const timer = useRef("");
  
    
  
    return <div value="a" className={styles.profileBox}>{renderContent(profile)}</div>;
  }
export default Profile;