import React from "react";


export let endDateRef = [];
export let startDateRef = [];
export let detailsRef = [];


export function AddAvailability() {
  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemiBYearRef = React.useRef(null);
  const itemiBMonthRef = React.useRef(null);
  const itemiBDayRef = React.useRef(null);
  const itemiEYearRef = React.useRef(null);
  const itemiEMonthRef = React.useRef(null);
  const itemiEDayRef = React.useRef(null);

  const handleFormSubmit = () => {
    // Your form submit logic here
  };

  const handleUpdateButton = () => {
    // Your update button logic here
  };

  const handleDeleteButton = () => {
    // Your delete button logic here
  };

  // Your JSX and return statement here
  // ...

  // Export the values you need
  React.useEffect(() => {
    endDateRef.current = [
      itemiEYearRef.current?.value,
      itemiEMonthRef.current?.value,
      itemiEDayRef.current?.value
    ];
    startDateRef.current = [
      itemiBYearRef.current?.value,
      itemiBMonthRef.current?.value,
      itemiBDayRef.current?.value
    ];
    detailsRef.current = [
      itemIDRef.current?.value,
      itemNameRef.current?.value,
      itemDescRef.current?.value
    ];
  }, []);


  return (
    <div className="add-availability-form-div">
      <h1>Add your Availability</h1>
      <form className="availability-form" onSubmit={handleFormSubmit}>
        <label htmlFor="iName">Event ID (for updates):</label>
        <br />
        <input type="text" id="iID" name="iID" ref={itemIDRef} />
        <br />
        <br />
        <hr /> <br />
        <label htmlFor="iTitle">Title:</label>
        <br />
        <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
        <br />
        <br />
        <label htmlFor="iDes">Description (optional?):</label>
        <br />
        <input type="text" id="iDes" name="iDes" ref={itemDescRef} />
        <br />
        <br />

        <label>Beginning Date:</label>
        <br />
        <label>Year:&nbsp;</label>
        <input type="number" id="iBYear" name="iBYear" ref={itemiBYearRef} />
        <label>&nbsp;&nbsp;Month:&nbsp;</label>
        <input type="number" id="iBMonth" name="iBMonth" ref={itemiBMonthRef} />
        <label>&nbsp;&nbsp;Day:&nbsp;</label>
        <input type="number" id="iBDay" name="iBDay" ref={itemiBDayRef} />
        <br />
        <br />

        <label>End Date:</label>
        <br />
        <label>Year:&nbsp;</label>
        <input type="number" id="iEYear" name="iEYear" ref={itemiEYearRef} />
        <label>&nbsp;&nbsp;Month:&nbsp;</label>
        <input type="number" id="iEMonth" name="iEMonth" ref={itemiEMonthRef} />
        <label>&nbsp;&nbsp;Day:&nbsp;</label>
        <input type="number" id="iEDay" name="iEDay" ref={itemiEDayRef} />
        <br />
        <br />

        {/* add selector for which friends can see it. */}
        <div style={{ display: "flex", justifyContent: "left" }}>
          <input type="submit" id="submitButton" value="Add" />
          <input type="button" id="updateButton" value="Update" onClick={handleUpdateButton} />
          <input type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
          <input type="reset" id="resetButton" value="Reset" />
        </div>
      </form>
    </div>
  );
}
