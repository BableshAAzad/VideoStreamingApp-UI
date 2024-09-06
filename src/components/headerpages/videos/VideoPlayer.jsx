import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import "./VideoPlayer.css"
import { BASE_URL } from '../../baseurl/BaseUrl';
import PropTypes from "prop-types";

const VideoPlayer = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleMouseEnter = () => {
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    setPlaying(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <ReactPlayer
        className="rounded-lg"
        ref={playerRef}
        url={`${BASE_URL}videos/${videoId}/master.m3u8`}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};
