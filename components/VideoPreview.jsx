// VideoPreview.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Slider, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DeleteIcon from '@mui/icons-material/Delete';

const VideoPreview = ({
  videoURL,
  captions,
  positionY,
  themeStyles,
  selectedTheme,
  selectedFilter,
  mediaItems,
  onDeleteVideo,
  captionSize 
}) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  // Update currentTime state as video plays
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Play or pause the video
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mute or unmute the video
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle fullscreen mode
  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Set video duration once metadata is loaded
  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Seek to a specific time in the video
  const handleSeekChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get the current theme or default
  const theme = themeStyles[selectedTheme] || themeStyles.default;

  // Handle audio playback synchronized with video
  useEffect(() => {
    mediaItems
      .filter((item) => item.mediaType === 'audio')
      .forEach((item) => {
        const audioElement = document.getElementById(`audio-${item.id}`);
        if (audioElement) {
          if (currentTime >= item.startTime && currentTime <= item.endTime) {
            if (audioElement.paused) {
              audioElement.currentTime = currentTime - item.startTime;
              audioElement.play();
            }
          } else {
            audioElement.pause();
          }
        }
      });
  }, [currentTime, mediaItems]);

  return (
    <Paper elevation={3} sx={{ width: '100%', height: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Video Preview
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        {/* Video Element */}
        {videoURL ? (
          <video
            ref={videoRef}
            src={videoURL}
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              filter: selectedFilter,
            }}
          />
        ) : (
          <Typography variant="h4" color="white">
            Low Res Preview (Upload Video)
          </Typography>
        )}

        {/* Display GIFs Over Video */}
        {mediaItems
          .filter(
            (item) =>
              item.mediaType === 'gif' &&
              currentTime >= item.startTime &&
              currentTime <= item.endTime
          )
          .map((item) => (
            <img
              key={item.id}
              src={URL.createObjectURL(item.mediaFile)}
              alt="GIF"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 2, 
                pointerEvents: 'none',
              }}
            />
          ))}

        {/* Display Images Over Video */}
        {mediaItems
          .filter(
            (item) =>
              item.mediaType === 'image' &&
              currentTime >= item.startTime &&
              currentTime <= item.endTime
          )
          .map((item) => (
            <img
              key={item.id}
              src={URL.createObjectURL(item.mediaFile)}
              alt="Image"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          ))}

        {/* Captions Overlay */}
        {videoURL && captions && (
          <Typography
            sx={{
              position: 'absolute',
              bottom: `${positionY}%`,
              width: '100%',
              textAlign: 'center',
              color: theme.color,
              backgroundColor: theme.backgroundColor,
              fontSize: `${captionSize}px`,
              padding: '10px',
              opacity: 0.9,
              zIndex: 3,
            }}
          >
            {captions}
          </Typography>
        )}
      </Box>

      {/* Video Controls */}
      {videoURL && (
        <>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Play/Pause Button */}
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            {/* Delete Video Button */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
                onDeleteVideo();
              }}
            >
              Delete Video
            </Button>

            {/* Mute and Fullscreen Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleMuteToggle}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <IconButton onClick={handleFullscreenToggle}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Seek Slider */}
          <Box sx={{ mt: 2 }}>
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeekChange}
              sx={{ width: '100%' }}
            />
          </Box>

          {/* Time Display */}
          <Box sx={{ mt: 1, textAlign: 'right' }}>
            <Typography variant="body2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
        </>
      )}

      {/* Audio Elements */}
      {mediaItems
        .filter((item) => item.mediaType === 'audio')
        .map((item) => (
          <audio
            key={item.id}
            id={`audio-${item.id}`}
            src={URL.createObjectURL(item.mediaFile)}
          />
        ))}
    </Paper>
  );
};

export default VideoPreview;
