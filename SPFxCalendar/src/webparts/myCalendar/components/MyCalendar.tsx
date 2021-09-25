import * as React from 'react';
import styles from './MyCalendar.module.scss';
import { IMyCalendarProps } from './IMyCalendarProps';

import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/react'
import Service from '../services/services';
import { ColorClassNames } from '@uifabric/styling';

export interface IMyCalendarState {
  events: EventInput[];
  currentEvents: EventInput[];
}

export default class MyCalendar extends React.Component<IMyCalendarProps, IMyCalendarState> {

  constructor(props: IMyCalendarProps) {
    super(props);
    this.state = { events: [], currentEvents: [] };
  }

  componentDidMount() {
    //temporary code to test the Webservice call
    let srvc = new Service(this.props.context);

    console.log('collection of Calendars', this.props.calendarCollection);
    this.setState({ events: [], currentEvents: [] })
    for (let cal of this.props.calendarCollection) {
      console.log("Calendar ", cal);
      srvc.getCalendarEvents(cal.calGUID, cal.siteUrl, cal.textColor, cal.backgroundColor)
        .then(evts => {
          console.log('Data from Calendar List', evts);
          this.setState({ events: [...this.state.events,...evts]});
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
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    window.open('https://google.com');
  }

  // handleEvents = (events: EventApi[]) => {
  //   this.setState({
  //     currentEvents: events
  //   })
  // }

  public render(): React.ReactElement<IMyCalendarProps> {
    //let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
    // const INITIAL_EVENTS:  EventInput[] = this.state.events.length >0 ? this.state.events :  [
    //   {
    //     id: this.createEventId(),
    //     title: 'All-day event',
    //     start: todayStr,
    //     color:"#ff0000"
    //   },
    //   {
    //     id: this.createEventId(),
    //     title: 'Timed event',
    //     start: todayStr + 'T12:00:00',
    //   },{
    //     id: '3', 
    //     title: 'Demo Event',
    //     start: '2021-09-22T06:00:00'
    //   }
    // ]
    return (
      <div className={styles.myCalendar}>
        <h2>{this.props.description}</h2>
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
          events={this.state.events}
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
      </div>
    );
  }
}

const renderEventContent = (eventContent: EventContentArg) => {
  console.log(eventContent);
  return (
    <div style={{ color: eventContent.textColor, backgroundColor: eventContent.backgroundColor }}>
      <b>{eventContent.timeText} </b>
      <i>{eventContent.event.title}</i>
    </div>
  )
}
