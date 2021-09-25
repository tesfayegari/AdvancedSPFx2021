import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyCalendarProps {
  description: string;
  context: WebPartContext;
  calendarCollection: any[];
}
