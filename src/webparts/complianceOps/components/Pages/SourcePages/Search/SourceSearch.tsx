import * as React from 'react';
import styles from './SourceSearch.module.scss';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import PageArrows from '@mikezimm/fps-library-v2/lib/components/molecules/Arrows/PageArrows';

// const defaultMaxVisible: number = 20;

export interface ISourceSearchHookProps {
  searchText: string;
  searchTime: number;

  _onSearchChange( event?: React.ChangeEvent<HTMLInputElement>, NewSearch?: string  ): void;  // Callback for search box updates
  _updateFirstLastVisible( firstVisible: number, lastVisible: number ) : void;  // Callback for search box updates

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetArrows: any;  // Callback for resetting arrows
  
  itemsPerPage: number;
  debugMode: boolean;
  itemCount: number;


}

const SourceSearchHook: React.FC<ISourceSearchHookProps> = ( props ) => {

  const { searchText, searchTime, _onSearchChange, _updateFirstLastVisible, debugMode, resetArrows, itemsPerPage, itemCount } = props;

  const pageArrows = <PageArrows 
    itemCount={ itemCount }
    itemsPerPage={ itemsPerPage }
    setParentStateFirstLast={ _updateFirstLastVisible.bind(this) }
    debugMode = { debugMode }
    fontSize = { 20 }
    resetArrows = { resetArrows }
  />;

  /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
  const searchBox =  
  <div className={ [styles.searchContainer ].join(' ') } >
    <SearchBox
      className={styles.searchBox}
      styles={ { root: { maxWidth:250 } } }
      placeholder="Search"
      value={ searchText }
      onSearch={ _onSearchChange }
      onFocus={ () => console.log('onFocus called', ) }
      onBlur={ () => console.log('onBlur called') }
      onChange={ _onSearchChange }
      onClear={ _onSearchChange }
    />
    <div className={styles.searchStatus}>
      { 'Searching ' + itemCount + ' items' }
      { searchTime === null ? '' : ' ~ Time ' + searchTime + ' ms' }
      { /* 'Searching ' + (searchType !== 'all' ? filteredTiles.length : ' all' ) + ' items' */ }
    </div>
    { pageArrows }
  </div>;

  return ( searchBox );

}

export default SourceSearchHook;