import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    h,
} from "@stencil/core";

@Component({
    tag: "my-counter",
    styleUrl: "my-counter.css",
    shadow: true,
})
export class MyCounter {
    @Prop() initialCount: number = 0;

    @State() count: number = 0;

    @Event() countChanged: EventEmitter<number>;

    componentWillLoad() {
        this.count = this.initialCount;
    }

    private increment = () => {
        this.count += 1;

        this.countChanged.emit(this.count);
    };

    private decrement = () => {
        this.count -= 1;

        this.countChanged.emit(this.count);
    };

    render() {
        return (
            <div class="counter">
                <h2>Stencil Counter</h2>

                <p class="count">{this.count}</p>

                <div class="actions">
                    <button
                        type="button"
                        onClick={this.decrement}
                    >
                        -
                    </button>

                    <button
                        type="button"
                        onClick={this.increment}
                    >
                        +
                    </button>
                </div>
            </div>
        );
    }
}