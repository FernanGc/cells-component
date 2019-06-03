{
  const {
    html,
  } = Polymer;
  /**
    `<cells-codelabs-login>` Description.

    Example:

    ```html
    <cells-codelabs-login></cells-codelabs-login>
    ```

    ## Styling
    The following custom properties and mixins are available for styling:

    ### Custom Properties
    | Custom Property     | Selector | CSS Property | Value       |
    | ------------------- | -------- | ------------ | ----------- |
    | --cells-fontDefault | :host    | font-family  |  sans-serif |
    ### @apply
    | Mixins    | Selector | Value |
    | --------- | -------- | ----- |
    | --cells-codelabs-login | :host    | {} |

    * @customElement
    * @polymer
    * @extends {Polymer.Element}
    * @demo demo/index.html
  */
  class CellsCodelabsLogin extends Polymer.Element {

    static get is() {
      return 'cells-codelabs-login';
    }

    static get properties() {
      return {
        userName: String,
        userPassword: String,
        userId: String,
        _loading: {
          type: Boolean,
          value: false
        },
        clearIcon: {
          type: String,
          value: 'coronita:close'
        },
        showPwdIcon: {
          type: String,
          value: 'coronita:visualize'
        },
        hidePwdIcon: {
          type: String,
          value: 'coronita:hide'
        },
        loggedIn: {
          type: Boolean,
          value: false
        },
        loggingInText: {
          type: String,
          value: 'Logging in...'
        },
        loggedInText: {
          type: String,
          value: 'Logged in'
        },
        _loadingText: {
          type: String,
          computed: '_computeLoadingText(loggedIn)'
        }
      };
    }

    static get template() {
      return html `
        <style include="cells-codelabs-login-styles cells-codelabs-login-shared-styles"></style>
        <slot></slot>
        <!-- login form -->
        <cells-credentials-form hidden$="[[_loading]]"
          user-name="{{userName}}"
          user-password="{{userPassword}}"
          user-id="[[userId]]"
          on-login="_onFormSubmit"
          clear-id-icon="[[clearIcon]]"
          toggle-pwd-icon="[[showPwdIcon]]"
          toggle-pwd-icon-toggled="[[hidePwdIcon]]">
        </cells-credentials-form>

        <template is="dom-if" if="[[_loading]]">
          <cells-molecule-spinner 
            messages=""
            message="[[_loadingText]]" 
            finish="[[loggedIn]]">
          </cells-molecule-spinner>
        </template>
      `;
    }
    
    _onFormSubmit(e) {
      this._loading = true;

      this.dispatchEvent(new CustomEvent('request-access', {
        composed: true,
        bubbles: true,
        detail: e.detail
      }));
    }

    _computeLoadingText(loggedIn) {
      return loggedIn ? this.loggedInText : this.loggingInText;
    }
  }

  customElements.define(CellsCodelabsLogin.is, CellsCodelabsLogin);
}