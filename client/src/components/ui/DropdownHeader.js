// Packages
import React, { useContext, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import styled from "@emotion/styled"
import { DropdownContainer, Dropdown, Button } from "tsx-library-julseb"
// import { getFirstName } from "ts-utils-julseb"

// API
import { AuthContext } from "../../context/auth"

// Styles
const DropdownStyled = styled(Dropdown)`
    left: auto;
    right: 0;
`

const LinkStyled = styled.span`
    text-align: left;
`

const DropdownHeader = props => {
    const { user, logoutUser } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)

    const Link = props => {
        return (
            <LinkStyled as={props.to ? RouterLink : "button"} {...props}>
                {props.children}
            </LinkStyled>
        )
    }

    return (
        <DropdownContainer>
            <Button
                btnStyle="text"
                iconRight="chevron-down"
                noPadding
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* {getFirstName(user.fullName)} */}
                {user.fullName}
            </Button>

            <DropdownStyled isOpen={isOpen}>
                <Link to="/edit-account">Edit account</Link>
                <Link onClick={logoutUser}>Log out</Link>
            </DropdownStyled>
        </DropdownContainer>
    )
}

export default DropdownHeader
