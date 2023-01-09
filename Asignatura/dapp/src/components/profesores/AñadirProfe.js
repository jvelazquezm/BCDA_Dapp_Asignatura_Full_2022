import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const AñadirProfe = () => {
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
    let [profeAddr, setProfeAddr] = useState("");
    let [profeNombre, setProfeNombre] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno owner>

            <h3>Añadir Profesor</h3>

            <form>
                <p>
                    Dirección del Profesor:  &nbsp;
                    <input key="direccion" type="text" name="direccion" value={profeAddr} placeholder="Dirección del profesor"
                           onChange={ev => setProfeAddr(ev.target.value)}/>
                </p>
                <p>
                    Nombre del Profesor:  &nbsp;
                    <input key="nombre" type="text" name="nombre" value={profeNombre} placeholder="Nombre del profesor"
                           onChange={ev => setProfeNombre(ev.target.value)}/>
                </p>

                <button key="añadirProfe" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.addProfesor.cacheSend(profeAddr, profeNombre);
                            setLastStackID(stackId);
                        }}>
                    Añadir
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>);
};

export default AñadirProfe;