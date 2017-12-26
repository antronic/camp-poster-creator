import React, { Component } from 'react';


function listSteps(steps = []) {
  return steps.map(step => <step.component/>);
}

const Stepper = ({ steps }) => (
  <div>
    {listSteps(steps)}
  </div>
);

export default Stepper;
