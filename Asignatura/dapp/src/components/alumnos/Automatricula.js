import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyAlguno from "../roles/SoyAlguno";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;


const Automatricula = () => {
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
    let [alumnoNombre, setAlumnoNombre] = useState("");
    let [alumnoDNI, setAlumnoDNI] = useState("");
    let [alumnoEmail, setAlumnoEmail] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno noMatriculado>

            <h3>Formulario de Matriculación</h3>

            <form>
                <p>
                    Nombre:  &nbsp;
                    <input key="nombre_matricula" type="text" name="nombre_matricula" value={alumnoNombre} placeholder="Nombre del alumno"
                           onChange={ev => setAlumnoNombre(ev.target.value)}/>
                </p>
                <p>
                    DNI:  &nbsp;
                    <input key="dni_matricula" type="text" name="dni_matricula" value={alumnoDNI} placeholder="DNI del alumno"
                           onChange={ev => setAlumnoDNI(ev.target.value)}/>
                </p>
                <p>
                    Email:  &nbsp;
                    <input key="email_matricula" type="text" name="email_matricula" value={alumnoEmail} placeholder="Email del alumno"
                           onChange={ev => setAlumnoEmail(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.automatricula.cacheSend(alumnoNombre, alumnoDNI, alumnoEmail);
                            setLastStackID(stackId);
                        }}>
                    Matricularse
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>);
};

export default Automatricula;
