import { Link } from "react-router-dom";

import ProductGrid from "../../features/products/components/ProductGrid";

function FeaturedCollection() {
  return (
    <section className="bg-white px-6 py-14 md:py-16">

      <div className="mx-auto max-w-7xl">

        <div className="mb-9 flex items-end justify-between">

          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-stone-600">
              Discover
            </p>

            <h2 className="font-serif text-4xl text-stone-900 md:text-5xl">
              Our Collection
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-sm uppercase tracking-[0.15em] underline underline-offset-4 transition hover:text-stone-600 md:block"
          >
            View All
          </Link>

        </div>

        <ProductGrid />

      </div>

    </section>
  );
}

export default FeaturedCollection;