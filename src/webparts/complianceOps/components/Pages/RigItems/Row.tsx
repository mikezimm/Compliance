
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem, } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export interface IRigItemSource extends IAnySourceItem {
  ItemId: string; // This is added when it is fetched so it can be processed easier.
  ItemName: string;
  ItemType: string;
  ItemDescription: string;
  FunctionCode: string;
  FunctionName: string;
  CategoryCode: string;

  CategoryName: string;
  RecordCode: string;
  RecordTitle: string;
  Classification: string;
  GlobalDataPrivacy: string;
  Status: string;
  PrivacyReviewedFlag: string;
  GlobalStorageLocation: string;

  RecordIdx?: number; // The index of the parent Label Item
}

//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

const ClassifyChoices = [ 'Public', 'Internal', 'Confidential', 'Secret', ];
const ClassifyIcons = [ 'Unlock', 'Lock', 'Lock', 'LockSolid', ];
const ClassifyColors = [ 'lightblue', 'green', 'orange', 'red', ];

const PrivacyChoices = [ 'Non-Personal', 'Personal Data', 'Sensitive Personal Data' ];
const PrivacyIcons = [ 'Unlock', 'Lock', 'AuthenticatorApp', ];
const PrivacyColors = [ 'dimgray', 'darkgreen', 'purple', ];


export function createRigItemsRow0( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick
  const { ItemName, ItemType, RecordCode, Classification, GlobalDataPrivacy, Status } = item;

  // const thisItem: IRigItemSource = item as IRigItemSource;

  const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );
  
  const row = <div className={ [ styles.genericItem, styles.genericItem0 ].join( ' ' ) } onClick = { null }>
    <div title={ ItemType } >{ getHighlightedText( ItemName, searchText ) }</div>
    {/* <div title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }</div> */}
    <div title={ null } >{ getHighlightedText( RecordCode, searchText ) }</div>
    {/* <div title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</div> */}
    <div>{ getHighlightedText( Classification, searchText ) }
      {/* <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/> */}
    </div>
    <div>{ getHighlightedText( GlobalDataPrivacy, searchText ) }
      {/* <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/> */}
    </div>
    <div title={ item.ItemId } >{ getHighlightedText( Status, searchText ) }</div>
  </div>;

  return row;

}

export function createRigItemsRow1( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick
  const { Classification, GlobalDataPrivacy } = item;

  // const thisItem: IRigItemSource = item as IRigItemSource;

  const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );
  
  const row = <div className={ [ styles.genericItem, styles.genericItem2 ].join( ' ' ) } onClick = { null }>

    <div title={ item.ItemType } >{ getHighlightedText( item.ItemName, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }</div>
    <div title={ item.RecordTitle } >{ getHighlightedText( item.RecordCode, searchText ) }</div>
    {/* <div title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</div> */}
    <div>
      <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/>
    </div>
    <div>
      <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/>
    </div>
    <div title={ item.ItemId } >{ getHighlightedText( item.Status, searchText ) }</div>
  </div>;

  return row;

}


export function createRigItemsRow2( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick
  const { Classification, GlobalDataPrivacy } = item;

  // const thisItem: IRigItemSource = item as IRigItemSource;

  const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );
  
  const row = <div className={ [ styles.genericItem, styles.genericItem1 ].join( ' ' ) } onClick = { null }>
    <div title={ item.ItemType } >{ getHighlightedText( item.ItemName, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.RecordCode, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</div>
    <div>
      <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/>
    </div>
    <div>
      <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/>
    </div>
    <div title={ item.ItemId } >{ getHighlightedText( item.Status, searchText ) }</div>
  </div>;

  return row;

}