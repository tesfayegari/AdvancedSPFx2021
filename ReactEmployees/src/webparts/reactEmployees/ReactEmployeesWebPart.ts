import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldColumnPicker';

import * as strings from 'ReactEmployeesWebPartStrings';
import ReactEmployees from './components/ReactEmployees';
import { IReactEmployeesProps } from './components/IReactEmployeesProps';

export interface IReactEmployeesWebPartProps {
  description: string;
  lists: string; // Stores the list ID
  multiColumn: string;
}
enum IColumnReturnProperty{
  Id = 0,
  Title = 1,
  "Internal Name" = "InternalName"
}



export default class ReactEmployeesWebPart extends BaseClientSideWebPart<IReactEmployeesWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" );
    console.log('Value of the properties are: ', this.properties);
    const element: React.ReactElement<IReactEmployeesProps> = React.createElement(
      ReactEmployees,
      {
        description: this.properties.description,
        listId: this.properties.lists,
        context: this.context, 
        columns: this.properties.multiColumn
      }
    );
      
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),                
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  // multiSelect: true,
                  // baseTemplate: 101, //Libraries only
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyFieldColumnPicker('multiColumn', {
                  label: 'Select columns',
                  context: this.context as any,
                  selectedColumn: this.properties.multiColumn,
                  listId: this.properties.lists,
                  disabled: false,
                  orderBy: PropertyFieldColumnPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiColumnPickerFieldId',
                  displayHiddenColumns: false,
                  columnReturnProperty: IColumnReturnProperty['Internal Name'],

                  multiSelect: true
              })
              ]
            }
          ]
        }
      ]
    };
  }
}
