var Backbone = require('backbone');
var Backgrid = require('backgrid');
var $ = require('jquery');

var okIconStr = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
var pauseIconStr = '<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>';

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
    "click li": "selectStatus",
    "click .status-bar": "enterEditMode"
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
    this.model = options.model;

    if (!(this.column instanceof Backgrid.Column)) {
      this.column = new Backgrid.Column(this.column);
    }

    var column = this.column, model = this.model, $el = this.$el;
    this.listenTo(column, "change:renderable", function (column, renderable) {
      $el.toggleClass("renderable", renderable);
    });

    if (Backgrid.callByNeed(column.renderable(), column, model)) $el.addClass("renderable");

    this.listenTo(model, "change:" + column.get("name"), function (model, value) {
      this.changeStatus(value);
    });
  },

  changeStatus: function(status) {
    this.$('.status-bar').empty().append(
      status === 'Enabled' ? okIconStr : pauseIconStr);
  },

  /**
     Returns the checkbox.
   */
  dropdown: function () {
    return this.$el.find(".dropdown");
  },

  hideDropdown: function() {
    var dropdown = this.dropdown();
    dropdown.addClass('hidden');
  },

  /**
     Focuses the checkbox.
  */
  enterEditMode: function () {
    var dropdown = this.dropdown();
    dropdown.removeClass('hidden');
    dropdown.focus();
    setTimeout(function() {
      $(document).one('click', this.hideDropdown.bind(this));
    }.bind(this), 0);
  },

  /**
     Unfocuses the checkbox.
  */
  exitEditMode: function () {
    var dropdown = this.dropdown();
    dropdown.addClass('hidden');
    dropdown.blur();
  },

  selectStatus: function(e) {
    var selectedStatus = e.currentTarget.classList.contains('enabled-bar') ? 'Enabled' : 'Paused';
    this.model.set(this.column.get("name"), selectedStatus);
    this.hideDropdown();
  },

  /**
     Renders a checkbox in a table cell.
  */
  render: function () {
    var columnName = this.column.get("name");
    var status = this.model.get(columnName);

    this.$el.empty();
    var $statusBar = $('<div class="status-bar"></div>');
    $statusBar.append(status === 'Enabled' ? okIconStr : pauseIconStr);

    var $list = $('<ul class="dropdown hidden"/>');
    var $enabledMenu = $('<li class="enabled-bar"/>');
    $enabledMenu.append(okIconStr);
    $enabledMenu.append('<span>Enabled</span>');

    var $pausedMenu = $('<li class="pause-bar"/>');
    $pausedMenu.append(pauseIconStr);
    $pausedMenu.append('<span>Paused</span>');

    $list.append($enabledMenu, $pausedMenu);
    this.$el.append($statusBar, $list);
    this.delegateEvents();
    return this;
  }

});

module.exports = StatusSelectCell;
