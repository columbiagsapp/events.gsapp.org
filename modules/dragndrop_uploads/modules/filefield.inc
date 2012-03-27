<?php
// $Id: filefield.inc,v 1.1.2.7 2009/12/29 05:55:10 deciphered Exp $
/**
 * @file
 * Provides Drag'n'Drop Uploads integration with the FileField module.
 */

/**
 * Implements hook_dragndrop_uploads_widgets().
 */
function filefield_dragndrop_uploads_widgets($type, &$widgets) {
  $content = content_types($type);
  foreach ($content['fields'] as $field) {
    if ($field['type_name'] == $type && $field['module'] == 'filefield') {
      $data = serialize(array(
        'field' => $field['field_name'],
        'module' => $field['module'],
        'widget' => $field['widget']['module'],
      ));
      $widgets[$data] = $field['widget']['label'];
    }
  }
}

/**
 * Implements hook_dragndrop_uploads_js_data().
 */
function filefield_dragndrop_uploads_js_data($data) {
  $field = content_fields($data['field']);
  $data = array(
    'id' => $field['field_name'],
    'result' => '.output:last',
    'submit' => 'Upload',
    'wrapper' => ($field['multiple'] == 0)
      ? '#edit-' . str_replace('_', '-', $field['field_name']) .'-0-ahah-wrapper'
      : (($field['multiple'] == 1)
        ? '#' . str_replace('_', '-', $field['field_name']) . '-items'
        : '#' . $field['field_name'] . '_values'
      ),
  );
  return array($field['field_name'] => $data);
}

/**
 * Implements hook_dragndrop_uploads_elements().
 */
function filefield_dragndrop_uploads_elements(&$elements) {
  $elements['filefield_widget'] = array('#after_build' => array('filefield_dragndrop_uploads_process'));
}

function filefield_dragndrop_uploads_process($element) {
  if ($element['fid']['#value']) {
    $element['dragndrop_uploads'] = array(
      '#type' => 'hidden',
      '#value' => content_format($element['#field_name'], $element['#value'], variable_get('dragndrop_uploads_formatter_' . $element['#type_name'], NULL)),
      '#name' => $element['#name'] . '[output]',
      '#id' => $element['#id'] . '-output',
      '#attributes' => array(
        'class' => 'output',
      ),
    );
  }
  return $element;
}
