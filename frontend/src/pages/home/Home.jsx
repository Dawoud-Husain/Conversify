import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import NavBar from '../../components/utility/NavBar';
import MessageContainer from '../../components/messages/MessageContainer'
const Home = () => {
    return (
        <>
            <NavBar/>
            <div className='flex flex-row h-full w-full pt-20'>
                <Sidebar />
                <MessageContainer />
            </div>
        </>
    );
};

export default Home;