var Backbone = require('backbone');
var Backgrid = require('backgrid');
var $ = require('jquery');
var _ = require('underscore');
var data = require('./data');
var StatusSelectCell = require('./status-select-cell');

require('backgrid-select-all');

var campaigns = new Backbone.Collection;
campaigns.reset(data.value);

// This grid will add some aggregation information rows at the top and bottom of the grid.
// These aggregation rows will show some aggregation info such as sum or average value.
var AggregateBody = Backgrid.Body.extend({
  initialize: function(options) {
    Backgrid.Body.prototype.initialize.apply(this, arguments);
    this.createAggregateColumns();
    var topRows = options.topRows || [];
    this.topRows = topRows.map(this.transformAggregateRow, this);
    var bottomRows = options.bottomRows || [];
    this.bottomRows = bottomRows.map(this.transformAggregateRow, this);
  },

  createAggregateColumns: function() {
    var newColumns = this.columns.map(function(column) {
      return _.extend({}, column.attributes, {editable: false, cell: "string"});
    });
    this.aggregateColumns = new Backgrid.Columns(newColumns);
  },

  transformAggregateRow: function(row) {
    if (row instanceof Backgrid.Row) return row;
    var model = row;
    return new this.row({
      columns: this.aggregateColumns,
      model: model
    });
  },

  render: function() {
    var fragment = document.createDocumentFragment();
    this.topRows.forEach(function(row) {
      fragment.appendChild(row.render().el);
    }, this);

    for (var i = 0; i < this.rows.length; i++) {
      var row = this.rows[i];
      fragment.appendChild(row.render().el);
    }

    this.bottomRows.forEach(function(row) {
      fragment.appendChild(row.render().el);
    }, this);

    this.el.appendChild(fragment);

    this.delegateEvents();
    return this;
  }
});

var columns = _.map(data.columnType, function(type, key) {
  return {
    name: key,
    editable: false,
    label: key,
    cell: type
  }
});

columns[0] = {
  name: 'status',
  cell: StatusSelectCell
};

columns.unshift({
  name: '',
  cell: 'select-row',
  headerCell: 'select-all'
});

// Initialize a new Grid instance
var grid = new Backgrid.Grid({
  columns: columns,
  collection: campaigns,
  body: AggregateBody,
  topRows: [new Backbone.Model({'name': "Hello World"})],
  bottomRows: [new Backbone.Model({'pop': "133300 population"})]
});

// Render the grid and attach the root to your HTML document
$("#example-1-result").append(grid.render().el);
