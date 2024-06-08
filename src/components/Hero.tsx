import Button from "./Button";
import Navigation from "./Navigation";

const Hero = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navigation />

      <div className="text-center w-[90%] m-auto">
        <h1 className="text-[4rem] font-semibold pointer-events-none">
          Map <span className="gradient-text-type-1">Your Dreams</span> and Plan
          Your Perfect
          <span className="block ">
            Journey with <span className="gradient-text-type-1">WanderMap</span>
          </span>
        </h1>

        <p className="text-[1.2rem] text-light-1 font-extralight w-[80%] mx-auto mt-10 italic pointer-events-none">
          &quot; With WanderMap, marking your travel destinations has never been
          easier. Pin locations on a global map, view your marked spots, and add
          names and descriptions to each pin. Whether you're planning future
          travels or reminiscing past adventures, WanderMap helps you keep track
          of all the places you've been or wish to visit. Start creating your
          personalized travel map with WanderMap today and watch your journey
          unfold! &quot;
        </p>

        <div className="mt-10">
          <Button> Start Pin Journeys &rarr;</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
