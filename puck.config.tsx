import { type Config } from "@measured/puck";
import { Props } from "./components/Blocks/types";
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
import { YouTubeBlock } from "./components/Blocks/YouTubeBlock";
import { FooterBlock } from "./components/Blocks/FooterBlock";

export const config: Config<Props> = {
  components: {
    NavbarBlock,
    HeroBlock,
    SectionBlock,
    GridBlock,
    ImageBlock,
    TextBlock,
    YouTubeBlock,
    CardBlock,
    ButtonBlock,
    SpacerBlock,
    DividerBlock,
    FooterBlock,
  },
};

export default config;
