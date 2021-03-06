var _ = require('underscore');
var Backgrid = require('backgrid');
var $ = require('jquery');

var regExp = /(\d+(\.\d+)*)(\s+)/;

var ValueUnitFormatter = function () {};
_.extend(ValueUnitFormatter.prototype, {

  fromRaw: function (rawData, model) {
    return '' + Number(rawData.value).toPrecision(3) + '/' + rawData.unit;
  },

  toRaw: function (formattedData, model) {
    var res = regExp.exec(formattedData);
    return {
      value: res[1],
      unit: res[3]
    };
  }
});

var ValueUnitEditor = Backgrid.PopCellEditor.extend({

  className: "pop-editor value-unit-editor",

  render: function() {
    var model = this.model;
    var valueInput = $('<input class="value" type="text">');
    var unitSelect = $('<select class="unit"/>');
    unitSelect.append('<option value="month">Monthly</option>');
    unitSelect.append('<option value="day">Daily standard</option>');
    var saveButton = $('<input class="save" type="button" value="Save">');
    var cancelButton = $('<input class="cancel" type="button" value="Cancel">');
    var data = model.get(this.column.get("name"));
    valueInput.val(data.value);
    unitSelect.val(data.unit);
    this.$el.append(valueInput, unitSelect, saveButton, cancelButton);
    return this;
  },

  onSave: function (event) {
    event.stopPropagation();
    var model = this.model, column = this.column;
    var newValue = {
      value: this.$('.value').val(),
      unit: this.$('.unit').val()
    };
    model.set(column.get("name"), newValue);
    model.trigger("backgrid:edited", model, column, new Backgrid.Command({keyCode: 13}));
  },
});

var ValueUnitCell = Backgrid.StringCell.extend({

  className: "value-unit-cell",

  editor: ValueUnitEditor,

  formatter: ValueUnitFormatter
});

module.exports = ValueUnitCell;
