// Packages
import React from "react"
import styled from "@emotion/styled"
import { Image, Font, Variables } from "tsx-library-julseb"

// Styles
const Container = styled.div`
    width: 110%;
    border-radius: ${Variables.Radiuses.XXL};
    overflow: hidden;
    height: 20vw;
    position: relative;
    transform: translateX(-5%);

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: ${Variables.Overlays.Gradient.Black};
        z-index: 1;
        top: 0;
        left: 0;
    }
`

const Img = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
`

const Title = styled(Font.H1)`
    color: ${Variables.Colors.White};
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: ${Variables.Spacers.S};
`

const Cover = ({ item }) => {
    return (
        <Container>
            <Img
                src={item.picture}
                alt={item.name}
                fit="cover"
                width="100%"
                height="100%"
            />

            <Title>{item.name}</Title>
        </Container>
    )
}

export default Cover
