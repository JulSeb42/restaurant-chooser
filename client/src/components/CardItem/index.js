// Packages
import React from "react"
import PropTypes from "prop-types"

// Styles
import { Container, Img, Title } from "./styles"

const CardItem = ({ item, type }) => {
    return (
        <Container to={`/${type}/${item._id}`}>
            <Img
                src={item.picture}
                alt={item.name}
                width="100%"
                height="100%"
                fit="cover"
            />

            <Title>{item.name}</Title>
        </Container>
    )
}

CardItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CardItem
