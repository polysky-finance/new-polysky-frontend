import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {useBuybackAmount, useTotalVaultValue2} from 'state/hooks'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const BuybackCard = () => {
  const { t } = useTranslation()
  const buyBackAmt = useBuybackAmount()
  const vaultValue = useTotalVaultValue2()

  const TooltipComponent = () => (
    <>
      <Text mb="16px">{t('Buyback is the amount of SIRIUS buyback and burnt per day. This is from 80% of burning vault and 1% of other vaults harvests')}</Text>
      <Text mb="16px">{t('TVL is the total value locked in the vault')}</Text>
    </>
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent/>, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('STATS')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">  
            <Flex flexDirection="row" mr="12px">
            <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Buyback: ')}
              </Text>
            {buyBackAmt?
               (<Balance
                  fontSize="16px"
                  color="textSubtle"
                  value={buyBackAmt.toNumber()}
                  decimals={2}
                  unit="/day"
                  prefix="$"
                />):
                (
                  <Skeleton height={20} width={96} mb="2px" />
                )}
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">  
            <Flex flexDirection="row" mr="12px">
            <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Vault TVL: ')}
              </Text>
            {vaultValue?
               (<Balance
                  fontSize="16px"
                  color="textSubtle"
                  value={vaultValue.toNumber()}
                  decimals={2}
                  unit=""
                  prefix="$"
                />):
                (
                  <Skeleton height={20} width={96} mb="2px" />
                )}
            </Flex>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BuybackCard
