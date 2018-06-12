import React, { Component } from 'react';

class GridDemo extends Component{
  render(){
    return (
      <div>
    <div className="demo-grid-ruler mdl-grid">
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
      <div className="mdl-cell mdl-cell--1-col">1</div>
    </div>
    <div className="demo-grid-2 mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">6</div>
      <div className="mdl-cell mdl-cell--4-col">4</div>
      <div className="mdl-cell mdl-cell--2-col">2</div>
    </div>
    <div className="demo-grid-3 mdl-grid">
      <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">6 (8 tablet)</div>
      <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet">4 (6 tablet)</div>
      <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone">2 (4 phone)</div>
    </div>
      </div>
    )
  }
}

export default GridDemo ;