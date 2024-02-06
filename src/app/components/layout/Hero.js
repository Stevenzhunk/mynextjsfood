import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
  return (
    <>
      <section className="hero md:mt-4 ">
        <div className="py-8 md:py-12">
          <h1 className="text-4xl font-semibold">
            Everything
            <br /> is better
            <br /> with a <span className="text-primary">Burger</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            A hamburger is the missing piece that makes every day complete, a
            simple yet delicious joy in life.
          </p>

          <div className="flex gap-4">
            <button className="bg-primary flex gap-2 uppercase items-center justify-center text-sm text-white px-4 py-2 rounded-full">
              {' '}
              Order now
              <Right />
            </button>
            <button className="flex gap-2 py-2 text-gray-600 font-semibold border-0 items-center">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Image
            src={'/burger.png'}
            alt={'Burger'}
            className="object-contain w-full h-full absolute"
            width={800}
            height={800}
            priority={true}
          />
        </div>
      </section>
    </>
  );
}
