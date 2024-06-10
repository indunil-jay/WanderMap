import { Link } from "react-router-dom";
import Button from "./Button";
import Navigation from "./Navigation";

const Hero = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navigation />

      <div className="text-center lg:w-[90%] m-auto">
        <h1 className="heading-1 pointer-events-none">
          Map <span className="gradient-text-type-1">Your Dreams</span> and Plan
          Your Perfect
          <span className="block ">
            Journey with <span className="gradient-text-type-1">WanderMap</span>
          </span>
        </h1>

        <p className="md:w-[80%] italic-light-text  mx-auto mt-4 lg:mt-10 pointer-events-none line-clamp-4">
          &quot; With WanderMap, marking your travel destinations has never been
          easier. Pin locations on a global map, view your marked spots, and add
          names and descriptions to each pin. Whether you're planning future
          travels or reminiscing past adventures, WanderMap helps you keep track
          of all the places you've been or wish to visit. Start creating your
          personalized travel map with WanderMap today and watch your journey
          unfold! &quot;
        </p>

        <div className="mt-10">
          <Button>
            <Link to="app">Start Pin Journeys &rarr;</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
