//定义物料
//定义物料
import { defineAsyncComponent, h, type App } from "vue";
import ImageBlock from "./blocks/ImageBlock.vue";
import QuoteBlock from "./blocks/QuoteBlock.vue";

type BlockMeta = {
  type: string;
  material: unknown;
};

const blocks = [
  { type: "image", material: ImageBlock },
  { type: "quote", material: QuoteBlock },
  {
    type: "chart",
    material: defineAsyncComponent(() => import("./blocks/ChartBlock.vue")),
  },
];
type ImageBlock = {
  type: string;
  material: unknown;
  props?: {
    url: string;
  };
};
type QuoteBlock = {
  type: string;
  material: unknown;
  props?: {
    content: string;
  };
};
type Block = ImageBlock | QuoteBlock;
class BlockSuit {
  blocks: Block[];
  constructor() {
    this.blocks = blocks;
  }
  use(block: Block) {
    this.blocks.push(block);
  }
}
const blockSuit = new BlockSuit();
// 动态化的注册插件
blockSuit.use({
  type: "button",
  material: h("button", "Hello"),
});

type BlockMap = Record<string, BlockMeta>;
const blockMap = blocks.reduce((map, block) => {
  map[block.type] = {
    type: block.type,
    material: block.material,
  };
  return map;
}, {} as BlockMap);
export const createBlocks = (app: App) => {
  app.provide("blockMap", blockMap);
  app.config.globalProperties.$blockMap = blockMap;
};
