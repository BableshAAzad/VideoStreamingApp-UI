import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../baseurl/BaseUrl";
import VideoPlayer from "../videos/VideoPlayer";
import "./SidebarComp.css"

function SidebarComp({ videos }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateResponsiveClass = () => {
            if (window.innerWidth < 768) {
                setIsOpen(true);
            }
        };

        updateResponsiveClass();

        window.addEventListener('resize', updateResponsiveClass);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', updateResponsiveClass);
    }, [window.innerWidth]);

    return (
        <section className="flex justify-between">
            <Sidebar className="p-0 pt-1 h-screen logoColorSidebar" collapsed={isOpen} aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                            <Sidebar.Item href="#">Products</Sidebar.Item>
                            <Sidebar.Item href="#">Sales</Sidebar.Item>
                            <Sidebar.Item href="#">Refunds</Sidebar.Item>
                            <Sidebar.Item href="#">Shipping</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item href="#" icon={HiInbox}>
                            Inbox
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Products
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className="p-1 w-full">
                <div className="">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
                        {videos.map(({ videoId, title, description, contentType, filePath }) => {
                            return <VideoPlayer key={videoId} url={`${BASE_URL}videos/${videoId}/master.m3u8`} />
                        })}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SidebarComp
