
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem, } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ITEM_Detail_Page_PROD } from '../../../storedSecrets/CorpAPIs';

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
  Facilities?: string[];
  Countries?: string[];
  FacilitiesStr?: string;
  CountriesStr?: string;
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
  const { ItemName, ItemType, RecordCode, Classification, GlobalDataPrivacy, Status, } = item as IRigItemSource;

  // const thisItem: IRigItemSource = item as IRigItemSource;

  // const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  // const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );


  const row = <tr className={ [ styles.genericItem ].join( ' ' ) } onClick = { null }>
    <td>{ createItemIcon( item as IRigItemSource, styles.rigItemOpenIcon0 ) }</td>
    <td title={ ItemType } onClick={ () => { console.log( `createRigItemsRow0:`, item )}}>{ getHighlightedText( ItemName, searchText ) }</td>
    {/* <td title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }</td> */}
    <td title={ null } style={{ whiteSpace: 'nowrap' }} >{ getHighlightedText( RecordCode, searchText ) }</td>
    {/* <td title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</td> */}
    <td style={{textAlign: 'center' }}>{ getHighlightedText( Classification, searchText ) }
      {/* <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/> */}
    </td>
    <td style={{textAlign: 'center' }}>{ getHighlightedText( GlobalDataPrivacy, searchText ) }
      {/* <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/> */}
    </td>
    <td title={ item.ItemId }  style={{textAlign: 'center' }}>{ getHighlightedText( Status, searchText ) }</td>
  </tr>;

  return row;

}

export function createRigItemsRow1( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick
  const { Classification, GlobalDataPrivacy, } = item as IRigItemSource;


  const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );
  const row = <tr className={ [ styles.genericItem ].join( ' ' ) } onClick = { null }>
    <td>{ createItemIcon( item as IRigItemSource, styles.rigItemOpenIcon12 ) }</td>
    <td title={ item.ItemType }  onClick={ () => { console.log( `createRigItemsRow1:`, item )}}>{ getHighlightedText( item.ItemName, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }{ createFacilityCountryLabel( item ) }</td>
    <td title={ item.RecordTitle } style={{ whiteSpace: 'nowrap' }} >{ getHighlightedText( item.RecordCode, searchText ) }</td>
    {/* <td title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</td> */}
    <td style={{textAlign: 'center' }}>
      <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/>
    </td>
    <td style={{textAlign: 'center' }}>
      <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/>
    </td>
    <td title={ item.ItemId } style={{textAlign: 'center' }} >{ getHighlightedText( item.Status, searchText ) }</td>
  </tr>;

  return row;

}


export function createRigItemsRow2( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick
  const { Classification, GlobalDataPrivacy, } = item;

  const ClassificationIdx = ClassifyChoices.indexOf( Classification );
  const PrivacyIdx = PrivacyChoices.indexOf( GlobalDataPrivacy );

  const row = <tr className={ [ styles.genericItem ].join( ' ' ) } onClick = { null }>
    <td>{ createItemIcon( item as IRigItemSource, styles.rigItemOpenIcon12 ) }</td>
    <td title={ item.ItemType }  onClick={ () => { console.log( `createRigItemsRow2:`, item )}}>{ getHighlightedText( item.ItemName, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( item.ItemDescription, searchText ) }{ createFacilityCountryLabel( item ) }</td>
    <td style={{ whiteSpace: 'nowrap' }} >{ getHighlightedText( item.RecordCode, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( item.RecordTitle, searchText ) }</td>
    <td style={{textAlign: 'center' }}>
      <Icon iconName = { ClassifyIcons[ ClassificationIdx ] } style={{ color: ClassifyColors[ ClassificationIdx ] }} title={ Classification }/>
    </td>
    <td style={{textAlign: 'center' }}>
      <Icon iconName = { PrivacyIcons[ PrivacyIdx ] } style={{ color: PrivacyColors[ PrivacyIdx ] }} title = { GlobalDataPrivacy }/>
    </td>
    <td title={ item.ItemId } style={{textAlign: 'center' }} >{ getHighlightedText( item.Status, searchText ) }</td>
  </tr>;

  return row;

}

export function createItemIcon( item: IRigItemSource, className: string ): JSX.Element {

  const itemId = item.ItemId ? item.ItemId : 'UPDATECODE';
  const ItemLink = `${ITEM_Detail_Page_PROD}${itemId}`;
  const ItemIcon = <Icon title={`Open item ${itemId} in RIG Database`} onClick={ () => { window.open( ItemLink, `_blank` )}} iconName='OpenInNewWindow' />;

  return <td className={ className }>{ ItemIcon }</td>;
}

export function createFacilityCountryLabel( item: IAnySourceItem ): JSX.Element {
  const { Facilities, Countries, } = item;
  const facilities = Facilities.length > 0 ? <span className={ styles.rigItemFacilityNote } title={ Facilities.join('; ') }>&nbsp;&nbsp;&nbsp;{`Facilities: ${Facilities.length }`}</span> : ``;
  const countries = Countries.length > 0 ? <span className={ styles.rigItemCountryNote } title={ Countries.join('; ') }>&nbsp;&nbsp;&nbsp;{`Countries: ${Countries.length }`}</span> : ``;
  const result = <span>{ facilities }{ countries }</span>;
  return result;

}