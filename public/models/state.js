// Constructor.
class State {
  constructor (name, slug) {
    // moment.updateLocale('sv', {
    //   ordinal: number => {
    //     const b = number % 10;
    //     const output = ~~(number % 100 / 10) === 1 ? 'e'
    //       : (b === 1) ? 'a'
    //       : (b === 2) ? 'a'
    //       : (b === 3) ? 'e' : 'e';
    //     return number + ':' + output;
    //   }
    // });
    // moment.locale('sv');
    // this.index = stateIndex || 0;
    // this.current = moment.tz(TIME_ZONE).add(this.index, 'weeks');
    // this.startDayOfWeek = this.current.clone().startOf('isoweek');
    // this.endDayOfWeek = this.current.clone().endOf('isoweek');

    this.name = name;
    this.slug = slug;
  }

  getName () {
    return this.name;
  }

  getSlug () {
    return this.slug;
  }

  // isTodaysWeek () {
  //   return this.current.isSame(moment.tz(TIME_ZONE), 'w');
  // }

  // formatDate (date) {
  //   return date.format('ddd, Do MMM');
  // }

  // getNumber () {
  //   return this.current.isoWeek();
  // }

  // getStartDayText () {
  //   return this.formatDate(this.startDayOfWeek);
  // }
  //
  // getEndDayText () {
  //   return this.formatDate(this.endDayOfWeek);
  // }

  // getSeason () {
  //   const seasons = [
  //     {id: 'winter', fromWeek: 1, toWeek: 11},
  //     {id: 'spring', fromWeek: 12, toWeek: 22},
  //     {id: 'summer', fromWeek: 23, toWeek: 37},
  //     {id: 'fall', fromWeek: 38, toWeek: 48},
  //     {id: 'winter', fromWeek: 49, toWeek: 52}
  //   ];
  //   const weekNumber = this.getNumber();
  //   for (let season of seasons) {
  //     if (weekNumber >= season.fromWeek && weekNumber <= season.toWeek) {
  //       return season.id;
  //     }
  //   }
  //   return '';
  // }

  // getMonthPeriod () {
  //   if (!this.startDayOfWeek.isSame(this.endDayOfWeek, 'year')) {
  //     // If start and end of week in separate year.
  //     return `${this.startDayOfWeek.format('MMMM YYYY')} - ${this.endDayOfWeek.format('MMMM YYYY')}`;
  //   } else if (!this.startDayOfWeek.isSame(this.endDayOfWeek, 'month')) {
  //     // If start and end of week in separate month.
  //     return `${this.startDayOfWeek.format('MMMM')} - ${this.endDayOfWeek.format('MMMM YYYY')}`;
  //   }
  //   return this.startDayOfWeek.format('MMMM YYYY');
  // }
  //
  // getDayPeriod () {
  //   return `${this.startDayOfWeek.format('Do')} - ${this.endDayOfWeek.format('Do')}`;
  // }
  //
  // getYearText () {
  //   if (this.startDayOfWeek.isSame(this.endDayOfWeek, 'y')) {
  //     return this.startDayOfWeek.format('YYYY');
  //   }
  //   return this.startDayOfWeek.format('YYYY') + ' - ' + this.endDayOfWeek.format('YYYY');
  // }
  //
  // getIndex () {
  //   return this.index;
  // }
};

module.exports = State;

/*
const moment = require('moment-timezone');

const TIME_ZONE = 'Europe/Stockholm';

class State {
  constructor (stateIndex) {
    moment.updateLocale('sv', {
      ordinal: number => {
        const b = number % 10;
        const output = (~~(number % 100 / 10) === 1) ? 'e'
          : (b === 1) ? 'a'
          : (b === 2) ? 'a'
          : (b === 3) ? 'e' : 'e';
        return number + ':' + output;
      }
    });
    moment.locale('sv');
    this.index = stateIndex || 0;
    this.current = moment.tz(TIME_ZONE).add(this.index, 'weeks');
    this.startDayOfWeek = this.current.clone().startOf('isoweek');
    this.endDayOfWeek = this.current.clone().endOf('isoweek');
  }

  isTodaysWeek () {
    return this.current.isSame(moment.tz(TIME_ZONE), 'w');
  }

  formatDate (date) {
    return date.format('ddd, Do MMM');
  }

  getNumber () {
    return this.current.isoWeek();
  }

  getStartDayText () {
    return this.formatDate(this.startDayOfWeek);
  }

  getEndDayText () {
    return this.formatDate(this.endDayOfWeek);
  }

  getSeason () {
    const seasons = [
      {id: 'winter', fromWeek: 1, toWeek: 11},
      {id: 'spring', fromWeek: 12, toWeek: 22},
      {id: 'summer', fromWeek: 23, toWeek: 37},
      {id: 'fall', fromWeek: 38, toWeek: 48},
      {id: 'winter', fromWeek: 49, toWeek: 52}
    ];
    const weekNumber = this.getNumber();
    for (let season of seasons) {
      if (weekNumber >= season.fromWeek && weekNumber <= season.toWeek) {
        return season.id;
      }
    }
    return '';
  }

  getMonthPeriod () {
    if (!this.startDayOfWeek.isSame(this.endDayOfWeek, 'year')) {
      // If start and end of week in separate year.
      return `${this.startDayOfWeek.format('MMMM YYYY')} - ${this.endDayOfWeek.format('MMMM YYYY')}`;
    } else if (!this.startDayOfWeek.isSame(this.endDayOfWeek, 'month')) {
      // If start and end of week in separate month.
      return `${this.startDayOfWeek.format('MMMM')} - ${this.endDayOfWeek.format('MMMM YYYY')}`;
    }
    return this.startDayOfWeek.format('MMMM YYYY');
  }

  getDayPeriod () {
    return `${this.startDayOfWeek.format('Do')} - ${this.endDayOfWeek.format('Do')}`;
  }

  getYearText () {
    if (this.startDayOfWeek.isSame(this.endDayOfWeek, 'y')) {
      return this.startDayOfWeek.format('YYYY');
    }
    return this.startDayOfWeek.format('YYYY') + ' - ' + this.endDayOfWeek.format('YYYY');
  }

  getIndex () {
    return this.index;
  }
};

module.exports = Week;
*/
