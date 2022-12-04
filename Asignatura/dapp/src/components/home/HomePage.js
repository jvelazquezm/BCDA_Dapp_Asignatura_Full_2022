import {useState} from "react";

import {drizzleReactHooks} from '@drizzle/react-plugin'

import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from "../roles/SoyCoordinador";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function HomePage() {
    const {useCacheCall} = useDrizzle();
    const {drizzle} = useDrizzle();
    let direccionOwner = useCacheCall("Asignatura", "owner");
    let direccionCoordinador = useCacheCall("Asignatura", "coordinador");
    let asignaturaCerrada = useCacheCall("Asignatura", "cerrada");

    // Obtener el status de la ultima transaccion enviada:
    const {transactionStack, transactions} = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;

    let [coordinadorAddr, setCoordinadorAddr] = useState("");

    return (
        <>
            <p>Página Home de la Asignatura</p>
            <p>La direccion del owner es <b>{direccionOwner}</b></p>
            <p>La dirección del coordinador es <b>{direccionCoordinador}</b></p>
            <p>La asignatura está <b>{asignaturaCerrada ? "cerrada" : "abierta"}</b></p>
            <SoyOwner>
                <form>
                    <p>
                        Modificar dirección del Coordinador:  &nbsp;
                        <input key="coordinador" type="text" name="coordinador" value={coordinadorAddr} placeholder="Introduzca una direccion"
                            onChange={ev => setCoordinadorAddr(ev.target.value)}/>
                    </p>

                    <button key="cambiarCoordinador" className="pure-button" type="button"
                            onClick={ev => {
                                ev.preventDefault();
                                const stackId = drizzle.contracts.Asignatura.methods.setCoordinador.cacheSend(coordinadorAddr);
                                setLastStackID(stackId);
                            }}>
                        Modificar
                    </button>
                    <p> Último estado = {status}</p>
                </form>
            </SoyOwner>
            <SoyCoordinador>
                <form>
                    <button key="cerrarAsignatura" className="pure-button" type="button"
                            onClick={ev => {
                                ev.preventDefault();
                                const stackId = drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
                                setLastStackID(stackId);
                            }}>
                        Cerrar Asignatura
                    </button>
                    <p> Último estado = {status}</p>
                </form>
            </SoyCoordinador>

        </>
    );
}

export default HomePage;
