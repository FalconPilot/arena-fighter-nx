import * as React from 'react'

import { AcceptedItemType } from 'components/item-frame/types'
import { noOp } from 'utils/function'

type OverlaysContextData = [
  {
    itemInfo: AcceptedItemType | null,
  },
  {
    setItemInfoOverlay: (item: AcceptedItemType | null) => void,
  }
]

const OverlaysContext = React.createContext<OverlaysContextData>([{
  itemInfo: null,
}, {
  setItemInfoOverlay: noOp,
}])

OverlaysContext.displayName = 'OverlaysContext'

export const OverlaysProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [itemInfo, setItemInfo] = React.useState<AcceptedItemType | null>(null)

  return (
    <OverlaysContext.Provider value={[{
      itemInfo,
    }, {
      setItemInfoOverlay: setItemInfo,
    }]}>
      {children}
    </OverlaysContext.Provider>
  )
}

export const useOverlays = (): OverlaysContextData => {
  const context = React.useContext(OverlaysContext)

  if (context === undefined) {
    throw new Error('useOverlays must be used within a OverlaysContext provider')
  }

  return React.useMemo(() => context, [context])
}
