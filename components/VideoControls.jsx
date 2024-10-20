import React from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const VideoControls = ({ videoURL, currentTime }) => {
  return (
    <>
      {/* {videoURL && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton>
            <PlayArrowIcon />
          </IconButton>
          <Typography variant="body2">{`${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(2)}`}</Typography>
          <IconButton>
            <ReplayIcon />
          </IconButton>
          <IconButton>
            <VolumeUpIcon />
          </IconButton>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </Box>
      )}

      <Box mt={2}>
        <Slider defaultValue={0} aria-label="time-indicator" valueLabelDisplay="auto" />
      </Box> */}
    </>
  );
};

export default VideoControls;
