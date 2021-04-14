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
    this.fetchData = this.fetchData.bind(this);
    this.state = {pricesFetched: false, fudMode: true, items: []};
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2021-04-12")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              pricesFetched: true,
              items: this.convert(result['bpi'])
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

  fudconverter = () => {
    alert('button pressed')
    this.setState(prevState => ({
      fudMode: !prevState.fudMode
    }));
  };


  render() {
    const VictoryCursorVoronoiContainer = createContainer("cursor", "voronoi");

    let display;
    if (this.state.pricesFetched && this.state.fudMode) {
      let data = this.state.items
      display = 
      <div>
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
      </div>;
    } else if (this.state.pricesFetched && !this.state.fudMode) {
      let data = this.state.items
      display = 
      <div>
        <VictoryChart theme={VictoryTheme.material} 
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
      </div>;
    } else {
      display = 
      <p>FETCHING DATA</p>
    }
    return (

      <div>
        <button onClick={this.fudconverter}></button>
        {display}
      </div>
    );
  }
}

export default App;
