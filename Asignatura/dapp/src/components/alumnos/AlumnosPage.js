import AlumnosList from "./AlumnosList";
import Automatricula from "./Automatricula";
import Matricular from "./Matricular";
import SoyAlguno from "../roles/SoyAlguno";

const AlumnosPage = () => (
    <section className="AppAlumnos">
        <h2>Alumnos</h2>

        <SoyAlguno owner coordinador profesor>
            <AlumnosList/>
        </SoyAlguno>
        <Automatricula/>
        <Matricular/>

    </section>
);

export default AlumnosPage;
