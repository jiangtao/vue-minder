/**
 * 运行时
 */
import ContainerRuntime from './runtime/container.js'
import FSMRuntime from './runtime/fsm.js'
import MinderRuntime from './runtime/minder.js'
import ReceiverRuntime from './runtime/receiver.js'
import HotboxRuntime from './runtime/hotbox.js'
import InputRuntime from './runtime/input.js'
import ClipboardMimeTypeRuntime from './runtime/clipboard-mimetype.js'
import ClipboardRuntime from './runtime/clipboard.js'
import DragRuntime from './runtime/drag.js'
import NodeRuntime from './runtime/node.js'
import HistoryRuntime from './runtime/history.js'
import JumpingRuntime from './runtime/jumping.js'
import PriorityRuntime from './runtime/priority.js'
import ProgressRuntime from './runtime/progress.js'

var runtimes = [];

function assemble(runtime) {
    runtimes.push(runtime);
}

function KMEditor(selector, blackList) {
    this.selector = selector;
    for (var i = 0; i < runtimes.length; i++) {
        if (typeof runtimes[i] == 'function') {
            runtimes[i].call(this, this);
        }
    }
}

KMEditor.assemble = assemble;

[
    ContainerRuntime,
    FSMRuntime,
    MinderRuntime,
    ReceiverRuntime,
    HotboxRuntime,
    InputRuntime,
    ClipboardMimeTypeRuntime,
    ClipboardRuntime,
    DragRuntime,
    NodeRuntime,
    HistoryRuntime,
    JumpingRuntime,
    PriorityRuntime,
    ProgressRuntime
].forEach(assemble);

export default KMEditor;
