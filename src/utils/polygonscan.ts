import { BASE_POLYGON_SCAN_URL } from 'config'

export const getPolygonScanAddressUrl = (address: string) => {
  return `${BASE_POLYGON_SCAN_URL}/address/${address}`
}

export const getPolygonScanTransactionUrl = (transactionHash: string) => {
  return `${BASE_POLYGON_SCAN_URL}/tx/${transactionHash}`
}

export const getPolygonScanBlockNumberUrl = (block: string | number) => {
  return `${BASE_POLYGON_SCAN_URL}/block/${block}`
}

export const getPolygonScanBlockCountdownUrl = (block: string | number) => {
  return `${BASE_POLYGON_SCAN_URL}/block/countdown/${block}`
}
