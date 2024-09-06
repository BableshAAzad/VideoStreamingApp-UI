import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiBookOpen, HiHome, HiTable, HiThumbUp, HiUserGroup, HiVideoCamera } from "react-icons/hi";
import VideoPlayer from "../videos/VideoPlayer";
import "./SidebarComp.css"
import videoImage from "../../../images/video_pluse2.png"
import PropTypes from "prop-types";
import { HiComputerDesktop, HiPower } from "react-icons/hi2";
import { GiGamepad } from "react-icons/gi";

function SidebarComp({ videos }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateResponsiveClass = () => {
            if (window.innerWidth < 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        updateResponsiveClass();

        window.addEventListener('resize', updateResponsiveClass);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', updateResponsiveClass);
    }, []);

    return (
        <section className="flex justify-between">
            <Sidebar className="p-0 pt-1 h-screen logoColorSidebar" collapsed={isOpen} aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiHome}>
                            Home
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={HiBookOpen} label="Education">
                            <Sidebar.Item href="#">Programming</Sidebar.Item>
                            <Sidebar.Item href="#">School</Sidebar.Item>
                            <Sidebar.Item href="#">Collage</Sidebar.Item>
                            <Sidebar.Item href="#">Farming</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item href="#" icon={HiThumbUp}>
                            Motivation
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiComputerDesktop}>
                            Technology
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={GiGamepad}>
                            Gaming
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUserGroup}>
                            Children
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiVideoCamera}>
                            Other
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiPower}>
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className="p-2 w-full">
                <div className="">
                    {videos.length > 0 ? "" : <div className="max-w-64 mt-5 mb-10 ml-auto mr-auto">
                        <img src={videoImage} alt="No_Videos" />
                        <h2 className="text-xl mt-5 ml-5 text-red-600 dark:text-red-700">There Are No Videos...😌</h2>
                    </div>}
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
                        {videos.map(({ videoId, title, description }) => {
                            return <div key={videoId} className="flex flex-col cardShadow pb-1" >
                                <VideoPlayer videoId={videoId} />
                                <h5 className="text-xl font-bold tracking-tight text-sky-500 ml-3">
                                    {title}
                                </h5>
                                <p className="text-sm text-gray-700 dark:text-gray-400 ml-3">
                                    {description !== null ? description : "N/A"}
                                </p>
                            </div>
                        })}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SidebarComp

// SidebarComp.propTypes = {
//     videos: PropTypes.array.isRequired,
// };


