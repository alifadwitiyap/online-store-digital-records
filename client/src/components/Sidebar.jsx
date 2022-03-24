import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Title from './Title';
import SidebarSelection from './SidebarSelection';
import navSelections from '../data/navSelections';

function Sidebar() {
  const [isOpened, setIsOpened] = useState(false);

  let className = 'relative z-10 h-screen w-64 p-4 bg-purple-600 shadow-md ease-in-out duration-300';
  className = `${className} ${isOpened ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <div className="fixed">
      <div className="relative">
        <AiOutlineMenu
          className="absolute text-4xl top-4 left-4 text-purple-600 hover:text-purple-800 hover:cursor-pointer"
          onClick={() => setIsOpened(true)}
        />
        <div className={className}>
          <AiOutlineClose
            className="absolute top-5 right-5 text-white text-xl hover:cursor-pointer"
            onClick={() => setIsOpened(false)}
          />
          <div className="mt-14 flex flex-col items-center">
            <Title color="white">Online Store Digital Records</Title>
            <BsPersonCircle className="text-white text-8xl my-4" />
            <Title color="white">Owner</Title>
            <div className="mt-8 h-80 overflow-y-scroll no-scrollbar">
              {navSelections.map(({ text, path }) => <SidebarSelection text={text} path={path} />)}
            </div>
          </div>
          <br />
          <Link to="/login" className="text-white m-2 p-2 border rounded hover:bg-purple-700">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
