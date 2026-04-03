import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Map as MapIcon, 
  BarChart3, 
  BookOpen, 
  Info, 
  Menu, 
  X,
  ChevronRight,
  Globe,
  Sprout,
  Zap,
  Trophy,
  Thermometer,
  Droplets,
  CloudRain,
  Layers,
  Mountain,
  ArrowUp,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data & Utils
import { regions, Region } from './data/regions';
import { crops, Crop } from './data/crops';
import { strategies, Strategy } from './data/strategies';
import { runSimulation, SimulationResult } from './utils/simulator';
import { glossary } from './data/glossary';
import { challenges } from './data/challenges';

// Components (to be implemented)
// ...

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'concept' | 'simulator' | 'comparison' | 'challenge' | 'about' | 'glossary'>('home');
  const [preSelectedRegionId, setPreSelectedRegionId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigate = (section: any, regionId: string | null = null) => {
    setActiveSection(section);
    setPreSelectedRegionId(regionId);
    setIsMenuOpen(false);
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-800 hidden sm:block">
                GeoFarm <span className="text-primary">Simulator</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'concept', label: 'Eksplorasi Konsep' },
                { id: 'simulator', label: 'Simulasi Digital' },
                { id: 'comparison', label: 'Analisis Komparatif' },
                { id: 'challenge', label: 'Uji Kompetensi' },
                { id: 'glossary', label: 'Glosarium' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => navigate('simulator')}
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
              >
                Mulai Eksplorasi
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { id: 'home', label: 'Beranda' },
                  { id: 'concept', label: 'Konsep Dasar' },
                  { id: 'simulator', label: 'Simulasi Utama' },
                  { id: 'challenge', label: 'Mode Tantangan' },
                  { id: 'glossary', label: 'Glosarium' },
                  { id: 'about', label: 'Tentang Kami' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && <HomeSection onStart={() => navigate('simulator')} onLearn={() => navigate('concept')} />}
          {activeSection === 'concept' && <ConceptSection />}
          {activeSection === 'simulator' && <SimulatorSection initialRegionId={preSelectedRegionId} />}
          {activeSection === 'comparison' && <ComparisonSection />}
          {activeSection === 'challenge' && <ChallengeSection onStartChallenge={(regionId) => {
            navigate('simulator', regionId);
          }} />}
          {activeSection === 'glossary' && <GlossarySection />}
          {activeSection === 'about' && <AboutSection />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="text-primary w-8 h-8" />
                <span className="font-display font-bold text-2xl tracking-tight">
                  GeoFarm <span className="text-primary">Simulator</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Platform laboratorium digital interaktif yang mengintegrasikan parameter geospasial dengan sistem pertanian cerdas untuk mewujudkan ketahanan pangan berbasis Society 5.0.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Navigasi</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigate('home')} className="hover:text-primary transition-colors">Beranda</button></li>
                <li><button onClick={() => navigate('concept')} className="hover:text-primary transition-colors">Konsep Dasar</button></li>
                <li><button onClick={() => navigate('simulator')} className="hover:text-primary transition-colors">Simulasi Utama</button></li>
                <li><button onClick={() => navigate('challenge')} className="hover:text-primary transition-colors">Tantangan</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Informasi</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigate('about')} className="hover:text-primary transition-colors">Tentang Media</button></li>
                <li><button onClick={() => navigate('glossary')} className="hover:text-primary transition-colors">Glosarium</button></li>
                <li><a href="#" className="hover:text-primary transition-colors">Panduan Guru</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 GeoFarm Simulator. Karya @desaelynisa untuk Lomba Media Pembelajaran NasionalSS.
            </p>
            <div className="flex items-center gap-6 text-slate-500 text-sm">
              <span>Society 5.0</span>
              <span>Smart Learning</span>
              <span>Geografi Digital</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HomeSection({ onStart, onLearn }: { onStart: () => void, onLearn: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden"
    >
      {/* Hero Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase">
                <Zap className="w-4 h-4" /> Inovasi Media Pembelajaran Digital Society 5.0
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1]">
                GeoFarm <span className="text-primary">Simulator</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-xl">
                Eksplorasi sinergi antara variabel geografis dan produktivitas pertanian melalui simulasi pengambilan keputusan berbasis data presisi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={onStart}
                className="group relative bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
              >
                Mulai Simulasi <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onLearn}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg"
              >
                Pelajari Konsep Dasar
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Bergabung dengan <span className="text-slate-900 font-bold">1,200+</span> siswa belajar hari ini
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200" 
                alt="Smart Farming" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Dashboard Aktif</p>
                  <h3 className="text-xl font-bold">Analisis Lahan Digital</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                  <BarChart3 className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="bg-accent/20 p-2 rounded-lg">
                <Thermometer className="text-accent w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Suhu</p>
                <p className="text-sm font-bold text-slate-800">24°C Optimal</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 glass-panel p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="bg-primary/20 p-2 rounded-lg">
                <Droplets className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Kelembapan</p>
                <p className="text-sm font-bold text-slate-800">78% Tinggi</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MapIcon className="w-6 h-6" />, title: 'Analisis Geospasial', desc: 'Identifikasi parameter biofisik wilayah meliputi curah hujan, suhu, dan karakteristik pedologi.' },
            { icon: <Sprout className="w-6 h-6" />, title: 'Optimasi Komoditas', desc: 'Seleksi varietas tanaman yang memiliki tingkat keselarasan ekologis tertinggi dengan wilayah target.' },
            { icon: <BarChart3 className="w-6 h-6" />, title: 'Prediksi Presisi', desc: 'Dapatkan kalkulasi skor kecocokan, potensi hasil panen, dan mitigasi risiko secara instan.' },
            { icon: <BookOpen className="w-6 h-6" />, title: 'Literasi Digital', desc: 'Perkuat pemahaman konsep geografi terapan melalui metode pembelajaran berbasis masalah.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm card-hover"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ConceptSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">Landasan Teoretis</span>
        <h2 className="mt-4 text-4xl lg:text-5xl font-display font-extrabold text-slate-900">Determinisme Geografi & Pertanian Cerdas</h2>
        <p className="mt-6 text-lg text-slate-600">
          Memahami variabel biofisik yang mendasari interaksi kompleks antara ekosistem lingkungan dan keberlanjutan sistem pangan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: <CloudRain />, title: 'Curah Hujan (Presipitasi)', desc: 'Variabel utama yang menentukan ketersediaan air tanah. Setiap tanaman memiliki ambang batas toleransi hidrasi yang spesifik.' },
          { icon: <Thermometer />, title: 'Suhu Udara (Termal)', desc: 'Memengaruhi laju transpirasi dan metabolisme seluler. Ketinggian tempat berbanding terbalik dengan suhu rata-rata harian.' },
          { icon: <Layers />, title: 'Pedologi (Ilmu Tanah)', desc: 'Karakteristik fisik dan kimia tanah (Aluvial, Andosol, dll) menentukan ketersediaan unsur hara dan kapasitas retensi air.' },
          { icon: <Mountain />, title: 'Morfologi Lahan', desc: 'Kemiringan lereng memengaruhi stabilitas tanah dan sistem drainase permukaan (surface run-off).' },
          { icon: <ArrowUp />, title: 'Elevasi (Ketinggian)', desc: 'Menentukan zonasi iklim mikro yang membatasi jenis vegetasi yang dapat tumbuh secara optimal.' },
          { icon: <Droplets />, title: 'Hidrologi Lahan', desc: 'Ketersediaan sumber air permukaan dan air tanah sebagai pendukung utama keberlanjutan siklus tanam.' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-primary/30 transition-all group">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-slate-900 rounded-[40px] p-8 lg:p-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-display font-bold mb-6">Relevansi Society 5.0</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Dalam visi Society 5.0, integrasi antara data geografis dan teknologi AI memungkinkan terciptanya sistem pertanian presisi. Hal ini bertujuan untuk mengoptimalkan hasil produksi sekaligus menjaga kelestarian ekosistem global.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-sm font-medium">Big Data Geospasial</div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-sm font-medium">Pertanian Presisi</div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-sm font-medium">Keberlanjutan Pangan</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
              <p className="text-4xl font-bold text-primary mb-2">95%</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Akurasi Prediksi</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
              <p className="text-4xl font-bold text-secondary mb-2">IoT</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Konektivitas Lahan</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
              <p className="text-4xl font-bold text-accent mb-2">AI</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Analisis Keputusan</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
              <p className="text-4xl font-bold text-white mb-2">Zero</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Food Waste Vision</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SimulatorSection({ initialRegionId }: { initialRegionId?: string | null }) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(
    initialRegionId ? regions.find(r => r.id === initialRegionId) || null : null
  );
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedStrats, setSelectedStrats] = useState<Strategy[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!selectedRegion || !selectedCrop) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = runSimulation(selectedRegion, selectedCrop, selectedStrats);
      setResult(res);
      setIsAnalyzing(false);
      window.scrollTo({ top: document.getElementById('result-panel')?.offsetTop || 0, behavior: 'smooth' });
    }, 1500);
  };

  const toggleStrategy = (strat: Strategy) => {
    if (selectedStrats.find(s => s.id === strat.id)) {
      setSelectedStrats(selectedStrats.filter(s => s.id !== strat.id));
    } else {
      setSelectedStrats([...selectedStrats, strat]);
    }
  };

  const reset = () => {
    setSelectedRegion(null);
    setSelectedCrop(null);
    setSelectedStrats([]);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-extrabold text-slate-900">Laboratorium Simulasi Digital</h2>
        <p className="text-slate-500 mt-2">Konfigurasikan variabel lingkungan dan tentukan intervensi strategis untuk optimasi hasil pertanian.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Configuration */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Region Selection */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">1. Identifikasi Karakteristik Wilayah</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`relative group overflow-hidden rounded-2xl border-2 transition-all text-left ${
                    selectedRegion?.id === region.id ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="h-24 w-full overflow-hidden">
                    <img src={region.visual} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-800">{region.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{region.description}</p>
                  </div>
                  {selectedRegion?.id === region.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* 2. Crop Selection */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">2. Pemilihan Komoditas Budidaya</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
                    selectedCrop?.id === crop.id ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="text-4xl">{crop.icon}</span>
                  <span className="font-bold text-sm text-slate-800">{crop.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 3. Strategy Selection */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">3. Intervensi Teknologi & Strategi</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strategies.map((strat) => (
                <button
                  key={strat.id}
                  onClick={() => toggleStrategy(strat)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${
                    selectedStrats.find(s => s.id === strat.id) ? 'border-accent bg-accent/5' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedStrats.find(s => s.id === strat.id) ? 'bg-accent border-accent' : 'border-slate-300'
                  }`}>
                    {selectedStrats.find(s => s.id === strat.id) && <ChevronRight className="text-white w-3 h-3" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{strat.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{strat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Panel: Summary & Action */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="text-primary w-5 h-5" /> Ringkasan Pilihan
              </h3>
              
              <div className="space-y-6">
                <div className="pb-6 border-b border-white/10">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Wilayah</p>
                  <p className="font-bold text-lg">{selectedRegion?.name || 'Belum dipilih'}</p>
                  {selectedRegion && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/10 rounded text-[10px]">{selectedRegion.parameters.rainfall} Rain</span>
                      <span className="px-2 py-1 bg-white/10 rounded text-[10px]">{selectedRegion.parameters.temperature} Temp</span>
                    </div>
                  )}
                </div>

                <div className="pb-6 border-b border-white/10">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tanaman</p>
                  <p className="font-bold text-lg">{selectedCrop ? `${selectedCrop.icon} ${selectedCrop.name}` : 'Belum dipilih'}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Strategi Aktif</p>
                  <p className="font-bold text-sm">{selectedStrats.length > 0 ? `${selectedStrats.length} Strategi Terpilih` : 'Tanpa Strategi'}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  disabled={!selectedRegion || !selectedCrop || isAnalyzing}
                  onClick={handleAnalyze}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                    !selectedRegion || !selectedCrop 
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      Menganalisis...
                    </>
                  ) : (
                    <>Analisis Sekarang <ChevronRight /></>
                  )}
                </button>
                <button onClick={reset} className="w-full py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                  Reset Simulasi
                </button>
              </div>
            </div>

            {/* Educational Tip */}
            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded-xl text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Tips Geografi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Padi (Oryza sativa) membutuhkan genangan air pada fase awal pertumbuhan. Wilayah dengan curah hujan rendah memerlukan irigasi teknis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Panel */}
      <AnimatePresence>
        {result && (
          <motion.div
            id="result-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20"
          >
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
              <div className="bg-slate-900 p-8 lg:p-12 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold mb-2">Hasil Analisis Simulasi</h3>
                    <p className="text-slate-400">Laporan kecocokan geografis untuk {selectedCrop?.name} di {selectedRegion?.name}.</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-display font-black text-primary mb-1">{result.compatibilityScore}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Skor Kecocokan</div>
                    </div>
                    <div className={`px-6 py-3 rounded-2xl font-bold text-lg ${
                      result.compatibilityScore >= 85 ? 'bg-primary/20 text-primary' : 
                      result.compatibilityScore >= 70 ? 'bg-secondary/20 text-secondary' : 
                      'bg-accent/20 text-accent'
                    }`}>
                      {result.resultCategory}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Potensi Hasil</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${result.yieldPotential === 'Tinggi' ? 'bg-primary' : result.yieldPotential === 'Sedang' ? 'bg-secondary' : 'bg-red-500'}`} />
                      <span className="font-bold text-xl text-slate-800">{result.yieldPotential}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tingkat Risiko</p>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-5 h-5 ${result.riskLevel === 'Tinggi' ? 'text-red-500' : result.riskLevel === 'Sedang' ? 'text-accent' : 'text-primary'}`} />
                      <span className="font-bold text-xl text-slate-800">{result.riskLevel}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Efisiensi Sumber Daya</p>
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${result.resourceEfficiency === 'Tinggi' ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold text-xl text-slate-800">{result.resourceEfficiency}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <BarChart3 className="text-primary w-5 h-5" /> Analisis Geografis
                    </h4>
                    <div className="space-y-6">
                      <p className="text-slate-600 leading-relaxed italic">
                        {result.geoExplanation}
                      </p>
                      <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-primary">
                        <p className="text-sm font-bold text-slate-800 mb-1">Alasan Utama:</p>
                        <p className="text-sm text-slate-600">{result.mainReason}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Leaf className="text-accent w-5 h-5" /> Rekomendasi Strategis
                    </h4>
                    <div className="bg-accent/5 rounded-3xl p-8 border border-accent/10 space-y-6">
                      <div>
                        <p className="text-sm font-bold text-slate-800 mb-2">Saran Perbaikan:</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{result.improvementSuggestion}</p>
                      </div>
                      <div className="pt-6 border-t border-accent/10">
                        <p className="text-sm font-bold text-slate-800 mb-2">Rekomendasi Alternatif:</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{result.alternativeCropRecommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComparisonSection() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [crop1, setCrop1] = useState<Crop>(crops[0]);
  const [crop2, setCrop2] = useState<Crop>(crops[1]);

  const result1 = runSimulation(selectedRegion, crop1, []);
  const result2 = runSimulation(selectedRegion, crop2, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-extrabold text-slate-900">Komparasi Komoditas</h2>
        <p className="mt-4 text-lg text-slate-600">Analisis perbandingan dua varietas tanaman pada zona ekologi yang sama untuk menentukan prioritas budidaya.</p>
      </div>

      <div className="mb-12 flex justify-center">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <span className="text-sm font-bold text-slate-400 uppercase ml-4">Zona Wilayah:</span>
          <select 
            value={selectedRegion.id}
            onChange={(e) => setSelectedRegion(regions.find(r => r.id === e.target.value) || regions[0])}
            className="bg-slate-50 border-none outline-none font-bold text-slate-800 px-4 py-2 rounded-xl cursor-pointer"
          >
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crop 1 */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-8 bg-slate-50 border-b border-slate-100">
            <select 
              value={crop1.id}
              onChange={(e) => setCrop1(crops.find(c => c.id === e.target.value) || crops[0])}
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl font-bold text-xl outline-none"
            >
              {crops.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Skor Kecocokan</p>
                <h4 className={`text-5xl font-display font-black ${result1.compatibilityScore >= 70 ? 'text-primary' : 'text-accent'}`}>{result1.compatibilityScore}</h4>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Kategori</p>
                <span className="font-bold text-lg text-slate-800">{result1.resultCategory}</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Analisis Utama:</p>
              <p className="text-sm text-slate-500 leading-relaxed">{result1.mainReason}</p>
            </div>
          </div>
        </div>

        {/* Crop 2 */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-8 bg-slate-50 border-b border-slate-100">
            <select 
              value={crop2.id}
              onChange={(e) => setCrop2(crops.find(c => c.id === e.target.value) || crops[1])}
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl font-bold text-xl outline-none"
            >
              {crops.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Skor Kecocokan</p>
                <h4 className={`text-5xl font-display font-black ${result2.compatibilityScore >= 70 ? 'text-primary' : 'text-accent'}`}>{result2.compatibilityScore}</h4>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Kategori</p>
                <span className="font-bold text-lg text-slate-800">{result2.resultCategory}</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Analisis Utama:</p>
              <p className="text-sm text-slate-500 leading-relaxed">{result2.mainReason}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-primary/5 p-8 rounded-[32px] border border-primary/10 text-center">
        <h4 className="text-xl font-bold text-slate-800 mb-2">Rekomendasi Komparatif</h4>
        <p className="text-slate-600">
          Berdasarkan parameter geografis {selectedRegion.name}, komoditas 
          <span className="font-bold text-primary mx-1">
            {result1.compatibilityScore >= result2.compatibilityScore ? crop1.name : crop2.name}
          </span> 
          menunjukkan tingkat keselarasan ekologis yang lebih tinggi dibandingkan {result1.compatibilityScore >= result2.compatibilityScore ? crop2.name : crop1.name}.
        </p>
      </div>
    </div>
  );
}

function ChallengeSection({ onStartChallenge }: { onStartChallenge: (regionId: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-display font-extrabold text-slate-900">Misi Analisis Geografis</h2>
        <p className="mt-4 text-lg text-slate-600">Uji kompetensi analisis Anda dalam menyelesaikan berbagai skenario tantangan pertanian di berbagai zona ekologi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{challenge.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{challenge.description}</p>
            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Badge: {challenge.badge}</span>
              <button 
                onClick={() => onStartChallenge(challenge.targetRegionId)}
                className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Mulai <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlossarySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-extrabold text-slate-900">Glosarium Akademik</h2>
        <p className="mt-4 text-lg text-slate-600">Perbendaharaan istilah teknis dalam lingkup geografi fisik dan sistem pertanian modern.</p>
      </div>

      <div className="mb-12">
        <input 
          type="text" 
          placeholder="Cari istilah (misal: aluvial, irigasi...)" 
          className="w-full p-6 rounded-2xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGlossary.map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-3">{item.term}</h3>
            <p className="text-slate-600 leading-relaxed">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Manifesto Inovasi</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            GeoFarm Simulator lahir dari urgensi transformasi media pembelajaran geografi yang seringkali terjebak dalam paradigma tekstual. Kami menghadirkan laboratorium digital yang menjembatani teori akademik dengan aplikasi praktis pengambilan keputusan di era Society 5.0.
          </p>
        </section>

        <section className="bg-primary/5 p-8 lg:p-12 rounded-[40px] border border-primary/10">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Visi Smart Learning & Society 5.0</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Platform ini mengintegrasikan kecerdasan manusia dengan data geospasial untuk menciptakan solusi berkelanjutan. Fokus kami adalah membekali generasi muda dengan kemampuan berpikir kritis dan literasi data guna menghadapi tantangan ketahanan pangan global.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Problem Solving Berbasis Data</h4>
              <p className="text-sm text-slate-500">Melatih kemampuan sintesis informasi geografis untuk solusi pertanian.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Integrasi Teknologi Presisi</h4>
              <p className="text-sm text-slate-500">Membiasakan pemanfaatan teknologi digital dalam pengelolaan sumber daya alam.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Dampak Edukasional</h2>
          <ul className="space-y-6">
            {[
              { title: 'Dimensi Kognitif Siswa', desc: 'Meningkatkan kemampuan analisis spasial dan pemahaman ekosistem secara holistik.' },
              { title: 'Instrumentalitas Guru', desc: 'Menyediakan instrumen ajar adaptif yang selaras dengan Kurikulum Merdeka dan literasi digital.' },
              { title: 'Ekosistem Pendidikan', desc: 'Menjadi pionir dalam pengembangan media pembelajaran geografi berbasis simulasi di tingkat nasional.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0 font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
