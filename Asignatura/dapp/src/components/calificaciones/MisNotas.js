import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";
import CalificacionRow from "./CalificacionesTotal/CalificacionRow";
import CalificacionesHead from "./CalificacionesTotal/CalificacionesHead";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;


const MisNotas = () => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    let numAlumno = useCacheCall(['Asignatura'], call => {
        let index = 0;
        for (let i = 0; i < matriculasLength; i++) {
            const v = call("Asignatura", "matriculas", i);
            if (v === drizzleState.accounts[0])  index = i;
        }
        return index;
    });

    return (
        <SoyAlguno alumno>
            <h3>Mis notas</h3>
            <table>
                <CalificacionesHead/>
                <tbody>
                    <CalificacionRow key={"mn-"+numAlumno} alumnoIndex={numAlumno}/>
                </tbody>
            </table>
            
        </SoyAlguno>
    );
};

export default MisNotas;