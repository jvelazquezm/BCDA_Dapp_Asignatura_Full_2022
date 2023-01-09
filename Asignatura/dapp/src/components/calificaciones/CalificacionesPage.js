import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";
import MisNotas from "./MisNotas";
import CalificacionesParciales from "./CalificacionesParciales";
import EditarCalificacion from "./EditarCalificacion";

const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

            <CalificacionesTotal/>
            <CalificacionesParciales/>
            <Calificar/>
            <MisNotas/>
            <EditarCalificacion/>
        </section>
    );
};

export default CalificacionesPage;
