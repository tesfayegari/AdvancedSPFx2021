import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'NewEmployeeWebPartStrings';

export interface INewEmployeeWebPartProps {
  description: string;
}

export default class NewEmployeeWebPart extends BaseClientSideWebPart<INewEmployeeWebPartProps> {

  public render(): void {

   let bootstrap4Url = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
   SPComponentLoader.loadCss(bootstrap4Url);

    this.domElement.innerHTML = `
                      <div class="jumbotron mt-2">
                        <h1>SPFx Advanced Tutorial</h1>
                        <p>We are having fun coding.</p>
                      </div>
                    <div class="card">
                      <div class="card-body">Basic card</div>
                    </div>
                    <br>
                    <div class="card bg-primary text-white">
                      <div class="card-body">Primary card</div>
                    </div>
                    <br>
                    <div class="card bg-success text-white">
                      <div class="card-body">Success card</div>
                    </div>
                    <br>
                    <div class="card bg-info text-white">
                      <div class="card-body">Info card</div>
                    </div>
                    <br>
                    <div class="card bg-warning text-white">
                      <div class="card-body">Warning card</div>
                    </div>
                    <br>
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
