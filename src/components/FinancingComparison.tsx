import { CheckCircle, XCircle, Minus } from 'lucide-react';

interface FeatureRow {
  feature: string;
  cash: string | React.ReactNode;
  loan: string | React.ReactNode;
  lease: string | React.ReactNode;
  ppa: string | React.ReactNode;
}

const rows: FeatureRow[] = [
  {
    feature: 'You own the system',
    cash: <Check />,
    loan: <Check />,
    lease: <X />,
    ppa: <X />,
  },
  {
    feature: 'Federal solar tax credit',
    cash: 'Yours to claim',
    loan: 'Yours to claim',
    lease: 'Owner claims it',
    ppa: 'Owner claims it',
  },
  {
    feature: 'Monthly obligation',
    cash: 'None',
    loan: 'Fixed loan payment',
    lease: 'Fixed rent',
    ppa: 'Per-kWh bill',
  },
  {
    feature: 'Upfront cost',
    cash: 'Full system price',
    loan: 'Down payment or zero-down',
    lease: 'Often $0 down',
    ppa: 'Often $0 down',
  },
  {
    feature: 'Savings on day one',
    cash: 'Maximum (no middleman)',
    loan: 'High (after loan payoff)',
    lease: 'Moderate (after lease fee)',
    ppa: 'Varies by rate & production',
  },
  {
    feature: 'System maintenance',
    cash: 'You manage',
    loan: 'You manage',
    lease: 'Owner manages',
    ppa: 'Owner manages',
  },
  {
    feature: 'Resale complexity',
    cash: 'Clean — system is an asset',
    lease: 'Buyer must assume or you buy out',
    ppa: 'Buyer must assume or you buy out',
    loan: 'Pay off or transfer',
  },
];

function Check() {
  return <CheckCircle size={18} className="text-emerald-600" aria-label="Yes" />;
}
function X() {
  return <XCircle size={18} className="text-red-400" aria-label="No" />;
}
function Dash() {
  return <Minus size={18} className="text-slate-300" aria-label="Varies" />;
}

export function FinancingComparison() {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="px-4 py-3 text-left font-semibold">Feature</th>
            <th className="px-4 py-3 text-center font-semibold">Cash</th>
            <th className="px-4 py-3 text-center font-semibold">Loan</th>
            <th className="px-4 py-3 text-center font-semibold">Lease</th>
            <th className="px-4 py-3 text-center font-semibold">PPA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-3 font-medium text-slate-800">{row.feature}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.cash}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.loan}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.lease}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.ppa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
