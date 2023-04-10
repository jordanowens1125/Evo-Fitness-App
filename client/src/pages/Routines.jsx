import React, { useContext,useEffect } from "react";
import { DataContext } from "../context/Context";

const Routines = () => {
  const context = useContext(DataContext);
    const routines = context.routines;
    const setRoutines = context.setRoutines
    useEffect(() => {
    }, [context, routines])
    const deleteRoutine = (index) => {
        const copiedRoutines = [...routines]
        copiedRoutines.splice(index, 1)
        setRoutines(copiedRoutines)
    }
    return <div>Routines
        {
            routines.map((routine,index) => {
                return (
                    <>
                    <div >
                        Routine{
                            index
                        }
                        {
                            routine.map((exercise) => {
                                return (
                                   exercise.name
                               )
                           }) 
                        }
                        </div>
                        {/* Edit routine */}
                        <button onClick={(e) => deleteRoutine(index)}>
                            Delete Routine
                        </button>
                    </>
                    
                )
            })
      }
  </div>;
};

export default Routines;
