import { loadingAnimation } from 'components/Loader/styled'
import { darken } from 'polished'
import styled from 'styled-components/macro'

import {
  AboutHeader,
  AboutSection,
  BreadcrumbNavLink,
  ChartContainer,
  ChartHeader,
  ContractAddressSection,
  DeltaContainer,
  ResourcesContainer,
  Stat,
  StatPair,
  StatsSection,
  TimeOptionsContainer,
  TokenInfoContainer,
  TokenNameCell,
  TokenPrice,
  TopArea,
} from './TokenDetail'

/* Loading state bubbles */
const LoadingBubble = styled.div`
  border-radius: 12px;
  height: 16px;
  width: 180px;
  animation: ${loadingAnimation} 1.5s infinite;
  animation-fill-mode: both;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.backgroundContainer} 25%,
    ${({ theme }) => darken(0.8, theme.backgroundContainer)} 50%,
    ${({ theme }) => theme.backgroundContainer} 75%
  );
  will-change: background-position;
  background-size: 400%;
`
const TitleLoadingBubble = styled(LoadingBubble)`
  width: 140px;
`
const SquareLoadingBubble = styled(LoadingBubble)`
  height: 32px;
  border-radius: 8px;
  margin-top: 4px;
`
const PriceLoadingBubble = styled(SquareLoadingBubble)`
  height: 40px;
`
const LongLoadingBubble = styled(LoadingBubble)`
  width: 100%;
`
const HalfLoadingBubble = styled(LoadingBubble)`
  width: 50%;
`
const IconLoadingBubble = styled(LoadingBubble)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`
const StatLoadingBubble = styled(SquareLoadingBubble)`
  width: 116px;
`
const StatsLoadingContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`
const ChartAnimation = styled.div`
  display: flex;
  animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -800px;
    }
  }
`
const Space = styled.div<{ heightSize: number }>`
  height: ${({ heightSize }) => `${heightSize}px`};
`
/* Loading State: row component with loading bubbles */
export default function LoadingTokenDetail() {
  return (
    <TopArea>
      <BreadcrumbNavLink to="/explore">
        <Space heightSize={20} />
      </BreadcrumbNavLink>
      <ChartHeader>
        <TokenInfoContainer>
          <TokenNameCell>
            <IconLoadingBubble />
            <TitleLoadingBubble />
          </TokenNameCell>
        </TokenInfoContainer>
        <TokenPrice>
          <PriceLoadingBubble />
        </TokenPrice>
        <DeltaContainer>
          <Space heightSize={20} />
        </DeltaContainer>
        <ChartContainer>
          <ChartAnimation>
            <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
            </svg>
            <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
            </svg>
            <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
            </svg>
            <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
            </svg>
            <svg width="416" height="160" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 80 Q 104 10, 208 80 T 416 80" stroke="#2e3138" fill="transparent" strokeWidth="2" />
            </svg>
          </ChartAnimation>
        </ChartContainer>
        <TimeOptionsContainer>
          <Space heightSize={32} />
        </TimeOptionsContainer>
      </ChartHeader>
      <AboutSection>
        <AboutHeader>
          <SquareLoadingBubble />
        </AboutHeader>
        <LongLoadingBubble />
        <LongLoadingBubble />
        <HalfLoadingBubble />

        <ResourcesContainer>{null}</ResourcesContainer>
      </AboutSection>
      <StatsSection>
        <StatsLoadingContainer>
          <StatPair>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
          </StatPair>
          <StatPair>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
            <Stat>
              <HalfLoadingBubble />
              <StatLoadingBubble />
            </Stat>
          </StatPair>
        </StatsLoadingContainer>
      </StatsSection>
      <ContractAddressSection>{null}</ContractAddressSection>
    </TopArea>
  )
}
