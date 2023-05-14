import React from "react";
import { useNavigate, Link } from "react-router-dom";
import qr from "../../src/asses/qrcode.png"

const footer = (props) => {
  const navigate = useNavigate();
  return (
    <div className="footer grid items-center w-full h-screen bg-def-black text-light-gray font-light">
      <div className="wrap w-[1400px] mx-auto flex justify-around items-center">
        <div className="qr-wrap">
          {/* <div className="">Download now</div> */}
          <div className="qr w-60 h-60 bg-white rounded-xl overflow-clip">
            <img src={qr} alt="" />
          </div>
          {/* <div className="">Alway in touch</div> */}
        </div>
        <ul className="links flex flex-col gap-4 list-none">
          <li className="link cursor-pointer capitalize tracking-widest font-bold ">
            About
          </li>
          <li className="link ">
            <Link to='/'>Introduce</Link>
          </li>
          <li className="link cursor-pointer ">Purpose</li>
          <li className="link cursor-pointer ">History</li>
        </ul>
        <ul className="links flex flex-col gap-4 list-none">
          <li className="link cursor-pointer capitalize tracking-widest font-bold">
            Content
          </li>
          <li className="link cursor-pointer ">
          <Link to='/Categories/1?event=true'>Events</Link>
          </li>
          <li className="link cursor-pointer ">Location</li>
          <Link to='/Categories/1?event=false'>News</Link>
        </ul>
        <ul className="links flex flex-col gap-4 list-none">
          <li className="link cursor-pointer capitalize tracking-widest font-bold">
            Follow Us
          </li>
          <li className="link cursor-pointer ">Facebook</li>
          <li className="link cursor-pointer ">Instagram</li>
          <li className="link cursor-pointer ">Twitter</li>
        </ul>
        <ul className="links flex flex-col gap-4 list-none">
          <li className="link cursor-pointer capitalize tracking-widest font-bold">
            Contact
          </li>
          <li className="link cursor-pointer ">Send a Message</li>
          <li className="link cursor-pointer ">Atribute a News</li>
          <li className="link cursor-pointer ">Helps</li>
        </ul>
      </div>
    </div>
  );
};

export default footer;
