<?php

class Hop_freeform_search_upd
{
	var $version = HOP_FREEFORM_SEARCH_VERSION;

	function install()
	{
		// Add module to EE modules list
		$data = array(
			'module_name' => 'Hop_freeform_search' ,
			'module_version' => $this->version,
			'has_cp_backend' => 'y',
			'has_publish_fields' => 'n'
		);
 
		ee()->db->insert('modules', $data);

		return TRUE;
	}

	function update($current = '')
	{
		ee()->load->dbforge();

		if (version_compare($current, '1.0.0', '='))
		{
			return FALSE;
		}

		return TRUE;
	}

	function uninstall()
	{
		ee()->db->select('module_id');
		$query = ee()->db->get_where('modules', array('module_name' => 'Hop_freeform_search'));

		ee()->db->where('module_id', $query->row('module_id'));
		ee()->db->delete('module_member_groups');

		ee()->db->where('module_id', $query->row('module_id'));
		ee()->db->delete('modules');

		return TRUE;
	}
}