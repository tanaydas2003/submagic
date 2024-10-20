
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TimelineEditor = ({ onAddMedia, onDeleteMedia, mediaItems, intervals }) => {
  const handleMediaUpload = (event, interval, mediaType) => {
    const file = event.target.files[0];
    if (file) {
      onAddMedia({
        mediaType: mediaType,
        mediaFile: file,
        id: Date.now(),
        startTime: interval.startTime,
        endTime: interval.endTime,
      });
    }
  };
  const getMediaItemForIntervalAndType = (startTime, endTime, mediaType) => {
    return mediaItems.find(
      (item) =>
        item.startTime === startTime &&
        item.endTime === endTime &&
        item.mediaType === mediaType
    );
  };

  return (
    <Box>
      <Typography variant="h6">Timeline Intervals:</Typography>
      {intervals.map((interval, index) => (
        <Box key={index} sx={{ mt: 2, border: '1px solid #ccc', padding: 2 }}>
          <Typography>
            Interval {index + 1}: {Math.floor(interval.startTime)}s -{' '}
            {Math.ceil(interval.endTime)}s
          </Typography>
          <Box mt={2}>
            <Typography variant="body2">Upload GIF:</Typography>
            <input
              type="file"
              accept="image/gif"
              onChange={(e) => handleMediaUpload(e, interval, 'gif')}
            />
            {(() => {
              const mediaItem = getMediaItemForIntervalAndType(
                interval.startTime,
                interval.endTime,
                'gif'
              );
              if (mediaItem) {
                return (
                  <Box mt={1}>
                    <Typography>GIF added for this interval</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDeleteMedia(mediaItem.id)}
                    >
                      Delete GIF
                    </Button>
                  </Box>
                );
              }
              return null;
            })()}
          </Box>

          {/* Upload and display Image */}
          <Box mt={2}>
            <Typography variant="body2">Upload Image:</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMediaUpload(e, interval, 'image')}
            />
            {(() => {
              const mediaItem = getMediaItemForIntervalAndType(
                interval.startTime,
                interval.endTime,
                'image'
              );
              if (mediaItem) {
                return (
                  <Box mt={1}>
                    <Typography>Image added for this interval</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDeleteMedia(mediaItem.id)}
                    >
                      Delete Image
                    </Button>
                  </Box>
                );
              }
              return null;
            })()}
          </Box>

          {/* Upload and display Audio */}
          <Box mt={2}>
            <Typography variant="body2">Upload Audio:</Typography>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleMediaUpload(e, interval, 'audio')}
            />
            {(() => {
              const mediaItem = getMediaItemForIntervalAndType(
                interval.startTime,
                interval.endTime,
                'audio'
              );
              if (mediaItem) {
                return (
                  <Box mt={1}>
                    <Typography>Audio added for this interval</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDeleteMedia(mediaItem.id)}
                    >
                      Delete Audio
                    </Button>
                  </Box>
                );
              }
              return null;
            })()}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TimelineEditor;
