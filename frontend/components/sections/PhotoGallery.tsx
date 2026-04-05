const photos = [
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop',
    alt: 'Happy Mbelee Maisha members celebrating',
    label: 'Happy Members',
  },
  {
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80&auto=format&fit=crop',
    alt: 'Kenyan family together at home',
    label: 'Family Protection',
  },
  {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&auto=format&fit=crop',
    alt: 'Satisfied welfare organization member smiling',
    label: 'Satisfied Clients',
  },
  {
    src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80&auto=format&fit=crop',
    alt: 'Children benefiting from education savings plan',
    label: 'Education Savings',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop',
    alt: 'Medical care supported by welfare package',
    label: 'Medical Cover',
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop',
    alt: 'Dignified funeral ceremony supported by last expense package',
    label: 'Dignified Farewells',
  },
  {
    src: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80&auto=format&fit=crop',
    alt: 'Community members at welfare group meeting',
    label: 'Community Support',
  },
  {
    src: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=600&q=80&auto=format&fit=crop',
    alt: 'Family gathering and celebrating together',
    label: 'Joyful Families',
  },
]

export default function PhotoGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#22c55e]/10 text-[#22c55e] px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Our Community
          </span>
          <h2 className="section-title mb-4">Happy Members & Families</h2>
          <p className="text-gray-500">
            Every photo tells a story of dignity, hope, and support. See the lives we touch every day
            across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  i === 0 ? 'h-80 md:h-full' : 'h-48'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f5e]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
