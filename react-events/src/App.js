import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import Delivery from "./Delivery";

function App() {
  const [id, setId] = useState("");
  // {
  //   "id": "01HE4A8VFD2A3FYRC8STCHXH09",
  //   "budget": 50,
  //   "notes": "2 burgers",
  //   "status": "ready"
  // }

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const response = await fetch("http://localhost:8000/deliveries/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        type: "CREATE_DELIVERY",
        data,
      }),
    });
    const { id } = await response.json();
    setId(id);
  };

  return (
    <div className="py-5">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        {id === "" ? (
          <div className="card">
            <div className="card-header">Create Delivery</div>
            <form className="card-body" onSubmit={submit}>
              <div className="mb-3">
                <input
                  type="number"
                  name="budget"
                  className="form-control"
                  placeholder="Budget"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="notes"
                  className="form-control"
                  placeholder="Notes"
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        ) : (
          <Delivery />
        )}
      </div>
    </div>
  );
}

export default App;
