import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import { SPComponentLoader } from "@microsoft/sp-loader";

import MyCalendar from './components/MyCalendar';
import { IMyCalendarProps } from './components/IMyCalendarProps';

// import { Pane } from "@microsoft/office-ui-fabric-react";


export interface IMyCalendarWebPartProps {
  description: string;
  collectionData: any[];
}

export default class MyCalendarWebPart extends BaseClientSideWebPart<IMyCalendarWebPartProps> {

  public render(): void {    
    //console.log('Calendar Collection is ', this.properties.collectionData)
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
    const element: React.ReactElement<IMyCalendarProps> = React.createElement(
      MyCalendar,
      {
        description: this.properties.description, 
        context: this.context, 
        calendarCollection: this.properties.collectionData ? this.properties.collectionData:[]
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "General Settings"
          },
          groups: [
            {
              groupName: "Calendar Settings",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Webpart Title"
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Calendars Collection",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage Calendars Collection",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "calName",
                      title: "Calendar Name",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "siteUrl",
                      title: "Site Url",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "calGUID",
                      title: "GUID of Calendar",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "backgroundColor",
                      title: "Background Color",
                      type: CustomCollectionFieldType.color,                      
                      required: true
                    },
                    {
                      id: "textColor",
                      title: "Text Color",
                      type: CustomCollectionFieldType.color,                      
                      required: true
                    }
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
