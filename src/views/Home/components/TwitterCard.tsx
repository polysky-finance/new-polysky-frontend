import React from 'react'
import { Card, CardBody, Heading } from '@polysky-libs/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const TwitterCard = () => {

  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          Announcements
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'polyskyfinance'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
            width: "400"
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard