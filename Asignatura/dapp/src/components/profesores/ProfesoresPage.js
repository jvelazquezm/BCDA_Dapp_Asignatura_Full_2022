import ProfesoresList from "./ProfesoresList";
import AñadirProfe from "./AñadirProfe";


const ProfesoresPage = () => (
    <section className="AppProfesores">
        <h2>Profesores</h2>

        <ProfesoresList/>
        <AñadirProfe/>
    </section>
);

export default ProfesoresPage;