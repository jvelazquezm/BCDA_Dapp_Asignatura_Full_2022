import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyAlumno = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    let alumnosAddrList = useCacheCall(['Asignatura'], call => {
        let list = [];
        for (let i = 0; i < matriculasLength; i++) {
            const v = call("Asignatura", "matriculas", i); 
            list.push(v);
        }
        return list;
    });

    if (!alumnosAddrList.includes(drizzleState.accounts[0])) {
        return null
    }
    return <>
        {children}
    </>
};

export default SoyAlumno;