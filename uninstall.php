<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package Inkfire_Login_Styler
 */

// If uninstall not called from WordPress, then exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// 1. Delete Plugin Options
delete_option('ifls_installed_version');
delete_option('ifls_auto_updates');
delete_option('ifls_health_status');

// 2. Clear Transients (Security locks, health checks, update caches)
global $wpdb;

// Delete transient data
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
        '_transient_ifls_%'
    )
);

// Delete transient timeout data
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
        '_transient_timeout_ifls_%'
    )
);

// 3. Clear Object Cache
if (function_exists('wp_cache_flush')) {
    wp_cache_flush();
}