import React from 'react';
import {__} from "@wordpress/i18n";
import {camera} from '@wordpress/icons';
import {Fragment} from '@wordpress/element';
import {PluginSidebar, PluginSidebarMoreMenuItem} from '@wordpress/edit-post';
import {PanelBody, TextControl} from '@wordpress/components';
import {registerPlugin} from '@wordpress/plugins';
import {withDispatch, withSelect} from '@wordpress/data';

let MySidebar = (props) => {
    return (
        <Fragment>
            <PanelBody
                title={__('My Sidebar', 'gutenberg-study')}
                icon="admin-post"
            >
                <TextControl
                    value={props.mySidebar}
                    label="Foo"
                    onChange={(value) => props.onMySidebarChange(value)}
                />
            </PanelBody>
        </Fragment>
    );
};

MySidebar = withSelect(
    (select) => {
        return {
            mySidebar: select('core/editor').getEditedPostAttribute('meta')['_gutenberg_study_my_sidebar']
        }
    }
)(MySidebar);

MySidebar = withDispatch(
    (dispatch) => {
        return {
            onMySidebarChange: (value) => {
                dispatch('core/editor').editPost({
                    meta: {
                        _gutenberg_study_my_sidebar: value
                    }
                });
            }
        }
    }
)(MySidebar);

registerPlugin('gutenberg-study', {
    render: (props) => (
        <Fragment>
            <PluginSidebarMoreMenuItem target="foo" icon={camera}>
                {__('Giggle!', 'gutenberg-study')}
            </PluginSidebarMoreMenuItem>
            <PluginSidebar name="foo" icon={camera}>
                <MySidebar/>
            </PluginSidebar>
        </Fragment>
    )
});
