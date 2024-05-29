import { Box, Typography } from "@mui/material";

const Title = ({ children, lineColor, fontColor, size }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                mb: 2
            }}
        >
            <Typography
                variant={
                    size === 'small' ? 'h5' :
                        size === 'medium' ? 'h4' :
                            size === 'large' ? 'h3' :
                                'h2'
                }
                sx={{
                    fontWeight: 'bold',
                    position: 'relative',
                    color: fontColor ?? 'currentColor',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '30%',
                        height: '2px',
                        bottom: 0,
                        left: '0%',
                        backgroundColor: lineColor ?? 'currentColor',
                        transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                        width: '100%',
                        left: '0%',
                    },
                }}
            >
                {children}
            </Typography>
        </Box>
    )
};

export default Title;