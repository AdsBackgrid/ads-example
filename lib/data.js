var rowData = {
  'status': 'Enabled',
  'Campaign': 'Campaign #',
  'Budget': {value: 7.00, unit: 'day'},
  'Delivery': 'Eligible',
  'Campaign Type': 'Search & Content',
  'Clicks': 0,
  'Impr.': 0,
  'CTR': 0.00,
  'Avg. CPC': 0.00,
  'Spend': 0.00,
  'Avg. pos': 0.00,
  'Qual. score': 0.00,
  'Avg. CPM': 0.00,
  'Total spend': 0.00,
  'CPA': 0.00,
  'Conv': 0,
  'Conv rate': 0.00,
  'Revenue': 0.00,
  'Return on ad spend': 0.00,
  'Phone spend': '0.00',
  'Manual calls': 0,
  'Click calls': 0,
  'Phone impr.': 0,
  'PTR': 0.00,
  'Avg. CPP': 0.00
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
  'Campaign': 'string',
  // 'Budget': , 'value-unit'
  'Delivery': 'string',
  'Campaign Type': 'string',
  'Clicks': 'integer',
  'Impr.': 'integer',
  'CTR': 'percent',
  'Avg. CPC': 'number',
  'Spend': 'number',
  'Avg. pos': 'number',
  'Qual. score': 'percent',
  'Avg. CPM': 'number',
  'Total spend': 'number',
  'CPA': 'number',
  'Conv': 'number',
  'Conv rate': 'percent',
  'Revenue': 'number',
  'Return on ad spend': 'percent',
  'Phone spend': 'number',
  'Manual calls': 'integer',
  'Click calls': 'integer',
  'Phone impr.': 'integer',
  'PTR': 'percent',
  'Avg. CPP': 'number'
};
