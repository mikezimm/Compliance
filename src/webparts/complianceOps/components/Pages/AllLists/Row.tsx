
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, } from '../../../fpsReferences'; //, IAnySourceItem
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
import { IItemsProp, SourceProperty } from './Header';

// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

// word: string;
// searchTextLC: string;
// count: number;
// sum: number;
// avg?: number;
// index?: number;

//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

// export function createAllListsRowSiteX( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
//   const { item, searchText, onClick,  } = props; // details, showItemType, onOpenPanel, onParentCall, 

//   // const thisItem: IRigItemSource = item as IRigItemSource;

//   const row = <div className={ styles.genericItem } onClick = { null }>
//     <div title={ null } >{ item.index }</div>
//     <div title={ null } >{ getHighlightedText( item.word, searchText ) }</div>
//     <div title={ null } >{ item.count }</div>
//     <div title={ null } >{ item.sum }</div>
//   </div>;

//   return row;

// }

export function createRowSite( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'URL', false );
  return row;
}

export function createRowSiteX( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'URL', true );
  return row;
}

export function createRowSub( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'Subsite', false );
  return row;
}

export function createRowSubX( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'Subsite', true );
  return row;
}

export function createRowLib( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'NoRecordsDeclared', false );
  return row;
}

export function createRowLibX( props: ISourceRowRender, ): JSX.Element {
  const row = createAllListsRow( props, 'NoRecordsDeclared', true );
  return row;
}


export function createAllListsRow( props: ISourceRowRender, propKey: IItemsProp , splitWords: boolean ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText,  } = props; // details, showItemType, onOpenPanel, onParentCall, onClick

  let label = item.word;
  if ( propKey === 'URL' ) { 
    label = label.replace( `${window.location.origin}/sites`, ``)
  } else if ( propKey === 'Subsite' ) {
    label = label.replace( `/sites`, ``);
  }

  const row = <tr className={ [ styles.genericItem ].join( ' ' ) } onClick = { null }>
    <td title={ null } >{ getHighlightedText( label, searchText ) }</td>
    <td title={ null } style={{ whiteSpace: 'nowrap', padding: '0px 10px 0px 30px' }} >{ item.sum }</td>
    <td title={ null } style={{ whiteSpace: 'nowrap', textAlign: 'center' }} >{ item.count }</td>
    <td title={ null } style={{ whiteSpace: 'nowrap', textAlign: 'center' }} >{ ( item.avg ).toFixed( 0 ) }</td>
  </tr>;

  return row;

}