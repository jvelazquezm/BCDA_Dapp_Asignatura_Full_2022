import EvaluacionesList from "./EvaluacionesList";
import AñadirEvaluacion from "./AñadirEvaluacion";
import EditarEvaluacion from "./EditarEvaluacion";

const EvaluacionesPage = () => (
    <section className="AppEvaluaciones">
        <h2>Evaluaciones</h2>

        <EvaluacionesList/>
        <AñadirEvaluacion/>
        <EditarEvaluacion/>
    </section>
);

export default EvaluacionesPage;
