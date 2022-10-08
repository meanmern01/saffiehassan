/* eslint global-require: "off" */
// const path = require('path');
// const { URLSearchParams } = require('url');
const sortCSSmq = require('sort-css-media-queries');

const { browserslist } = require('./package.json');

// const INLINE_FILES = ['png', 'jpeg', 'jpg', 'gif', 'svg'];

module.exports = {
    plugins: [
        // ['postcss-devtools', { precise: true }],
       'postcss-responsive-type',
       'postcss-easings',
       'postcss-focus-within',
       'postcss-focus-visible',
       ['flex-gap-polyfill', { only: true }],
        ...(process.env.NODE_ENV === 'production'
            ? [
                  'postcss-clamp',
                //   'postcss-image-set-polyfill',
                //   require('postcss-url')({
                //       filter(asset) {
                //           if (!asset.pathname) return false;
                //           if (/[&?]inline=/.test(asset.search)) return false;
                //           const format = path.extname(asset.pathname).substr(1);
                //           return INLINE_FILES.includes(format.toLowerCase());
                //       },
                //       url(asset) {
                //           const params = new URLSearchParams(asset.search);
                //           const format = params.get('format') || path.extname(asset.pathname).substr(1);
                //           if (INLINE_FILES.includes(format.toLowerCase())) {
                //               params.set('inline', 'inline');
                //           }
                //           return `${asset.pathname}?${params.toString()}`;
                //       },
                //   }),
                 ['postcss-font-display', { display: 'swap' }],
                //   'postcss-flexbugs-fixes',
                  ['css-mqpacker', { sort: sortCSSmq.desktopFirst }],
                  ['autoprefixer', { browsers: browserslist.browsers }],
                  // this is always last
                  ['cssnano', {
                      preset: [
                          'default',
                          {
                              discardComments: { removeAll: true },
                          },
                      ],
                  }],
              ]
            : []),
        // 'postcss-browser-reporter',
        // 'postcss-reporter',
    ],
};
