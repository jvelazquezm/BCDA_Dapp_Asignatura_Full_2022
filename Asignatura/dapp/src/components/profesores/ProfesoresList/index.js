import ProfesoresHead from "./ProfesoresHead";
import ProfesoresBody from "./ProfesoresBody";


const ProfesoresList = () => (
    <section className="AppProfesores">
        <h3>Todos los Profesores</h3>
        <table>
            <ProfesoresHead/>
            <ProfesoresBody/>
        </table>
    </section>
);

export default ProfesoresList;