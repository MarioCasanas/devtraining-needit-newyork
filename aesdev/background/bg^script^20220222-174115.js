var hoy = new GlideDate();
var sysDay = hoy.getByFormat('dd/MM/YYYY');

//var fechaSeleccionada = new GlideDateTime(this.getParameter('sysparm_DesiredDate'));
var fechaSeleccionada = new GlideDateTime('22/02/2022');
var fsel = fechaSeleccionada.getDate();
var DesireDate = fsel.getByFormat('dd/MM/YYYY');

if (DesireDate < sysDay) {
    gs.info('HR_UtilsAjax - (getValidoFecha): La fecha debe ser posterior al día actual. DesireDate -> '+DesireDate+ ' < Hoy -> '+sysDay);
    //return '';
} else {
    gs.info('HR_UtilsAjax - (getValidoFecha): Asigna la Fecha -> '+DesireDate);
    //return DesireDate;
}            