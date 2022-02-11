import * as React from 'react';
import classNames from 'classnames';

import Link from '../../atoms/Link';
import { getComponent } from '../../components-registry';
import { getBaseLayoutComponent } from '../../../utils/base-layout';

export default function PostFeedLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { title, topSections = [], bottomSections = [], pageIndex, baseUrlPath, numOfPages, items, postFeed } = page;
    const PostFeedSection = getComponent('PostFeedSection');
    const pageLinks = PageLinks({ pageIndex, baseUrlPath, numOfPages });

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="layout page-layout">
                {title && (
                    <h1 className="max-w-screen-xl mx-auto text-center my-12" data-sb-field-path="title">
                        {title}
                    </h1>
                )}
                {renderSections(topSections, 'topSections')}
                {renderSections(bottomSections, 'bottomSections')}
            </main>
        </BaseLayout>
    );
}

function renderSections(sections: any[], fieldName: string) {
    if (sections.length === 0) {
        return null;
    }
    return (
        <div data-sb-field-path={fieldName}>
            {sections.map((section, index) => {
                const Component = getComponent(section.type);
                if (!Component) {
                    throw new Error(`no component matching the page section's type: ${section.type}`);
                }
                return <Component key={index} {...section} data-sb-field-path={`${fieldName}.${index}`} />;
            })}
        </div>
    );
}

