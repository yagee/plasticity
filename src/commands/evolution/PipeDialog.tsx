import { render } from 'preact';
import { AbstractDialog } from "../../command/AbstractDialog";
import { EditorSignals } from "../../editor/EditorSignals";
import { PipeParams } from './PipeFactory';

export class PipeDialog extends AbstractDialog<PipeParams> {
    name = "PipeDialog";

    constructor(protected readonly params: PipeParams, signals: EditorSignals) {
        super(signals);
    }

    render() {
        const { sectionSize, thickness1, thickness2 } = this.params;

        render(
            <>
                <ul>
                    <li>
                        <label for="sectionSize">Section size</label>
                        <div class="fields">
                            <plasticity-number-scrubber name="sectionSize" value={sectionSize} onchange={this.onChange} onscrub={this.onChange} onfinish={this.onChange}></plasticity-number-scrubber>
                        </div>
                    </li>
                    <li>
                        <label for="thickness1">Thickness 1 </label>
                        <div class="fields">
                            <plasticity-number-scrubber name="thickness1" value={thickness1} onchange={this.onChange} onscrub={this.onChange} onfinish={this.onChange}></plasticity-number-scrubber>
                        </div>
                    </li>
                    <li>
                        <label for="thickness2">Thickness 1 </label>
                        <div class="fields">
                            <plasticity-number-scrubber name="thickness2" value={thickness2} onchange={this.onChange} onscrub={this.onChange} onfinish={this.onChange}></plasticity-number-scrubber>
                        </div>
                    </li>
                </ul></>, this);
    }
}
customElements.define('plasticity-pipe-dialog', PipeDialog);