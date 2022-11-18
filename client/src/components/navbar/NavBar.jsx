import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import DropDownUser from '../DropDownUser';
import titlePage from './Constants';
import UserPopup from '../popup/UserPopup';
import { Store } from '../../store/Store';
import TempSideBar from './TempSideBar';

export default function NavBar() {
  const [openUserModal, setOpenUserModal] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [isOpen, setIsOpen] = useState(false);

  const props = {
    isOpen,
    setIsOpen
  }

  return (
    <React.Fragment>
      <nav className="bg-white px-2 sm:px-4 py-2.5 shadow-lg">
        <div className="container flex flex-wrap justify-between items-center">
          <Link to={'/'} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FastFood
            </span>
          </Link>
          <div className="flex lg:order-2">
            <div className="hidden lg:flex lg:flex-row items-center gap-5">
              {userInfo ? (
                <React.Fragment>
                  <IoLocationOutline
                    onClick={() => setOpenUserModal(true)}
                    size={24}
                    className="hover-pointer"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <Link to={'/saved'}>
                <AiOutlineHeart fill="#000" size={24} />
              </Link>
              <Link to={'/cart'}>
                <AiOutlineShoppingCart size={24} />
              </Link>
              {/* Drop down user */}
              <DropDownUser />
              <Link
                to={'/contact'}
                className="contact-btn-3D"
              >
                {' '}
                Contact
              </Link>
            </div>
            {/* Open side bar */}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-cta"
          >
            <ul className="flex p-4 mt-4 border border-gray-100 lg:flex-row lg:space-x-4  md:mt-0 md:text-sm lg:font-medium lg:border-0 lg:bg-white">
              {titlePage.map((index, i) => (
                <li key={i}>
                  <Link
                    to={`${index.directname}`}
                    className="block py-2 pr-4 pl-3 lg:text-black rounded lg:bg-transparent lg:p-0"
                    aria-current="page"
                  >
                    {index.page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {userInfo ? (
        <UserPopup
          openUserModal={openUserModal}
          setOpenUserModal={setOpenUserModal}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <TempSideBar {...props}/>
    </React.Fragment>
  );
}
