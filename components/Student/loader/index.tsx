import React from "react";


export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="loaderBody" aria-label="Loading" role="status" />
    </div>
  );
}
