import React from "react";
import { useNavigate, Link } from "react-router-dom";
import qr from "../../src/asses/qrcode.png";

const footer = (props) => {
  const navigate = useNavigate();
  return (
    <div className="footer grid items-center w-full min-h-screen  py-8 bg-def-black text-light-gray font-light">
      <div className="wrap  mx-auto flex flex-col gap-8 justify-around items-center md:flex-row md:gap-0">
        <div className="qr-wrap">
          {/* <div className="">Download now</div> */}
          <div className="qr w-60 h-60 bg-white rounded-xl overflow-clip">
            <img src={qr} alt="" />
          </div>
          {/* <div className="">Alway in touch</div> */}
        </div>
        <div className="flex flex-col justify-around items-center w-full gap-14 sm:flex-row">
          <ul className="links flex flex-col gap-4 list-none">
            <li className="link cursor-pointer capitalize tracking-widest font-bold ">
              About
            </li>
            <li className="link ">
              <Link to="/">Introduce</Link>
            </li>
            <li className="link cursor-pointer ">Purpose</li>
            <li className="link cursor-pointer ">History</li>
          </ul>
          <ul className="links flex flex-col gap-4 list-none">
            <li className="link cursor-pointer capitalize tracking-widest font-bold">
              Content
            </li>
            <li className="link cursor-pointer ">
              <Link to="/Categories/1?event=true">Events</Link>
            </li>
            <li className="link cursor-pointer ">Location</li>
            <Link to="/Categories/1?event=false">News</Link>
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
    </div>
  );
};

export default footer;
