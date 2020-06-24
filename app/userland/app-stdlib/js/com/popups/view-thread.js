/* globals beaker */
import { html, css } from 'beaker://app-stdlib/vendor/lit-element/lit-element.js'
import { BasePopup } from 'beaker://app-stdlib/js/com/popups/base.js'
import popupsCSS from 'beaker://app-stdlib/css/com/popups.css.js'
import '../record-thread.js'

// exported api
// =

export class ViewThreadPopup extends BasePopup {
  constructor (opts) {
    super()
    this.recordUrl = opts.recordUrl
    this.profileUrl = opts.profileUrl
  }

  static get properties () {
    return {
      recordUrl: {type: String}
    }
  }

  static get styles () {
    return [popupsCSS, css`
    .popup-inner {
      width: 100%;
      max-width: 800px;
      border-radius: 6px;
    }
    .popup-inner .body {
      background: var(--bg-color--light);
      padding: 8px 10px 10px;
    }
    `]
  }

  // management
  //

  static async create (opts) {
    return BasePopup.create(ViewThreadPopup, opts)
  }

  static destroy () {
    return BasePopup.destroy('view-thread-popup')
  }

  // rendering
  // =

  renderTitle () {
    return `Thread`
  }

  renderBody () {
    return html`
      <beaker-record-thread
        record-url=${this.recordUrl}
        profile-url=${this.profileUrl}
        @load=${this.onLoadThread}
        @view-thread=${this.onViewThread}
      ></beaker-record-thread>
    `
  }

  // events
  // =

  onLoadThread () {
    this.shadowRoot.querySelector('beaker-record-thread').scrollHighlightedPostIntoView()
  }

  onViewThread (e) {
    this.recordUrl = e.detail.record.url
  }
}

customElements.define('view-thread-popup', ViewThreadPopup)