import { faSearch, faUser, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "flowbite-react";
import DarkModeOption from "../darkmode/DarkModeOption";
import "./HeaderComp.css"
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../../images/logo.png"
import NetworkStatus from "../network/NetworkStatus"

function HeaderComp() {
    const location = useLocation();

    document.title = "Video Streaming App"

    const handleSearchClick = () => {
    };

    return (
        <>
            <Navbar fluid className='bg-slate-300 dark:bg-gray-800 fixed w-full z-20 top-0 start-0 bg-opacity-75 dark:bg-opacity-70'>
                <NavLink to='/' className='flex items-center navlogo'>
                    <img src={logo} alt="VideoStreamingApp" width="37" height="37" className="mr-1" title="VideoStreamingApp" />
                    <span className="self-center sitename dark:text-white text-xl font-semibold break-words md:whitespace-normal">Video Streaming App <NetworkStatus /> </span>
                </NavLink>
                <div className="flex md:order-1 md:w-1/4">
                    <Navbar.Toggle />
                    <button onClick={handleSearchClick} className="md:hidden p-2 dark:text-white">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <div className={`w-full hidden md:block`}>
                        <div
                            className="w-full cursor-pointer rounded-md p-2 bg-white dark:bg-slate-700
                             text-gray-700 dark:text-slate-300 flex items-center"
                            onClick={handleSearchClick}
                        >
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            <span className="flex-grow">Search Videos...</span>
                        </div>
                    </div>
                </div>
                <Navbar.Collapse className="md:order-2">

                    <NavLink to="/video-upload" className="text-base">
                        <Navbar.Link active={location.pathname === "/video-upload"} as="div">
                            <FontAwesomeIcon icon={faVideo} />
                        </Navbar.Link>
                    </NavLink>

                    <NavLink to="/" className='text-base'>
                        <Navbar.Link active={location.pathname === "/"} as="div">
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </Navbar.Link>
                    </NavLink>

                    <div className='navbtn mt-auto mb-auto dark:text-slate-400 hover:dark:text-slate-100'>
                        <Navbar.Link className='ml-[-12px]' as="div">
                            <DarkModeOption />
                        </Navbar.Link>
                    </div>

                </Navbar.Collapse>
            </Navbar>

        </>
    );
}

export default HeaderComp;
