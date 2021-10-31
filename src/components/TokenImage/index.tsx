import React from 'react'
import {
  Image as UIKitImage,
  ImageProps as UIKitImageProps
} from '@polysky-libs/uikit'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'

interface TokenImageProps extends Omit<UIKitImageProps, 'src'> {
  token: Token
}

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'MATIC' ? tokens.wmatic.address : token.address)
  return `/images/tokens/${address}.svg`
}

const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return (
    <UIKitImage
      src={getImageUrlFromToken(token)}
      {...props}
    />
  )
}

export default TokenImage