import React from 'react';
import { ArrowDown, CheckCircle2, Wallet, CreditCard, Home, Info } from 'lucide-react';

interface FunnelAnalysisProps {
  rentAmount: number;
}

export const FunnelAnalysis: React.FC<FunnelAnalysisProps> = ({ rentAmount }) => {
  // Logic:
  // 1. Fee Needed = Rent * 0.03
  // 2. Spend Needed = Fee Needed / 0.04 (Because earning is 4%)
  // Math simplified: Spend = Rent * (0.03 / 0.04) = Rent * 0.75

  const rent = Math.max(0, rentAmount);
  const feeNeeded = rent * 0.03;
  const spendNeeded = feeNeeded / 0.04;
  const pointsUnlocked = rent; // 1x points

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const formatPoints = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-light text-white">Unlock Rent Rewards</h2>
        <p className="text-gray-400">Your path to earning points on rent without fees.</p>
      </div>

      {/* Funnel Container */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50 -translate-x-1/2 hidden md:block" />

        <div className="space-y-6 relative">
            
          {/* Step 1: Required Spend */}
          <FunnelStep
            icon={<CreditCard className="w-6 h-6 text-blue-400" />}
            title="Required Monthly Spend"
            amount={formatCurrency(spendNeeded)}
            description={`Spend this amount on your Bilt card (4% earn rate) to generate enough Bilt Cash.`}
            colorClass="border-blue-500/30 bg-blue-500/5"
            glowClass="shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
          />

          <ArrowDivider />

          {/* Step 2: Bilt Cash Generated */}
          <FunnelStep
            icon={<Wallet className="w-6 h-6 text-purple-400" />}
            title="Bilt Cash Generated"
            amount={formatCurrency(feeNeeded)}
            description="You earn 4% back in Bilt Cash. This covers the transaction fee exactly."
            colorClass="border-purple-500/30 bg-purple-500/5"
            glowClass="shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]"
          />

          <ArrowDivider />

          {/* Step 3: Fee Payment */}
          <FunnelStep
            icon={<ArrowDown className="w-6 h-6 text-orange-400" />}
            title="Fee Payment Offset"
            amount={`-${formatCurrency(feeNeeded)}`}
            description="The 3% fee charged for processing your rent payment is paid using your Bilt Cash."
            colorClass="border-orange-500/30 bg-orange-500/5"
            glowClass="shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]"
          />

           <ArrowDivider />

          {/* Step 4: Outcome */}
          <FunnelStep
            icon={<Home className="w-6 h-6 text-emerald-400" />}
            title="Rent Points Unlocked"
            amount={`${formatPoints(pointsUnlocked)} pts`}
            description={`You earn 1x points on your ${formatCurrency(rent)} rent payment.`}
            colorClass="border-emerald-500/30 bg-emerald-500/10"
            glowClass="shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)]"
            isFinal
          />

        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-[#1A1D24] p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-medium text-white mb-4">How it works</h3>
            <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Bilt cards earn <strong>4% in Bilt Cash</strong> on general spending.</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>To earn 1x points on rent, you must cover a <strong>3% fee</strong> using Bilt Cash.</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Spending <strong>75% of your rent value</strong> generates enough Bilt Cash.</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Bilt Cash expires Dec 31st (limits apply).</span>
                </li>
            </ul>
        </div>

        <div className="bg-[#1A1D24] p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
            <div className="flex items-start gap-4">
               <div className="p-2 bg-white/5 rounded-lg shrink-0">
                   <Info className="w-6 h-6 text-gray-300" />
               </div>
               <div>
                   <h3 className="text-lg font-medium text-white mb-2">Standard Rent Payment</h3>
                   <p className="text-sm text-gray-400 leading-relaxed">
                       If you don't want to earn points on rent, you can still connect your bank account and pay rent through Bilt's ACH network for <strong>free ($0 fees)</strong>.
                   </p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ArrowDivider = () => (
  <div className="flex justify-center py-2 relative z-10">
    <div className="bg-[#0B0E14] p-2 rounded-full border border-white/10">
      <ArrowDown className="w-5 h-5 text-gray-600" />
    </div>
  </div>
);

interface FunnelStepProps {
  icon: React.ReactNode;
  title: string;
  amount: string;
  description: string;
  colorClass: string;
  glowClass?: string;
  isFinal?: boolean;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ icon, title, amount, description, colorClass, glowClass, isFinal }) => {
  return (
    <div className={`relative z-10 bg-[#0F1218] rounded-2xl p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 ${colorClass} ${glowClass} group`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-[#1A1D24] border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div>
            <h3 className="text-gray-400 text-sm uppercase tracking-wider font-medium mb-1">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">{description}</p>
          </div>
        </div>
        <div className="text-right md:text-right">
          <div className={`text-3xl md:text-4xl font-light tracking-tight ${isFinal ? 'text-white' : 'text-gray-200'}`}>
            {amount}
          </div>
        </div>
      </div>
    </div>
  );
};