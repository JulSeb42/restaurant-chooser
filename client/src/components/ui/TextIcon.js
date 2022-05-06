// Packages
import React from "react"
import styled from "@emotion/styled"
import { Font, Icon, Variables } from "tsx-library-julseb"

// Styles
const Container = styled(Font.P)`
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: ${Variables.Spacers.XXS};
`

const TextIcon = props => {
    return (
        <Container>
            <Icon
                src={props.icon}
                size={24}
                color={Variables.Colors.Gray500}
            />

            {props.to ? (
                <a href={props.to} target="_blank" rel="noreferrer noopener">
                    {props.children}
                </a>
            ) : (
                props.children
            )}
        </Container>
    )
}

export default TextIcon
