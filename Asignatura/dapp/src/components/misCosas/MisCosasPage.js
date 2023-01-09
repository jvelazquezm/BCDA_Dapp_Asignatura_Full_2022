import MisDatos from "./MisDatos";
import MisNotas from "./MisNotas";
import SoyAlguno from "../roles/SoyAlguno";


const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <MisDatos/>

        <SoyAlguno owner>
            <p>Mi rol es Owner</p>
        </SoyAlguno>
        <SoyAlguno coordinador>
            <p>Mi rol es Coordinador</p>
        </SoyAlguno>
        <SoyAlguno profesor>
            <p>Mi rol es Profesor</p>
        </SoyAlguno>
        <SoyAlguno alumno>
            <p>Mi rol es Alumno</p>
            <MisNotas/>
        </SoyAlguno> 

        

    </section>;
}

export default MisCosasPage;

