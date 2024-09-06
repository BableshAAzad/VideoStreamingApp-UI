import { useParams } from "react-router-dom"
import { BASE_URL } from "../../appconstants/BaseUrl";

function VideoStream() {
    let { videoId } = useParams();
    document.title = "Video Streaming"
    // console.log(videoId)
    return (
        <div>
            <h1 className='dark:text-lime-300 text-lime-600 text-2xl text-center mb-8'>Play Video</h1>

            <section className="flex justify-center mb-8">
                <video
                    style={{ width: "50rem" }}
                    src={`${BASE_URL}videos/${videoId}/stream/range`} controls></video>
            </section>
        </div>
    )
}

export default VideoStream
