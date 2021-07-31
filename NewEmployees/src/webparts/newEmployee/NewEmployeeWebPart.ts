import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
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
  viewType: string;
}

export default class NewEmployeeWebPart extends BaseClientSideWebPart<INewEmployeeWebPartProps> {

  public render(): void {    
    //injecting bootstrap css 
    let bootstrap4Url = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    SPComponentLoader.loadCss(bootstrap4Url);
    //end of bootstrap injection
    const  webUrl = this.context.pageContext.web.absoluteUrl;
    console.log('Your Site Url is ', webUrl);
    const empListApiUrl = `${webUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items?$top=${this.properties.maxItems}`;

    this.getSPData(empListApiUrl).then(response => {
      
      console.log('Reading SharePoint Data Successfully ', response);
      let items = response.value;
      console.log(`We have ${items.length} items responded. `, items);
      //render the Dom element
      this.domElement.innerHTML = `
                <h2>${this.properties.description} </h2>
                ${this.renderRowHtml(items)}   
                        `;
    }, error => console.error('Oops error occured', error));
         
  }

  private getSPData(apiUrl: string) {
     return this.context.spHttpClient
      .get(apiUrl, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      });
  }

  private renderRowHtml(rows){
    let rowsHtml = '';
    for(let item of rows){
      rowsHtml += this.renderColHtml(item);
    }

    return `<div class="row">
              ${this.properties.viewType=="Grid"? rowsHtml :this.renderTableHtml()}
            </div> `;
  }

  private renderColHtml(item){
    let web = this.context.pageContext.web.absoluteUrl;
    return `<div class="col-sm-4 mb-2">
              <div class="card">
                <img class="card-img-top" src="${item.Photo?item.Photo:'https://randomuser.me/api/portraits/men/50.jpg'}" alt="Card image"
                  style="width:100%">
                <div class="card-body">
                  <h4 style="font-size: 1em;" class="card-title">${item.Title}</h4>
                  <p class="card-text">Phone: ${item.Phone?item.Phone:'No Phone'}</p>
                  <p class="card-text">${item.Bio?item.Bio.substring(0, 60):'No Bio'}...</p>
                  <a href="${web}/Lists/Employees/DispForm.aspx?ID=${item.Id}" target="_blank" class="btn btn-primary">Read more ... </a>
                </div>
              </div>
            </div>`;
  }

  private renderTableHtml(){
    return `<table class="table">
              <thead class="thead-dark">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>                 
                  <td>john@example.com</td>
                  <td>444-543-5544</td>
                </tr>
                <tr>
                  <td>Mary Moe</td>                  
                  <td>mary@example.com</td>
                  <td>444-543-5544</td>
                </tr>
                <tr>
                  <td>July Dooley</td>                  
                  <td>july@example.com</td>
                  <td>445-369-2587</td>
                </tr>
              </tbody>
            </table>`;
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
                }),
                PropertyPaneDropdown('viewType', {
                  label: 'Select Your View',
                  options: [
                    {key: 'Table', text: 'Table'},
                    {key: 'Grid', text: 'Grid'}]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
