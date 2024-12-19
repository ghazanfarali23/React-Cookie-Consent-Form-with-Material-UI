import React, { useState, useEffect } from 'react';
    import {
      Box,
      Button,
      Dialog,
      DialogActions,
      DialogContent,
      DialogContentText,
      DialogTitle,
      FormControlLabel,
      Checkbox,
      Typography,
      Link
    } from '@mui/material';
    
    function App() {
      const [open, setOpen] = useState(false);
      const [analytics, setAnalytics] = useState(false);
      const [marketing, setMarketing] = useState(false);
      const [preferences, setPreferences] = useState(false);
    
      useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          setOpen(true);
        } else {
          try {
            const parsedConsent = JSON.parse(consent);
            setAnalytics(parsedConsent.analytics || false);
            setMarketing(parsedConsent.marketing || false);
            setPreferences(parsedConsent.preferences || false);
          } catch (e) {
            console.error("Error parsing cookie consent:", e);
            setOpen(true);
          }
        }
      }, []);
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleAccept = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({ analytics, marketing, preferences }));
        setOpen(false);
      };
    
      const handleDecline = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({ analytics: false, marketing: false, preferences: false }));
        setAnalytics(false);
        setMarketing(false);
        setPreferences(false);
        setOpen(false);
      };
    
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Cookie Consent
          </Typography>
          <Typography variant="body1" gutterBottom>
            This website uses cookies to enhance your experience. You can choose which cookies you allow.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Link href="#" onClick={() => setOpen(true)}>Manage your preferences</Link>
          </Typography>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We use cookies to personalize content, provide social media features, and analyze our traffic.
                You can choose which cookies you allow.
              </DialogContentText>
              <FormControlLabel
                control={<Checkbox checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />}
                label="Analytics Cookies"
              />
              <FormControlLabel
                control={<Checkbox checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />}
                label="Marketing Cookies"
              />
              <FormControlLabel
                control={<Checkbox checked={preferences} onChange={(e) => setPreferences(e.target.checked)} />}
                label="Preferences Cookies"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDecline} color="primary">
                Decline All
              </Button>
              <Button onClick={handleAccept} color="primary">
                Accept All
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }
    
    export default App;
