import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";
import SoyAlguno from "../../roles/SoyAlguno";

const CalificacionesPage = () => {

    return (
        <SoyAlguno coordinador profesor>
            <section className="AppCalificaciones">
                <h3>Todas las Calificaciones</h3>
                <table>
                    <CalificacionesHead />
                    <CalificacionesBody />
                </table>
            </section>
        </SoyAlguno>

    );
};

export default CalificacionesPage;
