import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dialog-box',
  styleUrl: 'dialog-box.css',
  shadow: true,
})
export class DialogBox {
  @Prop() dialogTitle: string;
  @Prop() description: string;
  @Prop() handleClose: () => void;

  render() {
    return (
      <section class="dialog-wrapper" onClick={this.handleClose}>
        <div
          class="dialog-box"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <h4 class="margin-top-0">{this.dialogTitle ?? 'Title'}</h4>
          <p>{this.description ?? 'Description'}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <button onClick={this.handleClose}>close</button>
          </div>
        </div>
      </section>
    );
  }
}
