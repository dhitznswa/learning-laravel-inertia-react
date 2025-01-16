import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import MainWraper from "./Components/MainWraper";
import Layout from "./Layout/Layout";

createInertiaApp({
    title: (title) => (title ? `${title} - inShowcases` : "inShowcases.com"),
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout || ((page) => <Layout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <MainWraper>
                <App {...props} />
            </MainWraper>
        );
    },
    progress: {
        color: "#FFA400",
    },
});