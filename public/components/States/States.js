const d3 = require('d3');
const topojson = require('topojson');
import {Component} from 'component-loader-js';

// import debounce from '../../utils/debounce';

// Publishing custom event to any registered listener.
class States extends Component {
  constructor () {
    super(...arguments);

    const dataset = this.el.dataset;

    this.width = dataset.width;
    this.height = dataset.height;
    this.scale = dataset.scale;
    this.numberOfStates = dataset.statesCount;
    this.mapData = JSON.parse(dataset.mapData || '{}');

    this._statesBySlug = {
      'ca': {
        name: 'California',
        slug: 'ca'
      }
    };

    // this._updateFrame = null;
    // this._scrollEndTimer = null;
    // this._hasStartedTouch = false;
    // this._isBusyUpdating = false;
    // this._animation = {isRunning: false};
    // this._scrollItemWidth = 60;
    // this._sidePadding = 30;
    // this._weekIndex = 0;

    // this.scrollerWrapperElement = this.el.getElementsByClassName('Weeks-scrollerWrapper')[0];
    // this.scrollerElement = this.el.getElementsByClassName('Weeks-scroller')[0];
    // this.scrollerListElement = this.el.getElementsByClassName('Weeks-scrollerList')[0];
    // this.cardElements = this.el.getElementsByClassName('Weeks-cardWrapper');

    // const listWidth = (this._scrollItemWidth * this.numberOfWeeks);
    // this.scrollerListElement.style.width = `${listWidth}px`;
    // this.scrollerElement.scrollLeft = 0;
    // this.scrollerWrapperElement.classList.add('isVisible');

    // this.setSeasonClass();
    this.init();
    this._bindEvents();
  }

  _bindEvents () {
    // this.onScroll = this.onScroll.bind(this);
    // this.onScrollEnd = this.onScrollEnd.bind(this);
    // this.onDayClick = this.onDayClick.bind(this);
    // this.scrollerElement.addEventListener('scroll', this.onScroll);
    // this.scrollerListElement.addEventListener('click', this.onDayClick, false);

    // window.onresize = debounce(this._onWindowResize.bind(this), 500);
  }

  init () {
    var centered;
    var width = this.width;
    var height = this.height;
    var scale = this.scale;
    var mapData = this.mapData;

    var projection = d3.geoAlbersUsa()
      .scale(scale)
      .translate([
        width / 2,
        height / 2
      ]);

    var path = d3.geoPath()
      .projection(projection);

    var svg = d3.select('#States-mapData').append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height)
      .on('click', clicked);

    var g = svg.append('g');

    if (!mapData) {
      throw new Error('Could not find map data');
    }

    g.append('g')
      .attr('id', 'states')
      .selectAll('path')
        .data(topojson.feature(mapData, mapData.objects.states).features)
      .enter().append('path')
        .attr('d', path)
        .on('click', clicked);

    g.append('path')
      .datum(topojson.mesh(mapData, mapData.objects.states, (a, b) => {
        return a !== b;
      }))
      .attr('id', 'state-borders')
      .attr('d', path);

    let stateSelected;
    let statesBySlug = this._statesBySlug;

    function selectState (slug) {
      stateSelected = slug;
      if (slug) {
        console.log('Selected state "%s"', slug);
      } else {
        console.log('Selected state (unknown)"');
      }
      return statesBySlug[slug];
    }

    function clicked (d) {
      var x;
      var y;
      var k;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }

      g.selectAll('path')
        .classed('active', centered && function (d) {
          const isActive = d === centered;
          if (isActive) {
            console.log('Selected state "%s"', d.id);
            if (d.id === 6) {
              selectState('ca');
            } else if (d.id === 4) {
              selectState('az');
            } else if (d.id === 17) {
              selectState('il');
            } else if (d.id === 48) {
              selectState('tx');
            } else if (d.id === 4) {
              selectState('az');
            } else if (d.id === 4) {
              selectState('az');
            } else if (d.id === 4) {
              selectState('az');
            } else {
              selectState(null);
            }
          } else {
          }
          return isActive;
        });
        // .classed('active', d => {
        //   if (isActive(d)) {
        //     console.log('active', d);
        //   } else {
        //     console.log('NOT active', d);
        //   }
        // });

      g.transition()
        .duration(750)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ') ' +
                           'scale(' + k + ') ' +
                           'translate(' + -x + ',' + -y + ')')
        .style('stroke-width', (1.5 / k) + 'px');
    }
  }

  onDayClick (e) {
    // if (e.target.tagName.toLowerCase() === 'span' && Array.from) {
    //   const parentElement = e.target.parentElement
    //   const newWeekIndex = Array.from(this.scrollerListElement.children).indexOf(parentElement)
    //   const scrollX = this.scrollerElement.scrollLeft
    //   const destination = newWeekIndex * this._scrollItemWidth
    //   animateScrollX(this.scrollerElement, scrollX, destination, 300, 'easeInOutQuad')
    // }
  }

  /**
   * Destroy.
   */
  destroy () {
    // this.scrollerElement.removeEventListener('scroll', this.onScroll);
  }
}

export default States;
