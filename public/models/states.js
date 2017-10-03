const State = require('./state.js');

class States {
  constructor (sortOrder = 'asc', sortCriterion = 'name') {
    this.list = [];
    this.mapData = null;
    this.sortOrder = sortOrder === 'desc' ? 'desc' : 'asc';
    this.sortCriterion = sortCriterion === 'slug' ? 'slug' : 'name';
    this.load();
  }

  getMapData () {
    return require('../data/map_usa.json');
  }

  load () {
    this.mapData = this.getMapData();
    this.list = [
      new State('California', 'ca'),
      new State('Arizona', 'az'),
      new State('Texas', 'tx'),
      new State('Connecticut', 'ct'),
      new State('Illinois', 'il'),
      new State('New York', 'ny')
    ];

    let order = -1;  // Descending order.
    if (this.sortOrder === 'asc') {
      order = 1;  // Ascending order.
    }
    const criterion = this.sortCriterion;
    this.list.sort((a, b) => {
      if (a[criterion] < b[criterion]) {
        return -1 * order;
      }
      if (a[criterion] > b[criterion]) {
        return 1 * order;
      }
      return 0;
    });
  }

  getList () {
    return this.list;
  }
}

module.exports = new States();
