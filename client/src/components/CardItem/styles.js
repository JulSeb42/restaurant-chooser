// Packages
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

// Components
import { Variables, Image, Font } from "tsx-library-julseb"

// Styles
const Container = styled(Link)`
    width: 100%;
    aspect-ratio: 1;
    position: relative;
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    color: ${Variables.Colors.White};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};
    box-shadow: ${Variables.Shadows.M};

    &:hover {
        transform: scale(1.01);
        box-shadow: ${Variables.Shadows.L};
    }
`

const Img = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
`

const Title = styled(Font.H3)`
    position: relative;
    z-index: 2;
    padding: ${Variables.Spacers.XS};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: ${Variables.Overlays.Gradient.Black};
`

export { Container, Img, Title }
