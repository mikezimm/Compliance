
import * as React from 'react';
import styles from './Row.module.scss';

import { IAnySourceItem } from '../../../fpsReferences'; //getHighlightedText, 
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export interface IThisItemInterface extends IAnySourceItem {
  ID: number;
  Tip: string;
  // 'Name/Title': string;
}

//export const CoordinatorColumns: string[] = [ 'ID','Facility', 'Division', 'Name/Title', 'AlternateContact/Title', 'Datelastverified', 'MapComplete' ];

export function createTipsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item,onClick, } = props; // details, showItemType, onOpenPanel // searchText, onParentCall,  

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    <div dangerouslySetInnerHTML={{__html: thisItem.Tip}} />
  </div>;

  return row;

}