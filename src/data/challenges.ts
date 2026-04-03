export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetRegionId: string;
  minScore: number;
  badge: string;
}

export const challenges: Challenge[] = [
  {
    id: 'dry-land-master',
    title: 'Resiliensi Lahan Marginal',
    description: 'Tentukan kombinasi komoditas dan intervensi teknologi yang tepat untuk mengoptimalkan produksi di wilayah dengan defisit air ekstrem (Skor > 80).',
    targetRegionId: 'dry-hot',
    minScore: 80,
    badge: 'Analis Lahan Kering'
  },
  {
    id: 'erosion-saver',
    title: 'Konservasi Lereng Curam',
    description: 'Terapkan teknik konservasi tanah dan air yang efektif untuk memitigasi risiko degradasi lahan pada topografi curam (Skor > 85).',
    targetRegionId: 'steep-slope',
    minScore: 85,
    badge: 'Pakar Konservasi Lahan'
  },
  {
    id: 'highland-expert',
    title: 'Agroklimatologi Dataran Tinggi',
    description: 'Identifikasi komoditas bernilai tinggi yang memiliki tingkat adaptabilitas optimal terhadap mikroklimat dataran tinggi vulkanik (Skor > 90).',
    targetRegionId: 'highland-cool',
    minScore: 90,
    badge: 'Spesialis Dataran Tinggi'
  }
];
