export type Props = {
  HeadingBlock: {
    title: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    alignment: "left" | "center" | "right";
    textColor: string;
  };
  GridBlock: {
    columns: number;
    gap: "none" | "small" | "medium" | "large";
    responsive: "true" | "false";
  };
  CardBlock: {
    title: string;
    description: string;
    padding: number;
    variant: string;
    bgColor: string;
    shadow: "none" | "small" | "medium" | "large";
    borderRadius: "none" | "small" | "medium" | "large";
  };
  HeroBlock: {
    title: string;
    subtitle: string;
    backgroundType: "image" | "color";
    backgroundImage: string;
    backgroundColor: string;
    height: "small" | "medium" | "large" | "fullscreen";
    overlayOpacity: number;
  };
  SectionBlock: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    padding: "none" | "small" | "medium" | "large";
    contentWidth: "narrow" | "medium" | "wide" | "full";
  };
  ButtonBlock: {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "small" | "medium" | "large";
    link: string;
    target: "_self" | "_blank";
    fullWidth: "true" | "false";
  };
  SpacerBlock: {
    height: number;
    mobileHeight?: number;
  };
  ImageBlock: {
    src: string;
    alt: string;
    width: string;
    aspectRatio: "original" | "square" | "video" | "portrait";
    borderRadius: "none" | "small" | "medium" | "large";
  };
  TextBlock: {
    content: string;
    textColor: string;
    fontSize: "small" | "medium" | "large";
    lineHeight: "tight" | "normal" | "relaxed";
  };
  DividerBlock: {
    style: "solid" | "dashed" | "dotted";
    color: string;
    thickness: number;
    spacing: "small" | "medium" | "large";
  };
  NavbarBlock: {
    logoText: string;
    logoImage?: string;
    links: { label: string; href: string }[];
    backgroundColor: string;
    textColor: string;
    fixed: "true" | "false";
  };
};
