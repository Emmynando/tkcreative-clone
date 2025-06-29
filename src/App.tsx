import ImgComp from "./component/ImgComp";

function App() {
  return (
    <div className="relative px-4">
      <p className="fixed z-5 top-[5%] font-normal md:w-ful lg:w-[36rem] text-[1.2rem] md:text-lg lg:text-[1.98rem] leading-[22.2594px] md:leading-[36.5244px] lg:leading-[36.5244px]">
        We believe in experiential design, placing importance on how an
        environment makes us feel & how a new space can transform and enhance
        our lives.
      </p>
      <ImgComp />
      <h2 className="fixed bottom-[5%]">TK Creative</h2>
    </div>
  );
}

export default App;
