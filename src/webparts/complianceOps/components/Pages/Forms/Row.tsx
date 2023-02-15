
import * as React from 'react';
import styles from './Row.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';
// import { buildClickableIcon } from '@mikezimm/fps-library-v2/lib/components/atoms/Icons/stdIconsBuildersV02';

export interface IThisFormInterface extends IAnySourceItem {
  ID: number;
  Status: string;
  FileRef: string;
  FileLeafRef: string;
  ServerRedirectedEmbedUrl: string;
  OData__UIVersionString: string;
}

export function createFormRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, onClick, } = props; // details, showItemType, onOpenPanel

  const thisItem: IThisFormInterface = item as IThisFormInterface;

  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    <div title={ null } >{ thisItem.ID }</div>
    <div title={ null } >{ getHighlightedText( thisItem.Status, props.searchText ) }</div>
    <div title={ `${thisItem.FileRef}`} onClick={ () => window.open( thisItem.ServerRedirectedEmbedUrl, '_blank' )}>{ getHighlightedText( thisItem.FileLeafRef, props.searchText )  }</div>
  </div>;

  return row;

}