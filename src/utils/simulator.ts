import { Region } from '../data/regions';
import { Crop } from '../data/crops';
import { Strategy } from '../data/strategies';

export interface SimulationResult {
  compatibilityScore: number;
  resultCategory: 'Sangat Cocok' | 'Cocok' | 'Cukup Cocok' | 'Kurang Cocok' | 'Tidak Cocok';
  yieldPotential: 'Tinggi' | 'Sedang' | 'Rendah';
  riskLevel: 'Tinggi' | 'Sedang' | 'Rendah';
  resourceEfficiency: 'Tinggi' | 'Sedang' | 'Rendah';
  geoExplanation: string;
  mainReason: string;
  improvementSuggestion: string;
  alternativeCropRecommendation: string;
}

export function runSimulation(
  region: Region,
  crop: Crop,
  selectedStrategies: Strategy[]
): SimulationResult {
  let score = 0;
  const analysisPoints: string[] = [];
  const suggestions: string[] = [];

  // 1. Rainfall (Max 20)
  if (crop.requirements.idealRainfall.includes(region.parameters.rainfall)) {
    score += 20;
  } else {
    analysisPoints.push(`Curah hujan ${region.parameters.rainfall} tidak selaras dengan kebutuhan ${crop.name}.`);
    if (region.parameters.rainfall === 'Rendah') {
      suggestions.push('Implementasikan sistem irigasi teknis untuk memenuhi kebutuhan hidrasi tanaman.');
    }
  }

  // 2. Temperature (Max 20)
  if (crop.requirements.idealTemperature.includes(region.parameters.temperature)) {
    score += 20;
  } else {
    analysisPoints.push(`Suhu ${region.parameters.temperature} menghambat metabolisme optimal ${crop.name}.`);
  }

  // 3. Soil Type (Max 15)
  if (crop.requirements.idealSoil.includes(region.parameters.soilType)) {
    score += 15;
  } else {
    analysisPoints.push(`Karakteristik tanah ${region.parameters.soilType} kurang mendukung sistem perakaran.`);
    suggestions.push('Gunakan pupuk organik untuk meningkatkan kualitas hara dan struktur tanah.');
  }

  // 4. Topography (Max 15)
  if (crop.requirements.idealTopography.includes(region.parameters.topography)) {
    score += 15;
  } else {
    analysisPoints.push(`Topografi ${region.parameters.topography} meningkatkan kompleksitas pengelolaan lahan.`);
    if (region.parameters.topography === 'Curam') {
      suggestions.push('Wajib menerapkan teknik terasering guna memitigasi laju erosi tanah.');
    }
  }

  // 5. Altitude (Max 15)
  if (crop.requirements.idealAltitude.includes(region.parameters.altitude)) {
    score += 15;
  } else {
    analysisPoints.push(`Ketinggian ${region.parameters.altitude} memengaruhi tekanan parsial gas yang tidak ideal.`);
  }

  // 6. Water Availability (Max 15)
  if (crop.requirements.idealWater.includes(region.parameters.waterAvailability)) {
    score += 15;
  } else {
    analysisPoints.push(`Ketersediaan air yang ${region.parameters.waterAvailability} menjadi faktor pembatas pertumbuhan.`);
  }

  // Strategy Impacts
  selectedStrategies.forEach(strategy => {
    if (strategy.id === 'irigasi' && region.parameters.waterAvailability === 'Terbatas') {
      score += 12;
      analysisPoints.push('Intervensi irigasi berhasil memitigasi defisit air.');
    }
    if (strategy.id === 'terasering' && region.parameters.topography === 'Curam') {
      score += 12;
      analysisPoints.push('Terasering secara efektif mereduksi risiko degradasi lahan.');
    }
    if (strategy.id === 'pupuk-organik') {
      score += 5;
    }
    if (strategy.id === 'varietas-tahan-kering' && region.parameters.rainfall === 'Rendah') {
      score += 8;
      analysisPoints.push('Penggunaan varietas adaptif meningkatkan resiliensi tanaman.');
    }
    if (strategy.id === 'mulsa' && region.parameters.temperature === 'Panas') {
      score += 5;
      analysisPoints.push('Mulsa membantu menjaga stabilitas termal tanah.');
    }
  });

  // Cap score at 100
  const compatibilityScore = Math.min(score, 100);

  // Determine Category
  let resultCategory: SimulationResult['resultCategory'] = 'Tidak Cocok';
  if (compatibilityScore >= 85) resultCategory = 'Sangat Cocok';
  else if (compatibilityScore >= 70) resultCategory = 'Cocok';
  else if (compatibilityScore >= 50) resultCategory = 'Cukup Cocok';
  else if (compatibilityScore >= 30) resultCategory = 'Kurang Cocok';

  // Risk and Yield
  const riskLevel = compatibilityScore > 80 ? 'Rendah' : compatibilityScore > 50 ? 'Sedang' : 'Tinggi';
  const yieldPotential = compatibilityScore > 85 ? 'Tinggi' : compatibilityScore > 60 ? 'Sedang' : 'Rendah';
  const resourceEfficiency = selectedStrategies.length > 2 ? 'Rendah' : 'Tinggi';

  const geoExplanation = `Analisis geografis menunjukkan bahwa wilayah ${region.name} memiliki karakteristik ${region.parameters.soilType} dengan iklim ${region.parameters.temperature}. Hal ini memberikan pengaruh langsung terhadap siklus hidup ${crop.name}.`;
  
  const mainReason = analysisPoints.length > 0 
    ? analysisPoints[0] 
    : `${crop.name} memiliki keselarasan ekologis yang sangat tinggi dengan parameter wilayah ini.`;

  const improvementSuggestion = suggestions.length > 0 
    ? suggestions.join(' ') 
    : 'Pertahankan manajemen lahan yang ada dan lakukan monitoring berkala terhadap serangan hama.';

  // Recommendation logic
  const alternativeCropRecommendation = compatibilityScore < 70 
    ? 'Berdasarkan parameter wilayah, Anda disarankan untuk mempertimbangkan komoditas yang lebih adaptif terhadap kondisi lingkungan setempat.'
    : 'Komoditas ini sudah sangat ideal, namun diversifikasi tanaman sela dapat dipertimbangkan untuk menjaga kesehatan tanah.';

  return {
    compatibilityScore,
    resultCategory,
    yieldPotential,
    riskLevel,
    resourceEfficiency,
    geoExplanation,
    mainReason,
    improvementSuggestion,
    alternativeCropRecommendation
  };
}
