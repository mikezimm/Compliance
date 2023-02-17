import * as React from 'react';
import styles from './PersonaRow.module.scss';
import { IPersonaCardProps } from './IPersonaCardProps';
import { IPersonaCardState } from './IPersonaCardState';
import {
  Log, Environment, EnvironmentType,
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

import {
  // Persona,
  // PersonaSize,
  DocumentCard,
  DocumentCardType,
  // Icon,
} from 'office-ui-fabric-react';

import { getAdminIcon, getGuestIcon } from './PersonaIcons';

const EXP_SOURCE: string = 'SPFxDirectory';
const LIVE_PERSONA_COMPONENT_ID: string =
  '914330ee-2df2-4f6e-a858-30c23a812408';

export class PersonaRow extends React.Component<
  IPersonaCardProps,
  IPersonaCardState
  > {
  constructor(props: IPersonaCardProps) {
    super(props);

    this.state = { livePersonaCard: undefined, pictureUrl: undefined };
  }
  /**
   *
   *
   * @memberof PersonaRow
   */
  public async componentDidMount(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      const sharedLibrary = await this._loadSPComponentById(
        LIVE_PERSONA_COMPONENT_ID
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const livePersonaCard: any = sharedLibrary.LivePersonaCard;
      this.setState({ livePersonaCard: livePersonaCard });
    }
  }

  /**
   *
   *
   * @param {IPersonaCardProps} prevProps
   * @param {IPersonaCardState} prevState
   * @memberof PersonaRow
   */
  public componentDidUpdate(
    prevProps: IPersonaCardProps,
    prevState: IPersonaCardState
  ): void { 
    //
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof PersonaRow
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private _LivePersonaCard() {
    return React.createElement(
      this.state.livePersonaCard,
      {
        serviceScope: this.props.context.serviceScope,
        upn: this.props.profileProperties.Email,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      },
      this._PersonaRow()
    );
  }

  /**
   *
   *
   * @private
   * @returns {JSX.Element}
   * @memberof PersonaCard
   */
  private _PersonaRow(): JSX.Element {

    const AdminIcon = this.props.profileProperties.isSiteAdmin !== true ? false : getAdminIcon( this.props.iconSize, '20px', this.props.iconTextSize );
    const GuestIcon = this.props.profileProperties.isGuest !== true ? false : getGuestIcon( this.props.iconSize, '20px', this.props.iconTextSize );

    const personaContent = <div className={ styles.inlineFlexSpaceBetween }>
        {this.props.profileProperties.DisplayName}  { AdminIcon } { GuestIcon } </div>;

    const personaClass = [styles.persona ].join(' ');

    return (
      <DocumentCard
        className={ styles.docCardRow }
        type={DocumentCardType.normal}
        style={{ } }
      >
        <div className={ personaClass }
          style={{ }}>
          {/* style={{ paddingTop: this.getCardPadding(), paddingBottom: this.getCardPadding() }} */}
          { personaContent }
        </div>
      </DocumentCard>
    );
  }
  /**
   * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
   * @param componentId - componentId, guid of the component library
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async _loadSPComponentById(componentId: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component: any = await SPComponentLoader.loadComponentById(
        componentId
      );
      return component;
    } catch (error) {
      // eslint-disable-next-line no-void
      void Promise.reject(error);
      Log.error(EXP_SOURCE, error, this.props.context.serviceScope);
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPersonaCardProps>}
   * @memberof PersonaCard
   */
  public render(): React.ReactElement<IPersonaCardProps> {
    const personaContainer =  styles.personaContainerSmall ;

    return (
      //2020-11-24:  Added for adjusting card size
      <div className={ personaContainer } style={{ }}>
      {/* <div className={styles.personaContainer} style={{ }}> */}
        {this.state.livePersonaCard
          ? this._LivePersonaCard()
          : this._PersonaRow()}
      </div>
    );
  }
}
