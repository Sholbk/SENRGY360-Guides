'use client';

import { useState } from 'react';

const freeGuides = [
  {
    id: 'mold',
    title: 'Guide to Mold-Free Living',
    description: 'Learn to identify, prevent, and eliminate mold in your home for healthier indoor air quality.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    file: 'mold-free-guide.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'laundry',
    title: 'Healthy Laundry Guide',
    description: 'Discover non-toxic laundry practices and products for cleaner, healthier clothes.',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=400&fit=crop',
    file: 'laundry-guide.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'water',
    title: 'Healthy Water Guide',
    description: "Optimize your home's water quality with filtration and purification strategies.",
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop',
    file: 'water-guide.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-1.2 2.4-4 5.6-4 8a4 4 0 108 0c0-2.4-2.8-5.6-4-8z" />
      </svg>
    ),
  },
  {
    id: 'lighting',
    title: 'Healthy Lighting Guide',
    description: 'Create optimal lighting environments that support your circadian rhythm and wellbeing.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&h=400&fit=crop',
    file: 'lighting-guide.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const premiumGuides = [
  {
    id: 'mold-advanced',
    title: 'Advanced Mold Remediation',
    description: 'Professional-level mold assessment, remediation protocols, and long-term prevention systems for your entire home.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    price: '$47',
    features: ['Step-by-step remediation protocols', 'Professional testing methods', 'Prevention maintenance plans', 'Product recommendations'],
    url: '#', // Replace with GoHighLevel link
  },
  {
    id: 'air-quality',
    title: 'Indoor Air Quality Masterclass',
    description: 'Comprehensive guide to testing, monitoring, and optimizing your indoor air for peak health and performance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    price: '$47',
    features: ['Air quality testing protocols', 'HVAC optimization guide', 'Filtration system comparisons', 'Seasonal maintenance checklists'],
    url: '#', // Replace with GoHighLevel link
  },
  {
    id: 'water-advanced',
    title: 'Whole-Home Water Systems',
    description: 'From well water to city supply — build a complete water filtration and purification strategy for every tap in your home.',
    image: 'https://images.unsplash.com/photo-1585687433056-c884e1a29a8b?w=600&h=400&fit=crop',
    price: '$47',
    features: ['Water testing & analysis', 'Whole-home filtration design', 'Point-of-use solutions', 'Maintenance schedules'],
    url: '#', // Replace with GoHighLevel link
  },
  {
    id: 'emf',
    title: 'EMF & Electrical Health',
    description: 'Understand electromagnetic fields in your home and implement practical strategies to reduce exposure.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop',
    price: '$47',
    features: ['EMF measurement guide', 'Room-by-room assessment', 'Shielding strategies', 'Low-EMF product alternatives'],
    url: '#', // Replace with GoHighLevel link
  },
];

