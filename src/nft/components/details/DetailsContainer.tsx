import { useCallback } from 'react'
import { CollectionInfoForAsset, GenieAsset } from 'nft/types'
import { Copy } from 'react-feather'
import styled from 'styled-components/macro'
import { shortenAddress } from 'nft/utils/address'
import useCopyClipboard from 'hooks/useCopyClipboard'

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;
`

const Header = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`

const Body = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
`

const Center = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`

const CopyIcon = styled(Copy)`
  cursor: pointer;
`

const GridItem = ({ header, body }: { header: string; body: React.ReactNode }) => {
  return (
    <div>
      <Header>{header}</Header>
      <Body>{body}</Body>
    </div>
  )
}

const DetailsContainer = ({ asset, collection }: { asset: GenieAsset; collection: CollectionInfoForAsset }) => {
  const { address, tokenId, tokenType, creator } = asset
  const { totalSupply } = collection

  const [, setCopied] = useCopyClipboard()
  const copy = useCallback(() => {
    setCopied(address || '')
  }, [address, setCopied])

  return (
    <Details>
      <GridItem
        header="Contract Address"
        body={
          <Center>
            {shortenAddress(address, 2, 4)} <CopyIcon onClick={copy} size={13} />
          </Center>
        }
      />
      <GridItem header="Token ID" body={tokenId} />
      <GridItem header="Token Standard" body={tokenType} />
      <GridItem header="Blockchain" body="Ethereum" />
      <GridItem header="Total Supply" body={`${totalSupply}`} />
      <GridItem header="Creator" body={shortenAddress(creator, 2, 4)} />
    </Details>
  )
}

export default DetailsContainer