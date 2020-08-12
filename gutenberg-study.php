<?php
/**
 * Plugin Name: 구텐베르크 스터디 1
 * Description: 사이드바, 메타 필드, 렌더링 콜백에 대해.
 * Author:      Changwoo
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}


/**
 * 번역 파일을 읽도록 지시합니다.
 * 이 방법은 mo 파일을 읽는 방법입니다.
 */
add_action( 'init', 'gutenberg_study_load_textdomain' );
function gutenberg_study_load_textdomain() {
	load_plugin_textdomain( 'gutenberg-study', false, basename( __DIR__ ) . '/languages' );
}


/**
 * 플러그인에서 사용하는 메타 정보를 등록합니다. 이래야 REST API 호출을 통해 메타 정보가 기록됩니다.
 */
add_action( 'init', 'gutenberg_study_register_meta' );
function gutenberg_study_register_meta() {
	/**
	 * 메타 필드에서 중요한 점. 언더바를 붙여야 한다.
	 * 커스텀 필드 메타박스는 앞에 언더바를 붙인 메타 필드를 밖에 노출하지 않는다.
	 * 그렇지 않으면 커스텀 필드 메타박스에 의해 이 값이 노출된다. 그러면 값이 제대로 저장되지 않는 문제가 발생한다.
	 */
	register_meta(
		'post',
		'_gutenberg_study_my_sidebar',
		[
			'subtype'           => 'post',
			'type'              => 'string',
			'show_in_rest'      => true,
			'single'            => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function () {
				return current_user_can( 'edit_post', func_get_arg( 2 ) );
			}
		]
	);
}


/** 스크립트 등록 처리 */
add_action( 'init', 'gutenberg_study_register_scripts' );
function gutenberg_study_register_scripts() {
	if ( file_exists( __DIR__ . '/build/index.asset.php' ) ) {
		$asset_file = include( __DIR__ . '/build/index.asset.php' );

		wp_enqueue_script(
			'gutenberg-study',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version']
		);

		/**
		 * @link https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		register_block_type(
			'gutenberg-study/my-block-01',
			[
				'editor_script'   => 'gutenberg-study',
				'render_callback' => 'gutenberg_study_my_block_01'
			]
		);

		register_block_type(
			'gutenberg-study/my-block-02',
			[
				'editor_script' => 'gutenberg-study',
			]
		);

	}
}


/** 블록 에디터를 위한 준비 */
add_action( 'enqueue_block_editor_assets', 'gutenberg_study_register_block' );
function gutenberg_study_register_block() {
	/**
	 * 스크립트의 번역을 준비한다.
	 * 스크립트의 번역은 .mo 파일로는 불가능하고 .json 번역 파일을 따로 준비해야 한다.
	 *
	 * wp i18n make-json ./languages
	 */
	wp_set_script_translations(
		'gutenberg-study',
		'gutenberg-study',
		__DIR__ . '/languages'
	);
}


/**
 * 블록 에디터 01 렌더링 콜백
 *
 * @param $block_attributes
 * @param $content
 *
 * @see do_blocks()
 * @see render_block()
 */
function gutenberg_study_my_block_01( $block_attributes, $content ) {
	return '<h3>' . __( 'My Block 01', 'gutenberg-study' ) . '</h3>' .
	       '<p><pre>' . print_r( func_get_args(), 1 ) . '</pre></p>';
}


/**
 * 블록 카테고리 수정.
 */
add_filter( 'block_categories', 'gutenberg_study_block_categories', 10, 2 );
function gutenberg_study_block_categories( $categories, $post ) {
	if ( 'post' === $post->post_type ) {
		$categories[] = [
			'slug'  => 'gutenberg-study',
			'title' => __( 'Gutenberg Study', 'gutenberg-study' ),
			'icon'  => null,
		];
	}
	return $categories;
}
