'use client';

interface RiskLevelCardProps {
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
  conclusion: string;
}

export function RiskLevelCard({ probability, riskLevel, conclusion }: RiskLevelCardProps) {
  const getRiskInfo = () => {
    switch (riskLevel) {
      case 'high':
        return {
          title: 'High Risk',
          description: 'Elevated diabetes risk detected. Immediate consultation recommended.',
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          bgColor: 'bg-red-100',
          icon: '🔴',
        };
      case 'medium':
        return {
          title: 'Moderate Risk',
          description: 'Some risk factors present. Regular monitoring advised.',
          color: 'bg-amber-50 border-amber-200',
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-100',
          icon: '🟡',
        };
      default:
        return {
          title: 'Low Risk',
          description: 'Good health indicators. Maintain current lifestyle.',
          color: 'bg-emerald-50 border-emerald-200',
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-100',
          icon: '🟢',
        };
    }
  };

  const info = getRiskInfo();

  return (
    <div className={`rounded-lg border p-6 ${info.color}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">{info.icon}</div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${info.textColor}`}>{info.title}</h3>
          <p className="text-sm text-gray-700 mt-1">{info.description}</p>
        </div>
      </div>

      <div className={`${info.bgColor} rounded px-3 py-2 text-center`}>
        <p className={`${info.textColor} font-bold text-sm`}>{conclusion}</p>
      </div>
    </div>
  );
}
