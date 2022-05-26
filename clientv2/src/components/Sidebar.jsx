import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import SidebarSelection from './SidebarSelection';
import navSelections from '../data/navSelections';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';

/**
 * A sidebar for navigation.
 */
function Sidebar() {
  const [isOpened, setIsOpened] = useState(false);
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let className = 'relative z-10 h-screen w-64 p-4 bg-purple-600 shadow-md ease-in-out duration-300';
  className = `${className} ${isOpened ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <div className={`fixed ${isOpened ? 'z-10' : ''}`}>
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
            <Title className="text-xl text-white">
              Online Store Digital Records
            </Title>
            <BsPersonCircle className="text-white text-8xl my-4" />
            <Title className="text-xl text-white">Owner</Title>
            <div className="mt-8 h-80 overflow-y-scroll no-scrollbar">
              {navSelections[role].map(({ text, path }) => (
                <SidebarSelection key={text} text={text} path={path} />
              ))}
            </div>
          </div>
          <br />
          <button
            type="button"
            className="text-white m-2 p-2 border rounded hover:bg-purple-700"
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
