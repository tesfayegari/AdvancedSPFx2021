import * as React from 'react';
import { IMyCalendarProps } from './IMyCalendarProps';
require("./CalStyle.css");

import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/react'
import Service from '../services/services';
import { NewEventForm } from './NewEvent';


export interface IMyCalendarState {
  events: EventInput[];
  currentEvents: EventInput[];
  showForm: boolean;
}

export default class MyCalendar extends React.Component<IMyCalendarProps, IMyCalendarState> {

  constructor(props: IMyCalendarProps) {
    super(props);
    this.state = { events: [], currentEvents: [], showForm: false };
  }

  componentDidMount() {
    //temporary code to test the Webservice call
    let srvc = new Service(this.props.context);

    //Testign CRUD Operation   
    // srvc.createItem('EmployeeOffTime').then(data=>console.log('Item created successfully',data), error=>console.error('Oops error occured', error))
    //End of Test

    console.log('collection of Calendars', this.props.calendarCollection);
    this.setState({ events: [], currentEvents: [] })
    for (let cal of this.props.calendarCollection) {
      console.log("Calendar ", cal);
      srvc.getCalendarEvents(cal.calGUID, cal.siteUrl, cal.textColor, cal.backgroundColor)
        .then(evts => {
          console.log('Data from Calendar List', evts);
          this.setState({ events: [...this.state.events, ...evts], currentEvents: [...this.state.events, ...evts] });
        });
    }


    // srvc.getCalendarEvents('281B14DB-D179-47EB-96B0-6632D93AC737')
    //   .then(evts => {
    //     console.log('Data from Calendar List', evts);
    //     this.setState({ events: evts, currentEvents: evts });
    //   });
    //end of the code 
  }

  eventGuid = 0;
  createEventId() {
    return String(this.eventGuid++)
  }


  handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log('Creating an event');
    this.setState({showForm: true});
    //return 
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: this.createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    window.open('https://google.com');
  }

  handleFilter = (listGuid) => {
    //TODO
    console.log('Handling Calendar Event Filters', listGuid);
    if(listGuid == "All"){
      this.setState({currentEvents: this.state.events});
    }else{
      let filteredEvents = [];
      for(let e of this.state.events){
        if(e.listGuid == listGuid){
          filteredEvents.push(e);
        }
      }
      this.setState({currentEvents: filteredEvents});
    }
  }

  // handleEvents = (events: EventApi[]) => {
  //   this.setState({
  //     currentEvents: events
  //   })
  // }

  public render(): React.ReactElement<IMyCalendarProps> {
    console.log('State of the My Calendar', this.state);
    return (
      <div className="demo-app">
        {renderSidebar(this.props.calendarCollection, this.handleFilter)}
        <div className="demo-app-main">
          <h2 className="text-center">{this.props.description}</h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}//{this.state.weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            events={this.state.currentEvents}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
          //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */

          />
          <NewEventForm showForm={this.state.showForm} description="This seems good"></NewEventForm>
        </div>
      </div>
    );
  }
}

const renderEventContent = (eventContent: EventContentArg) => {
  //console.log(eventContent);
  return (
    <div style={{ color: eventContent.textColor, backgroundColor: eventContent.backgroundColor }}>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title.substring(0, 9) + (eventContent.event.title.length > 9 ? '..' : '')}</i>
    </div>
  )
}

const renderSidebar = (collection, handleFilter) => {
  console.log('Props in renderSidebar', collection);
  return (
    <div className='demo-app-sidebar'>
      <div className="sidebar-header">
        <b>Legends</b>
      </div>
      <div className="sidebar-calendars">
        <ul className="list-group">
          <li className="list-group-item list-group-item-action"
            style={{ backgroundColor: "#c55303", color: "#fff" }}
            onClick={() => handleFilter("All")}>
            All Events
          </li>
          {collection.map(
            item => <li
              style={{ backgroundColor: item.backgroundColor, color: item.textColor }} className="list-group-item list-group-item-action"
              onClick={() => handleFilter(item.calGUID)}>
              {item.calName}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
