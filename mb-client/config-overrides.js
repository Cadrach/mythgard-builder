const darkTheme = require('@ant-design/dark-theme');
const { override, addDecoratorsLegacy, disableEsLint, fixBabelImports, addLessLoader } = require('customize-cra');

const theme = darkTheme.default;

const remove = [
    '@input-color',
    '@input-bg',
    '@input-disabled-bg',
    '@input-placeholder-color',
    '@input-hover-border-color',
];

const merge = {
    '@input-color': '#333333',
    '@input-bg': '#fff',
};

remove.forEach((key) => {
    delete theme[key];
})

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {...theme, ...merge},
    }),
);