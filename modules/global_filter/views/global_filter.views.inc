<?php
/**
 * @file
 * Defines the Global Filter default argument plugin.
 */

/**
 * Implements hook_views_plugins().
 */
function global_filter_views_plugins() {
  $path =  drupal_get_path('module', 'global_filter') . '/views';
  $plugins = array(
    'argument default' => array(
      'global_filter_view' => array(
        'title' => t('Global filter (view)'),
        'handler' => 'global_filter_plugin_argument_default_global_filter_view',
        'path' => $path

      ),
      'global_filter_field' => array(
        'title' => t('Global filter (field)'),
        'handler' => 'global_filter_plugin_argument_default_global_filter_field',
        'path' => $path
      ),
    )
  );
  return $plugins;
}
