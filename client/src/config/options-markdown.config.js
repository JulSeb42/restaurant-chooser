// Packages
import { Link } from "react-router-dom"
import { Font } from "tsx-library-julseb"

const optionsMarkdown = {
    forceBlock: true,

    overrides: {
        h2: {
            component: Font.H2,
        },

        h3: {
            component: Font.H3,
        },

        h4: {
            component: Font.H4,
        },

        h5: {
            component: Font.H5,
        },

        h6: {
            component: Font.H6,
        },

        p: {
            component: Font.P,
        },

        strong: {
            component: Font.Strong,
        },

        em: {
            component: Font.Em,
        },

        ul: {
            component: Font.List,
        },

        small: {
            component: Font.Small,
        },

        Link: {
            component: Link,
        },

        a: {
            component: Link,
        }
    },
}

export default optionsMarkdown
