import { Loader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="w-full mt-32 flex justify-center">
      <Loader size={32} className="animate-spin" />
    </div>
  );
};

export { Spinner };
