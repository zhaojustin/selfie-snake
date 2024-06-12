import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: "#5887ff",
  },
  fonts: {
    body: "Figtree, sans-serif",
    heading: "Playfair Display, sans-serif",
    mono: "Reddit Mono, monospace",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 15,
      },
      variants: {
        solid: {
          bg: "blue.50",
          color: "brand",
          _hover: {
            bg: "blue.100",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
  },
});

export default theme;
