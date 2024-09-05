import { BASE_URL } from "../baseurl/BaseUrl"
import "./HomePage.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../authprovider/AuthProvider"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../spinner/Spinner"
import SidebarComp from "./sidebar/SidebarComp"

function HomePage() {
  let [videos, setVideos] = useState([])
  let [page, setPage] = useState(0);
  let [totalResults, setTotalResults] = useState(0);
  let [isLoading, setIsLoading] = useState(true)
  let { setProgress } = useContext(AuthContext)

  document.title = "Video Streaming App"

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

  return (
    <>
      <section>
        {isLoading && <Spinner />}
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={videos.length !== totalResults}
          loader={<Spinner />}
          scrollableTarget="row"
        >
          <SidebarComp videos={videos} />
        </InfiniteScroll>
      </section>
    </>
  )
}

export default HomePage
