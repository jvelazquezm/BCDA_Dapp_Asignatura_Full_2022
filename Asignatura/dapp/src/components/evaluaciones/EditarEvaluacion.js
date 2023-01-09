import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const EditarEvaluacion = () => {
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
    let [evIndice, setEvIndice] = useState("");
    let [evNombre, setEvNombre] = useState("");
    let [evFecha, setEvFecha] = useState("");
    let [evPeso, setEvPeso] = useState("");
    let [evMin, setEvMin] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno coordinador>

            <h3>Editar Evaluación</h3>

            <form>
                <p>
                    Índice de la evaluación:  &nbsp;
                    <input key="indiceEv" type="number" name="indiceEv" value={evIndice} placeholder="índice de la prueba de evaluacion"
                           onChange={ev => setEvIndice(ev.target.value)}/>
                </p>
                <p>
                    Evaluación:  &nbsp;
                    <input key="nombreEv" type="text" name="nombreEv" value={evNombre} placeholder="Nombre de la prueba de evaluacion"
                           onChange={ev => setEvNombre(ev.target.value)}/>
                </p>
                <p>
                    Fecha:  &nbsp;
                    <input key="fechaEv" type="date" name="fechaEv" value={evFecha} placeholder="Fecha de la prueba de evaluacion"
                           onChange={ev => setEvFecha(ev.target.value)}/>
                </p>
                <p>
                    Porcentaje:  &nbsp;
                    <input key="porcentajeEv" type="text" name="porcentajeEv" value={evPeso} placeholder="Ponderacion de la prueba de evaluacion"
                           onChange={ev => setEvPeso(ev.target.value)}/>
                </p>
                <p>
                    Nota mínima:  &nbsp;
                    <input key="minimoEv" type="number" name="minimoEv" value={evMin} placeholder="Nota mínima de la prueba de evaluacion"
                           onChange={ev => setEvMin(ev.target.value)}/>
                </p>

                <button key="editarEvaluacion" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.editEvaluacion.cacheSend(evIndice, evNombre, new Date(evFecha).getTime()/1000, evPeso, evMin);
                            setLastStackID(stackId);
                        }}>
                    Editar
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>
    );
};

export default EditarEvaluacion;