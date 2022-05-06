// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { Image, Font, Variables } from "tsx-library-julseb"

// Styles
const Container = styled(Link)`
    width: 100%;
    aspect-ratio: 1;
    border-radius: ${Variables.Radiuses.L};
    overflow: hidden;
    position: relative;
    color: ${Variables.Colors.White};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};
    box-shadow: ${Variables.Shadows.S};

    &:after {
        content: "";
        background: ${Variables.Overlays.Gradient.Black};
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;
    }

    &:hover {
        transform: scale(1.01);
        box-shadow: ${Variables.Shadows.M};
    }
`

const Img = styled(Image)`
    position: absolute;
    z-index: 0;
`

const Text = styled(Font.H3)`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    height: 100%;
    padding: ${Variables.Spacers.XS};
`

const CardLink = ({ item }) => {
    return (
        <Container to={item.to}>
            <Img
                src={item.img}
                alt={item.text}
                fit="cover"
                width="100%"
                height="100%"
            />

            <Text as="h5">{item.text}</Text>
        </Container>
    )
}

export default CardLink
