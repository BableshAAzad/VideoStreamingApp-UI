import { useParams } from "react-router-dom"
import { BASE_URL } from "../../baseurl/BaseUrl";

function VideoStream() {
    let { videoId } = useParams();
    // console.log(videoId)
    return (
        <div>
            <h1 className='dark:text-lime-300 text-lime-600 text-2xl text-center mb-8'>Play Video</h1>

            <section className="flex justify-center mb-8">
                <video
                    style={{ width: "500px" }}
                    src={`${BASE_URL}videos/${videoId}/stream`} controls></video>
            </section>
        </div>
    )
}

export default VideoStream
