
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, } from '../../../fpsReferences'; //, IAnySourceItem
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';

// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

// export interface IRigItemSource extends IAnySourceItem {
//   ItemId: number; // This is added when it is fetched so it can be processed easier.
//   ItemName: string;
//   ItemType: string;
//   ItemDescription: string;
//   FunctionCode: string;
//   FunctionName: string;
//   CategoryCode: string;

//   CategoryName: string;
//   RecordCode: string;
//   RecordTitle: string;
//   Classification: string;
//   GlobalDataPrivacy: string;
//   Status: string;
//   PrivacyReviewedFlag: string;
//   GlobalStorageLocation: string;
// }

//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

export function createAllListsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick,  } = props; // details, showItemType, onOpenPanel, onParentCall, 

  // const thisItem: IRigItemSource = item as IRigItemSource;

  const row = <div className={ styles.genericItem } onClick = { null }>
    <div title={ null } >{ getHighlightedText( item.RecordCode, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.Description, searchText ) }</div>
    {/* <div title={ null } >{ getHighlightedText( item[ 'Name/Title' ], searchText ) }</div> */}
  </div>;

  return row;

}