import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../../../IComplianceOpsProps';

import styles from './header.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../bubbles';

export interface IMapPageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
}

const MapPageHook: React.FC<IMapPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, } = props; //appLinks, news 

  const [ teachBubble, setTeachBubble ] = useState<number>( null );
  const [ lastBubble, setLastBubble ] = useState<number>( 0 );

  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );

  const closeTour = ( ): void => {
    const saveBubble = teachBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( null );
  }

  const updateTour = ( newBubble: number ): void => {
    const saveBubble = newBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( saveBubble );
  }

  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'Maps' ), updateTour, closeTour );

  const MapPageElement: JSX.Element = mainPivotKey !== 'Maps' ? null : <div className = { styles.page } style={ null }>
    <div style={{ marginRight: '50px' }}>This shows records maps on LifeNET.</div>
    {/* <div id={ 'ComplSiteStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    { TeachMe }
  </div>;

  return ( MapPageElement );

}

export default MapPageHook;