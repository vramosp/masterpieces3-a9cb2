const path = require('path');
const { flattenMarkdownData, cssClassesFromFilePath, cssClassesFromUrlPath, urlPathFromFilePath } = require('./src/utils/page-utils');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugins: [
        /**
         * The `sourcebit-source-filesystem` plugin reads content files from the provided `options.sources`,
         * and generates array of objects that are passed to subsequent plugins.
         */
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev,
                sources: [
                    { name: 'pages', path: path.join(__dirname, 'content/pages') },
                    { name: 'data', path: path.join(__dirname, 'content/data') }
                ]
            }
        },

        /**
         * converts { __metadata, frontmatter, markdown }
         * to { __metadata, ...frontmater, markdown_content: markdown }
         */
        flattenMarkdownData(),

        /**
         * The `sourcebit-target-next` plugin receives objects generated by `sourcebit-source-filesystem` plugin,
         * and generates new data that is consumed by Next.js `getStaticPaths` and `getStaticProps` methods.
         * The generated data is cached and stored inside `.sourcebit-nextjs-cache.json` file.
         *
         * The generated data is an object with three properties:
         * - objects: Array of objects representing all content files loaded by the `sourcebit-source-filesystem` plugin.
         * - pages: Array of objects representing site pages props. This array is generated by the `pages()` method.
         * - props: Object with common props that will be merged with props of every page. This object is generated by
         *          the `commonProps()` method.
         */
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                commonProps: (objects) => {
                    const site = objects.find((page) => page.__metadata.id === 'content/data/config.json');
                    return { site };
                },
                pages: (objects) => {
                    const personObjects = objects.filter((object) => object.__metadata.relProjectPath?.startsWith('content/data/team/') && !!object.slug);
                    const personPages = personObjects.map((person) => {
                        const { __metadata, ...restProps } = person;
                        const urlPath = `/blog/author/${person.slug}`;
                        return {
                            __metadata: {
                                ...__metadata,
                                urlPath,
                                pageCssClasses: cssClassesFromUrlPath(urlPath)
                            },
                            
                            ...restProps
                        };
                    });

                    const pageObjects = objects.filter((page) => page.__metadata.sourceName === 'pages');
                    const pages = pageObjects.map((page) => {
                        const { __metadata, ...restProps } = page;
                        const urlPath = urlPathFromFilePath(page.__metadata.relSourcePath);
                        return {
                            __metadata: {
                                ...__metadata,
                                urlPath,
                                pageCssClasses: cssClassesFromFilePath(page.__metadata.relSourcePath)
                            },
                            ...restProps
                        };
                    });

                    return [...pages, ...personPages];
                }
            }
        }
    ]
};
