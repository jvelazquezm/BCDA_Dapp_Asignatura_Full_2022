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
    let [alumnoAddress, setAlumnoAddress] = useState("");
    let [alumnoNombre, setAlumnoNombre] = useState("");
    let [alumnoDNI, setAlumnoDNI] = useState("");
    let [alumnoEmail, setAlumnoEmail] = useState("");

    return (<article className="AppMisDatos">
        <SoyAlguno owner>

            <h3>Formulario de Matriculación</h3>

            <form>
                <p>
                    Direccion:  &nbsp;
                    <input key="direccion_matricula" type="text" name="direccion_matricula" value={alumnoAddress} placeholder="Direccion del alumno"
                           onChange={ev => setAlumnoAddress(ev.target.value)}/>
                </p>
                <p>
                    Nombre:  &nbsp;
                    <input key="nombre_matricula_owner" type="text" name="nombre_matricula_owner" value={alumnoNombre} placeholder="Nombre del alumno"
                           onChange={ev => setAlumnoNombre(ev.target.value)}/>
                </p>
                <p>
                    DNI:  &nbsp;
                    <input key="dni_matricula_owner" type="text" name="dni_matricula_owner" value={alumnoDNI} placeholder="DNI del alumno"
                           onChange={ev => setAlumnoDNI(ev.target.value)}/>
                </p>
                <p>
                    Email:  &nbsp;
                    <input key="email_matricula_owner" type="text" name="email_matricula_owner" value={alumnoEmail} placeholder="Email del alumno"
                           onChange={ev => setAlumnoEmail(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            const stackId = drizzle.contracts.Asignatura.methods.matricular.cacheSend(alumnoAddress, alumnoNombre, alumnoDNI, alumnoEmail);
                            setLastStackID(stackId);
                        }}>
                    Matricular Alumno
                </button>

                <p> Último estado = {status} </p>
            </form>
        </SoyAlguno>
    </article>);
};

export default Automatricula;