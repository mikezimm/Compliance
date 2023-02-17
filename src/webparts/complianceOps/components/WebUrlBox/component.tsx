


import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../IComplianceOpsProps';
// import { Icon  } from 'office-ui-fabric-react/lib/Icon';

// import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import { getSiteInfo } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/getSiteInfo';
import { IFpsGetSiteReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/IFpsGetSiteReturn';
import styles from './webInput.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
// import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
// import { AllTeachBubbles } from '../Teaching/bubbles';

export const WebUrlIsValidMessage: string = `Site is valid`;

export interface IWebUrlProps {
  showInput: boolean;
  inputLabel?: string;
  textInput: string;
  updateInputCallback( url: string, targetStatus: string ) : void;
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
}

const WebUrlHook: React.FC<IWebUrlProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, showInput, textInput, updateInputCallback,  } = props; //appLinks, news 

  // const [ currentUrl, setCurrentUrl ] = useState<string>( textInput );
  const [ webURLStatus, setWebURLStatus ] = useState<string>( 'Untested' );
  const [ validUrl, setValidUrl ] = useState<string>( '' );

  // const [ lastBubble, setLastBubble ] = useState<number>( 0 );

  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );

  // const closeTour = ( ): void => {
  //   const saveBubble = teachBubble + 0;
  //   setLastBubble( saveBubble );
  //   setTeachBubble( null );
  // }

  const delayOnWebUrlChange = (input: any): void => {
    const NewValue = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

    setTimeout(async () => {

      if ( validUrl !== NewValue ) {
        const siteInfo: IFpsGetSiteReturn = await getSiteInfo( NewValue, false, true, );
        if ( siteInfo.status === 'Success' ) {
          setValidUrl( NewValue );
          updateInputCallback( NewValue, siteInfo.status );
          setWebURLStatus( WebUrlIsValidMessage );
        } else {
          setValidUrl( '' );
          setWebURLStatus( siteInfo.errorInfo.friendly );
        }
      }
    }, 1000);
    // }

  }

  useEffect(() => {
    delayOnWebUrlChange( textInput )
  }, [ ] );  // Only trigger on first load

  // const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
  //   <ul>
  //     <li>These are NOT google maps {`:)`}</li>
  //     <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'red', fontWeight: 600 }}>Terri to provide further description here</li>
  //   </ul>
  // </div>

  // const InfoElement: JSX.Element = <Accordion 
  //   title = { 'More information about this tab'}
  //   defaultIcon = 'Help'
  //   showAccordion = { true }
  //   content = { MainContent }
  //   contentStyles = { { height: '100px' } }
  // />;

  const InputLabel : string = props.inputLabel ? props.inputLabel : `WebURL`;

  const WebUrlElement: JSX.Element = showInput !== true ? null : 
  <div style={{ display: 'inline-table', paddingBottom: '20px', paddingTop: '20px', width: '100%', background: 'lightgray' }}>
    <span style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: 'larger', fontWeight: 600, whiteSpace: 'nowrap' }}>{ InputLabel }</span>
    <TextField
      className={ styles.textField }
      styles={ { fieldGroup: [ { width: '75%', maxWidth: '700px' }, { borderColor: 'lightgray', }, ] } } //this.getReportingStyles
      defaultValue={ textInput }
      label={ null }
      autoComplete='off'
      // onChange={ this._onWebUrlChange.bind(this) }
      onChange={ delayOnWebUrlChange.bind(this) }
      onGetErrorMessage= { (value: string | Date) : string => { return "";} }
      validateOnFocusIn
      validateOnFocusOut
      multiline= { false }
      autoAdjustHeight= { true }
      // onKeyDown={(ev)=> { this.onWebUrlKeyDown( ev ) ; } }

    />{ 
      <span style={{ color: webURLStatus === WebUrlIsValidMessage ? 'green' : 'red', whiteSpace: 'nowrap', marginRight: '40px', fontSize: 'larger', fontWeight: 'bolder' }}>
         { webURLStatus }
      </span> }
    </div>;

  return ( WebUrlElement );

}

export default WebUrlHook;

