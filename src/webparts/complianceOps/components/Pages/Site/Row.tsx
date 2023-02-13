
import * as React from 'react';

import styles from './Row.module.scss';
import stylesSP from '../SourcePages/SourcePages.module.scss';

import { getHighlightedText, IAnySourceItem } from '../../../fpsReferences';
import { SourceIconElement } from '../SourcePages/IconElement';
import { SearchTypesCOP } from '../../DataInterface';
import { ISourceRowRender } from '../SourcePages/ISourceRowRender';

export interface IThisItemInterface extends IAnySourceItem {
  ID: number;
  Title: string;
  URL: string;
  Subsite: string;
  NoRecordsDeclared: string;
  DocumentsHosted: number;
  JSONLists: string;
}

export function createItemRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, searchText, onClick, details, showItemType } = props;

  const thisItem: IThisItemInterface = item as IThisItemInterface;

  //export const EnforcementColumns: string[] = [ 'ID', 'Title', 'URL', 'Subsite', 'NoRecordsDeclared', 'DocumentsHosted', 'JSONLists' ];

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const title: any = <div title="Site TItle">{ getHighlightedText( `${ thisItem.Title }`, searchText )  }</div>;
    const URL: any = getHighlightedText( `${ thisItem.URL }`, searchText ) ; // eslint-disable-line dot-notation 
    const libraries: any = <div title="Libraries">{  getHighlightedText( `${ thisItem.NoRecordsDeclared }`, searchText )  }</div>;  // 
    const jsonElement: any = !thisItem.JSONLists ? '---' : getHighlightedText( `${ thisItem.JSONLists }`, searchText );

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const descElement: JSX.Element = <div className={ details === true ? stylesSP.showDetails : stylesSP.textEllipse }>
      { jsonElement }
    </div>;

    const row = <div className={ styles.genericItem } style={{cursor: 'pointer' }} onClick = { () => onClick( item.ID, 'generic', item ) }>

        {/* { SourceIconElement( SearchTypesCOP.objs[item.typeIdx].icon, showItemType && item.File_x0020_Type ? item.File_x0020_Type : showItemType && item.type ? item.type : '' )} */}
        <div className={ styles.genericDetails}>
          <div className={ styles.genericRow1 }>
              { title }
              { URL }
              { thisItem.DocumentsHosted }
              { libraries }
          </div>
          { descElement }
        </div>
    </div>;

    return row;

}