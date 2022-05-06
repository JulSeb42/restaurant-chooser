// Packages
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Grid, Flexbox, Loader, Variables, Font } from "tsx-library-julseb"

// Components
import CardItem from "./CardItem"
import Pagination from "./Pagination"

// Utils
import { dataLimit, pageLimit } from "../config/pagination.config"

const ListItems = ({ isLoading, items, type }) => {
    const [query] = useSearchParams()
    const pageNumber = query.get("page")

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : pageNumber
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return items.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(items.length / dataLimit)

    return (
        <>
            {isLoading ? (
                <Flexbox
                    align="center"
                    justify="center"
                    style={{ padding: Variables.Spacers.XXL }}
                >
                    <Loader border={4} />
                </Flexbox>
            ) : (
                <Grid col={3}>
                    {items.length > 0 ? (
                        getPaginatedData().map(item => (
                            <CardItem item={item} type={type} key={item._id} />
                        ))
                    ) : (
                        <Font.P>Nothing here.</Font.P>
                    )}
                </Grid>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={parseInt(currentPage)}
                    setCurrentPage={setCurrentPage}
                    data={items}
                    totalPages={numberOfPages}
                    dataLimit={dataLimit}
                    pageLimit={pageLimit}
                />
            )}
        </>
    )
}

export default ListItems
