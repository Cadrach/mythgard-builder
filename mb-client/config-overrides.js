const darkTheme = require('@ant-design/dark-theme');
const { override, addDecoratorsLegacy, disableEsLint, fixBabelImports, addLessLoader } = require('customize-cra');

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
        modifyVars: darkTheme.default,
    }),
);