import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
  return (
    <>
      <section className="hero mt-4 ">
        <div className="py-12">
          <h1 className="text-4xl font-semibold">
            Everything
            <br /> is better
            <br /> with a <span className="text-primary">Pizza</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            Pizza is the missing piece that make every day complete, a simple
            yet delicious joy in life
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

        <div className="relative">
          <Image
            src={'/pizza.png'}
            layout={'fill'}
            alt={'Pizza'}
            objectFit={'contain'}
          />
        </div>
      </section>
    </>
  );
}
