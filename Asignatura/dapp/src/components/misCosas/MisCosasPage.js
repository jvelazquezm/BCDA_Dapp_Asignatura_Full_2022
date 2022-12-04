import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyProfesor from "../roles/SoyProfesor";
import SoyOwner from "../roles/SoyOwner";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyAlumno from "../roles/SoyAlumno";


const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <MisDatos/>
        <SoyOwner>
            <p>Mi rol es Owner</p>
        </SoyOwner>
        <SoyCoordinador>
            <p>Mi rol es Coordinador</p>
        </SoyCoordinador>
        <SoyProfesor>
            <p>Mi rol es Profesor</p>
        </SoyProfesor>
        <SoyAlumno>
            <p>Mi rol es Alumno</p>
        </SoyAlumno> 
        <MisNotas/>

    </section>;
}

export default MisCosasPage;

