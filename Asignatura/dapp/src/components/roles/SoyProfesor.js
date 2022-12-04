
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const profesoresLength = useCacheCall("Asignatura", "profesoresLength") || 0;

    let profesAddrList = useCacheCall(['Asignatura'], call => {
        let list = [];
        for (let i = 0; i<profesoresLength; i++) {
            const v = call("Asignatura", "profesores", i); 
            list.push(v);
        }
        return list;
    });

    if (!profesAddrList.includes(drizzleState.accounts[0])) {
        return null
    }
    return <>
        {children}
    </>
};

export default SoyProfesor;
