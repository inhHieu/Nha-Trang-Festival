import React from 'react'
import bg from "../asses/art.jpg";

function EventCard() {
  return (
    <li className='group'>
      <article className="article h-71 w-80 cursor-pointer	">
        <div className="img-wrap  w-full  h-4/6 overflow-clip	">
          <img className='group-hover:scale-100 w-full  h-full  object-cover  scale-105	duration-300  ' src={bg} alt=""></img>
        </div>
        <div className="into px-4 pt-1">
          <div className="tag text-sea-blue text-05 uppercase tracking-wider	">Art</div>
          <div className="title pt-1 font-bold">Painting material</div>
          <div className="date pt-3 text-06"> 3 days ago</div>
        </div>
      </article>
    </li>
  )
}

export default EventCard