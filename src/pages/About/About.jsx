import { Link } from "react-router-dom";

function About() {
  return (
    <main>

      {/* Introduction */}
      <section className="bg-stone-100 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Our Story
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight text-stone-900 md:text-6xl">
            Where Memories
            <br />
            Become Fragrance
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-700 md:text-lg">
            SAURABHYA was created with a simple belief:
            fragrance has the power to bring memories back to life.
          </p>

        </div>
      </section>


      {/* Brand Story */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">

          {/* Heading */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
              The Beginning
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
              Fragrance is more than a scent.
            </h2>
          </div>

          {/* Story */}
          <div className="space-y-5 text-base leading-8 text-stone-700">

            <p>
              Every fragrance carries a feeling. A familiar place,
              a quiet evening, a journey, or a moment that stays
              with us long after it has passed.
            </p>

            <p>
              SAURABHYA was born from this connection between
              fragrance and memory. We create contemporary
              perfumes inspired by the colours, textures and
              emotions of India.
            </p>

            <p>
              Our approach is intentionally modern. Instead of
              recreating the past, we reinterpret it through
              fragrances designed for the world today.
            </p>

          </div>

        </div>
      </section>


      {/* Indian Inspiration */}
      <section className="border-y border-stone-200 bg-stone-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
              Inspired by India
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
              Rooted in tradition.
              <br />
              Designed for today.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">

            <div className="border-t border-stone-300 pt-5">
              <h3 className="font-serif text-2xl text-stone-900">
                The Earth
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                The warmth of rain-soaked earth, woods and
                natural landscapes inspires our deeper fragrances.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5">
              <h3 className="font-serif text-2xl text-stone-900">
                The Craft
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                India's long relationship with perfumery continues
                to influence the way we think about fragrance.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-5">
              <h3 className="font-serif text-2xl text-stone-900">
                The Modern
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                Familiar inspirations are expressed through
                clean, contemporary compositions made for everyday life.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Philosophy */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Our Philosophy
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            Create something worth remembering.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-700">
            We believe a great fragrance should not simply
            smell beautiful. It should become part of your story,
            creating an association that returns every time
            you wear it.
          </p>

        </div>
      </section>


      {/* Closing CTA */}
      <section className="bg-stone-100 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="font-serif text-4xl text-stone-900 md:text-5xl">
            Find a fragrance
            <br />
            that becomes yours.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-700">
            Explore the SAURABHYA collection and discover
            a scent that stays with you.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
          >
            Explore Collection
          </Link>

        </div>
      </section>

    </main>
  );
}

export default About;