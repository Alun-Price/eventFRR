import React, { useState } from "react";

const Delivery = () => {
  const [state, setState] = useState({
    id: "01HE4A8VFD2A3FYRC8STCHXH09",
    budget: 50,
    notes: "2 burgers",
    status: "ready",
  });
  return (
    <div className="row w-100">
      <div className="col-12 mb-4">
        <h4 className="fw-bold text-white">Delivery {state.id}</h4>
      </div>
    </div>
  );
};

export default Delivery;
