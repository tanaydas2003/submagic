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
  onDeleteVideo, // Receive the delete video function
}) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

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

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const theme = themeStyles[selectedTheme] || themeStyles.default;

  // Handle audio playback
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
              fontSize: theme.fontSize,
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
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleMuteToggle}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <IconButton onClick={handleFullscreenToggle}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleSeekChange}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={{ mt: 1, textAlign: 'right' }}>
            <Typography variant="body2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
        </>
      )}

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
