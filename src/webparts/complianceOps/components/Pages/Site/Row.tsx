
import * as React from 'react';

import styles from './Row.module.scss';
import stylesSP from '../SourcePages/SourcePages.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { SourceIconElement } from '../SourcePages/IconElement';
import { SearchTypesCOP } from '../../DataInterface';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';

import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

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

export function createItemRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick, details, showItemType, onParentCall, onOpenPanel } = props;

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  //export const EnforcementColumns: string[] = [ 'ID', 'Title', 'URL', 'Subsite', 'NoRecordsDeclared', 'DocumentsHosted', 'JSONLists' ];

    // const jsonElement: any = !thisItem.JSONLists ? '---' : getHighlightedText( `${ thisItem.JSONLists }`, searchText );

    const webLink: string = thisItem.Subsite;
    const { ListUrl, ListSettings } = item;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const title: any = <div title={webLink} onClick = { () => { window.open( webLink, '_blank' )} } style={{cursor: 'pointer' }} >
        { getHighlightedText( `${ webLink.replace('/sites', '' ) }`, searchText )  }</div>;

    // const URL: any = getHighlightedText( `${ webLink }`, searchText ) ; // eslint-disable-line dot-notation 
    const libraries: any = <div title="Libraries" onClick = { () => { window.open( ListUrl, '_blank' )} } style={{cursor: 'pointer' }} >
        {  getHighlightedText( `${ thisItem.NoRecordsDeclared }`, searchText )  }</div>;  // 

    const folderIcon = buildClickableIcon( 'PivotTiles' , 'Folder', 'Go to Library', null, () => { window.open( ListUrl ,'_blank')}, item.ListId, item.ListId, )
    const settingsIcon = buildClickableIcon( 'PivotTiles' , 'Tag', 'Apply Label to Library - OWNER ACCESS REQUIRED', 'red', () => { window.open( ListSettings ,'_blank')}, item.ListId, item.ListId, )
    const detailsIcon = buildClickableIcon( 'PivotTiles' , 'ProcessingRun', 'Run live analysis', null, () => { onParentCall( 'Test from below',0, '', item ) }, item.ListId, item.ListId, )

    /* eslint-disable @typescript-eslint/no-explicit-any */
    // const descElement: JSX.Element = <div className={ details === true ? stylesSP.showDetails : stylesSP.textEllipse }>
    //   { jsonElement }
    // </div>;

    const row = <div className={ styles.genericItem } onClick = { () => onClick( item.ID, 'generic', item ) }>

        {/* { SourceIconElement( SearchTypesCOP.objs[item.typeIdx].icon, showItemType && item.File_x0020_Type ? item.File_x0020_Type : showItemType && item.type ? item.type : '' )} */}
        {/* <div className={ styles.genericDetails}> */}
          {/* <div className={ styles.genericRow1 }> */}
              { title }
              {/* { URL } */}
              { thisItem.DocumentsHosted }
              { folderIcon }
              { settingsIcon }
              { detailsIcon }
              { libraries }
          {/* </div> */}
          {/* { descElement } */}
        {/* </div> */}
    </div>;

    return row;

}