import React from "react";
import Countdown from "./Countdown";
import "../../style/pages/Home/Hero.scss";
import bg from "../../asses/beach1.jpg";
// import anime from "animejs/lib/anime.es.js";
import { motion, useTransform, useScroll } from "framer-motion";

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <motion.div
      className="Hero"
      // initial={{ opacity: 1, backgroundColor: "#ffffff" }}
      // animate={{
      //   opacity: 1,
      //   backgroundColor: "#ffffff00",
      //   transition: { delay: 5 },
      // }}
    >
      <motion.div className="background">
        <motion.img src={bg} alt="" style={{ y }} />
        <div className="blackmask"></div>
      </motion.div>
      <div className="Text">
        <span className="sub-hero-text">Nha Trang</span>
        <svg
          id="Layer_1"
          className="scale-[0.35] sm:scale-[0.6] md:scale-75 lg:scale-100 "
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 903 170.84"
        >
          <defs>
            <mask id="mask-S-S">
              <path
                className="cls-1 a1"
                d="m69,70.84s18-9,18-36S60,7.84,60,7.84c0,0-27,9-36,18S6,52.84,6,61.84s0,27,36,36,36,18,36,18c0,0,0,18-9,27s-27,18-27,18c0,0-18,9-27,0s0-18,0-18l36-18s45-9,63-27"
              />
            </mask>
            <mask id="mask-S-E">
              <path
                className="cls-1"
                d="m114,115.84c2.54-.08,28.28-1.27,36-18,1.97-4.27,4.56-13.43,0-18-5.36-5.38-16.77-.54-18,0-10.87,4.76-16.9,16.6-18,27-.2,1.92-1.91,20.28,9,27,11.78,7.25,29.36-4.55,36-9,9.13-6.13,14.84-13.34,18-18"
              />
            </mask>
            <mask id="mask-S-A">
              <path
                className="cls-1"
                d="m222,79.84s-9-9-27,0-18,36-18,36c0,0,0,18,9,18s18-9,27-18,18-45,18-36-18,27,0,45,27-9,36-18l9-9"
              />
            </mask>
            <mask id="mask-F-F">
              <g>
                <path className="cls-1" d="m447,7.84s-36,9-63,0-45,18-45,18" />
                <path className="cls-1" d="m348,151.84c0-63,27-135,27-135" />
                <line
                  className="cls-1"
                  x1="339"
                  y1="79.84"
                  x2="411"
                  y2="79.95"
                />
              </g>
            </mask>
            <mask id="mask-F-E">
              <path
                className="cls-1"
                d="m421.82,114.26c2.54-.08,28.28-1.27,36-18,1.97-4.27,4.56-13.43,0-18-5.36-5.38-16.77-.54-18,0-10.87,4.76-16.9,16.6-18,27-.2,1.92-1.91,20.28,9,27,10.94,6.74,26.94-3.32,36-9,13.24-8.29,21.06-18.84,25.18-25.42"
              />
            </mask>
            <mask id="mask-F-S">
              <path
                className="cls-1"
                d="m528,88.84s-9-18-18-18-18,18-18,27,18,27,18,27c0,0,9,18,0,27s-9,0-9,0c0,0-9-9,9-18s45-36,45-36"
              />
            </mask>
            <mask id="mask-F-T">
              <g>
                <path
                  className="cls-1"
                  d="m573,34.84s-18,45-18,72,18,27,18,27c0,0,27-18,36-36"
                />
                <line
                  className="cls-1"
                  x1="537"
                  y1="61.84"
                  x2="591"
                  y2="61.84"
                />
              </g>
            </mask>
            <mask id="mask-F-I">
              <g>
                <path
                  className="cls-1"
                  d="m618,79.84s-9,36,0,45,27,0,27,0l27-27"
                />
                <line
                  className="cls-1"
                  x1="618"
                  y1="52.84"
                  x2="636"
                  y2="61.84"
                />
              </g>
            </mask>
            <mask id="mask-F-V">
              <path
                className="cls-1"
                d="m672,70.84v45s0,18,9,18,18-27,18-27l9-27v-9l-9,27,9,9,9,9,18-9,9-9"
              />
            </mask>
            <mask id="mask-F-A">
              <path
                className="cls-1"
                d="m784.5,80.84s-9-9-27,0-18,36-18,36c0,0,0,18,9,18s18-9,27-18,18-45,18-36-18,27,0,45,27-9,36-18l9-9"
              />
            </mask>
            <mask id="mask-F-L">
              <path
                className="cls-1"
                d="m834,97.84c7.43-5.41,17.61-14.09,27-27,0,0,10.82-13.69,18-36,.88-2.73,2.07-6.93,0-9-2.23-2.23-7.12-.62-9,0-7.15,2.36-12.83,8.34-18,18-4.94,9.22-6.52,16.49-9,27-6.34,26.86-9.32,28.21-9,36,.13,3.13.31,22.15,9,27,7.18,4.01,17.78-2.95,27-9,7.54-4.95,17.79-13.27,27-27"
              />
            </mask>
          </defs>
          <g className="g">
            <path
              mask="url(#mask-S-S)"
              id="S-S"
              className="cls-2"
              d="m73.6,116.13c-1.31-4.1-3.98-7.21-8-9.35-4.02-2.13-8.65-3.89-13.9-5.29-5.25-1.39-10.7-2.79-16.36-4.18s-10.87-3.28-15.62-5.66c-4.76-2.38-8.69-5.57-11.81-9.59-3.12-4.02-4.67-9.47-4.67-16.36s1.8-13.86,5.41-20.91,8.28-13.45,14.02-19.19c5.74-5.74,12.13-10.46,19.19-14.15,7.05-3.69,14.02-5.53,20.91-5.53,3.94,0,7.63.74,11.07,2.21s6.43,3.53,8.98,6.15c2.54,2.63,4.55,5.66,6.03,9.1s2.21,7.13,2.21,11.07c0,2.62-.41,5.54-1.23,8.73-.82,3.2-1.89,6.44-3.2,9.72-1.31,3.28-2.79,6.4-4.43,9.35-1.64,2.95-3.28,5.41-4.92,7.38-.33.49-.78.98-1.35,1.48-.49.42-1.07.66-1.74.72-1.72.16-3.21-1.35-3.03-3.07.07-.64.31-1.17.72-1.59,3.61-4.1,6.77-9.35,9.47-15.74,2.71-6.4,4.06-12.38,4.06-17.96,0-3.28-.66-6.23-1.97-8.86-1.31-2.62-3.07-4.92-5.29-6.89-2.21-1.97-4.72-3.48-7.5-4.55-2.79-1.06-5.74-1.6-8.86-1.6-6.07,0-12.22,1.72-18.45,5.17-6.23,3.44-11.89,7.87-16.97,13.28-5.09,5.41-9.23,11.36-12.42,17.83-3.2,6.48-4.8,12.67-4.8,18.57s1.51,10.25,4.55,13.53c3.03,3.28,6.89,5.9,11.56,7.87,4.67,1.97,9.8,3.57,15.38,4.8,5.57,1.23,10.95,2.67,16.11,4.3,5.17,1.64,9.8,3.77,13.9,6.4,4.1,2.62,6.89,6.32,8.36,11.07,4.59-1.48,9.47-3.16,14.64-5.04s9.63-4.14,13.41-6.76c1.31-.82,2.46-1.72,3.44-2.71.98-.98,1.97-2.13,2.95-3.44.82-.82,1.56-1.23,2.21-1.23.82,0,1.51.29,2.09.86.57.58.86,1.27.86,2.09,0,.98-.53,2.05-1.6,3.2-1.07,1.15-1.93,2.05-2.58,2.71-2.79,2.79-7.3,5.46-13.53,8-6.23,2.54-13.2,5.04-20.91,7.5v.74l.25,1.23c0,6.07-1.81,11.89-5.41,17.47-3.61,5.57-8.12,10.46-13.53,14.64-5.41,4.18-11.32,7.5-17.71,9.96-6.4,2.46-12.38,3.69-17.96,3.69-4.59,0-8.78-1.11-12.55-3.32-3.77-2.21-5.66-5.95-5.66-11.19,0-4.27,1.76-8.04,5.29-11.32,3.52-3.28,7.71-6.15,12.55-8.61s9.8-4.55,14.88-6.27c5.08-1.72,9.18-3.08,12.3-4.06.82-.33,1.68-.61,2.58-.86.9-.25,1.84-.53,2.83-.86l10.33-2.95c.98-.33,1.93-.62,2.83-.86.9-.25,1.76-.53,2.58-.86h.01Zm-60.63,37.38c0,1.8.45,3.2,1.35,4.18.9.98,2.01,1.8,3.32,2.46,1.31.65,2.74,1.06,4.31,1.23,1.56.16,2.99.25,4.31.25,4.75,0,9.92-1.11,15.5-3.32,5.57-2.21,10.74-5.17,15.5-8.86,4.75-3.69,8.77-7.96,12.05-12.79,3.28-4.84,4.92-9.8,4.92-14.88l-.25-.25c-7.22,2.13-14.43,4.39-21.65,6.76-7.22,2.38-13.74,4.84-19.56,7.38-5.82,2.54-10.58,5.29-14.27,8.24s-5.54,6.15-5.54,9.59h.01Z"
            />
            <path
              mask="url(#mask-S-E)"
              id="S-E"
              className="cls-2"
              d="m115.8,115.88c.65,4.43,2.34,8.24,5.04,11.44,2.71,3.2,6.6,4.8,11.69,4.8,8.53,0,16.36-2.5,23.49-7.5s13.08-10.78,17.83-17.34c1.31-1.64,2.42-3.28,3.32-4.92.9-1.64,1.84-3.28,2.83-4.92l1.11-1.11c.41-.41.86-.62,1.35-.62.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97s-.37,1.76-1.11,2.83-1.27,2.01-1.6,2.83c-2.63,4.43-5.74,8.65-9.35,12.67s-7.55,7.63-11.81,10.82c-4.27,3.2-8.9,5.74-13.9,7.63s-10.21,2.83-15.62,2.83c-3.77,0-7.05-.78-9.84-2.34-2.79-1.56-5.13-3.61-7.01-6.15-1.89-2.54-3.28-5.41-4.18-8.61s-1.35-6.52-1.35-9.96c0-4.1.82-8.45,2.46-13.04,1.64-4.59,3.89-8.81,6.76-12.67,2.87-3.85,6.23-7.05,10.09-9.59,3.85-2.54,8.08-3.81,12.67-3.81,4.26,0,7.63,1.48,10.09,4.43s3.69,6.48,3.69,10.58c0,3.44-.82,6.6-2.46,9.47s-3.77,5.45-6.4,7.75c-2.63,2.3-5.45,4.31-8.49,6.03-3.04,1.72-6.03,3.08-8.98,4.06-4.1,1.15-8.53,1.72-13.28,1.72v-.02Zm-.24-5.66c1.97,0,3.94-.08,5.9-.25,1.97-.16,3.94-.57,5.9-1.23,2.46-.65,5-1.68,7.63-3.08,2.62-1.39,5.04-3.08,7.26-5.04s4.02-4.18,5.41-6.64,2.09-5.08,2.09-7.87c0-2.62-.78-4.71-2.34-6.27s-3.65-2.34-6.27-2.34c-3.61,0-6.93,1.07-9.96,3.2-3.04,2.13-5.66,4.84-7.87,8.12-2.21,3.28-3.98,6.85-5.29,10.7-1.31,3.86-2.13,7.42-2.46,10.7Z"
            />
            <path
              mask="url(#mask-S-A)"
              id="S-A"
              className="cls-2"
              d="m228.96,79.97c-.49,4.59-.98,9.14-1.48,13.65-.49,4.51-.74,9.06-.74,13.65,0,1.81.08,3.9.25,6.27.16,2.38.61,4.67,1.35,6.89.74,2.21,1.8,4.1,3.2,5.66,1.39,1.56,3.32,2.34,5.78,2.34,2.95,0,5.94-.86,8.98-2.58,3.03-1.72,5.9-3.85,8.61-6.4,2.71-2.54,5.17-5.25,7.38-8.12s4.06-5.45,5.53-7.75l2.21-4.43c.33-.33.82-.98,1.48-1.97.49-.98,1.31-1.48,2.46-1.48.82,0,1.52.29,2.09.86.57.58.86,1.27.86,2.09,0,.33-.17.82-.49,1.48-1.64,3.12-3.86,6.64-6.64,10.58-2.79,3.94-5.9,7.63-9.35,11.07-3.44,3.44-7.13,6.36-11.07,8.73-3.94,2.38-7.87,3.57-11.81,3.57s-7.26-1.11-9.47-3.32-3.86-4.96-4.92-8.24c-1.07-3.28-1.68-6.72-1.85-10.33-.17-3.61-.25-6.89-.25-9.84-1.31,3.12-2.95,6.68-4.92,10.7s-4.27,7.79-6.89,11.32-5.58,6.48-8.86,8.86c-3.28,2.38-6.89,3.57-10.82,3.57-2.79,0-5.09-.7-6.89-2.09-1.81-1.39-3.24-3.11-4.3-5.17-1.07-2.05-1.81-4.34-2.21-6.89-.41-2.54-.61-4.88-.61-7.01,0-5.08.9-10.17,2.71-15.25,1.8-5.08,4.39-9.67,7.75-13.78,3.36-4.1,7.3-7.42,11.81-9.96s9.47-3.81,14.88-3.81c2.29,0,4.47.37,6.52,1.11s3.81,1.93,5.29,3.57c.49-.49,1.06-.74,1.72-.74.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97l-.25.49h.01Zm-7.13,3.43c-.82-.82-1.76-1.85-2.83-3.08s-3.32-1.85-6.77-1.85c-4.59,0-8.82,1.19-12.67,3.57-3.86,2.38-7.1,5.41-9.72,9.1-2.63,3.69-4.67,7.75-6.15,12.18s-2.21,8.78-2.21,13.04c0,1.48.12,3.04.37,4.67.25,1.64.65,3.2,1.23,4.67.57,1.48,1.43,2.71,2.58,3.69,1.15.98,2.62,1.48,4.43,1.48,3.77,0,7.34-1.84,10.7-5.54,3.36-3.69,6.43-8.08,9.23-13.16,2.79-5.08,5.2-10.29,7.26-15.62,2.05-5.33,3.57-9.72,4.55-13.16h0Z"
            />
            <path
              mask="url(#mask-F-F)"
              id="F-F"
              className="cls-2"
              d="m414.2,9.86c4.75,0,9.22-.33,13.41-.98,4.18-.65,8.57-1.48,13.16-2.46l.25-.25c.82,0,1.56.29,2.21.86.65.58.98,1.27.98,2.09,0,1.15-.74,2.05-2.21,2.71-3.61,1.31-7.96,2.26-13.04,2.83-5.08.58-9.59.86-13.53.86-7.38,0-14.76-.57-22.14-1.72-7.38-1.15-14.76-1.72-22.14-1.72-3.94,0-7.34.21-10.21.61-2.87.41-5.5,1.23-7.87,2.46-2.38,1.23-4.59,2.83-6.64,4.8-2.05,1.97-4.22,4.59-6.52,7.87-.49.82-1.23,1.23-2.21,1.23-.82,0-1.52-.25-2.09-.74-.58-.49-.86-1.15-.86-1.97s.28-1.64.86-2.46c.57-.82,1.11-1.56,1.6-2.21,4.75-6.07,9.8-10.09,15.13-12.05,5.33-1.97,11.69-2.95,19.07-2.95s14.35.53,21.4,1.6c7.05,1.07,14.18,1.6,21.4,1.6h-.01Zm-40.34,11.55c-2.79,8.36-5.04,16.77-6.77,25.21-1.72,8.45-3.49,16.94-5.29,25.46-.17.82-.33,1.64-.49,2.46-.17.82-.49,3.28-.49,3.28h44.77s1.51-.29,2.09.29c.57.58.86,1.27.86,2.09s-.29,1.48-.86,1.97c-.58.49-1.27.74-2.09.66h-45.76c-1.48,7.38-2.87,14.88-4.18,22.35-1.31,7.46-2.46,15.05-3.44,22.75-.33,3.12-.7,6.19-1.11,9.23-.41,3.04-.78,6.19-1.11,9.47-.17,1.31-.25,2.66-.25,4.06s-.17,2.75-.49,4.06c-.33,1.8-1.23,2.71-2.71,2.71-.82,0-1.48-.29-1.97-.86-.49-.58-.58-2.09-.58-2.09v-.25s1.93-22.47,3.65-33.46,3.57-21.97,5.54-32.96c.16-.82.33-1.72.49-2.71.16-.98.33-1.88.49-2.3h-12.3c-1.81-.41-2.71-1.31-2.71-3.12,0-.82.25-1.51.74-2.09.49-.57,1.97-.79,1.97-.79h13.28s3.61-18.03,5.41-26.88c1.8-8.86,4.02-17.71,6.64-26.57.33-.98.74-2.17,1.23-3.57.49-1.39,1.39-2.09,2.71-2.09.82,0,1.51.33,2.09.98.57.66.86,1.4.86,2.21l-.25.49h.03Z"
            />
            <path
              mask="url(#mask-F-E)"
              id="F-E"
              className="cls-2"
              d="m425.26,115.88c.65,4.43,2.34,8.24,5.04,11.44,2.71,3.2,6.6,4.8,11.69,4.8,8.53,0,16.36-2.5,23.49-7.5,7.13-5,13.08-10.78,17.83-17.34,1.31-1.64,2.42-3.28,3.32-4.92s1.85-3.28,2.83-4.92c.33-.33.7-.7,1.11-1.11.41-.41.86-.62,1.35-.62.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97s-.37,1.76-1.11,2.83-1.27,2.01-1.6,2.83c-2.62,4.43-5.74,8.65-9.35,12.67-3.61,4.02-7.54,7.63-11.81,10.82-4.27,3.2-8.9,5.74-13.9,7.63s-10.21,2.83-15.62,2.83c-3.77,0-7.05-.78-9.84-2.34s-5.13-3.61-7.01-6.15c-1.89-2.54-3.28-5.41-4.18-8.61s-1.35-6.52-1.35-9.96c0-4.1.82-8.45,2.46-13.04,1.64-4.59,3.89-8.81,6.76-12.67,2.87-3.85,6.23-7.05,10.09-9.59,3.85-2.54,8.08-3.81,12.67-3.81,4.26,0,7.63,1.48,10.09,4.43s3.69,6.48,3.69,10.58c0,3.44-.82,6.6-2.46,9.47-1.64,2.87-3.77,5.45-6.4,7.75-2.62,2.3-5.45,4.31-8.49,6.03-3.04,1.72-6.03,3.08-8.98,4.06-4.1,1.15-8.53,1.72-13.28,1.72v-.02Zm-.24-5.66c1.97,0,3.94-.08,5.9-.25,1.97-.16,3.94-.57,5.9-1.23,2.46-.65,5-1.68,7.63-3.08,2.62-1.39,5.04-3.08,7.26-5.04s4.02-4.18,5.41-6.64,2.09-5.08,2.09-7.87c0-2.62-.78-4.71-2.34-6.27s-3.65-2.34-6.27-2.34c-3.61,0-6.93,1.07-9.96,3.2-3.04,2.13-5.66,4.84-7.87,8.12-2.21,3.28-3.98,6.85-5.29,10.7-1.32,3.86-2.13,7.42-2.46,10.7h0Z"
            />
            <path
              mask="url(#mask-F-S)"
              id="F-S"
              className="cls-2"
              d="m509.88,128.43c-.98-3.11-2.63-5.78-4.92-8-2.3-2.21-4.59-4.43-6.89-6.64-2.3-2.21-4.3-4.71-6.03-7.5-1.72-2.79-2.58-6.23-2.58-10.33,0-3.11.65-6.15,1.97-9.1,1.31-2.95,3.08-5.62,5.29-8,2.21-2.38,4.75-4.3,7.63-5.78,2.87-1.48,5.86-2.21,8.98-2.21,4.43,0,7.87,1.81,10.33,5.41,2.46,3.61,3.69,7.46,3.69,11.56,0,.82-.25,1.52-.74,2.09-.49.58-1.15.86-1.97.86-1.64,0-2.62-.9-2.95-2.71-.49-2.79-1.23-5.41-2.21-7.87s-3.36-3.69-7.13-3.69c-2.3,0-4.47.66-6.52,1.97-2.05,1.32-3.86,2.95-5.41,4.92-1.56,1.97-2.79,4.14-3.69,6.52s-1.35,4.64-1.35,6.76c0,2.95.78,5.5,2.34,7.63s3.36,4.22,5.41,6.27c2.05,2.05,4.18,4.18,6.4,6.4,2.21,2.21,3.97,4.96,5.29,8.24l1.97-1.23c2.95-1.8,5.94-3.48,8.98-5.04,3.03-1.56,6.03-3.2,8.98-4.92,2.95-1.72,5.78-3.65,8.49-5.78,2.71-2.13,5.12-4.59,7.26-7.38.65-.82,1.27-1.68,1.84-2.58s1.11-1.76,1.6-2.58l1.11-1.11c.41-.41.86-.62,1.35-.62.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97s-.29,1.64-.86,2.46c-.58.82-1.03,1.56-1.35,2.21-2.3,3.61-5,6.73-8.12,9.35-3.12,2.62-6.56,5.08-10.33,7.38-3.44,2.13-7.09,4.22-10.95,6.27-3.86,2.05-7.67,4.22-11.44,6.52.16.82.28,1.56.37,2.21.08.66.12,1.4.12,2.21,0,1.97-.29,4.18-.86,6.64-.58,2.46-1.48,4.8-2.71,7.01-1.23,2.21-2.71,4.06-4.43,5.54s-3.81,2.21-6.27,2.21c-2.3,0-4.14-.78-5.54-2.34s-2.09-3.49-2.09-5.78c0-3.61,1.6-7.18,4.8-10.7,3.2-3.52,6.6-6.68,10.21-9.47h-.02Zm1.23,6.41c-.82.49-1.84,1.32-3.08,2.46-1.23,1.15-2.38,2.38-3.44,3.69-1.07,1.31-2.01,2.66-2.83,4.06-.82,1.39-1.23,2.58-1.23,3.57,0,1.48.65,2.21,1.97,2.21,1.48,0,2.74-.62,3.81-1.84,1.06-1.23,1.97-2.71,2.71-4.43.74-1.72,1.27-3.48,1.6-5.29.33-1.8.49-3.28.49-4.43h0Z"
            />
            <path
              mask="url(#mask-F-T)"
              id="F-T"
              className="cls-2"
              d="m574.82,41.35c-3.04,4.8-5.68,11.04-7.92,18.72,1.44,0,2.92.04,4.44.12,1.52.08,3.08.12,4.68.12,1.44,0,2.96-.04,4.56-.12,1.6-.08,3.12-.04,4.56.12.8.16,1.48.48,2.04.96s.84,1.12.84,1.92-.28,1.44-.84,1.92c-.56.48-1.24.72-2.04.72h-7.61l-12.3-.38c-1.97,7.38-3.49,14.8-4.55,22.26-1.07,7.46-1.6,13.65-1.6,18.57,0,2.13.12,4.59.37,7.38s.82,5.41,1.72,7.87c.9,2.46,2.21,4.51,3.94,6.15,1.72,1.64,4.06,2.46,7.01,2.46,2.79,0,5.78-.98,8.98-2.95,3.2-1.97,6.31-4.3,9.35-7.01,3.03-2.71,5.82-5.57,8.36-8.61,2.54-3.03,4.63-5.54,6.27-7.5,1.15-1.31,2.17-2.71,3.07-4.18.9-1.48,1.93-2.95,3.08-4.43.65-.98,1.48-1.48,2.46-1.48.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97s-.41,1.81-1.23,2.95c-.82,1.15-1.48,2.13-1.97,2.95-2.13,2.95-4.76,6.36-7.87,10.21-3.12,3.86-6.56,7.5-10.33,10.95-3.77,3.44-7.67,6.36-11.68,8.73-4.02,2.38-8,3.57-11.93,3.57s-7.1-1.06-9.47-3.2c-2.38-2.13-4.27-4.75-5.66-7.87-1.4-3.11-2.3-6.48-2.71-10.09-.41-3.61-.62-6.89-.62-9.84,0-4.59.57-10.54,1.72-17.83,1.15-7.29,4.43-21.39,4.43-21.39h-15.31c-.83,0-1.54-.25-2.12-.75s-.87-1.16-.87-2c0-1.66.92-2.66,2.75-3,1.5-.33,3.13-.46,4.88-.38,1.75.09,3.46.13,5.12.13h7.61c1.28-4.16,2.52-7.92,3.72-11.28,1.2-3.36,2.44-6.16,3.72-8.4.29-.73.71-1.42,1.27-2.08.63-.75,1.55-1.27,2.52-1.28.82,0,1.52.27,2.09.84.56.56.84,1.24.84,2.04,0,.32-.08.6-.24.84s-.32.52-.48.84h0Z"
            />
            <path
              mask="url(#mask-F-I)"
              id="F-I"
              className="cls-2"
              d="m622.05,77.51c-1.81,5.41-3.36,10.79-4.67,16.11-1.31,5.33-1.97,10.79-1.97,16.36,0,2.3.2,4.55.62,6.77.41,2.21,1.11,4.22,2.09,6.03.98,1.81,2.38,3.28,4.18,4.43s4.1,1.72,6.89,1.72c3.77,0,7.42-1.06,10.95-3.2,3.52-2.13,6.8-4.8,9.84-8,3.03-3.2,5.86-6.64,8.49-10.33,2.62-3.69,4.84-7.01,6.64-9.96.33-.33.7-.7,1.11-1.11s.86-.62,1.35-.62c.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97,0,.33-.17.82-.49,1.48-1.64,3.61-3.94,7.46-6.89,11.56s-6.27,7.87-9.96,11.32c-3.69,3.44-7.63,6.32-11.81,8.61-4.18,2.3-8.49,3.44-12.92,3.44-3.61,0-6.64-.82-9.1-2.46-2.46-1.64-4.43-3.73-5.9-6.27-1.48-2.54-2.5-5.37-3.08-8.49-.58-3.11-.86-6.15-.86-9.1,0-2.13.2-4.67.62-7.63.41-2.95.94-5.94,1.6-8.98.65-3.03,1.39-5.98,2.21-8.86.82-2.87,1.72-5.29,2.71-7.26.49-1.31,1.39-1.97,2.71-1.97.82,0,1.51.33,2.09.98.57.66.86,1.4.86,2.21l-.25.49v.02Zm-1.24-20.66c0-1.31.41-2.38,1.23-3.2s1.88-1.23,3.2-1.23,2.38.41,3.2,1.23,1.23,1.89,1.23,3.2-.41,2.42-1.23,3.32c-.82.9-1.89,1.35-3.2,1.35s-2.38-.45-3.2-1.35c-.82-.9-1.23-2.01-1.23-3.32Z"
            />
            <path
              mask="url(#mask-F-V)"
              id="F-V"
              className="cls-2"
              d="m665.6,105.55c0-1.97.04-4.26.12-6.89.08-2.62.2-5.29.37-8,.16-2.71.45-5.37.86-8,.41-2.62.86-4.84,1.35-6.64.65-1.64,1.56-2.46,2.71-2.46.82,0,1.51.29,2.09.86.57.58.86,1.27.86,2.09l-.25.49c-.82,4.76-1.44,9.51-1.84,14.27-.41,4.76-.62,9.51-.62,14.27,0,1.31.08,3.41.25,6.27.16,2.87.53,5.78,1.11,8.73.57,2.95,1.39,5.54,2.46,7.75,1.06,2.21,2.5,3.32,4.3,3.32s3.69-.9,5.66-2.71c1.97-1.8,3.85-4.14,5.66-7.01,1.8-2.87,3.57-6.15,5.29-9.84s3.32-7.42,4.8-11.19c-.49-1.64-.9-3.36-1.23-5.17-.33-1.8-.49-3.61-.49-5.41,0-1.31.12-3.08.37-5.29s.74-4.39,1.48-6.52,1.72-3.97,2.95-5.53c1.23-1.56,2.74-2.34,4.55-2.34s3.08.7,3.81,2.09c.74,1.4,1.11,2.83,1.11,4.3,0,2.46-.62,5.9-1.84,10.33-1.23,4.43-2.75,9.1-4.55,14.02,2.62,5.58,7.54,8.36,14.76,8.36,3.44,0,6.43-.78,8.98-2.34,2.54-1.56,4.71-3.28,6.52-5.17,1.8-1.88,3.32-3.61,4.55-5.17s2.34-2.34,3.32-2.34c.82,0,1.51.29,2.09.86.57.58.86,1.27.86,2.09,0,.66-.25,1.23-.74,1.72-3.44,4.59-7.22,8.45-11.32,11.56-4.1,3.12-9.19,4.67-15.25,4.67-3.77,0-6.97-.74-9.59-2.21-2.62-1.48-4.84-3.36-6.64-5.66-1.64,3.77-3.44,7.46-5.41,11.07s-4.06,6.76-6.27,9.47-4.43,4.88-6.64,6.52-4.47,2.46-6.77,2.46c-3.12,0-5.62-1.23-7.5-3.69-1.89-2.46-3.28-5.37-4.18-8.73-.9-3.36-1.48-6.85-1.72-10.46-.25-3.61-.37-6.56-.37-8.86l-.02.06Zm39.36-16.73c.82-2.46,1.36-4.64,1.72-6.52.6-3.09,3.48-16.36.74-4.8-.82,1.81-1.39,3.65-1.72,5.54-.33,1.89-.58,3.81-.74,5.78Z"
            />
            <path
              mask="url(#mask-F-A)"
              id="F-A"
              className="cls-2"
              d="m791.54,79.97c-.49,4.59-.98,9.14-1.48,13.65-.49,4.51-.74,9.06-.74,13.65,0,1.81.08,3.9.25,6.27.16,2.38.62,4.67,1.35,6.89.74,2.21,1.8,4.1,3.2,5.66,1.39,1.56,3.32,2.34,5.78,2.34,2.95,0,5.94-.86,8.98-2.58,3.03-1.72,5.9-3.85,8.61-6.4,2.71-2.54,5.17-5.25,7.38-8.12s4.06-5.45,5.53-7.75l2.21-4.43c.33-.33.82-.98,1.48-1.97.49-.98,1.31-1.48,2.46-1.48.82,0,1.51.29,2.09.86.57.58.86,1.27.86,2.09,0,.33-.17.82-.49,1.48-1.64,3.12-3.86,6.64-6.64,10.58-2.79,3.94-5.9,7.63-9.35,11.07s-7.13,6.36-11.07,8.73c-3.94,2.38-7.87,3.57-11.81,3.57s-7.26-1.11-9.47-3.32-3.86-4.96-4.92-8.24c-1.07-3.28-1.68-6.72-1.84-10.33-.17-3.61-.25-6.89-.25-9.84-1.32,3.12-2.95,6.68-4.92,10.7s-4.27,7.79-6.89,11.32-5.58,6.48-8.86,8.86c-3.28,2.38-6.89,3.57-10.82,3.57-2.79,0-5.08-.7-6.89-2.09s-3.24-3.11-4.31-5.17c-1.07-2.05-1.81-4.34-2.21-6.89-.41-2.54-.62-4.88-.62-7.01,0-5.08.9-10.17,2.71-15.25,1.8-5.08,4.39-9.67,7.75-13.78,3.36-4.1,7.3-7.42,11.81-9.96s9.47-3.81,14.88-3.81c2.29,0,4.47.37,6.52,1.11,2.05.74,3.81,1.93,5.29,3.57.49-.49,1.07-.74,1.72-.74.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97l-.25.49h.02Zm-7.13,3.43c-.82-.82-1.76-1.85-2.83-3.08s-3.32-1.85-6.76-1.85c-4.59,0-8.82,1.19-12.67,3.57-3.86,2.38-7.1,5.41-9.72,9.1-2.62,3.69-4.67,7.75-6.15,12.18-1.48,4.43-2.21,8.78-2.21,13.04,0,1.48.12,3.04.37,4.67.25,1.64.65,3.2,1.23,4.67.57,1.48,1.43,2.71,2.58,3.69s2.62,1.48,4.43,1.48c3.77,0,7.34-1.84,10.7-5.54,3.36-3.69,6.43-8.08,9.22-13.16,2.79-5.08,5.2-10.29,7.26-15.62,2.05-5.33,3.57-9.72,4.55-13.16h0Z"
            />
            <path
              mask="url(#mask-F-L)"
              id="F-L"
              className="cls-2"
              d="m839.27,100.39c-.17.98-.21,1.97-.12,2.95.08.98.12,1.97.12,2.95,0,1.97.12,4.47.37,7.5.25,3.04.82,5.9,1.72,8.61.9,2.71,2.17,5.04,3.81,7.01,1.64,1.97,3.85,2.95,6.64,2.95,3.11,0,6.27-.98,9.47-2.95,3.2-1.97,6.27-4.39,9.23-7.26,2.95-2.87,5.66-5.86,8.12-8.98,2.46-3.11,4.51-5.82,6.15-8.12.98-1.48,1.93-2.95,2.83-4.43s1.84-2.87,2.83-4.18c.65-.98,1.48-1.48,2.46-1.48.82,0,1.51.25,2.09.74.57.49.86,1.15.86,1.97,0,.49-.17,1.07-.49,1.72-1.97,3.44-4.55,7.42-7.75,11.93s-6.77,8.78-10.7,12.79c-3.94,4.02-8.12,7.38-12.55,10.09s-8.86,4.06-13.28,4.06c-3.61,0-6.56-1.15-8.86-3.44-2.3-2.29-4.1-5.08-5.41-8.36s-2.18-6.77-2.58-10.46c-.41-3.69-.62-6.93-.62-9.72,0-3.61.12-7.17.37-10.7s.78-7.01,1.6-10.46c.49-2.62,1.27-5.98,2.34-10.09,1.07-4.1,2.38-8.49,3.94-13.16s3.36-9.43,5.41-14.27,4.34-9.18,6.89-13.04c2.54-3.85,5.25-7.01,8.12-9.47,2.87-2.46,5.86-3.69,8.98-3.69,3.28,0,5.62,1.19,7.01,3.57s2.09,4.96,2.09,7.75c0,4.59-1.19,9.96-3.57,16.11s-5.33,12.26-8.86,18.33c-3.53,6.07-7.34,11.73-11.44,16.97-4.1,5.25-7.87,9.35-11.32,12.3-.49.49-1.35,1.15-2.58,1.97-1.23.82-2.34,1.48-3.32,1.97v.02Zm.74-7.13c.82-.49,1.51-1.02,2.09-1.6s1.27-1.19,2.09-1.84c2.79-2.62,5.94-6.31,9.47-11.07,3.52-4.75,6.85-9.88,9.96-15.38,3.11-5.49,5.74-10.95,7.87-16.36s3.2-10.09,3.2-14.02c0-.98-.21-2.17-.62-3.57-.41-1.39-1.35-2.09-2.83-2.09-1.97,0-3.9.95-5.78,2.83-1.89,1.89-3.41,3.57-4.55,5.04-2.62,3.61-5.08,7.75-7.38,12.42s-4.35,9.55-6.15,14.64c-1.81,5.08-3.32,10.25-4.55,15.5s-2.17,10.42-2.83,15.5h.01Z"
            />
          </g>
        </svg>
      </div>
      <Countdown />
    </motion.div>
  );
}

export default Hero;

/* <span className="hero-text">Beach Festival</span> */

// const svgPath = document.querySelectorAll(".cls-1");
// anime({
//   targets: svgPath,
//   loop: true,
//   direction: "forward",
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: "easeInOutSine",
//   duration: 500,
//   delay: (el, i) => {
//     return i * 550;
//   },
// });
