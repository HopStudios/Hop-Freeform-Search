<?php

/**
 * Hop Freeform Search - Config
 *
 * NSM Addon Updater config file.
 *
 * @package		Hop Studios:Hop Freeform Search
 * @author		Hop Studios, Inc.
 * @copyright	Copyright (c) 2018, Hop Studios, Inc.
 * @link		http://www.hopstudios.com/
 * @version		1.0.0
 */

$config['name']='Hop Freeform Search';
$config['version']='1.0.0';
$config['nsm_addon_updater']['versions_xml']='http://www.hopstudios.com/software';

// Version constant
if (!defined('HOP_FREEFORM_SEARCH_VERSION')) {
	define('HOP_FREEFORM_SEARCH_VERSION', $config['version']);
}
