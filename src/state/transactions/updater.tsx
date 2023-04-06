import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_TXN_DISMISS_MS, L2_TXN_DISMISS_MS } from 'constants/misc'
import LibUpdater from 'lib/hooks/transactions/updater'
import { formatPercentInBasisPointsNumber, formatToDecimal, getTokenAddress } from 'lib/utils/analytics'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { InterfaceTrade } from 'state/routing/types'
import { computeRealizedPriceImpact } from 'utils/prices'

import { L2_CHAIN_IDS } from '../../constants/chains'
import { useAddPopup } from '../application/hooks'
import { checkedTransaction, finalizeTransaction } from './reducer'
import { SerializableTransactionReceipt } from './types'

interface AnalyticsEventProps {
  trade: InterfaceTrade<Currency, Currency, TradeType>
  hash: string | undefined
  allowedSlippage: Percent
  succeeded: boolean
}

const formatAnalyticsEventProperties = ({ trade, hash, allowedSlippage, succeeded }: AnalyticsEventProps) => ({
  estimated_network_fee_usd: trade.gasUseEstimateUSD ? formatToDecimal(trade.gasUseEstimateUSD, 2) : undefined,
  transaction_hash: hash,
  token_in_address: getTokenAddress(trade.inputAmount.currency),
  token_out_address: getTokenAddress(trade.outputAmount.currency),
  token_in_symbol: trade.inputAmount.currency.symbol,
  token_out_symbol: trade.outputAmount.currency.symbol,
  token_in_amount: formatToDecimal(trade.inputAmount, trade.inputAmount.currency.decimals),
  token_out_amount: formatToDecimal(trade.outputAmount, trade.outputAmount.currency.decimals),
  price_impact_basis_points: formatPercentInBasisPointsNumber(computeRealizedPriceImpact(trade)),
  allowed_slippage_basis_points: formatPercentInBasisPointsNumber(allowedSlippage),
  chain_id:
    trade.inputAmount.currency.chainId === trade.outputAmount.currency.chainId
      ? trade.inputAmount.currency.chainId
      : undefined,
  swap_quote_block_number: trade.blockNumber,
  succeeded,
})

export default function Updater() {
  const { chainId } = useWeb3React()
  const addPopup = useAddPopup()
  // speed up popup dismisall time if on L2
  const isL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId))
  const transactions = useAppSelector((state) => state.transactions)

  const dispatch = useAppDispatch()
  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }: { chainId: number; hash: string; blockNumber: number }) =>
      dispatch(checkedTransaction({ chainId, hash, blockNumber })),
    [dispatch]
  )
  const onReceipt = useCallback(
    ({ chainId, hash, receipt }: { chainId: number; hash: string; receipt: SerializableTransactionReceipt }) => {
      dispatch(
        finalizeTransaction({
          chainId,
          hash,
          receipt: {
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            contractAddress: receipt.contractAddress,
            from: receipt.from,
            status: receipt.status,
            to: receipt.to,
            transactionHash: receipt.transactionHash,
            transactionIndex: receipt.transactionIndex,
          },
        })
      )

      const tx = transactions[chainId]?.[hash]

      addPopup(
        {
          txn: { hash },
        },
        hash,
        isL2 ? L2_TXN_DISMISS_MS : DEFAULT_TXN_DISMISS_MS
      )
    },
    [addPopup, dispatch, isL2, transactions]
  )

  const pendingTransactions = useMemo(() => (chainId ? transactions[chainId] ?? {} : {}), [chainId, transactions])

  return <LibUpdater pendingTransactions={pendingTransactions} onCheck={onCheck} onReceipt={onReceipt} />
}
