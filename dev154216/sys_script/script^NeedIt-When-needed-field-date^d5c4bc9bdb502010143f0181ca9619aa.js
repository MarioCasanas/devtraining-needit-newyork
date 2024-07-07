(function executeRule(current, previous /*null when async*/ ) {

    // rightnow stores the current time
    var rightnow = new GlideDateTime();
    // Create a GlideDateTime object for the When needed date
    var whenNeeded = new GlideDateTime(current.u_when_needed);

    // If the When needed date is before rightnow, do not write the record to the database
    // Output an error message to the screen
    if (rightnow.getDate() == whenNeeded.getDate()) {
        gs.addErrorMessage("La Fecha de When needed no puede ser del Día Actual. Su Solicitud no puede ser grabada en la Base de Datos.");
        current.setAbortAction(true);
    }

})(current, previous);