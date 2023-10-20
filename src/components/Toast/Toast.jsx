import React from 'react';
import { Alert, Snackbar } from "@mui/material";


export default function Toast({ message, severity, duration = 6000, open, onClose }) {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert variant='filled' onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}