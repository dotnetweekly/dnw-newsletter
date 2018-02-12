const path = require('path');
const fs = require('fs-extra');

const cache = {
    items: [],
    timeout: 0
};

module.exports = {
  refresh: function() {
    const items = [];

    const issuePath = path.resolve(__dirname, '../public/issues');
    const years = fs.readdirSync(issuePath).filter(
      f => fs.statSync(path.join(issuePath, f)).isDirectory()
    )

    for (var i = 0; i < years.length; i++) {
      const yearPath = path.resolve(__dirname, `../public/issues/${years[i]}`);
      const weeks = fs.readdirSync(yearPath).filter(
        f => fs.statSync(path.join(yearPath, f)).isDirectory()
      ).map(f => parseInt(f))
      .sort(function(a, b) {
        return a - b;
      })
      for(var j = 0; j < weeks.length; j++){
        items.push({ year: years[i], week: weeks[j] });
      }
    }

    cache.items = items.reverse();;
  },
  get: function() {
    if (cache.items.length === 0) {
      this.refresh();
    }
    return cache.items;
  }
}