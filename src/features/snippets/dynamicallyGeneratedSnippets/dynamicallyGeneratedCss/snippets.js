import LocalStorage from "../../../../localStorage/localStorage"

export function customFont(url = LocalStorage.config.customFontURL, name = LocalStorage.config.customFontName) {
    return `
    /* Custom Font */
    @import url("${url}");
    a, abbr, address, article, aside, b, bdi, bdo, blockquote, button, caption, cite, code, data, dd, del, dfn, div, em, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, i, ins, kbd, label, legend, li, main, mark, nav, ol, p, pre, q, s, samp, section, small, span, strong, sub, sup, table, tbody, td, tfoot, th, thead, time, tr, u, ul, var {
        font-family: "${name}", sans-serif, serif !important;
    }`
}

export function fontSize(size = LocalStorage.config.fontSize) {
    return `
    :root {
        font-size: ${size};
    }`
}
