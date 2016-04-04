var Backbone = require('backbone');
var Backgrid = require('backgrid');
var $ = require('jquery');

/**
     Renders a checkbox for row selection.
     @class Backgrid.Extension.SelectRowCell
     @extends Backbone.View
  */
var StatusSelectCell = Backbone.View.extend({

  /** @property */
  className: "status-select-cell",

  /** @property */
  tagName: "td",

  /** @property */
  events: {
    "keydown input[type=checkbox]": "onKeydown",
    "change input[type=checkbox]": "onChange",
    "click input[type=checkbox]": "enterEditMode"
  },

  /**
     Initializer. If the underlying model triggers a `select` event, this cell
     will change its checked value according to the event's `selected` value.
     @param {Object} options
     @param {Backgrid.Column} options.column
     @param {Backbone.Model} options.model
  */
  initialize: function (options) {

    this.column = options.column;
    if (!(this.column instanceof Backgrid.Column)) {
      this.column = new Backgrid.Column(this.column);
    }

    var column = this.column, model = this.model, $el = this.$el;
    this.listenTo(column, "change:renderable", function (column, renderable) {
      $el.toggleClass("renderable", renderable);
    });

    if (Backgrid.callByNeed(column.renderable(), column, model)) $el.addClass("renderable");

    this.listenTo(model, "backgrid:status-change", function (model, status) {
      this.checkbox().prop("checked", selected).change();
    });
  },

  /**
     Returns the checkbox.
   */
  dropdown: function () {
    return this.$el.find(".dropdown");
  },

  /**
     Focuses the checkbox.
  */
  enterEditMode: function () {
    var dropdown = this.dropdown();
    dropdown.removeClass('hidden');
    dropdown.focus();
  },

  /**
     Unfocuses the checkbox.
  */
  exitEditMode: function () {
    var dropdown = this.dropdown();
    dropdown.addClass('hidden');
    dropdown.blur();
  },

  /**
     Process keyboard navigation.
  */
  onKeydown: function (e) {
    var command = new Backgrid.Command(e);
    if (command.passThru()) return true; // skip ahead to `change`
    if (command.cancel()) {
      e.stopPropagation();
      this.checkbox().blur();
    }
    else if (command.save() || command.moveLeft() || command.moveRight() ||
             command.moveUp() || command.moveDown()) {
      e.preventDefault();
      e.stopPropagation();
      this.model.trigger("backgrid:edited", this.model, this.column, command);
    }
  },

  /**
     When the checkbox's value changes, this method will trigger a Backbone
     `backgrid:selected` event with a reference of the model and the
     checkbox's `checked` value.
  */
  onChange: function () {
    var checked = this.checkbox().prop("checked");
    this.$el.parent().toggleClass("selected", checked);
    this.model.trigger("backgrid:selected", this.model, checked);
  },

  /**
     Renders a checkbox in a table cell.
  */
  render: function () {
    this.$el.empty().append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
    var $list = $('<ul class="dropdown hidden"/>');
    var $enabledMenu = $('<li/>');
    $enabledMenu.append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
    $enabledMenu.append('<span>Enabled</span>');

    var $pausedMenu = $('<li/>');
    $pausedMenu.append('<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>');
    $pausedMenu.append('<span>Paused</span>');

    $list.append($enabledMenu, $pausedMenu);
    this.$el.append($list);
    this.delegateEvents();
    return this;
  }

});

module.exports = StatusSelectCell;
