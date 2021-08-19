import * as React from 'react';
import { MyAlert } from './AlertComponent';

export interface IEmployeeComponentProps {
  name: string;
  description: string;
  listName: string;
}

export default class EmployeeComponent extends React.Component<IEmployeeComponentProps, any>{

  public render() {
    return <div className="card-body">
      <h1>Hello {this.props.name}!! </h1>
      <h1>Desc: {this.props.description}!! </h1>
      <h1>List Name: {this.props.listName}!! </h1>
      <div>
        Full Name : <input type="text" />
      </div>
      <div>
        Email: <input type="text" />
      </div>
      <div><button>Submit</button></div>
    </div>

  }
}

let Alert = (props) => (
  <div>
    <h1>Attention Alert!!</h1>
    <p>{props.message}</p>
    <div>
      Full Name : <input type="text" />
    </div>
    <div>
      Email: <input type="text" />
    </div>
    <div><button>Submit</button></div>
  </div>

)

let Emp1 = (props) => (
  <div className="card-body">
    <h1>Hello {props.name}!! </h1>
    <MyAlert alertName="Tesfaye's Alert"></MyAlert>
  </div>
)

export { Alert, Emp1 };