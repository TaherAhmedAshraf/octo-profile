import React from "react";

export default function ErrorComp({
  loading,
  error,
}: {
  loading: boolean;
  error: boolean;
}) {
  if (!loading && error) {
    return (
      <div className="bg-[#1a1e22] flex flex-col justify-center items-center h-[100vh]">
        <p className="flex justify-center items-center text-white text-xl">
          Opps! Something went wrong. Please try again later.
        </p>
        <p className="text-white text-xs mt-3">
          Make sure this github user exists.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1e22] flex flex-col justify-center items-center h-[100vh]">
      <p className="flex justify-center items-center text-white text-xl">
        Loading...
      </p>
    </div>
  );
}
