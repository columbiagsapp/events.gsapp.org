<?php

/**
 * @file
 * Handles incoming requests to fire off regularly-scheduled tasks (cron jobs).
 */

include_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
drupal_cron_run();


// jochen updated 5/31/12 -- adding additional functionality for event date updates

include_once './includes/module.inc';

if (module_exists('gsapp_event_updates') && function_exists('update_events_upon_cron')) {
	update_events_upon_cron();
} else {
    // fail somehow?
}