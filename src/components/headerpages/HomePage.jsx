import { Link } from "react-router-dom"
import { BASE_URL } from "../baseurl/BaseUrl"
import videoImage from "../../images/video_pluse2.png"
import "./HomePage.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../authprovider/AuthProvider"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../spinner/Spinner"

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
    <div>
      <h1 className='dark:text-lime-300 text-center text-2xl'>Home page</h1>
      {isLoading && <Spinner />}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreVideos}
        hasMore={videos.length !== totalResults}
        loader={<Spinner />}
        scrollableTarget="row"
      >
        <section className="flex flex-wrap m-1 justify-around">
          {videos.length > 0 ?
            videos.map(({ videoId, title, description, contentType, filePath }) => {
              return <Link to={`/video-stream/${videoId}`}
                key={videoId}
                className="rounded-md m-2 w-72 cardShadowDark product-link overflow-auto"
                title={title}>
                <div className="p-2">
                  <video
                    src={`${BASE_URL}videos/${videoId}/stream`} controls></video>
                  <h5 className="text-xl font-bold tracking-tight text-gray-700 dark:text-slate-300">
                    {title}
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {description !== null ? description : "N/A"}
                  </p>
                </div>
              </Link>
            }) : <img src={videoImage} alt="video_image" />}
        </section>
      </InfiniteScroll>
    </div>
  )
}

export default HomePage
