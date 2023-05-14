import React from "react";

function Loader() {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div
        className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
