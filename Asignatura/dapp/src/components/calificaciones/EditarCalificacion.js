import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const EditarCalificacion = () => {
    const {drizzle} = useDrizzle();

    // Obtener el status de la ultima transaccion enviada:
    const {transactionStack, transactions} = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;

    // Conservar los valores metidos en el formulario
    let [alumnoIndex, setAlumnoIndex] = useState("");
    let [indexEval, setEvalIndex] = useState("");
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno profesor>

            <h3>Editar Calificación</h3>

            <form>
                <p>
                    Índice del alumno:  &nbsp;
                    <input key="indice" type="number" name="indice" value={alumnoIndex} placeholder="índice del alumno"
                           onChange={ev => setAlumnoIndex(ev.target.value)}/>
                </p>
                <p>
                    Índice de Evaluación:  &nbsp;
                    <input key="indice_ev" type="number" name="indice_ev" value={indexEval} placeholder="Nombre de la prueba de evaluacion"
                           onChange={ev => setEvalIndex(ev.target.value)}/>
                </p>
                <p>
                    Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
                           onChange={ev => setTipo(ev.target.value)}/>
                </p>
                <p>
                    Nota (x100):  &nbsp;
                    <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
                           onChange={ev => setCalificacion(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.editCalifica.cacheSend(alumnoIndex, indexEval, tipo, calificacion);
                            setLastStackID(stackId);
                        }}>
                    Editar Calificacion
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>
    );
};

export default EditarCalificacion;