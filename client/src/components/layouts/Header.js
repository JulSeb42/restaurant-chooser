// Packages
import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import {
    Burger,
    Variables,
    Button,
    DropdownContainer,
    Dropdown,
} from "tsx-library-julseb"

// Components
import DropdownHeader from "../ui/DropdownHeader"

// Data
import siteData from "../../data/siteData"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Spacers.M} 5vw;
    position: relative;
`

const MenuButton = styled(Burger)`
    display: none;
    color: ${Variables.Colors.Primary500};

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${Variables.Spacers.M};
    }

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        flex-direction: column;
        align-items: flex-start;
        left: 0;
        width: 100%;
        top: ${props => (props.isOpen ? 56 : -200)}px;
        padding: ${Variables.Spacers.XS} 5vw;
        z-index: 999;
        background-color: ${Variables.Colors.White};
        transition: ${Variables.Transitions.Short};

        & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${Variables.Spacers.XS};
        }
    }
`

const MenuLinkStyled = styled.span`
    text-decoration: none;
    color: ${Variables.Colors.Primary500};
    transition: ${Variables.Transitions.Short};
    padding: 0;
    border: none;
    background: none;
    font-size: ${Variables.FontSizes.Body};

    &:hover {
        color: ${Variables.Colors.Primary300};
    }

    &:active {
        color: ${Variables.Colors.Primary600};
    }

    &.active {
        font-weight: ${Variables.FontWeights.Black};
    }

    ${props =>
        props.logo &&
        css`
            font-weight: ${Variables.FontWeights.Black};
        `}
`

const Header = () => {
    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    // Menu link component => fix `as` prop with emotion
    const MenuLink = props => {
        return (
            <MenuLinkStyled
                as={
                    props.to && props.logo
                        ? Link
                        : props.to && !props.logo
                        ? NavLink
                        : "button"
                }
                to={props.to}
                logo={props.logo}
                {...props}
            >
                {props.children}
            </MenuLinkStyled>
        )
    }

    // Dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isRandomOpen, setIsRandomOpen] = useState(false)

    return (
        <Container>
            <MenuLink to="/" logo>
                {siteData.name}
            </MenuLink>

            <MenuButton
                width={28}
                height={20}
                onClick={() => setIsOpen(!isOpen)}
                color="currentColor"
                open={isOpen}
            />

            <Nav isOpen={isOpen}>
                <MenuLink to="/">Home</MenuLink>

                <MenuLink to="/all-places">All places</MenuLink>

                <DropdownContainer>
                    <Button
                        iconLeft="random"
                        btnStyle="text"
                        onClick={() => setIsRandomOpen(!isRandomOpen)}
                        noPadding
                    >
                        Random place
                    </Button>

                    <Dropdown isOpen={isRandomOpen}>
                        <Link to="/restaurants">Restaurant</Link>
                        <Link to="/deliveries">Delivery</Link>
                        <Link to="/recipes">Recipe</Link>
                    </Dropdown>
                </DropdownContainer>

                <DropdownContainer>
                    <Button
                        iconLeft="plus-circle"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Add a new item
                    </Button>

                    <Dropdown isOpen={isDropdownOpen}>
                        <Link to="/new-restaurant">Restaurant</Link>
                        <Link to="/new-delivery">Delivery</Link>
                        <Link to="/new-recipe">Recipe</Link>
                    </Dropdown>
                </DropdownContainer>

                <DropdownHeader />
            </Nav>
        </Container>
    )
}

export default Header
