import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../appconstants/BaseUrl';
import axios from 'axios';
import "./VideoPlayerPage.css"
import Spinner from '../../spinner/Spinner';

function VideoPlayerPage() {
    let { videoId } = useParams();
    let playerRef = useRef(null);
    let [isLoading, setIsLoading] = useState(false);
    let [videoData, setVideoData] = useState({})

    let fetchVideoDetails = async () => {
        setIsLoading(true);
        try {
            let response = await axios.get(`${BASE_URL}videos/${videoId}`);
            if (response.status === 200) {
                setVideoData(response.data.data)
            }
            // console.log(response)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideoDetails()
    }, [])

    return (
        <section className="flex justify-center items-center m-5">
            <div className="cardShadowVideoPlayer sm:w-full lg:w-[70%] ">
                <div style={{
                    position: 'relative',
                    // width: '100%',
                    // height: '100%'
                }}>
                    <ReactPlayer
                        className="rounded-lg"
                        ref={playerRef}
                        url={`${BASE_URL}videos/${videoId}/master.m3u8`}
                        // playing={playing}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                </div>
                {videoData && <div className='m-3'>
                    <h1 className='text-2xl text-green-500 font-bold'>{videoData.title}</h1>
                    <h3 className='text-xl text-purple-500'>{videoData.description}</h3>
                    <h4 className='text-lg text-sky-500'>
                        <span className='text-slate-700 dark:text-slate-400'>Category : </span>
                        {videoData.category}
                    </h4>
                </div>}
                {isLoading && <Spinner />}
            </div>
        </section>
    );
}

export default VideoPlayerPage;
