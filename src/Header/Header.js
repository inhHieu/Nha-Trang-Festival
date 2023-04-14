import React,{useState} from "react";
import { Link } from "react-router-dom";
import  "./Header.scss"



const Header = () => {

  const [login, setlogin] = useState();


  return (
    <div className="header">
      <button className="btn" onClick={setlogin}>
        {/* <Link className="Link" to='/' >JOIN NOW</Link> */}
        JOIN NOW
      </button>
    </div>
  )
};

export default Header;
