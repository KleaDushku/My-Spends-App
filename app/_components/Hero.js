import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-500 lg:grid lg:h-screen lg:place-content-center text-white">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 text-center">
        <Image src={'/favicon.ico'} alt='favicon' width={100} height={100} className="mx-auto mb-4" />
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
          Welcome to  <strong className="text-yellow-300"> My Spends App!</strong>
          </h1>
         
          <p className="mt-4 text-lg text-pretty sm:text-xl/relaxed text-gray-200">
          Manage your expenses with ease and organization! <br/> My Spends helps you record, analyze, and control your budget in real time.
          </p>

          <Image src='/dashboard.png' alt='dashboard'
          width={500} height={300} className="mx-auto mt-8 rounded-2xl" />
           <h4 className="text-3xl font-extrabold sm:text-2xl">
         My Spends App |by <strong className="text-yellow-300"> Klea Dushku</strong>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Hero;
