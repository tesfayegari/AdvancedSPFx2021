import * as React from 'react';
import EmployeeComponent, { Alert, Emp1 } from './EmployeeComponent';
import { IReactEmployeesProps } from './IReactEmployeesProps';


export default class ReactEmployees extends React.Component<IReactEmployeesProps, {}> {
 
  public render(): React.ReactElement<IReactEmployeesProps> {
    return (
     <div className="Class1">
       <h2>{this.props.description}</h2>
       <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" width="500" height="333" />       
       <h1>I am a parent Component </h1>
       <EmployeeComponent name="Ermiase"></EmployeeComponent>
       <EmployeeComponent name="Tesfaye"></EmployeeComponent>
       <Alert message="This is a test message"></Alert>
       <Emp1 name="Sitina Mulat"></Emp1>
     </div>
    );
  }
}
