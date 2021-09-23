import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
import * as $ from 'jquery';


export default class Service {
  constructor(private context: WebPartContext) { }


  public makeRequest(listName: string): Promise<string> {

    let wsURL = this.context.pageContext.web.absoluteUrl + "/_vti_bin/Lists.asmx";
    var xmlCall = `
                        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                          <soap:Body>
                            <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                              <listName>${listName}</listName>
                              <query>
                                <Query>
                                  <Where>
                                    <DateRangesOverlap>
                                      <FieldRef Name="EventDate" />
                                      <FieldRef Name="EndDate" />
                                      <FieldRef Name="RecurrenceID" />
                                      <Value Type="DateTime"><Year/></Value>
                                    </DateRangesOverlap>
                                  </Where>
                                </Query>
                              </query>
                              <queryOptions>
                                <QueryOptions>
                                  <ExpandRecurrence>TRUE</ExpandRecurrence>
                                </QueryOptions>
                              </queryOptions>
                            </GetListItems>
                          </soap:Body>
                        </soap:Envelope>
        `;

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', "text/xml; charset=\"utf-8\"");
    const httpClientOptions: IHttpClientOptions = {
      body: xmlCall,
      headers: requestHeaders
    };

    console.log("About to make REST API request.");

    return this.context.httpClient.post(
      wsURL,
      SPHttpClient.configurations.v1,
      httpClientOptions)
      .then(data => {
        var result: any[];
        if (data.status == 200) {
          return data.text(); //returning the XML text of the response
        }
        else {
          return "";
        }
      });
  }

 

  public getCalendarEvents(listGuid: string) {
    var result = [];
    //'5192cfe8-3a37-4545-8783-5c39f12f89ff'
    return this.makeRequest(listGuid)
      .then((data) => {

        //console.log('Output data is ', data);
        let root = $(data);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");

        let allNodes = xmlDoc.getElementsByTagName("listitems")[0].children[0].children;
        for (let i = 0; i < allNodes.length; i++) {
          //console.log($(allNodes[i]));
          let $this = $(allNodes[i]);
          var ids = $this.attr("ows_UniqueId").split(";");
          var rec = $this.attr("ows_fRecurrence");
          //console.log('Start: ', $this.attr("ows_EndDate").replace(/ /g,"T"));
          result.push({
            start: $this.attr("ows_EventDate"),//.replace(/ /g,"T"),
            end: $this.attr("ows_EndDate"),//.replace(/ /g,"T"),
            title: $this.attr("ows_Title"),
            description: $this.attr("ows_Description"),
            allDay: $this.attr("ows_fAllDayEvent") == "0" ? false : true,
            guid: ids[1],
            id: ids[0],
            extendedProps: {
               category: $this.attr("ows_Category"),
               Recurrence: (rec === "1" ? true : false),
             },
            color: '#fff',
            backgroundColor: '#ff0000'
          });
        }
        return result;
      }, error => result);
  }
}