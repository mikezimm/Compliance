
import * as React from 'react';
import styles from './Row.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { getHighlightedText, IAnySourceItem, } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { Label_Detail_Page_PROD } from '../../../storedSecrets/CorpAPIs';

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

  const row = <tr className={ styles.genericItem } onClick = { null }>
    <td>{ createItemIcon( item as ICorpLabelsSource, styles.rigItemOpenIcon0 ) }</td>
    <td title={ null } className={ styles.noWrap }>{ getHighlightedText( item.RecordCode, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( item.Description, searchText ) }</td>
    {/* <div title={ null } >{ getHighlightedText( item[ 'Name/Title' ], searchText ) }</div> */}
  </tr>;

  return row;

}


export function createItemIcon( item: ICorpLabelsSource, className: string ): JSX.Element {

  const itemId = item.ItemId ? item.ItemId : 'UPDATECODE';
  const ItemLink = `${Label_Detail_Page_PROD}${ itemId }`;
  const ItemIcon = <Icon title={`Open item ${ itemId } in RIG Database`} onClick={ () => { window.open( ItemLink, `_blank` )}} iconName='OpenInNewWindow' />;

  return <td className={ className }>{ ItemIcon }</td>;
}