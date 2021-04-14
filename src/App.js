import React, { Component } from 'react';
import './App.css';
import {VictoryChart} from 'victory';
import {VictoryArea} from 'victory';
import {VictoryTheme} from 'victory';
import {createContainer} from 'victory';

class App extends Component {
  constructor(props) {
    super(props);
    this.convert = this.convert.bind(this);
    this.state = {pricesFetched: false, items: []};
  }

  componentDidMount() {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2021-04-12")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pricesFetched: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              pricesFetched: true,
              error
            });
          }
        )
  }

  convert(obj) {
    
    return Object.keys(obj).map(key => ({
        x: key,
        y: obj[key]
    }));
  }


  render() {
    let data;
    if (this.state.pricesFetched) {
      data = this.convert(this.state.items['bpi'])
    } else {
      data=[
        { x: 1, y: 2},
        { x: 2, y: 3},
        { x: 3, y: 5},
        { x: 4, y: 4},
        { x: 5, y: 6}
      ];
    }
    const VictoryCursorVoronoiContainer = createContainer("cursor", "voronoi");
    return (
      <VictoryChart theme={VictoryTheme.grayscale} 
        containerComponent={
          <VictoryCursorVoronoiContainer
            labels={({ datum }) => `${datum.x}, ${datum.y}`}
            events={{onClick: (evt) => alert("x: " + evt.clientX)}}
            flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
          />
        }>
        <VictoryArea
          style={{ data: { fill: "#c43a31" } }}
          data={data}
        />
      </VictoryChart>
    );
  }
}

export default App;
