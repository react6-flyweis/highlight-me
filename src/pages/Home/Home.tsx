import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-[#e6f4f5] rounded-lg p-5 my-4 flex flex-col justify-center">
      <h1 className="text-lg font-medium  m-0">
        Welcome Back, Community Admin
      </h1>
      <p className="mt-2">
        Here’s a quick overview of your community activity and moderation needs
      </p>
    </div>
  );
};

export default Home;
