import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient } from "@microsoft/sp-http";


export interface INewEmployeeWebPartProps {
  description: string;
  listName: string;
  maxItems: number;
}

export default class NewEmployeeWebPart extends BaseClientSideWebPart<INewEmployeeWebPartProps> {

  public render(): void {    
    const  webUrl = this.context.pageContext.web.absoluteUrl;
    console.log('Your Site Url is ', webUrl);
    const empListApiUrl = `${webUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items?$top=${this.properties.maxItems}`;

    this.getSPData(empListApiUrl).then(response => {
      
      console.log('Reading SharePoint Data Successfully ', response);
      let items = response.value;
      console.log(`We have ${items.length} items responded. `, items)
    
    }, error => console.error('Oops error occured', error));
    
   let bootstrap4Url = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
   SPComponentLoader.loadCss(bootstrap4Url);

    this.domElement.innerHTML = `
    <h2>${this.properties.description} </h2>
    ${this.renderRowHtml(null)}   
                        `;
  }

  private getSPData(apiUrl: string) {
     return this.context.spHttpClient
      .get(apiUrl, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json()
      });
  }

  private renderRowHtml(rows){
    return `<div class="row">
              <div class="col">
                <div class="card">
                  <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image"
                    style="width:100%">
                  <div class="card-body">
                    <h4 class="card-title">John Doe</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                    <a href="#" class="btn btn-primary">Read more ... </a>
                  </div>
                </div>
              </div>     
            </div> `;
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
            description: 'Webpart Settings'
          },
          groups: [
            {
              groupName: 'General Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Title',
                  placeholder: 'Type your list title..'
                }),
                PropertyPaneSlider('maxItems', {
                  label: 'Number of Employee', 
                  min: 1,
                  max: 25,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
