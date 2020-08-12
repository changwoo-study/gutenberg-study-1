import React from 'react';
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {withSelect} from '@wordpress/data';

let MyBlock01 = (props) => {
    const {posts, className} = props;

    if (!posts) {
        return __('Loading...', 'gutenberg-study');
    } else if (posts && 0 === posts.length) {
        return __('No posts', 'gutenberg-study');
    } else {
        return (
            <ul>
                {posts.map(post => <li><a href={post.link} target="_blank">{post.title.rendered}</a></li>)}
            </ul>
        );
    }
};

MyBlock01 = withSelect(
    (select) => {
        return {
            posts: select('core').getEntityRecords('postType', 'post', {
                post_status: 'publish'
            }),
        };
    }
)(MyBlock01);

/** @link https://developer.wordpress.org/block-editor/developers/block-api/block-registration/ */
registerBlockType('gutenberg-study/my-block-01', {
    title: __('My Block 01', 'gutenberg-study'),
    description: __('This is my gutenberg study block 01.', 'gutenberg-study'),
    category: 'gutenberg-study',
    keywords: [__('study', 'gutenberg-study')],
    icon: 'welcome-learn-more',
    attributes: {},
    edit: MyBlock01,
    save: () => {
        return null;
    },
});
