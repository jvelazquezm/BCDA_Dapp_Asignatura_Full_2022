import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const ListarEvaluacion = ({index}) => {
    const {useCacheCall} = useDrizzle();
    
    const matriculasLength = useCacheCall("Asignatura", "matriculasLength") || 0;

    let alumnos= useCacheCall(['Asignatura'], call => {
        let addresses = [];
        for (let i = 0; i < matriculasLength; i++) {
            const address = call("Asignatura", "matriculas", i); 
            addresses.push(address);
        }
        return addresses;
    });


    let nombres= useCacheCall(['Asignatura'], call => {
        let nombres = [];
        for (let i = 0; i < matriculasLength; i++) {
            const nombre = call("Asignatura", "datosAlumno", alumnos[i]);
            nombres.push(nombre);
        }
        return nombres;
    });

    let evaluacionList = useCacheCall(['Asignatura'], call => {
        let list = [];
        let alumnoAddr;
        for (let i = 0; i < matriculasLength; i++) {
            let nombre =(nombres[i] || false) ? nombres[i]?.nombre : ""
            alumnoAddr = alumnos[i]
            const nota = call("Asignatura", "calificaciones", alumnoAddr, index); 
            list.push(
                <tr key={alumnoAddr + "" + i}>
                    <td>Alumno {i+1}</td>
                    <td>{nombre}</td>
                    <td>Evaluacion {index}</td>
                    <td>
                        {nota?.tipo === "0" ? "" : ""}
                        {nota?.tipo === "1" ? "N.P." : ""}
                        {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                    </td>
                </tr>

            );
        }
        return list;
    });

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nº Alumno</th>
                        <th>Nombre Alumno</th>
                        <th>Nº Evaluacion</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluacionList}
                </tbody>
            </table>
        </>
    );
};

export default ListarEvaluacion;