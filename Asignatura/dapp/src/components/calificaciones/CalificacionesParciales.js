import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import ListarEvaluacion from "./ListarEvaluacion";
import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle} = drizzleReactHooks;


const CalificacionesParciales = () => {
    const {useCacheCall} = useDrizzle();


    // Conservar los valores metidos en el formulario
    let [evaluacionParcial, setEvaluacionNumb] = useState("");

    const evaluacionesLength = useCacheCall("Asignatura", "evaluacionesLength") || 0;

    return (
        <SoyAlguno coordinador profesor>
            <h3>Calificaciones parciales</h3>
            <form>
                <p>
                    Seleccionar número de evaluación  &nbsp;
                    <input key="evaluacionParcial" type="number" name="evaluacionParcial" max={evaluacionesLength -1} min="0" value={evaluacionParcial}
                        onChange={ev => setEvaluacionNumb(ev.target.value)}/>
                </p>
            </form>
            <ListarEvaluacion index={evaluacionParcial}/>
        </SoyAlguno>
    );
};

export default CalificacionesParciales;