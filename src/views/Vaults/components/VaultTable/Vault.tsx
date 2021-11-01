import React from 'react'
import styled from 'styled-components'
import { useVaultUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, Tag } from '@polysky-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'
import TokenImage from 'components/TokenImage'
import {BurningTag} from 'components/Tags'

export interface VaultProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
  isSingle: boolean
  isBurning: boolean
  exchange: string
  platform: string
}

const LabelTag = styled(Tag)`
  margin-left: 4px;
  margin-top: 4px
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 3px;
  width: 44px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`

const Vault: React.FunctionComponent<VaultProps> = ({ token, quoteToken, label, pid, isSingle, isBurning, exchange, platform }) => {
  const { stakedBalance} = useVaultUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderVaulting = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Compounding')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
       { isSingle?
        <TokenImage token ={token} width={50} height={50}/>:
        <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={50} height={50} />
       }
      </TokenWrapper>
      <div>
        {handleRenderVaulting()}
        <Text bold>{label}</Text>
        { isBurning?
            <BurningTag/> :null
        }
        <br/>
        <LabelTag variant="secondary">{platform}</LabelTag>
      </div>
    </Container>
  )
}

export default Vault
