export interface Crop {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: {
    idealRainfall: ('Rendah' | 'Sedang' | 'Tinggi')[];
    idealTemperature: ('Sejuk' | 'Hangat' | 'Panas')[];
    idealSoil: ('Aluvial' | 'Regosol' | 'Andosol' | 'Latosol' | 'Grumosol')[];
    idealTopography: ('Datar' | 'Bergelombang' | 'Curam')[];
    idealAltitude: ('Rendah' | 'Sedang' | 'Tinggi')[];
    idealWater: ('Terbatas' | 'Cukup' | 'Melimpah')[];
    riskTolerance: 'Rendah' | 'Sedang' | 'Tinggi';
    notes: string;
  };
}

export const crops: Crop[] = [
  {
    id: 'padi',
    name: 'Padi Sawah',
    description: 'Komoditas pangan utama yang memerlukan genangan air stabil dan lahan dengan topografi datar.',
    icon: '🌾',
    requirements: {
      idealRainfall: ['Sedang', 'Tinggi'],
      idealTemperature: ['Hangat', 'Panas'],
      idealSoil: ['Aluvial', 'Latosol'],
      idealTopography: ['Datar'],
      idealAltitude: ['Rendah', 'Sedang'],
      idealWater: ['Melimpah'],
      riskTolerance: 'Rendah',
      notes: 'Sangat sensitif terhadap defisit air pada fase primordia.'
    }
  },
  {
    id: 'jagung',
    name: 'Jagung Hibrida',
    description: 'Tanaman palawija yang memiliki adaptabilitas tinggi terhadap kondisi lahan dengan ketersediaan air terbatas.',
    icon: '🌽',
    requirements: {
      idealRainfall: ['Rendah', 'Sedang'],
      idealTemperature: ['Hangat', 'Panas'],
      idealSoil: ['Regosol', 'Latosol', 'Grumosol'],
      idealTopography: ['Datar', 'Bergelombang'],
      idealAltitude: ['Rendah', 'Sedang'],
      idealWater: ['Cukup', 'Melimpah'],
      riskTolerance: 'Tinggi',
      notes: 'Memerlukan drainase tanah yang baik untuk mencegah pembusukan akar.'
    }
  },
  {
    id: 'kentang',
    name: 'Kentang Granola',
    description: 'Tanaman umbi-umbian yang memerlukan suhu rendah dan tanah gembur kaya bahan organik.',
    icon: '🥔',
    requirements: {
      idealRainfall: ['Sedang'],
      idealTemperature: ['Sejuk'],
      idealSoil: ['Andosol'],
      idealTopography: ['Datar', 'Bergelombang'],
      idealAltitude: ['Tinggi'],
      idealWater: ['Cukup'],
      riskTolerance: 'Sedang',
      notes: 'Optimal pada ketinggian di atas 1000 mdpl dengan suhu harian 15-20°C.'
    }
  },
  {
    id: 'teh',
    name: 'Teh (Camellia sinensis)',
    description: 'Tanaman perkebunan yang membutuhkan kelembapan udara tinggi dan curah hujan merata sepanjang tahun.',
    icon: '🍃',
    requirements: {
      idealRainfall: ['Tinggi'],
      idealTemperature: ['Sejuk', 'Hangat'],
      idealSoil: ['Andosol', 'Latosol'],
      idealTopography: ['Bergelombang', 'Curam'],
      idealAltitude: ['Tinggi'],
      idealWater: ['Cukup', 'Melimpah'],
      riskTolerance: 'Sedang',
      notes: 'Memerlukan kemiringan lahan tertentu untuk sistem drainase alami.'
    }
  },
  {
    id: 'cabai',
    name: 'Cabai Merah Besar',
    description: 'Hortikultura yang memerlukan intensitas cahaya matahari tinggi dan manajemen hara yang intensif.',
    icon: '🌶️',
    requirements: {
      idealRainfall: ['Sedang'],
      idealTemperature: ['Hangat', 'Panas'],
      idealSoil: ['Aluvial', 'Regosol', 'Latosol'],
      idealTopography: ['Datar', 'Bergelombang'],
      idealAltitude: ['Rendah', 'Sedang', 'Tinggi'],
      idealWater: ['Cukup'],
      riskTolerance: 'Rendah',
      notes: 'Rentan terhadap serangan patogen pada kelembapan udara yang terlalu tinggi.'
    }
  },
  {
    id: 'stroberi',
    name: 'Stroberi Garden',
    description: 'Tanaman buah subtropis yang sangat bergantung pada suhu dingin untuk proses pembungaan.',
    icon: '🍓',
    requirements: {
      idealRainfall: ['Sedang'],
      idealTemperature: ['Sejuk'],
      idealSoil: ['Andosol'],
      idealTopography: ['Datar', 'Bergelombang'],
      idealAltitude: ['Tinggi'],
      idealWater: ['Cukup'],
      riskTolerance: 'Rendah',
      notes: 'Memerlukan perlindungan dari hujan berlebih untuk menjaga kualitas buah.'
    }
  },
  {
    id: 'kopi',
    name: 'Kopi Arabika',
    description: 'Komoditas perkebunan bernilai ekonomi tinggi yang tumbuh optimal di kawasan pegunungan.',
    icon: '☕',
    requirements: {
      idealRainfall: ['Sedang', 'Tinggi'],
      idealTemperature: ['Sejuk', 'Hangat'],
      idealSoil: ['Andosol', 'Latosol'],
      idealTopography: ['Bergelombang', 'Curam'],
      idealAltitude: ['Sedang', 'Tinggi'],
      idealWater: ['Cukup'],
      riskTolerance: 'Sedang',
      notes: 'Kualitas cita rasa sangat dipengaruhi oleh ketinggian tempat penanaman.'
    }
  },
  {
    id: 'tebu',
    name: 'Tebu (Saccharum officinarum)',
    description: 'Tanaman penghasil gula yang membutuhkan periode kering yang jelas untuk proses pemasakan rendemen.',
    icon: '🎋',
    requirements: {
      idealRainfall: ['Sedang'],
      idealTemperature: ['Hangat', 'Panas'],
      idealSoil: ['Aluvial', 'Regosol', 'Grumosol'],
      idealTopography: ['Datar'],
      idealAltitude: ['Rendah'],
      idealWater: ['Cukup'],
      riskTolerance: 'Tinggi',
      notes: 'Membutuhkan penyinaran matahari penuh minimal 12 jam sehari.'
    }
  }
];
