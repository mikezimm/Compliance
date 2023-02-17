
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export interface IThisItemInterface extends IAnySourceItem {
  ID: number;
  Title: string;
  'Name/Title': string;
}

//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

export function createInstructionsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick,  } = props; // details, showItemType, onOpenPanel , onParentCall, 

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    <div title={ null } >{ thisItem.ID }</div>
    <div title={ null } >{ getHighlightedText( thisItem.Title, searchText ) }</div>
    <div title={ null } >{ getHighlightedText( thisItem[ 'Name/Title' ], searchText ) }</div>
  </div>;

  return row;

}