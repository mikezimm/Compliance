
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { buildClickableIcon, buildAppWarnIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export const OrgIcon : string = 'Org';
export const FolderIcon : string = 'Folder';
export const TagIcon : string = 'Tag';
export const ProcessingRunIcon : string = 'ProcessingRun';

export interface IThisItemInterface extends IAnySourceItem {
  ID: number;
  Title: string;
  URL: string;
  // 'SubTitle', 'SPOwner'
  Subsite: string;
  SubTitle: string;
  SPOwner: string;
  NoRecordsDeclared: string;
  DocumentsHosted: number;
  JSONLists: string;
  ListUrl: string;
  ListId: string;
  ListSettings: string;
}

export function createSiteRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick, onParentCall, } = props; // details, showItemType, onOpenPanel

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  const { Title, ListUrl, ListSettings, SubTitle, SPOwner, Subsite, URL  } = item;

  const webLink: string = Subsite ? Subsite : URL ? URL : 'No URL in list';
  const showLink: string = webLink.replace( window.location.origin, '' ).replace('/sites', '' );
  const webTitle: string = SubTitle ? SubTitle: Title ? Title : 'No Title in list';

  const OwnerName = SPOwner ? SPOwner.split('@')[0] : 'Unknown';

  const id: JSX.Element = <div>{ thisItem.ID }</div>;

  const title: JSX.Element = <div title={webTitle} onClick = { () => { window.open( webLink, '_blank' )} } style={{cursor: 'pointer' }} >
      { getHighlightedText( `${ showLink }`, searchText )  }</div>;

  const libraries: JSX.Element = <div title="Libraries" onClick = { () => { window.open( ListUrl, '_blank' )} } style={{cursor: 'pointer' }} >
      {  getHighlightedText( `${ thisItem.NoRecordsDeclared }`, searchText )  }</div>;  // 

  const owner: JSX.Element = <div title="Site Owner">
      {  getHighlightedText( `${ OwnerName }`, searchText )  }</div>;  // 

  const subIcon = !Subsite ? <div /> : buildAppWarnIcon( 'PivotTiles' , OrgIcon, 'Is SubSite', null );
  const folderIcon = buildClickableIcon( 'PivotTiles' , FolderIcon, 'Go to Library', null, () => { window.open( ListUrl ,'_blank')}, thisItem.ListId, thisItem.ListId, )
  const settingsIcon = buildClickableIcon( 'PivotTiles' , TagIcon, 'Apply Label to Library - OWNER ACCESS REQUIRED', 'red', () => { window.open( ListSettings ,'_blank')}, thisItem.ListId, thisItem.ListId, )
  const detailsIcon = buildClickableIcon( 'PivotTiles' , ProcessingRunIcon, 'Run live analysis', null, () => { onParentCall( 'Test from below',0, '', item ) }, thisItem.ListId, thisItem.ListId, )

  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    { id }
    { subIcon }
    { title }
    { owner }
    { thisItem.DocumentsHosted }
    { folderIcon }
    { settingsIcon }
    { detailsIcon }
    { libraries }

  </div>;

  return row;

}