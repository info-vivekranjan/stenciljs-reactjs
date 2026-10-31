import { Component, h, Prop, Watch } from '@stencil/core';

enum TOAST_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

interface TOAST_DATA_TYPE {
  id: number;
  message: string;
  type: TOAST_TYPE;
}
@Component({
  tag: 'toast-box',
  styleUrl: 'toast-box.css',
  shadow: true,
})
export class ToastBox {
  @Prop() toast: TOAST_DATA_TYPE;
  @Prop() handleDeleteToast: (id: number) => void;

  getBackgroundColor = () => {
    let color = 'black';
    if (this.toast.type === TOAST_TYPE.SUCCESS) {
      color = 'green';
    } else if (this.toast.type === TOAST_TYPE.ERROR) {
      color = 'red';
    } else if (this.toast.type === TOAST_TYPE.WARNING) {
      color = 'orange';
    } else if (this.toast.type === TOAST_TYPE.INFO) {
      color = 'blue';
    }

    return color;
  };

  private timeoutId?: ReturnType<typeof setTimeout>;

  @Watch('toast')
  watchToast(newToast: { id: string }, oldToast: { id: string }) {
    if (newToast?.id !== oldToast?.id) {
      this.handleDelete();
    }
  }

  private handleDelete() {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.handleDeleteToast(this.toast.id);
    }, 3000);
  }

  componentDidLoad() {
    this.handleDelete();
  }

  disconnectedCallback() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: this.getBackgroundColor(),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
          padding: '10px',
          borderRadius: '8px',
          width: '300px',
          color: 'white',
        }}
      >
        <span>{this.toast.message}</span>
        <button
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid white',
          }}
          onClick={() => this.handleDeleteToast(this.toast.id)}
        >
          X
        </button>
      </div>
    );
  }
}
