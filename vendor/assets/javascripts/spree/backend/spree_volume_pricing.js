// spree's version only handles 'input', not 'select', and this breaks spree_volume_pricing
//= require spree/backend

$(function () {
  var uniqueId = 1;
  $('.new_volume_price_row.spree_add_fields').off('click').on('click', function() {
    var target = $(this).data("target");
    alert('for test only');
    var new_table_row = $(target + ' tr:visible:last').clone();
    var new_id = new Date().getTime() + (uniqueId++);
    new_table_row.find("input, select").each(function () {
      var el = $(this);
      if (!el.is("select")){
        el.val("");
      }
      el.prop("id", el.prop("id").replace(/\d+/, new_id))
      el.prop("name", el.prop("name").replace(/\d+/, new_id))
      el.prop("checked", false);
    });
    new_table_row.find('.select2-container').remove();

    var discount_type_select = new_table_row.find('.select2');
    discount_type_select.removeClass('select2-offscreen');    
    var selectOption = discount_type_select.find("option").first()
    discount_type_select.select2({val: selectOption}).change();
    // When cloning a new row, set the href of all icons to be an empty "#"
    // This is so that clicking on them does not perform the actions for the
    // duplicated row
    new_table_row.find("a").each(function () {
      var el = $(this);
      el.prop('href', '#');
    })
    $(target).prepend(new_table_row);
  });

});