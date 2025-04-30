import { defineComponent, h } from "vue";
import type { SmoothDnD } from "smooth-dnd";
import { smoothDnD } from "smooth-dnd";
import { getTagProps, validateTagProp } from './utils.ts'
type EventKey =
  | "drag-start"
  | "drag-end"
  | "drop"
  | "drag-enter"
  | "drag-leave"
  | "drop-ready";
const eventEmitterMap: Record<EventKey, string> = {
  "drag-start": "onDragStart",
  "drag-end": "onDragEnd",
  drop: "onDrop",
  "drag-enter": "onDragEnter",
  "drag-leave": "onDragLeave",
  "drop-ready": "onDropReady",
};

export const SmoothDndContainer = defineComponent({
  name: "SmoothDndContainer",
  props: {
    orientation: { type: String, default: 'vertical' },
    removeOnDropOut: { type: Boolean, default: false },
    autoScrollEnabled: { type: Boolean, default: true },
    animationDuration: { type: Number, default: 250 },
    behaviour: String,
    groupName: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    dragBeginDelay: Number,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    getGhostParent: Function,
    dropPlaceholder: [Object, Boolean],
    tag: {
        validator: validateTagProp,
        default: 'div'
      }
  },
  emits: [
    "drop",
    "drag-start",
    "drag-end",
    "drag-enter",
    "drag-leave",
    "drop-ready",
  ],
  setup() {
    return {
      container: null as null | SmoothDnD,
    };
  },
  mounted() {
    const options: any = Object.assign({}, this.$props);
    for (const key in eventEmitterMap) {
      const eventKey = key as EventKey;
      options[eventEmitterMap[eventKey]] = (props: any) => {
        this.$emit(eventKey, props);
      };
    }
    const containerElement = this.$refs.container || this.$el;
    this.container = smoothDnD(containerElement, options);
  },
  unmounted() {
    if (this.container) {
      try {
        this.container.dispose()
      } catch {
        // ignore
      }
    }
  },
  render() {
    const tagProps = getTagProps(this)

    return h(
      tagProps.value,
      Object.assign({}, { ref: 'container' }, tagProps.props),
      this.$slots.default?.()
    );
  },
});
