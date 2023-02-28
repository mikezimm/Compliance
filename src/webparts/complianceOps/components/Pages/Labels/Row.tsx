
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem, } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';

// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export interface ICorpLabelsSource extends IAnySourceItem {
  Title: string; // This is added when it is fetched so it can be processed easier.
  Country: string;
  RecordCode: string;
  RecordTitle: string;
  Description: string;
  CT_Group: string;
  Published: string;
  TargetPath: string;
  RetentionType: string;
  RetentionNumber: string;
  RetentionUnit: string;
  RetentionTrigger: string;
  RecordFunction: string;
  RecordCategory: string;
  ModifiedDate: string;
  Status: string;
  FunctionCode: string;
  CategoryCode: string;
  Items?: number[]; // Optional Item Id Lookups
  ItemNames?: string[];
  ItemNamesStr?: string;
}


// {
//   "Country": "",
//   "RecordCode": "FAC-20",
//   "RecordTitle": "Security Plans, Vulnerability Assessments and Compliance Reporting",
//   "Description": "Records documenting security plans and vulnerability assessments for chemical and other facilities including, for example, facility security plans and assessments, vessel security plans and assessments, compliance reporting and top screens.  ",
//   "CT_Group": "_ALV Facilities, Equipment and Fleet - FAC-2 Physical Security",
//   "Published": "No",
//   "TargetPath": "",
//   "RetentionType": "Fixed",
//   "RetentionNumber": "10",
//   "RetentionUnit": "Years",
//   "RetentionTrigger": "Creation",
//   "RecordFunction": "Facilities, Equipment and Fleet",
//   "RecordCategory": "FAC-2 Physical Security",
//   "ModifiedDate": "2021-11-18T15:06:50Z",
//   "Status": "Active",
//   "FunctionCode": "",
//   "CategoryCode": ""
// },


//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

export function createLabelsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick, 

  // const thisItem: ICorpLabelsSource = item as ICorpLabelsSource;

  const row = <div className={ styles.genericItem } onClick = { null }>
    <div title={ null } >{ getHighlightedText( item.RecordCode, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.Description, searchText ) }</div>
    {/* <div title={ null } >{ getHighlightedText( item[ 'Name/Title' ], searchText ) }</div> */}
  </div>;

  return row;

}