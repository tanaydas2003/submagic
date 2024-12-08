// Frames.jsx
'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Navbar2 from './Navbar2';
import Sidebar from './Sidebar';
import VideoPreview from './VideoPreview';
import VideoControls from './VideoControls';

const themeStyles = {
  'HORMOZI 1': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'DEVIN': {
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    color: '#ffcc00',
    fontSize: '20px',
  },
  'ELLA': {
    backgroundColor: 'rgba(68, 68, 68, 0.8)',
    color: '#ff66cc',
    fontSize: '22px',
  },
  'TRACY': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#ffffff',
    fontSize: '28px',
  },
  'DAN': {
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    color: '#c0c0c0',
    fontSize: '26px',
  },
  'LUKE': {
    backgroundColor: 'rgba(102, 102, 102, 0.8)',
    color: '#ffffff',
    fontSize: '20px',
  },
  'Celine': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000000',
    fontSize: '24px',
  },
  'Maya': {
    backgroundColor: 'rgba(255, 192, 203, 0.8)',
    color: '#ffffff',
    fontSize: '22px',
  },
  'KARL': {
    backgroundColor: 'rgba(192, 192, 192, 0.8)',
    color: '#000000',
    fontSize: '24px',
  },
  'WILLIAM': {
    backgroundColor: 'rgba(0, 0, 128, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'HORMOZI 2': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#ff0000',
    fontSize: '24px',
  },
  'HORMOZI 3': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#00ff00',
    fontSize: '24px',
  },
  'DAVID': {
    backgroundColor: 'rgba(255, 255, 0, 0.8)',
    color: '#000000',
    fontSize: '24px',
  },
  'Iman': {
    backgroundColor: 'rgba(0, 128, 128, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'LEON': {
    backgroundColor: 'rgba(128, 0, 128, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'Ali': {
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    color: '#000000',
    fontSize: '24px',
  },
  'BEAST': {
    backgroundColor: 'rgba(0, 0, 255, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'Umi': {
    backgroundColor: 'rgba(128, 128, 0, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'NOAH': {
    backgroundColor: 'rgba(0, 255, 255, 0.8)',
    color: '#000000',
    fontSize: '24px',
  },
  'LEILA': {
    backgroundColor: 'rgba(255, 20, 147, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'JASON': {
    backgroundColor: 'rgba(139, 69, 19, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  'Gstaad': {
    backgroundColor: 'rgba(0, 100, 0, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
  default: {
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    color: '#ffffff',
    fontSize: '24px',
  },
};

const Frames = () => {
  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('HORMOZI 1');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [captions, setCaptions] = useState('');
  const [positionY, setPositionY] = useState(10);
  const [captionSize, setCaptionSize] = useState(24);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [mediaItems, setMediaItems] = useState([]);
  const [videoDuration, setVideoDuration] = useState(100); 
  const [intervals, setIntervals] = useState([]);

  // Responsive Design Hook
  const isMobile = useMediaQuery('(max-width:600px)');

  // Handlers
  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handleThemeSelect = (theme) => setSelectedTheme(theme);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      const tempVideo = document.createElement('video');
      tempVideo.src = URL.createObjectURL(file);
      tempVideo.onloadedmetadata = () => {
        setVideoDuration(tempVideo.duration);
        const numberOfIntervals = Math.ceil(tempVideo.duration / 3);
        const newIntervals = [];
        for (let i = 0; i < numberOfIntervals; i++) {
          const startTime = i * 3; 
          const endTime = Math.min((i + 1) * 3, tempVideo.duration); 
          newIntervals.push({ startTime, endTime });
        }
        setIntervals(newIntervals);
      };
    }
  };

  const handleCaptionChange = (e) => setCaptions(e.target.value);
  const handlePositionYChange = (event, newValue) => setPositionY(newValue);
  const handleFilterChange = (filter) => setSelectedFilter(filter);

  // New handler for caption size change
  const handleCaptionSizeChange = (event, newValue) => setCaptionSize(newValue);

  // Function to handle adding media from TimelineEditor
  const handleAddMedia = (mediaItem) => {
    setMediaItems((prevItems) => [...prevItems, mediaItem]);
  };

  // Function to handle deleting a media item
  const handleDeleteMedia = (mediaItemId) => {
    setMediaItems((prevItems) => prevItems.filter((item) => item.id !== mediaItemId));
  };

  // Function to handle deleting the video
  const handleDeleteVideo = () => {
    setVideoFile(null);
    setVideoURL(null);
    setMediaItems([]); 
    setVideoDuration(100); 
    setIntervals([]);
    setCaptions('');
    setCurrentTime(0);
    setSelectedFilter('none');
    setSelectedTheme('HORMOZI 1');
    setPositionY(10);
    setCaptionSize(24); // Reset caption size to default
  };

  return (
    <>
      {/* Navbar */}
      <Navbar2 />

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: 'calc(100vh - 64px)',
          padding: 2,
          gap: 2,
        }}
      >
        {/* Sidebar */}
        <Box sx={{ order: isMobile ? 2 : 0, width: isMobile ? '100%' : '48%' }}>
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onThemeSelect={handleThemeSelect}
            onCaptionChange={handleCaptionChange}
            captions={captions}
            positionY={positionY}
            onPositionYChange={handlePositionYChange}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            onAddMedia={handleAddMedia}
            onDeleteMedia={handleDeleteMedia} 
            mediaItems={mediaItems}
            videoDuration={videoDuration}
            intervals={intervals}
            captionSize={captionSize} 
            onCaptionSizeChange={handleCaptionSizeChange}
          />
        </Box>

        {/* Video Preview and Controls */}
        <Box sx={{ order: isMobile ? 1 : 0, width: isMobile ? '100%' : '48%' }}>
          <VideoPreview
            videoURL={videoURL}
            captions={captions}
            positionY={positionY}
            themeStyles={themeStyles}
            selectedTheme={selectedTheme}
            selectedFilter={selectedFilter}
            mediaItems={mediaItems}
            onDeleteVideo={handleDeleteVideo} 
            captionSize={captionSize}
          />

          {/* Video Upload Section */}
          {!videoURL && (
            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ marginBottom: '20px' }}
              />
            </Box>
          )}

          {/* Video Controls */}
          {videoURL && <VideoControls videoURL={videoURL} currentTime={currentTime} />}
        </Box>
      </Box>
    </>
  );
};

export default Frames;
