<?php

class Hop_freeform_search_ext
{
	var $version = HOP_FREEFORM_SEARCH_VERSION;

	public function activate_extension()
	{
		// Add our hook to add custom JS to the CP
		$data = array(
			'class'     => 'Hop_freeform_search_ext',
			'method'    => 'cp_js_end',
			'hook'      => 'cp_js_end',
			'settings'  => serialize(array()),
			'priority'  => 10,
			'version'   => $this->version,
			'enabled'   => 'y'
		);
	
		ee()->db->insert('extensions', $data);
	}

	public function disable_extension()
	{
		ee()->db->where('class', 'Hop_freeform_search_ext');
		ee()->db->delete('extensions');
	}

	public function cp_js_end()
	{
		// Only add our JS on the members listing page
		// BUT our JS file is loaded using a specific EE url index.php?S=0&D=cp&C=javascript&M=load&file=ext_scripts
		// So we can't check it right here, we'll check it in JS

		$ajax_url_fields = ee('CP/URL', 'addons/settings/hop_freeform_search/search_fields')->compile();
		$ajax_url_forms = ee('CP/URL', 'addons/settings/hop_freeform_search/search_forms')->compile();
		$script = file_get_contents(PATH_THIRD."hop_freeform_search/javascript/hop_freeform_search.js");
		return 'var hfsFields = "'.$ajax_url_fields.'";var hfsForms = "'.$ajax_url_forms.'";'.$script;
		// return '';
	}
}