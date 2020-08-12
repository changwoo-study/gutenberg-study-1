import React from 'react';
import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {InspectorControls} from '@wordpress/block-editor';
import {registerBlockType} from '@wordpress/blocks';

registerBlockType('gutenberg-study/my-block-02', {
    title: __('My Block 02', 'gutenberg-study'),
    description: __('This is my gutenberg study block 02.', 'gutenberg-study'),
    category: 'gutenberg-study',
    keywords: [__('study', 'gutenberg-study')],
    icon: 'welcome-learn-more',
    attributes: {
        myInspector01: {
            type: 'string',
            source: 'text',
            selector: 'div'
        }
    },
    example: {
        attributes: {
            myInspector01: 'hello!'
        }
    },
    edit: ({attributes, setAttributes}) => {
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="My Block 02" initialOpen={true}>
                        <PanelRow>
                            <TextControl
                                label="Inspector 01"
                                help="My Inspector 01"
                                type="text"
                                value={attributes.myInspector01}
                                onChange={(value) => setAttributes({myInspector01: value})}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div>{attributes.myInspector01}</div>
            </Fragment>
        );
    },
    save: ({attributes}) => {
        return <div>{attributes.myInspector01}</div>
    },
});
