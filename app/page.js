'use client';
import React, { useState, useCallback, useMemo } from 'react';

// Icons - inline SVGs to avoid import issues
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    loader: <path d="M12 2v4m0 12v4m-8-10H2m20 0h-2m-2.93-6.36l-1.41 1.41m-9.9 9.9l-1.41 1.41m0-12.73l1.41 1.41m9.9 9.9l1.41 1.41" />,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    refresh: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
    truck: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
    gift: <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>,
    sparkles: <><path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" /></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    chevronUp: <polyline points="18 15 12 9 6 15" />,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    barChart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
    dollarSign: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

export default function ArkBundleHub() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [products, setProducts] = useState([]);
  const [saved, setSaved] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('discover');
  const [sort, setSort] = useState('score');
  const [hotOnly, setHotOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [notif, setNotif] = useState(null);
  const [bundleItems, setBundleItems] = useState([]);
  const [bundleName, setBundleName] = useState('');
  const [markup, setMarkup] = useState(2.5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showVersion, setShowVersion] = useState(false);

  const ADMIN_PASSWORD = 'Ark2024Global!';

  const categories = [
    { id: 'trending', name: '🔥 Trending', searches: ['TikTok viral products right now', 'Amazon movers shakers today', 'trending products this month'] },
    { id: 'kitchen', name: '🍳 Kitchen', searches: ['kitchen gadgets TikTok viral now', 'cooking accessories trending this week', 'viral kitchen organization'] },
    { id: 'home', name: '🏠 Home', searches: ['home organization TikTok trending', 'storage solutions viral now', 'home decor trending this month'] },
    { id: 'cleaning', name: '🧹 Cleaning', searches: ['cleaning products TikTok viral now', 'viral cleaning gadgets this week', 'cleaning hacks products trending'] },
    { id: 'beauty', name: '💄 Beauty', searches: ['beauty tools TikTok viral this month', 'skincare gadgets trending now', 'viral makeup accessories'] },
    { id: 'tech', name: '📱 Tech', searches: ['tech gadgets TikTok viral now', 'phone accessories trending this week', 'viral desk gadgets'] },
    { id: 'pets', name: '🐕 Pets', searches: ['pet products TikTok viral now', 'dog accessories trending today', 'viral pet gadgets'] },
    { id: 'fitness', name: '💪 Fitness', searches: ['fitness gadgets TikTok trending', 'workout accessories viral now', 'trending gym equipment'] },
    { id: 'toys', name: '🎮 Toys', searches: ['fidget toys TikTok viral now', 'sensory toys trending this month', 'stress relief toys viral'] },
    { id: 'car', name: '🚗 Car', searches: ['car accessories TikTok viral now', 'car gadgets trending today', 'viral auto organization'] },
  ];

  const notify = useCallback((m, t = 'ok') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  const scan = useCallback(async (searchQuery = '', categoryData = null) => {
    if (scanning) return;
    setScanning(true);
    setError('');
    setProducts([]);
    
    const cat = categoryData || categories[0];
    setStatus(`Searching TikTok, Instagram & Amazon...`);

    // Get current date for fresh results
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentYear = now.getFullYear();
    const currentDate = `${currentMonth} ${currentYear}`;

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are a JSON-only API. Your response must be ONLY valid JSON, nothing else.

Search TikTok, Instagram, and Amazon for trending ${cat.name.replace(/🔥|🍳|🏠|🧹|💄|📱|🐕|💪|🎮|🚗/g, '').trim()} products in ${currentMonth} ${currentYear}.

Find 8 real products.

RESPONSE FORMAT - Copy this EXACTLY and fill in real data:
[
{"name":"Real Product Name","category":"${cat.name}","emoji":"📦","desc":"Why trending","asin":"B08ABC123","price":{"cost":8,"sell":25,"margin":68,"roi":213},"bsr":{"rank":3500,"category":"Home","trend":"Rising","monthlySales":600},"reviews":{"count":800,"rating":4.3},"competition":{"sellers":45,"level":"Medium"},"viral":{"score":82,"platform":"Instagram","reason":"Viral reason","views":"2M"},"market":{"urgency":"High"},"suppliers":{"alibaba":7,"cj":9},"profitability":{"breakeven":40,"monthly":1800,"yearly":21600},"bundleWith":["Item A","Item B"]}
]

DO NOT include any explanation, text, or commentary. ONLY return the JSON array starting with [ and ending with ].`
        })
      });

      const data = await res.json();
      
      console.log('API Response:', data); // Debug log
      
      // Better error handling
      if (data.error) {
        throw new Error(data.error);
      }
      
      let txt = '';
      if (data.content) {
        for (const block of data.content) {
          if (block.type === 'text') txt += block.text;
        }
      }

      console.log('Extracted text:', txt); // Debug log

      let productArray = null;
      
      // Strip any text before [ and after ]
      const startIdx = txt.indexOf('[');
      const endIdx = txt.lastIndexOf(']');
      
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const jsonStr = txt.substring(startIdx, endIdx + 1);
        console.log('Extracted JSON string:', jsonStr);
        
        try {
          productArray = JSON.parse(jsonStr);
          if (!Array.isArray(productArray) || productArray.length === 0 || !productArray[0].name) {
            productArray = null;
          }
        } catch (e) {
          console.log('JSON parse failed:', e);
        }
      }
      
      // Fallback: Try regex matching
      if (!productArray) {
        const jsonMatches = txt.match(/\[[\s\S]*?\]/g);
        
        if (jsonMatches) {
          for (const match of jsonMatches) {
            try {
              const parsed = JSON.parse(match);
              if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
                productArray = parsed;
                break;
              }
            } catch (e) {
              console.log('Parse attempt failed:', e);
            }
          }
        }
      }

      if (productArray && productArray.length > 0) {
        const prods = productArray.map((p, i) => ({
          ...p,
          id: `p-${Date.now()}-${i}`,
          price: p.price || { cost: 10, sell: 30, margin: 67, roi: 200 },
          viral: p.viral || { score: 75, platform: 'TikTok' },
          market: p.market || { urgency: 'Medium', demand: 'Medium' },
          bsr: p.bsr || {},
          reviews: p.reviews || {},
          competition: p.competition || { level: 'Medium' },
        }));
        setProducts(prods);
        notify(`Found ${prods.length} products!`);
      } else {
        console.error('No valid products found in response');
        throw new Error('AI returned no products. Try different search terms or category.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed - check console for details');
      notify('Search failed', 'err');
    } finally {
      setScanning(false);
      setStatus('');
    }
  }, [scanning, categories, notify]);

  const toggleSave = useCallback((p) => {
    setSaved(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
    notify(saved.find(x => x.id === p.id) ? 'Removed' : 'Saved!');
  }, [saved, notify]);

  const toggleBundle = useCallback((p) => {
    setBundleItems(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  }, []);

  const createBundle = useCallback(() => {
    if (bundleItems.length < 2 || !bundleName.trim()) return notify('Need 2+ items & name', 'err');
    const cost = bundleItems.reduce((s, p) => s + (p.price?.cost || 10), 0);
    const price = Math.round(cost * markup * 100) / 100;
    setBundles(prev => [...prev, { id: `b-${Date.now()}`, name: bundleName, items: [...bundleItems], cost, price, margin: Math.round((1 - cost / price) * 100) }]);
    setBundleItems([]);
    setBundleName('');
    notify('Bundle created!');
  }, [bundleItems, bundleName, markup, notify]);

  const isSaved = useCallback(id => saved.some(p => p.id === id), [saved]);
  const inBundle = useCallback(id => bundleItems.some(p => p.id === id), [bundleItems]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (hotOnly) result = result.filter(p => p.market?.urgency === 'High');
    return result.sort((a, b) => sort === 'score' ? (b.viral?.score || 0) - (a.viral?.score || 0) : (b.price?.margin || 0) - (a.price?.margin || 0));
  }, [products, hotOnly, sort]);

  // LOGIN SCREEN
  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl mb-6">
              <Icon name="gift" size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Ark Bundle Hub</h1>
            <p className="text-purple-300">AI-Powered Bundle Intelligence</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
              <Icon name="shield" size={24} className="text-amber-400" />
              <span className="font-bold text-white text-lg">Admin Access</span>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Icon name="lock" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && pw === ADMIN_PASSWORD && setAuth(true)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                  placeholder="Enter password"
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name={showPw ? 'eyeOff' : 'eye'} size={20} />
                </button>
              </div>
              <button
                onClick={() => pw === ADMIN_PASSWORD ? setAuth(true) : notify('Invalid password', 'err')}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-bold rounded-xl text-lg"
              >
                Access Bundle Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PRODUCT CARD
  const Card = ({ p }) => {
    const exp = expanded === p.id;
    const pr = p.price || {};
    const vr = p.viral || {};
    const mk = p.market || {};
    const bsr = p.bsr || {};
    const rev = p.reviews || {};
    const comp = p.competition || {};
    const lst = p.listing || {};
    const prof = p.profitability || {};
    
    return (
      <div className={`bg-white rounded-2xl border-2 ${inBundle(p.id) ? 'border-amber-400' : 'border-slate-200'} shadow-lg overflow-hidden`}>
        <div className={`h-2 ${mk.urgency === 'High' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`} />
        <div className="p-5">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-3xl">{p.emoji || '📦'}</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{p.category}</span>
                {mk.urgency === 'High' && <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">🔥 HOT</span>}
                {comp.level === 'Low' && <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold">✓ Low Competition</span>}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">{p.name}</h3>
              {p.asin && <p className="text-xs text-slate-500">ASIN: {p.asin}</p>}
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-3 rounded-2xl text-center shrink-0">
              <div className="text-xs opacity-90">SCORE</div>
              <div className="text-2xl font-black">{vr.score || '-'}</div>
            </div>
          </div>

          <p className="text-slate-600 mb-4">{p.desc}</p>

          {/* BSR & Monthly Sales */}
          {bsr.rank && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-orange-700 flex items-center gap-2">
                  <Icon name="award" size={16} /> BSR #{bsr.rank.toLocaleString()}
                </span>
                {bsr.trend === 'Rising' && <span className="text-green-600 font-bold flex items-center gap-1"><Icon name="arrowUp" size={14} /> +{bsr.change}</span>}
              </div>
              {bsr.category && <p className="text-xs text-slate-600 mb-1">Category: {bsr.category}</p>}
              {bsr.monthlySales && (
                <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg mt-2">
                  <Icon name="barChart" size={14} className="text-green-600" />
                  <span className="text-sm font-bold text-green-700">~{bsr.monthlySales.toLocaleString()} units/mo</span>
                </div>
              )}
            </div>
          )}

          {/* Reviews & Competition */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {rev.count && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="star" size={14} className="text-blue-600" />
                  <span className="text-xs text-slate-600">Reviews</span>
                </div>
                <div className="font-bold text-blue-700">{rev.count.toLocaleString()}</div>
                {rev.rating && <div className="text-xs text-slate-600">⭐ {rev.rating} avg</div>}
              </div>
            )}
            {comp.sellers && (
              <div className={`border rounded-xl p-3 ${comp.level === 'Low' ? 'bg-green-50 border-green-200' : comp.level === 'Medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="users" size={14} className={comp.level === 'Low' ? 'text-green-600' : comp.level === 'Medium' ? 'text-yellow-600' : 'text-red-600'} />
                  <span className="text-xs text-slate-600">Sellers</span>
                </div>
                <div className={`font-bold ${comp.level === 'Low' ? 'text-green-700' : comp.level === 'Medium' ? 'text-yellow-700' : 'text-red-700'}`}>{comp.sellers}</div>
                <div className="text-xs text-slate-600">{comp.level} competition</div>
              </div>
            )}
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-slate-100 p-3 rounded-xl text-center"><div className="text-xs text-slate-500">Cost</div><div className="font-bold">${pr.cost}</div></div>
            <div className="bg-blue-100 p-3 rounded-xl text-center"><div className="text-xs text-slate-500">Sell</div><div className="font-bold text-blue-700">${pr.sell}</div></div>
            <div className="bg-green-100 p-3 rounded-xl text-center"><div className="text-xs text-slate-500">Margin</div><div className="font-bold text-green-700">{pr.margin}%</div></div>
            <div className="bg-purple-100 p-3 rounded-xl text-center"><div className="text-xs text-slate-500">ROI</div><div className="font-bold text-purple-700">{pr.roi}%</div></div>
          </div>

          {/* Profitability Estimate */}
          {prof.monthly && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="dollarSign" size={16} className="text-green-600" />
                <span className="font-bold text-green-700">Profit Potential</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-slate-600">Monthly:</span> <span className="font-bold text-green-700">${prof.monthly.toLocaleString()}</span></div>
                <div><span className="text-slate-600">Yearly:</span> <span className="font-bold text-green-700">${prof.yearly.toLocaleString()}</span></div>
              </div>
              {prof.breakeven && <p className="text-xs text-slate-600 mt-1">Break even at {prof.breakeven} units</p>}
            </div>
          )}

          {/* Viral Info */}
          {vr.reason && (
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="trendingUp" size={16} className="text-pink-600" />
                <span className="font-bold text-pink-700">{vr.platform}</span>
              </div>
              <p className="text-slate-700 text-sm">{vr.reason}</p>
              {vr.views && <p className="text-xs text-pink-600 mt-1">👁 {vr.views} views</p>}
            </div>
          )}

          {/* Bundle Suggestions */}
          {p.bundleWith && p.bundleWith.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="layers" size={16} className="text-purple-600" />
                <span className="font-bold text-purple-700 text-sm">Bundle With:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.bundleWith.map((b, i) => (
                  <span key={i} className="bg-white text-purple-700 px-2 py-1 rounded text-xs">+ {typeof b === 'string' ? b : b.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button onClick={() => toggleBundle(p)} className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${inBundle(p.id) ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <Icon name="plus" size={18} /> {inBundle(p.id) ? 'Added ✓' : 'Add to Bundle'}
            </button>
            <button onClick={() => toggleSave(p)} className={`p-3 rounded-xl ${isSaved(p.id) ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
              <Icon name="bookmark" size={20} />
            </button>
            <button onClick={() => setExpanded(exp ? null : p.id)} className="p-3 rounded-xl bg-slate-100 text-slate-600">
              <Icon name={exp ? 'chevronUp' : 'chevronDown'} size={20} />
            </button>
          </div>

          {/* Expanded Details */}
          {exp && (
            <div className="mt-4 pt-4 border-t-2 border-dashed space-y-4">
              {/* Listing Quality */}
              {lst.quality && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="package" size={16} className="text-slate-600" />
                    <span className="font-bold text-slate-700">Listing Quality: {lst.quality}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {lst.images && <div className="text-slate-600">📸 {lst.images} images</div>}
                    {lst.bullets && <div className="text-slate-600">• {lst.bullets} bullets</div>}
                    {lst.description && <div className="text-slate-600">📝 {lst.description}</div>}
                  </div>
                </div>
              )}

              {/* Supplier Pricing */}
              {p.suppliers && (
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">Supplier Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(p.suppliers).map(([name, price]) => (
                      <span key={name} className="bg-slate-100 px-3 py-2 rounded-lg text-sm"><strong className="capitalize">{name}:</strong> ${price}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="flex gap-2">
                {p.asin ? (
                  <a href={`https://amazon.com/dp/${p.asin}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    <Icon name="externalLink" size={16} /> Amazon
                  </a>
                ) : (
                  <a href={`https://amazon.com/s?k=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-orange-500 text-white rounded-xl font-medium">Search Amazon</a>
                )}
                <a href={`https://alibaba.com/trade/search?SearchText=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-amber-500 text-white rounded-xl font-medium">Alibaba</a>
                <a href={`https://cjdropshipping.com/search.html?keyword=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-blue-500 text-white rounded-xl font-medium">CJ</a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Version Info Modal */}
      {showVersion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowVersion(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Ark Bundle Hub</h2>
                <p className="text-amber-600 font-bold">Version 2.3 JSON Fixed</p>
              </div>
              <button onClick={() => setShowVersion(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Icon name="x" size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-bold text-green-800 mb-2">✨ v2.2 Debugged + Instagram (Current)</h3>
                <p className="text-sm text-slate-600 mb-2">December 6, 2025</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>🐛 <strong>Fixed search errors</strong> - Better error handling & debugging</li>
                  <li>📸 <strong>Instagram Reels search</strong> - Now finds viral Instagram products!</li>
                  <li>🔍 Searches TikTok + Instagram + Amazon simultaneously</li>
                  <li>💬 Console logging for debugging issues</li>
                  <li>⚡ Improved JSON parsing from AI responses</li>
                  <li>✅ Better error messages when search fails</li>
                  <li>🔥 Auto-updating date system</li>
                  <li>📊 Monthly sales, reviews, competition data</li>
                  <li>💰 Profit calculations</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-800 mb-2">📱 Multi-Platform Search</h3>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>📱 <strong>TikTok:</strong> Viral videos and trending hashtags</li>
                  <li>📸 <strong>Instagram Reels:</strong> Trending Reels and viral products</li>
                  <li>🛒 <strong>Amazon:</strong> Best Sellers and BSR rankings</li>
                  <li>🔄 <strong>Cross-platform:</strong> Finds products trending on multiple platforms</li>
                  <li>📅 <strong>Current data:</strong> {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-800 mb-2">🚀 v1.0 Initial Release</h3>
                <p className="text-sm text-slate-600 mb-2">Original Features</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• AI-powered product discovery</li>
                  <li>• BSR tracking</li>
                  <li>• Basic pricing analysis</li>
                  <li>• Bundle creator</li>
                  <li>• Viral score tracking</li>
                  <li>• Export to CSV/JSON</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="font-bold text-purple-800 mb-2">💡 How Auto-Fresh Search Works</h3>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Every time you search,</strong> the app automatically injects TODAY'S DATE into the AI prompt. 
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  So if you search on <strong>January 1, 2025</strong>, it searches for "January 2025 trending products". 
                  If you search on <strong>February 1, 2025</strong>, it searches for "February 2025 trending products".
                </p>
                <p className="text-sm text-slate-700">
                  <strong>The AI is instructed to:</strong> Focus on products trending in the last 30 days, balance new viral items 
                  with proven consistent sellers, and pull current BSR data. You get fresh results every day without changing anything!
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowVersion(false)} className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {notif && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-white ${notif.t === 'err' ? 'bg-red-500' : 'bg-green-500'}`}>
          <Icon name="check" size={20} />
          {notif.m}
          <button onClick={() => setNotif(null)}><Icon name="x" size={18} /></button>
        </div>
      )}

      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-red-500 text-white px-5 py-2 rounded-xl font-black text-xl">
                <Icon name="gift" size={28} /> ARK
              </div>
              <div>
                <p className="font-bold text-lg">Bundle Intelligence</p>
                <button onClick={() => setShowVersion(true)} className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                  Multi-Platform Search • v2.3
                  <Icon name="alert" size={12} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs text-purple-300">TikTok • Instagram • Amazon</p>
                <p className="text-xs text-purple-400">{new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} Data</p>
              </div>
              <button onClick={() => setAuth(false)} className="p-3 rounded-xl bg-white/10 hover:bg-red-500">
                <Icon name="lock" size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Icon name="search" size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && scan(searchTerm)}
                placeholder="Search for products..."
                className="w-full pl-14 pr-4 py-4 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-lg"
              />
            </div>
            <button
              onClick={() => scan(searchTerm)}
              disabled={scanning}
              className="px-10 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-3 text-lg"
            >
              {scanning ? <Icon name="loader" size={24} className="animate-spin" /> : <Icon name="search" size={24} />}
              {scanning ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        {status && (
          <div className="bg-amber-500 text-slate-900 py-2 px-4 font-medium flex items-center gap-2">
            <Icon name="loader" size={18} className="animate-spin" />
            {status}
          </div>
        )}
      </header>

      <div className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCategory(c.id); scan('', c); }}
              disabled={scanning}
              className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap ${selectedCategory === c.id ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-2"><Icon name="alert" size={20} /> {error}</span>
            <button onClick={() => setError('')}><Icon name="x" size={20} /></button>
          </div>
        )}

        {bundleItems.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-6">
            <h3 className="font-black text-slate-800 text-xl mb-4 flex items-center gap-3">
              <Icon name="layers" size={24} className="text-amber-600" /> Your Bundle ({bundleItems.length})
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {bundleItems.map(p => (
                <div key={p.id} className="bg-white border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-3">
                  <span>{p.emoji} {p.name?.slice(0, 20)}...</span>
                  <span className="text-green-600 font-bold">${p.price?.cost}</span>
                  <button onClick={() => toggleBundle(p)}><Icon name="x" size={18} /></button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <input value={bundleName} onChange={e => setBundleName(e.target.value)} placeholder="Bundle name" className="px-4 py-3 border-2 border-slate-200 rounded-xl w-52" />
              <span>Markup: <input type="number" value={markup} onChange={e => setMarkup(parseFloat(e.target.value) || 2.5)} step="0.1" className="w-16 px-2 py-1 border rounded text-center" />x</span>
              <span>Cost: <strong>${bundleItems.reduce((s, p) => s + (p.price?.cost || 10), 0).toFixed(2)}</strong></span>
              <span className="text-green-600 font-bold">Price: ${(bundleItems.reduce((s, p) => s + (p.price?.cost || 10), 0) * markup).toFixed(2)}</span>
              <button onClick={createBundle} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-bold">Create Bundle</button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            {[['discover', 'Discover', products.length], ['saved', 'Saved', saved.length], ['bundles', 'Bundles', bundles.length]].map(([id, label, count]) => (
              <button key={id} onClick={() => setTab(id)} className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${tab === id ? 'bg-amber-500 text-white' : 'bg-white text-slate-700 border-2 border-slate-200'}`}>
                {label} ({count})
              </button>
            ))}
          </div>
          {tab === 'discover' && products.length > 0 && (
            <div className="flex gap-2">
              <button onClick={() => setHotOnly(!hotOnly)} className={`px-4 py-2 rounded-xl text-sm font-medium ${hotOnly ? 'bg-red-500 text-white' : 'bg-white border-2 border-slate-200'}`}>
                <Icon name="zap" size={16} className="inline mr-1" /> Hot
              </button>
              <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl">
                <option value="score">Score</option>
                <option value="margin">Margin</option>
              </select>
            </div>
          )}
        </div>

        {tab === 'discover' && (
          filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{filtered.map(p => <Card key={p.id} p={p} />)}</div>
          ) : !scanning && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
              <Icon name="gift" size={80} className="mx-auto text-amber-400 mb-6" />
              <h2 className="text-3xl font-black text-slate-800 mb-3">Find Winning Bundles</h2>
              <p className="text-slate-500 mb-8">Search or pick a category above</p>
              <button onClick={() => scan('viral trending products')} className="px-10 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-bold rounded-xl text-lg">
                <Icon name="refresh" size={22} className="inline mr-2" /> Discover Trending
              </button>
            </div>
          )
        )}
        
        {tab === 'saved' && (
          saved.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{saved.map(p => <Card key={p.id} p={p} />)}</div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
              <Icon name="bookmark" size={80} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-xl">No saved products</p>
            </div>
          )
        )}
        
        {tab === 'bundles' && (
          bundles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {bundles.map(b => (
                <div key={b.id} className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-black text-xl">{b.name}</h3>
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">{b.margin}%</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {b.items.map(p => (
                      <div key={p.id} className="flex justify-between bg-slate-50 p-3 rounded-xl">
                        <span>{p.emoji} {p.name}</span>
                        <span>${p.price?.cost}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t text-center">
                    <div><p className="text-sm text-slate-400">Cost</p><p className="font-bold text-xl">${b.cost.toFixed(2)}</p></div>
                    <div><p className="text-sm text-slate-400">Price</p><p className="font-bold text-xl text-green-600">${b.price.toFixed(2)}</p></div>
                    <div><p className="text-sm text-slate-400">Profit</p><p className="font-bold text-xl text-purple-600">${(b.price - b.cost).toFixed(2)}</p></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
              <Icon name="layers" size={80} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-xl">No bundles yet</p>
            </div>
          )
        )}

        {products.length > 0 && tab === 'discover' && (
          <div className="mt-8 bg-white rounded-2xl border-2 border-slate-200 p-6 flex justify-between items-center">
            <div><p className="font-bold text-lg">Export</p><p className="text-slate-500">{filtered.length} products</p></div>
            <div className="flex gap-3">
              <button onClick={() => { const csv = ['Name,Category,Cost,Sell,Margin,Score', ...filtered.map(p => `"${p.name}","${p.category}",${p.price?.cost},${p.price?.sell},${p.price?.margin},${p.viral?.score}`)].join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `ark-${Date.now()}.csv`; a.click(); }} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center gap-2">
                <Icon name="download" size={20} /> CSV
              </button>
              <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(filtered, null, 2)); notify('Copied!'); }} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2">
                <Icon name="copy" size={20} /> JSON
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
