
<?php
/**
 * @file
 * Contains the Global Filter default argument plugin (field).
 */

/**
 * Default argument plugin to extract the global filter value set for this
 * argumen.
 */
class global_filter_plugin_argument_default_global_filter_field extends views_plugin_argument_default {

  function get_argument() {
    $field_name = $views_field_name = $this->argument->field;

    if (!($filter_found = global_filter_exists($views_field_name))) {
      // Not found as a property, maybe it's a field.
      // Where $views_field_name refers to a field it equals one of:
      // '<field_name>_value', '<field_name>_tid' or '<field_name>_fid'
      $_ = strrpos($views_field_name, '_');
      $field_name = drupal_substr($views_field_name, 0, $_);
      $filter_found = global_filter_exists($field_name);
    }
    $exception_value = $this->argument->options['exception']['value']; // e.g. 'all'
    if (empty($exception_value)) {
      $exception_value = $this->argument->options['wildcard'];
    }
    if ($filter_found) {
      $arg = isset($_SESSION['global_filter'][$field_name]) && ($_SESSION['global_filter'][$field_name] != '')
        ? $_SESSION['global_filter'][$field_name]
        : $exception_value;
      $is_term = drupal_substr($views_field_name, $_ + 1) == 'tid';
      if ($is_term && $arg != $exception_value) {
        // Return all children of the selected parent term.
        // Note this requires the user to tick "Allow multiple values" on the
        // Defaults: Configure Argument panel. If not ticked only the parent
        // tid will come through.
        $tids = array_keys(taxonomy_get_children($arg));
        if (!empty($tids)) {
          return "$arg+" . implode('+', $tids);
        }
      }
      return $arg;
    }
    $view_name = empty($this->view->human_name) ? $this->view->name : $this->view->human_name;
    drupal_set_message(t('The view %view specifies as its default argument a global field filter, %name. However there is no associated <strong>Global Filter block</strong> for %name. Please configure a global filter <a href="/admin/build/block">here</a> or remove this default argument from the view.', array(
      '%view' => $view_name, '%name' => $views_field_name)), 'warning', FALSE);
    return $exception_value;
  }
}
