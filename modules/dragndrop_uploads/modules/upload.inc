<?php
// $Id: upload.inc,v 1.1.2.3 2009/11/24 05:59:43 deciphered Exp $
/**
 * @file
 * Provides Drag'n'Drop Uploads integration with the Drupal Core Upload module.
 */

/**
 * Implements hook_dragndrop_uploads_widgets().
 */
function upload_dragndrop_uploads_widgets($type, &$widgets) {
  if (variable_get('upload_' . $type, 1)) {
    $data = serialize(array(
      'module' => 'upload',
    ));
    $widgets[$data] = t('File attachments');
  }
}

/**
 * Implements hook_dragndrop_uploads_js_data().
 */
function upload_dragndrop_uploads_js_data($data) {
  $data = array(
    'id' => 'upload',
    'result' => 'TR:last .description SMALL',
    'submit' => 'Attach',
    'type' => 'upload',
    'wrapper' => 'div.attachments',
  );
  return array('upload' => $data);
}
