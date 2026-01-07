import { type Config } from "@measured/puck";
import { Props } from "./components/Blocks/types";
import { HeadingBlock } from "./components/Blocks/HeadingBlock";
import { GridBlock } from "./components/Blocks/GridBlock";
import { CardBlock } from "./components/Blocks/CardBlock";
import { HeroBlock } from "./components/Blocks/HeroBlock";
import { SectionBlock } from "./components/Blocks/SectionBlock";
import { ButtonBlock } from "./components/Blocks/ButtonBlock";
import { SpacerBlock } from "./components/Blocks/SpacerBlock";
import { ImageBlock } from "./components/Blocks/ImageBlock";
import { TextBlock } from "./components/Blocks/TextBlock";
import { DividerBlock } from "./components/Blocks/DividerBlock";
import { NavbarBlock } from "./components/Blocks/NavbarBlock";

export const config: Config<Props> = {
  components: {
    NavbarBlock,
    HeadingBlock,
    GridBlock,
    CardBlock,
    HeroBlock,
    SectionBlock,
    ButtonBlock,
    SpacerBlock,
    ImageBlock,
    TextBlock,
    DividerBlock,
  },
};

export default config;
