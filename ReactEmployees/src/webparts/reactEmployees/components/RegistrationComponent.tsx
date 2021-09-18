import * as React from 'react';

export interface IRegistrationComponentProps {
  handleSubmit: (param) => void;
}

export interface IRegistrationComponentState {
  email: string;
  password: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  gridCheck: boolean;
}


export class RegistrationComponent extends React.Component<IRegistrationComponentProps, IRegistrationComponentState | any> {

  constructor(props: IRegistrationComponentProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      address: '',
      address2: '',
      city: '',
      gridCheck: false,
      state: 'Choose...',
      zip: ''
    };
    console.log('CONSTRUCTOR OF THE REGISTRATION COPMPONENT CALLED');
  }

  componentDidUpdate() {
    console.log('COMPONENT DID Update METHOD OF THE REGISTRATION COPMPONENT CALLED');
  }

  handleEmailChange = (e) => {
    console.log('Handling email change', e.target.value, e.target.name);
    // this.state.email = e.target.value; //Not the right way and it is error
    this.setState({ email: e.target.value });
  }
  handlePasswordChange = (e) => {
    console.log('Handling Password change', e.target.value, e.target.name);
    this.setState({ password: e.target.value });
    // this.setState({[e.target.name]:e.target.value});
  }

  handleChange = (e) => {
    console.log('Handling Form change', e.target.value, e.target.name);
    if (e.target.type == "checkbox") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    // this.setState({ [e.target.name]: e.target.value } as  Pick<IRegistrationComponentState, keyof IRegistrationComponentState>);
  }
  submitHandle = () => {
    console.log('This is a submit handle for button click');
    this.props.handleSubmit(this.state);
  }
  public render() {
    console.log('RENDER METHOD OF THE REGISTRATION COPMPONENT CALLED');

    return (
      <div>
        <h2>Registration Form</h2>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control" name="email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input value={this.state.password} onChange={this.handleChange} type="password" className="form-control" name="password" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input value={this.state.address} onChange={this.handleChange} type="text" className="form-control" name="address" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="address2">Address 2</label>
          <input value={this.state.address2} onChange={this.handleChange} type="text" className="form-control" name="address2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="city">City</label>
            <input value={this.state.city} onChange={this.handleChange} type="text" className="form-control" name="city" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <select value={this.state.state} onChange={this.handleChange} name="state" className="form-control">
              <option>Choose...</option>
              <option>MD</option>
              <option>DC</option>
              <option>VA</option>
              <option>GA</option>
              <option>NY</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="zip">Zip</label>
            <input value={this.state.zip} onChange={this.handleChange} type="text" className="form-control" name="zip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" checked={this.state.gridCheck} onChange={this.handleChange} type="checkbox" name="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Fill More Details
            </label>
          </div>
        </div>
        {this.state.gridCheck && <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Details</label>
            <input type="email" className="form-control" name="email1" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">More Details</label>
            <input type="text" className="form-control" name="password1" />
          </div>
        </div>}

        <button type="submit" onClick={this.submitHandle} className="btn btn-primary">Sign in</button>
      </div>
    );
  }
}

interface IRenderItemsProps {
  items: any[];
  count: number;
  columns: string[];
  searchItems: (query)=>void;
  enableNext: boolean;
  enablePrev: boolean;
  NextPage: ()=>void;
}

export const RenderItems = (props: IRenderItemsProps) => {
  let header = props.columns.map(column => <th scope="col">{column}</th>);
  let rows = [];
  for (let row of props.items) {
    let cells = [];
    for (let c of props.columns) {
      cells.push(<td>{row[`${c}`]}</td>)
    }
    rows.push(
      <tr>
        {cells}
      </tr>)
  }
  return (
    <>
      <SearchItems searchItems={props.searchItems}></SearchItems>
      <table className="table">
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <Pagination prevEnabled={props.enablePrev} nextEnabled={props.enableNext} NextPage={props.NextPage}></Pagination>
    </>
  );
}

export interface ISearchItemsState {
  searchQuery: string;
}
export interface ISearchItemsProps {
  searchItems: (query)=>void;
}

class SearchItems extends React.Component<ISearchItemsProps, ISearchItemsState> {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' }
  }

  queryOnChange = (e) => {
    console.log(e.target.value);
    this.setState({ searchQuery: e.target.value });
  }

  searchClicked = ()=> {
    console.log('The value of search is', this.state.searchQuery);
    this.props.searchItems(this.state.searchQuery);
  }

  public render() {
    return (
      <div className="input-group mb-3">
        <input
          type="search"
          value={this.state.searchQuery}
          onChange={(e) => this.queryOnChange(e)}
          className="form-control"
          placeholder="Search ... " />
        <div className="input-group-append">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={this.searchClicked}
          >Search</button>
        </div>
      </div>
    );
  }

}

export interface IPaginationProps {
  nextEnabled: boolean;
  prevEnabled: boolean;
  NextPage: ()=>void;
}
export interface IPaginationstate {

}
class Pagination extends React.Component<IPaginationProps, IPaginationstate> {

  constructor(props: IPaginationProps){
    super(props);
  }

  public render() {
    return (
      <nav >
        <ul className="pagination justify-content-center">
          <li className={`page-item ${this.props.prevEnabled? '' : 'disabled'}`}>
            <a className="page-link" href="#" >Previous</a>
          </li>
          <li className="page-item"><span>Page - 1</span></li>

          <li className={`page-item ${this.props.nextEnabled? '' : 'disabled'}`}>
            <a className="page-link" href="#" onClick={this.props.NextPage}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }

}