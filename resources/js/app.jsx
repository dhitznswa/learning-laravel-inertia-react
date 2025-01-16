import "./bootstrap";

import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import MainWraper from "./Components/MainWraper";
import Layout from "./Layout/Layout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
    showSpinner: true,
    template: `<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
});

router.on("start", () => {
    NProgress.start();
});

router.on("finish", () => NProgress.done());

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
});
