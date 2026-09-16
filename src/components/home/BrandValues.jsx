const values = [
  {
    title: "Crafted in India",
    description:
      "Inspired by India's finest fragrance traditions.",
  },
  {
    title: "Long Lasting",
    description:
      "Carefully composed for a lasting impression.",
  },
  {
    title: "Clean & Safe",
    description:
      "Thoughtfully selected ingredients for everyday wear.",
  },
  {
    title: "Cruelty Free",
    description:
      "Fragrance created with care and responsibility.",
  },
];

function BrandValues() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

        {values.map((value) => (
          <div
            key={value.title}
            className="border-stone-200 px-5 py-8 text-center md:border-r md:px-6 md:py-9 last:md:border-r-0"
          >
            <h3 className="text-base uppercase tracking-[0.12em] text-stone-900">
              {value.title}
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-stone-700">
              {value.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default BrandValues;