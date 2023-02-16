
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export const FolderIcon : string = 'Folder';
export const TagIcon : string = 'Tag';
export const ProcessingRunIcon : string = 'ProcessingRun';

export interface IThisItemInterface extends IAnySourceItem {
  ID: number;
  Title: string;
  URL: string;
  Subsite: string;
  NoRecordsDeclared: string;
  DocumentsHosted: number;
  JSONLists: string;
  ListUrl: string;
  ListId: string;
  ListSettings: string;
}

export function createSiteRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick, onParentCall,  } = props; // details, showItemType, onOpenPanel

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  const webLink: string = thisItem.Subsite;
  const { ListUrl, ListSettings } = item;

  const id: JSX.Element = <div>{ thisItem.ID }</div>;

  const title: JSX.Element = <div title={webLink} onClick = { () => { window.open( webLink, '_blank' )} } style={{cursor: 'pointer' }} >
      { getHighlightedText( `${ webLink.replace('/sites', '' ) }`, searchText )  }</div>;

  const libraries: JSX.Element = <div title="Libraries" onClick = { () => { window.open( ListUrl, '_blank' )} } style={{cursor: 'pointer' }} >
      {  getHighlightedText( `${ thisItem.NoRecordsDeclared }`, searchText )  }</div>;  // 

  const folderIcon = buildClickableIcon( 'PivotTiles' , FolderIcon, 'Go to Library', null, () => { window.open( ListUrl ,'_blank')}, thisItem.ListId, thisItem.ListId, )
  const settingsIcon = buildClickableIcon( 'PivotTiles' , TagIcon, 'Apply Label to Library - OWNER ACCESS REQUIRED', 'red', () => { window.open( ListSettings ,'_blank')}, thisItem.ListId, thisItem.ListId, )
  const detailsIcon = buildClickableIcon( 'PivotTiles' , ProcessingRunIcon, 'Run live analysis', null, () => { onParentCall( 'Test from below',0, '', item ) }, thisItem.ListId, thisItem.ListId, )

  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    { id }
    { title }
    { thisItem.DocumentsHosted }
    { folderIcon }
    { settingsIcon }
    { detailsIcon }
    { libraries }
  </div>;

  return row;

}