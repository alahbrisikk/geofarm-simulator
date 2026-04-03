import { 
  CloudRain, 
  Thermometer, 
  Mountain, 
  Droplets, 
  Layers, 
  ArrowUp, 
  Wind, 
  AlertTriangle 
} from 'lucide-react';

export interface Region {
  id: string;
  name: string;
  description: string;
  parameters: {
    rainfall: 'Rendah' | 'Sedang' | 'Tinggi';
    temperature: 'Sejuk' | 'Hangat' | 'Panas';
    soilType: 'Aluvial' | 'Regosol' | 'Andosol' | 'Latosol' | 'Grumosol';
    topography: 'Datar' | 'Bergelombang' | 'Curam';
    altitude: 'Rendah' | 'Sedang' | 'Tinggi';
    waterAvailability: 'Terbatas' | 'Cukup' | 'Melimpah';
    humidity: 'Rendah' | 'Sedang' | 'Tinggi';
    environmentalRisk: string;
  };
  visual: string;
}

export const regions: Region[] = [
  {
    id: 'lowland-wet',
    name: 'Dataran Rendah Aluvial (Basah)',
    description: 'Wilayah dataran rendah dengan karakteristik tanah aluvial yang subur dan ketersediaan air melimpah sepanjang tahun. Sangat ideal untuk komoditas yang membutuhkan hidrasi tinggi.',
    parameters: {
      rainfall: 'Tinggi',
      temperature: 'Hangat',
      soilType: 'Aluvial',
      topography: 'Datar',
      altitude: 'Rendah',
      waterAvailability: 'Melimpah',
      humidity: 'Tinggi',
      environmentalRisk: 'Potensi genangan air pada intensitas hujan ekstrem.'
    },
    visual: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'dry-hot',
    name: 'Lahan Kering Marginal (Panas)',
    description: 'Kawasan dengan paparan radiasi matahari tinggi dan curah hujan terbatas. Memerlukan manajemen air yang presisi untuk menjaga keberlanjutan produksi pertanian.',
    parameters: {
      rainfall: 'Rendah',
      temperature: 'Panas',
      soilType: 'Regosol',
      topography: 'Datar',
      altitude: 'Rendah',
      waterAvailability: 'Terbatas',
      humidity: 'Rendah',
      environmentalRisk: 'Risiko kekeringan meteorologis dan degradasi hara tanah.'
    },
    visual: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'highland-cool',
    name: 'Dataran Tinggi Vulkanik (Sejuk)',
    description: 'Wilayah pegunungan dengan tanah andosol yang kaya bahan organik. Memiliki mikroklimat sejuk yang mendukung budidaya tanaman hortikultura bernilai tinggi.',
    parameters: {
      rainfall: 'Sedang',
      temperature: 'Sejuk',
      soilType: 'Andosol',
      topography: 'Bergelombang',
      altitude: 'Tinggi',
      waterAvailability: 'Cukup',
      humidity: 'Tinggi',
      environmentalRisk: 'Risiko erosi permukaan pada lahan dengan kemiringan tertentu.'
    },
    visual: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'steep-slope',
    name: 'Lereng Pegunungan (Curam)',
    description: 'Kawasan dengan topografi curam yang rawan terhadap proses denudasional. Memerlukan intervensi teknik konservasi tanah dan air yang intensif.',
    parameters: {
      rainfall: 'Tinggi',
      temperature: 'Hangat',
      soilType: 'Latosol',
      topography: 'Curam',
      altitude: 'Sedang',
      waterAvailability: 'Cukup',
      humidity: 'Tinggi',
      environmentalRisk: 'Risiko tinggi erosi tanah dan longsor lahan.'
    },
    visual: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'medium-stable',
    name: 'Wilayah Transisi (Stabil)',
    description: 'Kawasan dengan profil geografis yang seimbang, memiliki variasi topografi ringan dan kondisi iklim yang stabil untuk diversifikasi pertanian.',
    parameters: {
      rainfall: 'Sedang',
      temperature: 'Hangat',
      soilType: 'Grumosol',
      topography: 'Bergelombang',
      altitude: 'Sedang',
      waterAvailability: 'Cukup',
      humidity: 'Sedang',
      environmentalRisk: 'Risiko fluktuasi ketersediaan air musiman.'
    },
    visual: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=800'
  }
];
