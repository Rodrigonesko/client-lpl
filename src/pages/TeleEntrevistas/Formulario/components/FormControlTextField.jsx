import { FormControlLabel, TextField } from "@mui/material"

const FormControlTextField = ({ label, placeholder, value, onChange, style }) => {
    return (
        <FormControlLabel
            labelPlacement="top"
            label={label}
            value={value}
            onChange={onChange}
            control={
                <TextField
                    placeholder={placeholder}
                    fullWidth
                    size="small"
                />
            }
            sx={{
                ...style,
                alignItems: 'flex-start',
                '& .MuiFormControlLabel-label': {
                    color: 'black',
                    fontWeight: 'bold',
                    pl: 1
                },
                width: '100%'
            }}
        />
    )
}

export default FormControlTextField