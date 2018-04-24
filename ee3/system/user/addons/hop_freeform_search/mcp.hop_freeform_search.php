<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Hop_freeform_search_mcp
{
	public function index()
	{

	}

	public function fetch_members_data()
	{
		$members_ids = ee()->input->post('m_ids');
		// var_dump($members_ids);
		$query = ee()->db->select('*')
			->from('member_data')
			->where_in('member_id', $members_ids)
			->get();

		$member_custom_data = array();
		foreach ($query->result() as $row)
		{
			$member_data = array(
				'first_name' => $row->m_field_id_5,
				'last_name' => $row->m_field_id_4,
			);
			$member_custom_data[$row->member_id] = $member_data;
		}

		// Send that back as JSON
		header('Content-Type: application/json');
		echo json_encode($member_custom_data);
		exit();
	}

	public function search_fields()
	{
		$fields = array();
		$keywords = ee()->input->get('hfs_keywords');

		$query_fields = ee()->db->select('*')
			->from('freeform_fields')
			->where('site_id', ee()->config->item('site_id'))
			->like('field_name', $keywords)
			->or_like('field_label', $keywords)
			->or_like('field_description', $keywords)
			->get();

		foreach($query_fields->result() as $field_data)
		{
			if (ee()->config->item('site_id') == $field_data->site_id)
			{
				$toolbar_buttons = '<div class="toolbar-wrap"><ul class="toolbar">';
				$toolbar_buttons .= '<li class="edit"><a href="'.ee('CP/URL')->make('addons/settings/freeform/edit_field', array('field_id' => $field_data->field_id))->compile().'" title="Edit"></a></li>';
				$toolbar_buttons .= '<li class="copy"><a href="'.ee('CP/URL')->make('addons/settings/freeform/edit_field', array('duplicate_id' => $field_data->field_id))->compile().'" title="Duplicate"></a></li>';
				$toolbar_buttons .= '</ul></div>';

				$fields[] = array(
					'id'			=> $field_data->field_id,
					'name'			=> $field_data->field_name,
					'label'			=> $field_data->field_label,
					'description'	=> $field_data->field_description,
					'type'			=> $field_data->field_type,
					'edit_link'		=> ee('CP/URL')->make('addons/settings/freeform/edit_field', array('field_id' => $field_data->field_id))->compile(),
					'dup_link'		=> ee('CP/URL')->make('addons/settings/freeform/edit_field', array('duplicate_id' => $field_data->field_id))->compile(),
					'toolbar_buttons' => $toolbar_buttons
				);
			}
		}

		// Send that back as JSON
		header('Content-Type: application/json');
		echo json_encode($fields);
		exit();
	}

	public function search_forms()
	{
		$forms = array();
		$keywords = ee()->input->get('hfs_keywords');

		$query_forms = ee()->db->select('*')
			->from('freeform_forms')
			->like('form_name', $keywords)
			->or_like('form_label', $keywords)
			->or_like('form_description', $keywords)
			->get();

		foreach($query_forms->result() as $form_data)
		{
			if (ee()->config->item('site_id') == $form_data->site_id)
			{
				$toolbar_buttons = '<div class="toolbar-wrap"><ul class="toolbar">';
				$toolbar_buttons .= '<li class="edit"><a href="'.ee('CP/URL')->make('addons/settings/freeform/edit_form', array('form_id' => $form_data->form_id))->compile().'" title="Edit"></a></li>';
				$toolbar_buttons .= '<li class="copy"><a href="'.ee('CP/URL')->make('addons/settings/freeform/edit_form', array('duplicate_id' => $form_data->form_id))->compile().'" title="Duplicate"></a></li>';
				$toolbar_buttons .= '</ul></div>';

				$forms[] = array(
					'id'			=> $form_data->form_id,
					'name'			=> $form_data->form_name,
					'label'			=> $form_data->form_label,
					'description'	=> $form_data->form_description,
					'edit_link'		=> ee('CP/URL')->make('addons/settings/freeform/edit_form', array('form_id' => $form_data->form_id))->compile(),
					'dup_link'		=> ee('CP/URL')->make('addons/settings/freeform/edit_form', array('duplicate_id' => $form_data->form_id))->compile(),
					'subs_link'		=> ee('CP/URL')->make('addons/settings/freeform/entries', array('form_id' => $form_data->form_id))->compile(),
					'mod_link'		=> ee('CP/URL')->make('addons/settings/freeform/moderate_entries', array('form_id' => $form_data->form_id, 'search_status' => 'pending'))->compile(),
					'toolbar_buttons' => $toolbar_buttons
				);
			}
		}

		// Send that back as JSON
		header('Content-Type: application/json');
		echo json_encode($forms);
		exit();
	}
}