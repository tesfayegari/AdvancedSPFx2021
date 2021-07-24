import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


export interface IDemo1WebPartProps {
  description: string;
  fullName: string;
}

export default class Demo1WebPart extends BaseClientSideWebPart<IDemo1WebPartProps> {

  public render(): void { 
    this.domElement.innerHTML = `
                            <h1>This is a text too</h1>
                            <div class="class1>${this.properties.fullName}</div>
                            `;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Webpart Properties'
          },
          groups: [
            {
              groupName: 'General Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneTextField('fullName', {
                  label: 'Type Your Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
