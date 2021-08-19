import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactEmployeesProps {
  description: string;
  listId: string;
  context: WebPartContext;
  columns: any;
}
