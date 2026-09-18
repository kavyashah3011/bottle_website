import { useState } from 'react';
import { Mail, MapPin, Phone, ShieldCheck, ChevronDown, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Private Residence Allocation',
    message: '',
  });

  const faqs = [
    {
      q: 'How does BOTVOR ensure zero microplastic contamination?',
      a: 'We bottle exclusively in lead-free crystalline flint glass with medical-grade food-contact silicone gaskets and aerospace-grade aluminum caps. The water never encounters plastic piping or storage vessels at any stage from artesian aquifer extraction to sealing.'
    },
    {
      q: 'What is the minimum volume for Private Client Allocation?',
      a: 'Private residential allocations are dispatched in custom wooden crates containing 12 vessels (500ml or 750ml). Direct standing weekly or monthly courier replenishment is available in designated metropolitan corridors.'
    },
    {
      q: 'Is BOTVOR available for Michelin-starred hospitality accounts?',
      a: 'Yes. Our Grand Cuvée (750ml) and Executive Monolith (1000ml) are allocated to fine dining establishments and private member clubs. Sommelier tasting samples are coordinated directly through our Zurich and Milan offices.'
    },
    {
      q: 'Can bottles be returned or recycled?',
      a: 'BOTVOR vessels are 100% infinitely recyclable. In our flagship metropolitan hubs (New York, Milan, Tokyo, Geneva), our white-glove courier retrieves empty vessels for sterilization and circular closed-loop reuse.'
    }
  ];

  const showrooms = [
    {
      city: 'NEW YORK',
      address: '740 Madison Avenue, 4th Floor',
      contact: '+1 (212) 555-0182 • ny@botvor.com',
    },
    {
      city: 'MILAN',
      address: 'Via Montenapoleone 8',
      contact: '+39 02 5550 4911 • milan@botvor.com',
    },
    {
      city: 'TOKYO',
      address: 'Ginza 6-Chome, Chuo-ku',
      contact: '+81 3 5550 8201 • tokyo@botvor.com',
    },
    {
      city: 'GENEVA',
      address: 'Rue du Rhône 42',
      contact: '+41 22 555 7730 • geneva@botvor.com',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-brand-amber" />
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            // CONTACT US & SHOWROOMS
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase max-w-4xl leading-[1.05]">
          PRIVATE ALLOCATION<br />
          <span className="text-stroke-subtle font-light">& GLOBAL</span> INQUIRIES.
        </h1>

        <p className="text-base sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
          Direct liaison for private cellars, diplomatic residences, fine dining hospitality, and executive corporate orders.
        </p>
      </section>

      {/* Main Form & Showrooms Layout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center gap-6 text-center py-16">
                <CheckCircle2 className="w-16 h-16 text-brand-amber animate-pulse" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">
                  Inquiry Received
                </h3>
                <p className="text-sm text-white/60 max-w-md leading-relaxed">
                  Thank you for reaching out to BOTVOR Client Services. Your inquiry has been logged and our team will reach out within one business day.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                    Direct Liaison Desk
                  </span>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight">
                    Submit Private Request
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/70 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/70 uppercase">Corporate / Private Email</label>
                    <input
                      type="email"
                      required
                      placeholder="j.vance@sovereign.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/70 uppercase">Inquiry Classification</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-brand-elevated border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-amber"
                  >
                    <option>Private Residence Allocation</option>
                    <option>Michelin Hospitality & Sommelier Wholesale</option>
                    <option>Executive Corporate & Private Aviation</option>
                    <option>Press & Editorial Media Kit</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/70 uppercase">Allocation Requirements / Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify projected volume, delivery location, and custom bottle engraving requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brand-amber text-black font-extrabold tracking-widest text-xs uppercase hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl mt-2"
                >
                  <span>SEND INQUIRY / CONTACT US</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Global Showrooms */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
              <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                Metropolitan Presence
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                Global Flagships
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {showrooms.map((room) => (
                <div
                  key={room.city}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white uppercase">{room.city}</span>
                    <MapPin className="w-3.5 h-3.5 text-brand-amber" />
                  </div>
                  <span className="text-xs text-white/60">{room.address}</span>
                  <span className="text-[11px] font-mono text-brand-amber/80 pt-1">{room.contact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
              Frequently Addressed Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Essential Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-6 rounded-2xl glass-panel border border-white/10 cursor-pointer hover:border-brand-amber/40 transition-colors flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm sm:text-base font-bold text-white uppercase">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-amber transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed pt-2 border-t border-white/5 animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
