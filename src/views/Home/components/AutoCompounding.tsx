import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@polysky-libs/uikit'
import { NavLink } from 'react-router-dom'


const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`


const AutoCompounding = () => {
  
  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/vaults" id="pool-cta">
        <CardBody>
          <Heading color="contrast" scale="lg">
            Auto-Compounding
          </Heading>
          <CardMidContent color="contrast">Vaults </CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg">
              Available
            </Heading>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default AutoCompounding
