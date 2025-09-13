export default function GateBadges({ pfte, esec, cig, fvoe }:{
  pfte: 'OK' | 'KO', esec: 'OK' | 'KO', cig: string, fvoe: string
}) {
  const pill = (label:string, state:string) => (
    <span className={`text-xs px-2 py-0.5 rounded border ${state==='OK' || state==='ATTIVO' ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}`}>
      {label}: {state}
    </span>
  );
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {pill('PFTE', pfte)}
      {pill('Esecutivo', esec)}
      {pill('CIG', cig)}
      {pill('FVOE', fvoe)}
    </div>
  );
}
