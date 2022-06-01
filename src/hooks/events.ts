import * as React from 'react'

export const useRefEvent = <E extends keyof HTMLElementEventMap>(
  ref: React.Ref<any>,
  type: E,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): void => {
  React.useEffect(() => {
    const immutableRef = typeof ref === 'function' ? ref : ref?.current
    if (immutableRef) {
      immutableRef.addEventListener(type, listener, options)
      return () => immutableRef?.removeEventListener(type, listener, options)
    }
  }, [ref, type, listener, options])
}
