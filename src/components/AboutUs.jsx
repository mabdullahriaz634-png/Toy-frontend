import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Smile, 
  Heart, 
  Award, 
  Users, 
  ChevronRight,
  Star
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'Happy Kids & Families', value: '50,000+' },
    { label: 'Curated Premium Toys', value: '1,200+' },
    { label: 'Cities Delivered Across Pakistan', value: '150+' },
    { label: 'Customer Satisfaction Rate', value: '99.4%' },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-amber-500" />,
      title: '100% Safe & Certified',
      description: 'All products are made from non-toxic materials and rigorously tested to meet global child safety standards.',
    },
    {
      icon: <Sparkles className="w-7 h-7 text-amber-500" />,
      title: 'Playful & Educational',
      description: 'Specifically curated to stimulate cognitive development, creativity, and fine motor skills in young minds.',
    },
    {
      icon: <Truck className="w-7 h-7 text-amber-500" />,
      title: 'Nationwide Fast Express Shipping',
      description: 'Reliable doorstep delivery across Pakistan with convenient Cash on Delivery (COD) and free shipping options.',
    },
    {
      icon: <Smile className="w-7 h-7 text-amber-500" />,
      title: 'Happiness Guaranteed',
      description: 'Your child’s joy and safety are at the core of every single toy package we inspect and dispatch.',
    },
  ];

  const team = [
    {
      name: 'Ayesha Khan',
      role: 'Founder & Chief Toy Curator',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Tariq Mahmood',
      role: 'Head of Quality Assurance',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Zainab Ahmed',
      role: 'Lead Child Experience Specialist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen selection:bg-amber-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-amber-100/80 text-amber-900 mb-6 border border-amber-200/60 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-600" /> Bringing Joy Across Pakistan
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Crafting Magical Moments & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">Unlocking Imagination</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
              At <strong className="text-slate-900 font-semibold">Toy Box</strong>, we believe every child deserves a childhood filled with safe, inspiring, and unforgettable play experiences.
            </p>
          </div>
        </div>

        {/* Floating Decorative Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000"></div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600" 
                  alt="Kids playing with premium toys" 
                  className="rounded-3xl shadow-md object-cover h-56 sm:h-72 lg:h-80 w-full hover:scale-[1.02] transition-transform duration-300 border border-slate-200/50"
                />
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600" 
                  alt="Curated toy collection" 
                  className="rounded-3xl shadow-md object-cover h-56 sm:h-72 lg:h-80 w-full mt-8 sm:mt-12 hover:scale-[1.02] transition-transform duration-300 border border-slate-200/50"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Top Rated Toy Store</h4>
                  <p className="text-xs text-slate-500">Trusted by thousands of Pakistani families</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs sm:text-sm tracking-wider uppercase">
                <Heart className="w-4 h-4 fill-amber-500" /> Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                From One Simple Idea to Thousands of Happy Smiles
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Founded in Lahore, Toy Box was built on a simple vision: to make high-quality, safe, and engaging toys easily accessible to parents across Pakistan.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Today, we have grown into one of the country's most trusted destinations for premium children's goods—offering everything from remote-controlled vehicles and STEM educational kits to creative play sets.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-amber-600 text-lg">Our Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">To enrich childhood through laughter, active imagination, and natural discovery.</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-amber-600 text-lg">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">To deliver certified, top-tier products backed by exceptional customer care.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-14 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm mt-2 text-amber-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-24 bg-slate-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Why Choose Toy Box?</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">We ensure complete peace of mind for parents and endless joy for children with every order.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/60 flex flex-col items-start hover:-translate-y-1"
              >
                <div className="p-3 bg-amber-50 rounded-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs sm:text-sm tracking-wider uppercase mb-2">
              <Users className="w-4 h-4" /> Meet Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">The Minds Behind the Magic</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 group hover:shadow-xl transition-all duration-300">
                <div className="overflow-hidden h-72 sm:h-80">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                  <p className="text-amber-600 text-xs sm:text-sm font-semibold mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                Ready to Bring New Smiles Home?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                Explore our latest collection of premium toys with exclusive deals and nationwide express delivery.
              </p>
              <div className="mt-8">
                <a 
                  href="/shop" 
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 text-sm sm:text-base hover:gap-3"
                >
                  Explore Collection <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-amber-500/15 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;