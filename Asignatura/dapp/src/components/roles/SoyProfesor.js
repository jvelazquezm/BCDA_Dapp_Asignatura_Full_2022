
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const profesorAddr = useCacheCall("Asignatura", "profesor");

    if (profesorAddr !== drizzleState.accounts[0]) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyProfesor;
