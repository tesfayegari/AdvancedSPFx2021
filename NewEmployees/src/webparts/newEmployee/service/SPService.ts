import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export default class SPService {
  constructor(private context: WebPartContext) { }

  public getSPData(apiUrl: string) {
    return this.context.spHttpClient
      .get(apiUrl, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      });
  }

  public createSPListItem(data, listName: string){
    
  }
}

