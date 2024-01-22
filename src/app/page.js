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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            metus ex, pulvinar a neque eu, varius tincidunt ex. Duis orci neque,
            tincidunt id dolor eget, congue tempus nisl. Proin aliquam vulputate
            orci vel tincidunt. Fusce maximus tincidunt metus. Ut fermentum
            blandit lectus, non pellentesque felis aliquet et. Vivamus ac
            malesuada massa.
          </p>
          <p>
            Phasellus ex nisl, pretium at dui in, varius feugiat felis. Donec et
            arcu rhoncus, consequat magna sit amet, dignissim elit.
          </p>
          <p>
            Pellentesque vulputate, purus vel fermentum blandit, purus leo
            ullamcorper mi, eu egestas mauris risus ut tortor.
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
            href="+46 783 128 158"
          >
            +46 783 128 158
          </a>
        </div>
      </section>
    </>
  );
}
