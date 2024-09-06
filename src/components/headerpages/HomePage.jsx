import { BASE_URL } from "../appconstants/BaseUrl"
import "./HomePage.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../authprovider/AuthProvider"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../spinner/Spinner"
import VideoCard from "./videocart/VideoCard"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { HiComputerDesktop, HiPower } from "react-icons/hi2";
import { GiGamepad } from "react-icons/gi";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiBookOpen, HiHome, HiTable, HiThumbUp, HiUserGroup, HiVideoCamera } from "react-icons/hi";
import Loader from "../spinner/Loader"


function HomePage() {
  let [videos, setVideos] = useState([])
  let [page, setPage] = useState(0);
  let [totalResults, setTotalResults] = useState(0);
  let [isLoading, setIsLoading] = useState(true)
  let { setProgress } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  let [filterQuery, setFilterQuery] = useState("")

  let getAllVideos = async () => {
    setIsLoading(true);
    setProgress(30)
    setProgress(70)
    try {
      let response = await axios.get(`${BASE_URL}videos?page=${page}&size=6`);
      setProgress(90)
      // console.log(response);
      if (response.status === 200) {
        setVideos(response.data.data.content);
        setTotalResults(response.data.data.page.totalElements);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setProgress(100)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  let fetchMoreVideos = async () => {
    try {
      let response = await axios.get(`${BASE_URL}videos?page=${page + 1}&size=6`);
      // console.log(response);
      setPage(page + 1);
      setVideos([...videos, ...response.data.data.content]);
      setTotalResults(response.data.data.page.totalElements);
    } catch (error) {
      console.log(error)
    }
  };


  let getFilterVideos = async () => {
    setIsLoading(true);
    setProgress(30)
    setProgress(70)
    try {
      let response = await axios.get(`${BASE_URL}videos/filter/${filterQuery}?page=${page}&size=6`);
      setProgress(90)
      // console.log(response);
      if (response.status === 200) {
        setVideos(response.data.data.content);
        setTotalResults(response.data.data.page.totalElements);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setProgress(100)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filterQuery) {
      getFilterVideos();
      setPage(0);
    }
  }, [filterQuery])

  let getFilterMoreVideos = async () => {
    try {
      let response = await axios.get(`${BASE_URL}videos/filter/${filterQuery}?page=${page + 1}&size=6`);
      // console.log(response);
      setPage(page + 1);
      setVideos([...videos, ...response.data.data.content]);
      setTotalResults(response.data.data.page.totalElements);
    } catch (error) {
      console.log(error)
    }
  };

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

    return () => window.removeEventListener('resize', updateResponsiveClass);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Video Streaming App</title>
          <meta name="description" content="Enjoy videos, Upload your videos and start you own channel and your journy" />
        </Helmet>
        <section>
          <section className="flex justify-between">
            <Sidebar className="p-0 pt-1 h-screen logoColorSidebar" collapsed={isOpen} aria-label="Sidebar with multi-level dropdown example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="/" icon={HiHome}>
                    Home
                  </Sidebar.Item>
                  <Sidebar.Collapse icon={HiBookOpen} label="Education">
                    <Sidebar.Item onClick={() => setFilterQuery("Programming")}>Programming</Sidebar.Item>
                    <Sidebar.Item onClick={() => setFilterQuery("School")}>School</Sidebar.Item>
                    <Sidebar.Item onClick={() => setFilterQuery("Collage")}>Collage</Sidebar.Item>
                    <Sidebar.Item onClick={() => setFilterQuery("Farming")}>Farming</Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Item onClick={() => setFilterQuery("Motivation")} icon={HiThumbUp}>
                    Motivation
                  </Sidebar.Item>
                  <Sidebar.Item onClick={() => setFilterQuery("Technology")} icon={HiComputerDesktop}>
                    Technology
                  </Sidebar.Item>
                  <Sidebar.Item onClick={() => setFilterQuery("Gaming")} icon={GiGamepad}>
                    Gaming
                  </Sidebar.Item>
                  <Sidebar.Item onClick={() => setFilterQuery("Children")} icon={HiUserGroup}>
                    Children
                  </Sidebar.Item>
                  <Sidebar.Item onClick={() => setFilterQuery("Other")} icon={HiVideoCamera}>
                    Other
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiArrowSmRight}>
                    Sign In
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiTable}>
                    Sign Up
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiPower}>
                    Logout
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>

            <InfiniteScroll
              dataLength={videos.length}
              next={filterQuery ? getFilterMoreVideos : fetchMoreVideos}
              hasMore={videos.length !== totalResults}
              loader={<Spinner />}
              scrollableTarget="row"
            >
              <VideoCard videos={videos} isLoading={isLoading} />
              {isLoading && <Loader />}
            </InfiniteScroll>

          </section>
        </section>
      </HelmetProvider>
    </>
  )
}

export default HomePage
