import { DropZone, type Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  GridBlock: {};
  CardBlock: {
    title: string;
    description: string;
    padding: number;
    variant: string;
    bgColor: string;
  };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div className="text-4xl font-bold p-4">
          <h1>{title}</h1>
        </div>
      ),
    },
    GridBlock: {
      fields: {
        columns: { type: "number" },
      },
      defaultProps: {
        columns: 3,
      },
      render: () => {
        return (
          <DropZone zone="my-grid" className="grid grid-cols-3 gap-4 p-4" />
        );
      },
    },
    CardBlock: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        padding: { type: "number" },
        variant: {
          type: "select",
          options: [
            { label: "Outline", value: "border rounded-md" },
            { label: "Floating", value: "shadow-md" },
          ],
        },
        bgColor: {
          type: "select",
          options: [
            { label: "Inherit", value: "inherit" },
            { label: "Red", value: "red-300" },
            { label: "Yellow", value: "yellow-100" },
          ],
        },
      },

      defaultProps: {
        title: "Card",
        description: "Description",
        padding: 16,
        variant: "border rounded-md",
        bgColor: "inherit",
      },
      render: ({ title, description, padding, variant, bgColor }) => (
        <div style={{ padding }} className={`${variant} bg-${bgColor}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ),
    },
  },
};

export default config;
