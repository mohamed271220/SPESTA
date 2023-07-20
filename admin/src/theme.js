// color design tokens export
export const tokensDark = {
  // grey: {
  //   0: "#ffffff", // manually adjusted
  //   10: "#f6f6f6", // manually adjusted
  //   50: "#f0f0f0", // manually adjusted
  //   100: "#e0e0e0",
  //   200: "#c2c2c2",
  //   300: "#a3a3a3",
  //   400: "#858585",
  //   500: "#666666",
  //   600: "#525252",
  //   700: "#3d3d3d",
  //   800: "#292929",
  //   900: "#141414",
  //   1000: "#000000", // manually adjusted
  // },

  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#fef8f1",
    200: "#fdf1e4",
    300: "#fbe9d6",
    400: "#fae2c9",
    500: "#f9dbbb",
    600: "#c7af96",
    700: "#958370",
    800: "#64584b",
    900: "#322c25",
    1000: "#000000", // manually adjusted
  },
  black: {
    100: "#d5d7d9",
    200: "#abafb3",
    300: "#82888c",
    400: "#586066",
    500: "#2e3840",
    600: "#252d33",
    700: "#1c2226",
    800: "#12161a",
    900: "#090b0d",
  },

  primary: {

    100: "#dce2e6",
    200: "#b8c5cd",
    300: "#95a8b3",
    400: "#718b9a",
    500: "#4e6e81",
    600: "#3e5867",
    700: "#2f424d",
    800: "#1f2c34",
    900: "#10161a",
  },

  // primary: {
  //   100: "#d2dfeb",
  //   200: "#a5bed7",
  //   300: "#779ec3",
  //   400: "#4a7daf",
  //   500: "#1d5d9b",
  //   600: "#174a7c",
  //   700: "#11385d",
  //   800: "#0c253e",
  //   900: "#06131f",
  // },

  secondary: {
    50: "#f0f0f0",
    100: "#ffcdcd",
    200: "#ff9a9a",
    300: "#ff6868",
    400: "#ff3535",
    500: "#ff0303",
    600: "#cc0202",
    700: "#990202",
    800: "#660101",
    900: "#330101",
  },
  // secondary: {
  //   50: "#f0f0f0",
  //   100: "#fdf6df",
  //   200: "#fbedbf",
  //   300: "#f8e3a0",
  //   400: "#f6da80",
  //   500: "#f4d160",
  //   600: "#c3a74d",
  //   700: "#927d3a",
  //   800: "#625426",
  //   900: "#312a13",
  // },

  // primary: {
  //   // blue
  //   100: "#d3d4de",
  //   200: "#a6a9be",
  //   300: "#7a7f9d",
  //   400: "#4d547d",
  //   500: "#21295c",
  //   600: "#191F45", // manually adjusted
  //   700: "#141937",
  //   800: "#0d1025",
  //   900: "#070812",
  // },
  // secondary: {
  //   // yellow
  //   50: "#f0f0f0", // manually adjusted
  //   100: "#fff6e0",
  //   200: "#ffedc2",
  //   300: "#ffe3a3",
  //   400: "#ffda85",
  //   500: "#ffd166",
  //   600: "#cca752",
  //   700: "#997d3d",
  //   800: "#665429",
  //   900: "#332a14",
  // },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
