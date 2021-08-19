import * as React from 'react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

// import EmployeeComponent, { Alert, Emp1 } from './EmployeeComponent';
import { IReactEmployeesProps } from './IReactEmployeesProps';
import { RegistrationComponent, RenderItems } from './RegistrationComponent';
import SPService from '../service/SPService';
// import { composeComponentAs } from '@fluentui/react';

interface IReactEmployeesState{
  items: any[];
}

export default class ReactEmployees extends React.Component<IReactEmployeesProps,IReactEmployeesState> {

  // items: any[];
  columns: string[];

  constructor(props: IReactEmployeesProps){
    super(props);
    // this.items = [{first_name: 'Tesfaye', Title: 'Gari', email: 'tesfaye@email', department: 'IT'}];
    this.columns = this.props.columns;//['First Name','Last Name','Email','Department'];
    this.state = {items:[{first_name: 'Tesfaye', Title: 'Gari', email: 'tesfaye@email', department: 'IT'}] };
    //this.readItems();
  }
  private buttonClicked = (param) => {
    console.log('You clicked me handled from parent');
    console.log('The parameter value is ', param);
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
  
  private readItems =  () => {
    let service = new SPService(this.props.context);
    let webUrl = this.props.context.pageContext.web.absoluteUrl;    
    if (this.props.listId) {
      const url = `${webUrl}/_api/web/lists(guid'${this.props.listId}')/items?$top=20`;
      service.getSPData(url).then(
        data => {
          console.log('Items are', data.value);
          // this.items = data.value;
          this.setState({items: data.value});
        },
        error => console.error('Oops error ', error)
      );
    }
  }

  componentDidMount() {
    this.readItems();
  }

  componentDidUpdate(prevProps:IReactEmployeesProps, prevState: IReactEmployeesState ) {
    if(this.props.listId !== prevProps.listId){
        this.readItems(); 
    }
      
  }

  public render(): React.ReactElement<IReactEmployeesProps> {
    //handleSubmit={this.buttonClicked}

    // let cmp = this.props.listId
    //   ? <RegistrationComponent handleSubmit={this.buttonClicked}></RegistrationComponent>
    //   : <Placeholder iconName='Edit'
    //     iconText='Configure your web part'
    //     description='Please configure the web part.'
    //     buttonLabel='Configure'
    //     onConfigure={this._onConfigure} />;

    return (
      <div className="Class1">
        {this.props.listId
          ? <RenderItems
            items={this.state.items}
            columns={this.props.columns}
            count={100}
          ></RenderItems>
          : <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure} />}
      </div>
    );
  }
}
