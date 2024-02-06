import Hero from './components/layout/Hero';
import HomeMenu from './components/layout/HomeMenu';
import SectionHeaders from './components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            "At BurgerMoon we're more than just a food destination; we're a
            culinary adventure. Our commitment to quality ingredients and
            exceptional flavors sets us apart. Whether you're indulging in our
            signature burgers, sipping on a refreshing milkshake, or enjoying
            the zing of our perfectly seasoned chicken wings, every bite is a
            celebration of taste and innovation."
          </p>
          <p>
            "Join us at BurgerMoon and experience the thrill of bold flavors and
            unforgettable meals. Whether you're grabbing a quick bite or
            treating yourself to a feast, we're here to exceed your
            expectations. where every meal is a masterpiece."
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="+11 783 128 158"
          >
            +11 783 128 158
          </a>
        </div>
      </section>
    </>
  );
}
