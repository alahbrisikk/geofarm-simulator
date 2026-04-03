export interface Strategy {
  id: string;
  name: string;
  description: string;
  impact: string;
}

export const strategies: Strategy[] = [
  {
    id: 'irigasi',
    name: 'Irigasi Teknis Presisi',
    description: 'Sistem penyediaan air buatan untuk memitigasi defisit curah hujan pada lahan kering.',
    impact: 'Meningkatkan ketersediaan air secara signifikan pada wilayah dengan curah hujan rendah.'
  },
  {
    id: 'pupuk-organik',
    name: 'Aplikasi Pupuk Organik',
    description: 'Pemberian bahan organik untuk meningkatkan kapasitas tukar kation dan struktur tanah.',
    impact: 'Memperbaiki kualitas tanah marginal dan meningkatkan retensi nutrisi tanaman.'
  },
  {
    id: 'terasering',
    name: 'Konservasi Terasering',
    description: 'Pembuatan teras-teras pada lahan miring untuk mereduksi laju limpasan permukaan (run-off).',
    impact: 'Memitigasi risiko erosi tanah secara efektif pada topografi curam.'
  },
  {
    id: 'mulsa',
    name: 'Pemasangan Mulsa',
    description: 'Penutupan permukaan tanah untuk menjaga evaporasi dan menekan pertumbuhan gulma.',
    impact: 'Menjaga stabilitas suhu dan kelembapan tanah pada kondisi iklim panas.'
  },
  {
    id: 'varietas-tahan-kering',
    name: 'Varietas Unggul Adaptif',
    description: 'Penggunaan benih hasil rekayasa genetika yang memiliki toleransi tinggi terhadap cekaman kekeringan.',
    impact: 'Meningkatkan resiliensi tanaman terhadap fluktuasi iklim ekstrem.'
  }
];
