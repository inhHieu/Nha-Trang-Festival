import React from 'react'

import EventCard from '../Categories/EventCard'

function Subcribed() {
    return (
        <div className='Subcribed'>
            <ol className='list-none'>
                <EventCard />
                <EventCard />
                <EventCard />
            </ol>
        </div>
    )
}

export default Subcribed