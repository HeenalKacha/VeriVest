import React from 'react';
import { RiskLevel, Severity } from '../../types';

interface RiskBadgeProps {
  level?: RiskLevel;
  severity?: Severity;
  score?: number;
  label?: string;
  className?: string;
  dot?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  severity,
  score,
  label,
  className = '',
  dot = true,
}) => {
  let text = label || '';
  let colorClasses = '';
  let dotColor = '';

  if (level === 'HIGH' || severity === 'critical') {
    text = text || (severity === 'critical' ? 'CRITICAL SEVERITY' : score !== undefined ? `HIGH RISK : ${score}/100` : 'HIGH RISK DETECTED');
    colorClasses = 'text-[#991B1B] bg-[#FEE2E2] border-[rgba(153,27,27,0.25)]';
    dotColor = 'bg-[#991B1B]';
  } else if (level === 'SUSPICIOUS' || severity === 'high' || severity === 'warning') {
    text = text || (severity === 'high' ? 'HIGH SEVERITY' : severity === 'warning' ? 'WARNING / AMBER' : score !== undefined ? `SUSPICIOUS : ${score}/100` : 'SUSPICIOUS CLAIM');
    colorClasses = 'text-[#B45309] bg-[#FEF3C7] border-[rgba(180,83,9,0.25)]';
    dotColor = 'bg-[#B45309]';
  } else {
    text = text || (severity === 'info' ? 'INFORMATIONAL' : score !== undefined ? `VERIFIED : 0${score}/100` : 'VERIFIED / LOW RISK');
    colorClasses = 'text-[#2D6A4F] bg-[#E8F5EE] border-[rgba(45,106,79,0.25)]';
    dotColor = 'bg-[#2D6A4F]';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] border text-[11px] font-mono tracking-wider font-semibold uppercase leading-none h-6 whitespace-nowrap ${colorClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {text}
    </span>
  );
};
