import { createSignal } from "solid-js";

const FormPage = () => {
  const [studentData, setStudentData] = createSignal({
    name: "",
    group: "",
    hasDebt: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentData());
  };

  return (
    <div style={{ "padding": "40px 20px" }}>
      <h1 style={{ 
        "color": "#2c1810",
        "font-size": "2.5rem",
        "margin-bottom": "2rem",
        "text-align": "center"
      }}>Student Data Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={studentData().name}
            onInput={(e) =>
              setStudentData({ ...studentData(), name: e.target.value })
            }
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label>Group Number:</label>
          <input
            type="text"
            value={studentData().group}
            onInput={(e) =>
              setStudentData({ ...studentData(), group: e.target.value })
            }
            placeholder="Enter group number"
          />
        </div>
        <div>
          <label style={{ "display": "flex", "align-items": "center" }}>
            <input
              type="checkbox"
              checked={studentData().hasDebt}
              onChange={(e) =>
                setStudentData({ ...studentData(), hasDebt: e.target.checked })
              }
            />
            Has Debt
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
