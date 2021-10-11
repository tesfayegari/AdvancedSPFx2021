import * as React from 'react';
//import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Panel, PanelType } from "office-ui-fabric-react";

export interface INewEventPrps {
  description: string;
  showForm: boolean;
}
export interface INewEventState {
  isOpen: boolean;
}

export class NewEventForm extends React.Component<INewEventPrps, INewEventState> {
  constructor(props: INewEventPrps) {
    super(props);
    this.state = { isOpen: true };
  }

  componentDidUpdate(prevProps) {
    if(this.props.showForm != prevProps.showForm)   
    {
      this.setState({isOpen: this.props.showForm})      
    }
  } 

  dismissPanel = () => this.setState({ isOpen: false })

  componentDidMount(){
    this.setState({isOpen: this.props.showForm});
  }
  public render() {
    const { description } = this.props;
    const a = 'aeiou'.indexOf(description[0]) === -1 ? 'a' : 'an'; // grammar...
    return (
      <div>
        <Panel
          isOpen={this.state.isOpen}
          onDismiss={this.dismissPanel}
          type={PanelType.medium}
          closeButtonAriaLabel="Close"
          headerText="New Event"
        >
          <p>
            This is {a} <strong>{this.props.description}</strong> panel Medium     .
          </p>
          <p>
            Select this size using <code>{`type={PanelType.${PanelType}}`}</code>.
          </p>
        </Panel>
      </div>
    );
  }
}


