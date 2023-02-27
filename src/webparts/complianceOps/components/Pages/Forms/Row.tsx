
import * as React from 'react';
import styles from './Row.module.scss';

import { check4Gulp, getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
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
  const { item, onClick, searchText } = props; // details, showItemType, onOpenPanel

  const thisItem: IThisFormInterface = item as IThisFormInterface;

  const goToLink: string = check4Gulp() === true ? thisItem.ServerRedirectedEmbedUrl : thisItem.FileRef;
  
  const row = <div className={ styles.genericItem } onClick = { () => onClick( thisItem.ID, 'generic', item ) }>
    <div title={ null } >{ thisItem.ID }</div>
    <div title={ null } >{ getHighlightedText( thisItem.Status, searchText ) }</div>
    <div title={ `${thisItem.FileRef}`} onClick={ () => window.open( goToLink, '_blank' )}
      style={{ cursor: 'pointer' }}>{ getHighlightedText( thisItem.FileLeafRef, searchText )  }</div>
  </div>;

  return row;

}