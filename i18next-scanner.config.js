const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
    input: [
        'src/**/*.{ts,tsx}',
    ],
    output: './',
    options: {
        debug: true,
        func: {
            list: ['i18next.t', 'i18n.t','t'],
            extensions: ['.ts', '.tsx']
        },
        trans: {
        //     component: 'Trans',
        //     i18nKey: 'i18nKey',
        //     defaultsKey: 'defaults',
        //     extensions: ['.ts', '.tsx'],
        //     fallbackKey: function(ns, value) {
        //         return value;
        //     },

        //     // https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0
        //     supportBasicHtmlNodes: true, // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
        //     keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

        //     // https://github.com/acornjs/acorn/tree/master/acorn#interface
        //     acorn: {
        //         ecmaVersion: 2020,
        //         sourceType: 'module', // defaults to 'module'
        //     }
        },
        lngs: ['ru'],
        ns: ['t'],
        defaultLng: 'en',
        defaultNs: 't',
        defaultValue: '__STRING_NOT_TRANSLATED__',
        resource: {
            loadPath: 'src/i18n/{{lng}}/{{ns}}.json',
            savePath: 'src/i18n/{{lng}}/{{ns}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: false, // namespace separator
        keySeparator: false, // key separator
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        },
        metadata: {},
        allowDynamicKeys: false,
    },
    transform: typescriptTransform({extensions: ["*.ts",".tsx"]})
};