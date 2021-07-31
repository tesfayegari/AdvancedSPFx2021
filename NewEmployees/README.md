# new-employees

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## SharePoint REST API endpoints

Web Information 
YourSite/_api/web

All lists 
site/_api/web/lists

Select specific properties of lists, use oData $select=Prop1,Prop2,...

site/_api/web/lists?$select=Title,ItemCount,Hidden

Filtering oData Show only non hidden lists 
use oData called $filter=expression
example 
$filter=Hidden eq false

Get Specific List  
1. By its guid 
Exmple 
/_api/Web/Lists(guid'4b46f02e-f41f-408d-8f01-19de6dac4ef6')
2. By its Title 
Example
/_api/Web/Lists/getbytitle('Customers')

Get items in a list 
example
/_api/Web/Lists/getbytitle('ListTitle')/items
/_api/Web/Lists(guid'4b46f02e-f41f-408d-8f01-19de6dac4ef6')/items

Lookup columns and people or group needs to be expanded to see the value 
use odata $expand
Example Created by Column is expanded as shown
/_api/Web/Lists(guid'4b46f02e-f41f-408d-8f01-19de6dac4ef6')/items?$select=Title,last_name,Author/Title,Author/ID,Author/EMail&$expand=Author

One item by id 
example 
/_api/Web/Lists(guid'4b46f02e-f41f-408d-8f01-19de6dac4ef6')/items(4)