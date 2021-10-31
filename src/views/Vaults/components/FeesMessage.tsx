import React, { useMemo } from 'react'

import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  Heading,
  Skeleton,
  Box,
} from '@polysky-libs/uikit'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const FeesMessage = () => {

  return (
    <>
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
			        <Text bold text-align='center' fontSize="16px" mr="4px">
			          Vaults have no deposit or withdrawal fees.
			        </Text>              
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
				<Text fontSize="16px" bold color="textSubtle" mr="4px">
                80% of Burning Vault earnings are used to burn SIRIUS and the rest compounded.
				</Text>
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                There is a 1% performance fee on earnings of all other vaults used to burn SIRIUS.
              </Text>
			  <Text fontSize="16px" bold color="textSubtle" mr="4px">
                SIRIUS is burned on every compound.
              </Text>
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                We are gradually adding more vaults. If your vault is not listed, request in our telegram group.
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default FeesMessage
