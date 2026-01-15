'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { FunnelAnalysis } from '@/components/funnel-analysis'

export default function Home() {
  const [rent, setRent] = useState<number | ''>(2000)

  const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') {
      setRent('')
      return
    }
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10)
    if (!isNaN(num)) {
      setRent(num)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 pb-20">
      <Navbar />

      <main className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Hero / Input Section */}
        <div className="flex flex-col items-center justify-center space-y-8 mb-16">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              Optimize your rewards.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Calculate the spend needed to waive fees and unlock points on your largest monthly expense.
            </p>
          </div>

          <div className="w-full max-w-md">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3 ml-1">
              Monthly Rent / Mortgage
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <span className="text-gray-400 text-3xl font-light">$</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={rent === '' ? '' : rent.toLocaleString()}
                onChange={handleRentChange}
                className="block w-full pl-12 pr-6 py-6 bg-[#0F1218] border border-white/10 rounded-2xl text-3xl font-light text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]"
                placeholder="0"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none group-hover:ring-white/20 transition-all" />
            </div>
            <div className="flex justify-between mt-3 px-1">
               <span className="text-xs text-gray-500">Enter your total monthly housing payment</span>
            </div>
          </div>
        </div>

        {/* Dynamic Funnel Section */}
        <div className="transition-opacity duration-700 ease-in-out">
            <FunnelAnalysis rentAmount={rent === '' ? 0 : rent} />
        </div>

        {/* Footer info */}
        <div className="mt-24 border-t border-white/5 pt-8 text-center text-gray-600 text-xs">
           <p className="mb-2">This calculator is for estimation purposes only based on the rewards structure provided.</p>
           <p>&copy; {new Date().getFullYear()} Bilt Technologies, Inc. All Rights Reserved.</p>
        </div>

      </main>
    </div>
  )
}
