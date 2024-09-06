// import { useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import { BASE_URL } from '../../appconstants/BaseUrl';

// function VideoPlayerPage() {
//     let { videoId } = useParams();

//     return (
//         <section className="ml-auto mr-auto">
//             <div className="flex justify-center items-center">
//                 <div className="video-container">
//                     <ReactPlayer
//                         url={`${BASE_URL}videos/${videoId}/master.m3u8`}
//                         playing={true} // Start playing only when user clicks play
//                         controls={true}
//                         width="100%"
//                         height="100%"
//                         config={{
//                             file: {
//                                 attributes: {
//                                     controlsList: 'nodownload',
//                                     preload: 'none', // Prevent preloading of chunks
//                                 },
//                             },
//                         }}
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default VideoPlayerPage;
