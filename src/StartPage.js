import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from './Marquee'

const StartPage = () => {
    return (
            <div>
                <Marquee />
                <Link to='/quiz'><button className='start-btn'>Start</button></Link>
            </div>
    )
}

export default StartPage;