import ProductGrid from "../../features/products/components/ProductGrid";

function Shop() {
  return (
    <main className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Page Introduction */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Explore
          </p>

          <h1 className="mt-2 font-serif text-5xl text-stone-900 md:text-6xl">
            Our Collection
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-stone-700 md:text-lg">
            Discover fragrances crafted to become part of
            your memories.
          </p>
        </div>

        {/* Product Collection */}
        <div className="mt-10 md:mt-12">
          <ProductGrid />
        </div>

      </div>
    </main>
  );
}

export default Shop;