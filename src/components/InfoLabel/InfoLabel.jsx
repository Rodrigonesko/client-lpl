import { Grid, Typography } from "@mui/material"

const InfoLabel = ({ label, value, xl, lg, md, xs }) => (
    <Grid
        item
        xs={xs || 12}
        md={md || 6}
        lg={lg || 4}
        xl={xl || 2}
    >
        <Typography
            variant="body1"
            sx={{
                fontWeight: 'bold'
            }}
        >
            {label}
        </Typography>
        <Typography
            variant="body2"
            color={'text.secondary'}
        >
            {value}
        </Typography>
    </Grid>
)

export default InfoLabel