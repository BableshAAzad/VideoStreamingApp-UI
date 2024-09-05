import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import "./VideoPlayer.css"

const VideoPlayer = ({ url }) => {
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
        className="cardShadow rounded-lg"
        ref={playerRef}
        url={url}
        playing={playing}
        controls={true} // You might want to hide controls for this feature
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
