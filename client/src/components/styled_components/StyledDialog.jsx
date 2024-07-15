// * React:
import React from 'react';

// * MUI and React Icons:
import { 
    Stack,
    Dialog, 
    DialogContent, 
    DialogTitle, 
    Typography, 
    Button,
    IconButton, 
} from '@mui/material';
import { RiCloseLargeFill } from "react-icons/ri";

const StyledDialog = ({ open, handleClose, title, children, buttonTitle, handleButton }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack direction="row" spacing={1} className="padding-1em">
                <IconButton>
                    <RiCloseLargeFill onClick={handleClose} />
                </IconButton>
                <Typography variant="h6" className="project-title center">
                    {title}   
                </Typography>
            </Stack>
            <DialogContent>
                {children}
            </DialogContent>
            <div className="button-container center">
                <Button
                    disableRipple
                    disableFocusRipple
                    variant="classic-button contained"
                    onClick={handleButton}
                >
                    {buttonTitle}
                </Button>
            </div>
        </Dialog>
    );
}

export default StyledDialog;