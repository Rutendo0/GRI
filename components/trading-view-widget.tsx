"use client"

import { useEffect, useRef } from "react"

export function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content to prevent duplicates
      containerRef.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>'
      
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500 Index",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "US 100 Cash CFD",
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR to USD",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "Ethereum",
          },
        ],
        isTransparent: true,
        showSymbolLogo: true,
        colorTheme: "dark",
        locale: "en",
      })

      containerRef.current.appendChild(script)
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (containerRef.current) {
        const scripts = containerRef.current.querySelectorAll('script')
        scripts.forEach(script => script.remove())
      }
    }
  }, [])

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <style jsx>{`
        .tradingview-widget-copyright {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
