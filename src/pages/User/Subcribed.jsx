import React from 'react'
import { motion } from "framer-motion";

import EventCard from '../../component/EventCard'

function Subcribed() {
    return (
        <motion.div className='Subcribed'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
            <ol className='list-none'>
                <EventCard />
                <EventCard />
                <EventCard />
            </ol>
        </motion.div>
    )
}

export default Subcribed