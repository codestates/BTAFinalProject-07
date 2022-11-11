const theme = {
  color: {
    black300: '#9A9A9A',
    black600: '#444444',
    black700: '#000000',
    orange700: '#FF6C00',
    orange600: '#FF7915',
    orange100: '#FFE8D7',
  },
} as const;

export type TypeForMakingTheme = typeof theme;

export default theme;