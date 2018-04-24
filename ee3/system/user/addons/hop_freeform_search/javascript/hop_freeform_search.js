
function setResultsInTable(fields){
	// Remove everything from the table
	$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').html('');
	// Remove pagination (we don't use pagination in the search, would be too much hassle)
	$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .paginate').html('');
	if (fields.length){
		// Add rows to the table from our search result
		for (var i=0;i<fields.length;i++){
			var field = fields[i];
			var $tr = $('<tr></tr>');
			var $tdId = $('<td>'+field.id+'</td>');
			var $tdField = $('<td></td>');
			var $fieldLink = $('<a href="'+field.edit_link+'">'+field.label+'</a>');
			var $fieldLabel = $('<span></span>').addClass('meta-info').append('<br>').append('— '+field.name);
			$tdField.append($fieldLink).append($fieldLabel);
			var $tdType = $('<td>t</td>');
			var $tdDescription = $('<td></td>').append(field.description);
			var $tdManage = $('<td></td>').append(field.toolbar_buttons);
			var $tdCheckbox = $('<td></td>');
			$tr.append($tdId).append($tdField).append($tdType).append($tdDescription).append($tdManage).append($tdCheckbox);
			$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').append($tr);
		}
	} else {
		var $tr = $('<tr></tr>');
		var $td = $('<td colspan="6" style="text-align: center; font-weight: bold;"></td>').append('No results');
		$tr.append($td);
		$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').append($tr);
	}
}

if (window.location.href.endsWith("?/cp/addons/settings/freeform/fields")) {
	// Means we are on the freeform fields listing page

	// Create search form
	var $fieldset = $('<fieldset></fieldset>');
	$fieldset.addClass('tbl-search right');
	$fieldset.css('margin-left', '15px').css('margin-top', '-2px');
	var $form = $('<form id="hfs-fields" method="GET" action="'+hfsFields+'"></form>');
	$form.on('submit', function(e){
		e.preventDefault();
		$.get($(this).attr('action'), {hfs_keywords: $(this).find('[name="hfs_keywords"]').val()})
		.success(function(data){
			// console.log(data);
			setResultsInTable(data);
		});
	});

	var $input = $('<input type="text" placeholder="Search fields" name="hfs_keywords" />');
	$input.css('width', '120px').css('margin-right', '4px');
	var $submit = $('<input class="btn submit" value="search" type="submit">');
	// var $reset = $('<a href="" class="btn draft">✕</a>');
	$form.append($input);
	$form.append($submit);
	// $form.append($reset);
	$fieldset.append($form);
	// $('#entry-filters').prepend($fieldset);
	$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls').prepend($fieldset);

} else if (window.location.href.endsWith("?/cp/addons/settings/freeform")) {
	// Means we are on the freeform index page, with forms listing
	// Retrieve list of member ids
	let member_ids = [];
	$('form[action*="/cp/members"] .tbl-wrap table tbody tr').each(function(idx, element){
		member_ids.push($(element).find('input[name="selection[]"]').attr('value'));
	});

	if (member_ids.length) {
		// Ajax query to get back the member data
		$.ajax({
			method: "POST",
			url: hcml_ajax_url,
			data: { m_ids: member_ids }
		})
		.done(function(member_data) {
			console.log(member_data);
			$('form[action*="/cp/members"] .tbl-wrap table tbody tr').each(function(idx, element){
				const mem_id = $(element).find('input[name="selection[]"]').attr('value');
				if (member_data[mem_id]) {
					$(element).find('td:nth-child(2)').append('<span class="meta-info">— '+member_data[mem_id].first_name+' '+member_data[mem_id].last_name+'</span>');
				}
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Error fetching members extra data: "+textStatus);
		});
	}
}