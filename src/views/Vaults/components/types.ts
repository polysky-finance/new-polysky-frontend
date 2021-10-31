export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APR: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'vault',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'liquidity',
    sortable: true,
    label: 'TVL',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'Daily',
  },
  {
    id: 4,
    name: 'details',
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'vault',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'liquidity',
    sortable: true,
    label: 'TVL',
  },

  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'Daily',
  },
  {
    id: 4,
    name: 'details',
    sortable: true,
    label: '',
  },
]
