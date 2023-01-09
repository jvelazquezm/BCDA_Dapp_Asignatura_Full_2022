import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AñadirEvaluacion = () => {
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
    let [evNombre, setEvNombre] = useState("");
    let [evFecha, setEvFecha] = useState("");
    let [evPeso, setEvPeso] = useState("");
    let [evMin, setEvMin] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno coordinador>

            <h3>Añadir Evaluación</h3>

            <form>
                <p>
                    Evaluación:  &nbsp;
                    <input key="nombreEvaluacion" type="text" name="nombreEvaluacion" value={evNombre} placeholder="Nombre de la prueba de evaluacion"
                           onChange={ev => setEvNombre(ev.target.value)}/>
                </p>
                <p>
                    Fecha:  &nbsp;
                    <input key="fechaEvaluacion" type="date" name="fechaEvaluacion" value={evFecha} placeholder="Fecha de la prueba de evaluacion"
                           onChange={ev => setEvFecha(ev.target.value)}/>
                </p>
                <p>
                    Porcentaje:  &nbsp;
                    <input key="porcentajeEvaluacion" type="text" name="porcentajeEvaluacion" value={evPeso} placeholder="Ponderacion de la prueba de evaluacion"
                           onChange={ev => setEvPeso(ev.target.value)}/>
                </p>
                <p>
                    Nota mínima:  &nbsp;
                    <input key="minimoEvaluacion" type="number" name="minimoEvaluacion" value={evMin} placeholder="Nota mínima de la prueba de evaluacion"
                           onChange={ev => setEvMin(ev.target.value)}/>
                </p>

                <button key="añadirEvaluacion" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.creaEvaluacion.cacheSend(evNombre, new Date(evFecha).getTime()/1000, evPeso, evMin);
                            setLastStackID(stackId);
                        }}>
                    Añadir
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>
    );
};

export default AñadirEvaluacion;