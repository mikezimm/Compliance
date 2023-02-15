

import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';
import stylesSP from './SourcePages.module.scss';
import { IAnySourceItem } from '../../../fpsReferences';

export function SourceIconElement( iconName: string, typeLabel: string, onClick?: any, item?: IAnySourceItem , labelSide: 'left' | 'right' = 'left' ) : JSX.Element {

  const ele : JSX.Element = <div className={ stylesSP.itemIcon } title={ typeLabel } onClick = { () => onClick( item.ID, 'appLinks', item ) }>
    { typeLabel && labelSide === 'left' ? <div style={{ marginRight: '10px', fontSize: '14px', width: '55px', }}><span style={{ float: 'right' }} >{ typeLabel }</span></div> : undefined }
    <Icon iconName={ iconName }/>
    { typeLabel && labelSide === 'right' ? <span style={{ marginLeft: '10px', fontSize: '14px', width: '55px'  }}>{ typeLabel }</span> : undefined }
  </div>

  return ele;

}


