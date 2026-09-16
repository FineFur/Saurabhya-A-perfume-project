import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-stone-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 md:min-h-[calc(100vh-112px)] md:grid-cols-2 md:gap-12 md:py-8">
        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-stone-600">
            New Collection
          </p>

          <h1 className="max-w-xl font-serif text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Where Memories
            <br />
            Become Fragrance
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-700">
            Crafted with rare ingredients.
            <br />
            Inspired by India.
            <br />
            Made for you.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
          >
            Explore Collection
          </Link>
        </div>

        {/* Right Image */}
        <div className="h-[500px] overflow-hidden md:h-[calc(100vh-160px)] md:min-h-[520px]">
          <img
            src="/images/hero.png"
            alt="SAURABHYA fragrance"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
