import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { Home, Edit, Share, ArrowForward, ArrowBack, Link, Menu as MenuIcon } from '@mui/icons-material';

const Navbar2 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); 

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home />
            </IconButton>

            <Typography variant="body2" noWrap style={{ marginLeft: 8 }}>
              Video welcome s
            </Typography>

            {!isMobile && (
              <IconButton edge="start" color="inherit" aria-label="edit" style={{ marginLeft: 8 }}>
                <Edit />
              </IconButton>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            {!isMobile ? (
              <>
                <IconButton edge="start" color="inherit">
                  <ArrowBack />
                </IconButton>

                <IconButton edge="start" color="inherit">
                  <ArrowForward />
                </IconButton>

                <IconButton edge="start" color="inherit">
                  <Link />
                </IconButton>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderRadius: '50px', 
                    padding: '6px 16px',
                    textTransform: 'none',
                    marginLeft: 1,
                  }}
                >
                  Share
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderRadius: '50px', 
                    padding: '6px 16px',
                    textTransform: 'none',
                    marginLeft: 1,
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '50px',
                    padding: '6px 16px',
                    textTransform: 'none',
                    marginLeft: 1,
                  }}
                >
                  Export
                </Button>
              </>
            ) : (
              <>

                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderRadius: '50px', 
                    padding: '6px 16px',
                    textTransform: 'none',
                    marginLeft: 1,
                  }}
                >
                  Share
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '50px', 
                    padding: '6px 16px',
                    textTransform: 'none',
                    marginLeft: 1,
                  }}
                >
                  Export
                </Button>
                <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>

                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      <ListItem>
                        <IconButton edge="start" color="inherit" aria-label="edit">
                          <Edit />
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        <IconButton edge="start" color="inherit">
                          <ArrowBack />
                        </IconButton>
                        <IconButton edge="start" color="inherit">
                          <ArrowForward />
                        </IconButton>
                        <IconButton edge="start" color="inherit">
                          <Link />
                        </IconButton>
                      </ListItem>
                      
                      <ListItem button>
                        <ListItemText primary="Save" />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary="More" />
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar2;
