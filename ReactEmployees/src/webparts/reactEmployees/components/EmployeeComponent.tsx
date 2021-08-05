import * as React from 'react';

export default class EmployeeComponent extends React.Component<any, any>{

  public render() {
    return <div className="card-body">
      <h1>Hello {this.props.name}!! </h1>
    </div>
  }
}

let Alert = (props) => (
  <div>
    <h1>Attention Alert!!</h1>
    <p>{props.message}</p>
  </div>
)

let Emp1 = (props) => (
  <div className="card-body">
    <h1>Hello {props.name}!! </h1>
  </div>
)

export { Alert, Emp1 };