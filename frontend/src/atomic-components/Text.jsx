import styled from 'styled-components'
import Typography from 'material-ui/Typography'

// const Text = ({ size, color, children, ...typographyProps }) => {
//     <TextWrapper>
//         <Typography style= {...typographyProps}>{children}</Typography>
//     </TextWrapper>
// }


const Text = styled(Typography)`
    font-family: ${ props => {
        if (props.useMonserrat !== undefined) {
            return props.useMonserrat ? "'Montserrat', sans-serif" : "'Open Sans', sans-serif"
        }
        return (props.type === "caption" || props.type === "body" || props.type === "body2") ? "'Open Sans', sans-serif" : "'Montserrat', sans-serif"
    } } !important;
    font-size: ${ props => props.fontSize } !important;
    font-weight: ${ props => {
        if (props.fontWeight) {
            const weight = props.fontWeight;
            if (weight === "bold") return 600;
            if (weight === "light") return 300;
            if (weight === "thin") return 200;
        }
        else return 400;
    } } !important;
    color: ${ props => {
        if (props.color) {
            const color = props.color;
            if (color === "primary") return props.theme.primary;
            if (color === "accent") return props.theme.accent;
            else return color;
        }
        return "rgba(255,255,255, 0.86)" // material-ui darkWhite
    } } !important;
`

export default Text;
