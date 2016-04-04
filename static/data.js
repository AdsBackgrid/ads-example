var rowData = {
  'Campaign': 'Campaign #',
  'Budget': {value: 7.00, unit: 'day'},
  'Delivery': 'Eligible',
  'Campaign Type': 'Search & Content',
  'Clicks': 0,
  'Impr': 0,
  'CTR': 0.00,
  'Avg. CPC': 0.00,
  'Spend': 0.00,
  'Avg. pos': 0.00,
  'Qual. score': 0.00,
  'Avg. CPM': 0.00,
  'Total spend': 0.00,
  'CPA': 0.00,
  'Conv': 0,
  'Conv rate': 0.00%,
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
module.exports = rows;
