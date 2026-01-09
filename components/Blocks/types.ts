export type Props = {

  GridBlock: {
    columns: number;
    gap: "none" | "small" | "medium" | "large";
    responsive: "true" | "false";
    itemAlignment?: "start" | "center" | "end" | "stretch";
    minColWidth?: string;
  };
  CardBlock: {
    title: string;
    description: string;
    padding: number;
    variant: string;
    bgColor: string;
    shadow: "none" | "small" | "medium" | "large";
    borderRadius: "none" | "small" | "medium" | "large";
    headerImage?: string;
    titleColor?: string;
    descriptionColor?: string;
    // Typography
    titleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    titleFontWeight?: "thin" | "normal" | "medium" | "bold";
    descriptionFontFamily?: "sans" | "serif" | "mono" | "fontin";
    descriptionFontWeight?: "thin" | "normal" | "medium" | "bold";
    hoverEffect?: "none" | "lift" | "glow";
  };
  HeroBlock: {
    title: string;
    subtitle: string;
    backgroundType: "image" | "color";
    backgroundImage: string;
    backgroundColor: string;
    height: "small" | "medium" | "large" | "fullscreen";
    overlayOpacity: number;
    ctaText?: string;
    ctaLink?: string;
    ctaTarget?: "_self" | "_blank";
    contentAlignment?: "left" | "center" | "right";
    // Typography for title and subtitle
    titleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    titleFontWeight?: "thin" | "normal" | "medium" | "bold";
    titleTextColor?: string;
    subtitleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    subtitleFontWeight?: "thin" | "normal" | "medium" | "bold";
    subtitleTextColor?: string;
  };
  SectionBlock: {
    title: string;
    subtitle: string;
    backgroundType: "image" | "color";
    backgroundImage?: string;
    backgroundColor: string;
    padding: "none" | "small" | "medium" | "large";
    contentWidth: "narrow" | "medium" | "wide" | "full";
    overlayColor?: string;
    overlayOpacity?: number;
    titleTextColor?: string;
    subtitleTextColor?: string;
    // Typography
    titleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    titleFontWeight?: "thin" | "normal" | "medium" | "bold";
    subtitleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    subtitleFontWeight?: "thin" | "normal" | "medium" | "bold";
  };
  ButtonBlock: {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size: "small" | "medium" | "large";
    link: string;
    target: "_self" | "_blank";
    fullWidth: "true" | "false";
    alignment?: "left" | "center" | "right";
    icon?: "none" | "arrow-right" | "arrow-left" | "plus" | "check";
    iconPosition?: "left" | "right";
    // Typography for button
    fontFamily?: "sans" | "serif" | "mono" | "fontin";
    fontWeight?: "thin" | "normal" | "medium" | "bold";
    textColor?: string;
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
    caption?: string;
    alignment?: "left" | "center" | "right";
    lazy?: boolean;
  };
  TextBlock: {
    content: string;
    colorMode?: "preset" | "custom";
    textColor: string;
    customColor?: string;
    fontFamily?: "sans" | "serif" | "mono" | "fontin";
    fontSize: "small" | "medium" | "large" | "xl";
    lineHeight: "tight" | "normal" | "relaxed";
    textAlign?: "left" | "center" | "right" | "justify";
    padding?: "none" | "small" | "medium" | "large";
    fontWeight?: "thin" | "normal" | "medium" | "bold";
    italic?: boolean;
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
    showAuthButton?: boolean;
    // Typography
    textFontFamily?: "sans" | "serif" | "mono" | "fontin";
    textFontWeight?: "thin" | "normal" | "medium" | "bold";
  };
  YouTubeBlock: {
    videoUrl: string;
    title: string;
    // Title typography
    titleFontFamily?: "sans" | "serif" | "mono" | "fontin";
    titleFontWeight?: "thin" | "normal" | "medium" | "bold";
    titleTextColor?: string;
  };
  FooterBlock: {
    text: string;
    textColor: string;
    backgroundColor: string;
    socialLinks: {
      icon: string;
      href: string;
    }[];
    // Typography
    fontFamily?: "sans" | "serif" | "mono" | "fontin";
    fontWeight?: "thin" | "normal" | "medium" | "bold";
  };
};
