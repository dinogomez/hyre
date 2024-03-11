"use client";

import { BentoGridSection } from "./_components/bento-grid-section";

export default function Home() {
  return (
    <div className=" w-full relative flex flex-col items-center justify-center antialiased z-40">
      <section className="">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center w-full">
            <h1 className="md:text-7xl text-4xl mb-4 font-black leading-relaxed tracking-tight ">
              Human Resources
            </h1>
            <h2 className="md:text-7xl text-4xl mb-4 font-black leading-relaxed tracking-tighter ">
              Management{" "}
              <span className="bg-highlight px-5 py-0.3">Made Easy</span>!
            </h2>
            <p className="lg:w-3/6 w-full mb-8 leading-relaxed mx-auto text-neutral-100  font-semibold text-md text-neutral-400">
              Streamline tasks and embrace a new horizon of effortless
              management. Experience a seamless workflow, where paperwork
              becomes a thing of the past, and productivity soars to new
              heights.
            </p>
          </div>
        </div>
      </section>
      <div>
        <BentoGridSection />
      </div>
    </div>
  );
}
