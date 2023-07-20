import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MealType } from "../types/enums";
import Button from "../components/Reusable Components/Button";
import donut from "../assets/images/donut.png";
import board from "../assets/images/board knife and carrots.png";
import coffe from "../assets/images/minimal black line pencil paper cup of coffee, croissant and candy.png";
import soup from "../assets/images/Soup with noodles in a white plate and two sticks.png";
import waiter from "../assets/images/Smiling man says welcome to tea with cake.png";
type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#BCDBE3]">
      <h1 className="font-bold text-5xl mt-10">Plan Your Meals </h1>
      <div className="flex flex-row mx-[20%]">
        <img className="h-[200px] w-[250px]" src={soup} alt="Soup" />
        <Button className="bg-[#74B9D7] text-black text-[32px] leading-none h-20 rounded-full ml-auto px-10 self-center">
          Let's get started
        </Button>
        <img
          width="250"
          height="200"
          className="ml-auto h-[200px] w-[250px]"
          src={waiter}
          alt="Waiter"
        />
      </div>

      <div className="flex flex-row justify-center">
        <div className="w-2/5 mx-5">
          <h3 className="text-2xl m-3 font-bold">About</h3>
          <p className="text-[28px]">
            You can plan your meals, daily calorie intake and keep up your
            progress. This helps you to acknowledge and change (if needed) your
            diet behavior.
          </p>
        </div>
        <div className="w-2/5 mx-4">
          <h3 className="text-2xl m-3 font-bold">Recomendations</h3>
          <p className="text-[28px]">
            Always talk to a specialist about your diet behavior and its
            changes, so you could stay healthy! Remember, it's important to eat
            healthy and nutritious food, stay active and rest. Don't restrict
            yourself from snacking, restricted diets leads to dietary failure.
          </p>
        </div>
      </div>
      <div className="flex flex-row mx-[20%] mt-[3%]">
        <img className="ml-[5%]" src={board} alt="Board" />
        <img className="ml-auto" src={donut} alt="Donut" />
        <img className="ml" src={coffe} alt="Coffe" />
      </div>
    </div>
  );
};

export default Home;
