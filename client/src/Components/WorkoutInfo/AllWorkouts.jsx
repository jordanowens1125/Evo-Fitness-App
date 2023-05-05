import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import NoData from "../Shared/NoData";
import DisplaySets from "../Shared/DisplaySets";

const AllWorkouts = () => {
  const context = useContext(DataContext);
  const data = context.data;

  return (
    <>
      <div className="page">
        <h1 className="padding-md">All Workouts</h1>
        {data.length > 0 ? (
          <>
            {data.map((item) => {
              if (item.exercises.length > 0) {
                return (
                  <div key={item.date} className="secondary-border padding-md">
                    <h3 className="primary heading-md margin-bottom-md">
                      Date: {item.date}
                    </h3>

                    {item.exercises.map((exercise) => {
                      //Depends on exercise
                      return (
                        <section
                          className="padding-md"
                          key={item.date + exercise.name}
                        >
                            <DisplaySets exercise={exercise} displayName={true}/>
                        </section>
                      );
                    })}
                  </div>
                );
              } else {
                return <div key={item.date}>

                </div>;
              }
            })}
          </>
        ) : (
          <>
            <NoData />
          </>
        )}
      </div>
    </>
  );
};

export default AllWorkouts;
