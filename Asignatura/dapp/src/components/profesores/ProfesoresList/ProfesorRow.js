import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const ProfesorRow = ({profesorIndex}) => {
    const {useCacheCall} = useDrizzle();

    let {addr, nombre} = useCacheCall(['Asignatura'],
        call => {
            const addr = call("Asignatura", "profesores", profesorIndex);
            const nombre = addr && call("Asignatura", "datosProfesor", addr);
            return {addr, nombre};
        }
    );

    return <tr key={"PRO-" + profesorIndex}>
            <th>P<sub>{profesorIndex}</sub></th>
            <td>{nombre}</td>
            <td>{addr}</td>
        </tr>;
};

export default ProfesorRow;