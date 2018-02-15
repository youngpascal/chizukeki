import color from 'color'
import { Platform } from 'react-native'
import deepmerge from 'deepmerge'
import { getTheme, variables as nbVariables } from 'native-base/src/index'

let textStyles = {
  '.bounded': {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    //overflow: 'hidden',
    //textOverflow: 'ellipsis',
  }
}

let summaryStyles = variables => {
  let typeBackgrounds = (background) => ({
    'NativeBase.Text': {
      '.name': {
        backgroundColor: color(background).lighten(0.5).hex(),
      },
      '.value': {
        backgroundColor: color(background).lighten(0.25).hex(),
      },
      '.type': {
        backgroundColor: background,
      }
    }
  })
  return {
    'NativeBase.Card': {
      'NativeBase.CardItem': {
        '.balance': {
          paddingTop: 0,
          paddingBottom: 10,
          paddingLeft: 15,
          paddingRight: 15,
          'NativeBase.Text': {
            paddingTop: 5,
            paddingBottom: 5,
            '.name': {
              flex: 2,
              fontSize: 'bold',
              paddingLeft: 10,
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
            },
            '.value': {
              flex: 1,
              textAlign: 'center'
            },
            '.type': {
              flex: 1,
              color: variables.brandLight,
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
              textAlign: 'center',
              paddingRight: 10,
            },
          },
        },
        '.unissued': typeBackgrounds(variables.btnWarningBg),
        '.issued': typeBackgrounds(variables.btnSuccessBg),
        '.received': typeBackgrounds(variables.btnInfoBg),
      }
    }
  }
}


export default (variables = nbVariables) => {
  let badgeStyles = {
    ".light": {
      backgroundColor: variables.brandLight,
      'NativeBase.Text': {
        color: variables.brandDark,
      }
    },
  }

  let buttonStyles = {
    '.iconLeft': {
      'NativeBase.Spinner': {
        marginRight: 0,
        marginLeft: 16,
      },
    },
  }

  const spinnerStyles = {
    '.inverse': {
      color: variables.inverseSpinnerColor
    },
    '.inline': {
      color: variables.textColor,
    },
  }
  let basicTextStyles = {
    '.light': {
      color: variables.brandLight,
    },
    '.primary': {
      color: variables.btnPrimaryBg,
    },
    '.success': {
      color: variables.btnSuccessBg,
    },
    '.info': {
      color: variables.btnInfoBg,
    },
    '.warning': {
      color: variables.btnWarningBg,
    },
    '.danger': {
      color: variables.btnDangerBg,
    },
    '.dark': {
      color: variables.brandDark,
    },
  }
  return deepmerge(getTheme(variables), {
    "NativeBase.Text": Object.assign(textStyles, basicTextStyles),
    "NativeBase.Icon": basicTextStyles,
    "NativeBase.IconNB": basicTextStyles,
    "NativeBase.Button": buttonStyles,
    "NativeBase.Badge": badgeStyles,
    "NativeBase.Spinner": Object.assign(spinnerStyles, basicTextStyles),

    'PeerKeeper.AssetsSummary': summaryStyles(variables)
  })
}