export default function Home() {
  const [selectedGuides, setSelectedGuides] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleGuide = (id: string) => {
    setSelectedGuides(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGuides.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, selectedGuides }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedGuideDetails = freeGuides.filter(g => selectedGuides.includes(g.id));

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #F5F0E1 50%, #FAFAF8 100%)' }}>
      {/* Header */}
      <header className="px-6 py-4 max-w-7xl mx-auto flex items-center gap-3">
        <img src="/logo.png" alt="SENERGY360 Logo" className="h-24 w-24 object-contain" />
        <span className="text-lg font-semibold text-foreground tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>SENERGY360</span>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-8 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-muted uppercase mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              SENERGY360 COMMUNITY
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Path to a{' '}
              <br />
              <span style={{ color: '#C5A55A' }}>Healthier Home</span>
            </h1>
            <p className="mt-6 text-base text-muted leading-relaxed max-w-lg">
              Start with our free expert guides, then go deeper with our advanced resources. Practical, research-informed strategies you can implement immediately to optimize your home environment.
            </p>

            {/* Two-tier badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['Free Starter Guides', 'Advanced Deep-Dives', 'Expert Created'].map(badge => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card-bg text-sm text-foreground"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            {/* Arrow prompt */}
            <div className="flex items-center gap-2 mt-8 text-muted text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Start with our free guides below
            </div>
          </div>

          {/* Right side — Hero image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop"
                alt="Bright, healthy living room with natural light and plants"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute bottom-[-20px] left-8 bg-card-bg rounded-xl shadow-lg px-5 py-4 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 bg-primary-bg rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Free + Premium</p>
                <p className="text-muted text-xs">8 Expert Guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FREE GUIDES SECTION                        */}
      {/* ═══════════════════════════════════════════ */}
      <section id="free-guides" className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Free
          </span>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Start With Our Free Guides
          </h2>
          <p className="mt-4 text-muted text-base max-w-xl mx-auto">
            Select the guides you&apos;d like — enter your email and get instant access. No cost, no obligation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freeGuides.map(guide => {
            const isSelected = selectedGuides.includes(guide.id);
            return (
              <div
                key={guide.id}
                onClick={() => toggleGuide(guide.id)}
                className={`relative bg-card-bg rounded-xl border overflow-hidden transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-border hover:shadow-md'
                }`}
              >
                {/* Free badge */}
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                  Free
                </div>

                {/* Card image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary-bg rounded-lg flex items-center justify-center text-primary">
                      {guide.icon}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{guide.title}</h3>
                  </div>
                  <p className="text-muted text-xs leading-relaxed mt-2">
                    {guide.description}
                  </p>

                  {/* Divider + checkbox */}
                  <hr className="my-4 border-border" />
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    Select this guide
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto bg-card-bg rounded-2xl shadow-lg border border-border p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-subheading)' }}>
                Thank You, {firstName}!
              </h3>
              <p className="mt-2 text-muted">
                Your guides are ready! Download them below and check your email for a copy.
              </p>

              {/* Download buttons */}
              <div className="mt-8 space-y-3">
                {selectedGuideDetails.map(guide => (
                  <a
                    key={guide.id}
                    href={`/guides/${guide.file}`}
                    download
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download: {guide.title}
                  </a>
                ))}
              </div>

              {/* Upsell after free download */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted mb-3">Ready to take the next step?</p>
                <a
                  href="#premium-guides"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Explore our Advanced Guides
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-primary-bg rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground text-center" style={{ fontFamily: 'var(--font-subheading)' }}>
                Get Your Free Guides
              </h3>
              <p className="text-muted text-sm text-center mt-2 mb-6">
                Enter your email to receive instant access
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  maxLength={254}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background text-center"
                />

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={selectedGuides.length === 0 || loading}
                  className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Get My Free Guides
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {selectedGuides.length === 0 && (
                <p className="text-center text-muted text-xs mt-3">
                  Please select at least one guide above
                </p>
              )}

              <p className="text-center text-muted text-xs mt-6 leading-relaxed">
                By signing up, you agree to receive emails from SENERGY360. We respect your privacy and will never share your information.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TRANSITION / BRIDGE SECTION                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative inline-flex items-center gap-3 bg-primary-bg px-8 py-4 rounded-full border border-primary-light">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="font-semibold text-foreground text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Ready to Go Deeper?
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PREMIUM GUIDES SECTION                     */}
      {/* ═══════════════════════════════════════════ */}
      <section id="premium-guides" className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #F5F0E1, #E8D9A8)', color: '#8B6914' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Advanced
          </span>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Advanced Guides
          </h2>
          <p className="mt-4 text-muted text-base max-w-2xl mx-auto">
            Go beyond the basics with our in-depth, professional-level guides. Each includes detailed protocols, product recommendations, and expert strategies.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {premiumGuides.map(guide => (
            <div
              key={guide.id}
              className="bg-card-bg rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-5">
                {/* Image */}
                <div className="md:col-span-2 h-56 md:h-full overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                        {guide.title}
                      </h3>
                      <span className="text-lg font-bold text-primary whitespace-nowrap ml-3">{guide.price}</span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {guide.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-6">
                      {guide.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={guide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-colors text-white bg-primary hover:bg-primary-dark"
                  >
                    Get This Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle CTA */}
        <div className="mt-12 bg-card-bg rounded-2xl border-2 border-primary/30 p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #FFFDF5 0%, #F5F0E1 100%)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4" style={{ background: '#C5A55A', color: '#FFFFFF' }}>
            Best Value
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Complete Healthy Home Bundle
          </h3>
          <p className="text-muted text-base max-w-xl mx-auto mb-6">
            Get all 4 advanced guides at a special bundle price. Everything you need to transform your entire home into a healthier living environment.
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-muted line-through text-lg">$188</span>
            <span className="text-3xl font-bold text-primary">$127</span>
          </div>
          <a
            href="#" // Replace with GoHighLevel bundle link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-base"
          >
            Get the Complete Bundle
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SENERGY360 Logo" className="h-8 w-8 object-contain" />
            <span className="text-sm font-semibold text-foreground">SENERGY360</span>
          </div>
          <p className="text-sm text-muted">
            &copy; 2026 SENERGY360. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
