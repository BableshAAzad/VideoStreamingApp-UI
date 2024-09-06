import VideoPlayer from "../videos/VideoPlayer";
import "./VideoCard.css"
import videoImage from "../../../images/video_pluse2.png"
import PropTypes from "prop-types";

function VideoCard({ videos, isLoading }) {
    return (
        <>
            <div className="p-2 w-full">
                    <div className="">
                        {videos.length > 0 || isLoading ? "" : <div className="max-w-64 mt-5 mb-10 ml-auto mr-auto">
                            <img src={videoImage} alt="No_Videos" />
                            <h2 className="text-xl mt-5 ml-5 text-red-600 dark:text-red-700">There Are No Videos...😌</h2>
                        </div>}
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-1">
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
        </>
    )
}

export default VideoCard

VideoCard.propTypes = {
    videos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};


