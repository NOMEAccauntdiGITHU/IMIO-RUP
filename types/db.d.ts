export type Categoria = 'LAVORI' | 'SERVIZI' | 'FORNITURE';

export type HomeRow = {
  cup: string;
  titolo: string;
  categoria: Categoria;
  uo: string;
  rup_referente: string;
  importo_qe: number | null;
  importo_contrattuale: number | null;
  fase_attuale: string;
  gate_pfte: 'OK' | 'KO';
  gate_esecutivo: 'OK' | 'KO';
  cig_stato: string;
  fvoe_stato: string;
  contratto_stato: string;
  sal_percent: number | null;
  varianti_num: number;
  varianti_totale: number | null;
  collaudo_stato: string;
  trasparenza_sync: string;
  anno_riferimento: number;
};

export type ProgettoTree = any;
