import * as React from 'react';
import { Panel, PanelType } from "office-ui-fabric-react";

export interface INewEventPrps {
  description?: string;
  showForm?: boolean;
  handleClose: () => void;
  handleSave: (event)=>void;
}
export interface INewEventState {
  isOpen: boolean;
  Event: any;
  validForm: boolean;
}

export class NewEventForm extends React.Component<INewEventPrps, INewEventState> {
  constructor(props: INewEventPrps) {
    super(props);
    this.state = { isOpen: false, Event: {}, validForm: false };
  }

  componentDidUpdate(prevProps: INewEventPrps) {
    if (this.props.showForm != prevProps.showForm) {
      console.log('New Event Component did update');
      this.setState({ isOpen: this.props.showForm })
    }
  }

  //dismissPanel = () => {this.props.handleClose();

  // componentDidMount() {
  //   console.log('New Event Component did Mount');
  //   this.setState({ isOpen: this.props.showForm });
  // }
  handleChange = (event)=>{
    console.log('Title : ', event.target.value);
    let ev = this.state.Event;
    ev[event.target.name] = event.target.value;
    console.log('New Event Object', ev);
    let valid = this.validate();
    console.log('Form Validation : ',valid)
    this.setState({validForm: valid})
  }

  validate(){    
    if(!this.state.Event.Title)  return false; 
    if(!this.state.Event.EventDate)   return false;
    //if(!this.state.Event.EndDate) return false;
    
    return true;
  }

  handleSave=(e)=>{
    e.preventDefault();
    this.props.handleSave(this.state.Event);
  }

  public render() {
    const { description } = this.props;
    const a = 'aeiou'.indexOf(description[0]) === -1 ? 'a' : 'an'; // grammar...
    return (
      <div>
        <Panel
          isOpen={this.state.isOpen}
          onDismiss={(ev) => this.props.handleClose()}
          type={PanelType.medium}
          closeButtonAriaLabel="Close"
          headerText="New Event"
        >
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input name="Title" type="text" className="form-control" placeholder="Event Title" value={this.state.Event.Title} 
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="EventDate">Event Start Date</label>
            <input name="EventDate" type="datetime-local" className="form-control"  value={this.state.Event.EventDate} onChange={this.handleChange} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="EndDate">Event End Date</label>
            <input name="EndDate" type="datetime-local" className="form-control"  value={this.state.Event.EndDate}  onChange={this.handleChange}/>
          </div> */}
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea name="Description" cols={6} className="form-control"  value={this.state.Event.Description}  onChange={this.handleChange}/>
          </div>
          <button disabled={!this.state.validForm} onClick={this.handleSave} type="submit" className="btn btn-primary">Save</button>
        </Panel>
      </div>
    );
  }
}


