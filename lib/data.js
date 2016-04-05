var rowData = {
  'status': 'Enabled',
  'Campaign': 'Campaign #',
  'Budget': {value: 7.00, unit: 'day'},
  'Delivery': 'Eligible',
  'Campaign Type': 'Search & Content',
  'Clicks': 0,
  'Impr.': 0,
  'CTR': 0.00,
};

var rows = [];
for (var i = 0; i < 10; ++i) {
  rows[i] = Object.assign({}, rowData);
  rows[i].Campaign += i;
  rows[i].Budget = Object.assign({}, rows[i].Budget);
}
exports.value = rows;
exports.columnType = {
  'status': 'status-select',
  'Campaign': 'uri',
  'Budget': 'value-unit',
  'Delivery': 'string',
  'Campaign Type': 'string',
  'Clicks': 'integer',
  'Impr.': 'integer',
  'CTR': 'percent',
};
