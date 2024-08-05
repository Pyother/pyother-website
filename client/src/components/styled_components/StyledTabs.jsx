import { styled } from '@mui/system';
import { Tabs } from '@mui/material';
import colorsTheme from '../../assets/themes/colorsTheme';

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: colorsTheme.palette.accentGreen.main,
    }
});

export default StyledTabs;