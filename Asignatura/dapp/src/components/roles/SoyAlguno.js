import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyAlguno = ({owner, coordinador, profesor, alumno, noMatriculado, children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    let show = false;

    const ownerAddr = useCacheCall("Asignatura", "owner");

    if (owner && ownerAddr === drizzleState.accounts[0]) show = true;
        
    const coordinadorAddr = useCacheCall("Asignatura", "coordinador");

    if (coordinador && coordinadorAddr === drizzleState.accounts[0]) show = true;

    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    let alumnosAddrList = useCacheCall(['Asignatura'], call => {
        let list = [];
        for (let i = 0; i < matriculasLength; i++) {
            const v = call("Asignatura", "matriculas", i); 
            list.push(v);
        }
        return list;
    });

    if (alumno && alumnosAddrList.includes(drizzleState.accounts[0])) show = true;

    const profesoresLength = useCacheCall("Asignatura", "profesoresLength") || 0;

    let profesAddrList = useCacheCall(['Asignatura'], call => {
        let list = [];
        for (let i = 0; i<profesoresLength; i++) {
            const v = call("Asignatura", "profesores", i); 
            list.push(v);
        }
        return list;
    });

    if (profesor && profesAddrList.includes(drizzleState.accounts[0])) show = true;

    if (noMatriculado && !alumnosAddrList.includes(drizzleState.accounts[0]) && ownerAddr !== drizzleState.accounts[0] && coordinadorAddr !== drizzleState.accounts[0] && !profesAddrList.includes(drizzleState.accounts[0])) show = true;

    return <>
        {show ? children : null}
    </>
};

export default SoyAlguno;