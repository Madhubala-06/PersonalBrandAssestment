

import { FC } from 'react';
import Link from 'next/link';

const HeroSection: FC = () => {
  return (
    <section className="w-full max-w-[1512px] self-center md:mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl leading-tight">
          <span className="block mb-4">
            AI-Powered Personal Branding for
          </span>
          <span className="block mb-4">
            HR Professionals, Founders, and
          </span>
          <span className="block">
            The Aspiring.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-950 mt-10 mb-12">
          Transform your brand with data-driven insights and specialized strategies for HR
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-[rgba(68,68,68,1)] rounded-3xl hover:bg-[rgba(51,51,51,1)] transition-colors"
          >
            Get Started
          </Link>

          <Link
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-[rgba(68,68,68,1)] border-2 border-[rgba(68,68,68,1)] bg-white hover:bg-gray-50 transition-colors rounded-3xl"
          >
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
