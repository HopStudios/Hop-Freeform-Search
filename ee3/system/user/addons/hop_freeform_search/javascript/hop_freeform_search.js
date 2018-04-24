
function setFieldsResultsInTable(fields){
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
			var $tdType = $('<td></td>').append(field.type_label);
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

function setFormsResultsInTable(forms){
	// Remove everything from the table
	$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').html('');
	// Remove pagination (we don't use pagination in the search, would be too much hassle)
	$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .paginate').html('');
	if (forms.length){
		for (var i=0;i<forms.length;i++){
			var form = forms[i];
			var $tr = $('<tr></tr>');
			var $tdId = $('<td>'+form.id+'</td>');
			var $tdForm = $('<td></td>');
			var $formLink = $('<a href="'+form.edit_link+'">'+form.label+'</a>');
			var $formLabel = $('<span></span>').addClass('meta-info').append('<br>').append('— '+form.name);
			$tdForm.append($formLink).append($formLabel);
			var $tdSubs = $('<td></td>').append('<a href="'+form.subs_link+'">Submissions ('+form.nb_subs+')</a>');
			var $tdMod = $('<td></td>').append('<a href="'+form.mod_link+'">Moderate</a>');
			var $tdManage = $('<td></td>').append(form.toolbar_buttons);
			var $tdCheckbox = $('<td></td>');

			$tr.append($tdId).append($tdForm).append($tdSubs).append($tdMod).append($tdManage).append($tdCheckbox);
			$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').append($tr);
		}
	} else {
		var $tr = $('<tr></tr>');
		var $td = $('<td colspan="6" style="text-align: center; font-weight: bold;"></td>').append('No results');
		$tr.append($td);
		$('section.wrap .col-group.align-right .w-12 .box .tbl-ctrls .tbl-wrap table tbody').append($tr);
	}
}

function addSearchForm(formActionUrl){
	var $fieldset = $('<fieldset></fieldset>');
	$fieldset.addClass('tbl-search right');
	$fieldset.css('margin-left', '15px').css('margin-top', '-2px');
	var $form = $('<form id="hfs-fields" method="GET" action="'+formActionUrl+'"></form>');
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
	return $form;
}

if (window.location.href.endsWith("?/cp/addons/settings/freeform/fields")) {
	// Means we are on the freeform fields listing page

	// Create search form
	var $form = addSearchForm(hfsFields);	
	$form.on('submit', function(e){
		e.preventDefault();
		$.get($(this).attr('action'), {hfs_keywords: $(this).find('[name="hfs_keywords"]').val()})
		.success(function(data){
			// console.log(data);
			setFieldsResultsInTable(data);
		});
	});

	

} else if (window.location.href.endsWith("?/cp/addons/settings/freeform")) {
	// Means we are on the freeform index page, with forms listing
	
	//Create search form
	var $form = addSearchForm(hfsForms);
	$form.on('submit', function(e){
		e.preventDefault();
		$.get($(this).attr('action'), {hfs_keywords: $(this).find('[name="hfs_keywords"]').val()})
		.success(function(data){
			// console.log(data);
			setFormsResultsInTable(data);
		});
	});
}