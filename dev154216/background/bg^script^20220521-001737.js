// var schedule = new GlideSchedule('08fcd0830a0a0b2600079f56b1adb9ae');
// gs.info(schedule);

(function getDateWeekDaysInFuture(addDays) {
    var sdt = new GlideDateTime();

    while (addDays--) {
        if (isWeekend()) {
            gs.print('weekend');
            addDays++;
        } else {
            gs.print(sdt.getDate());
        }
        //sdt.addDaysLocalTime(1);//Original
        sdt.addDaysLocalTime(0);
    }

    //return sdt.getDate();
    gs.info(sdt.getDate());

    function isWeekend() {

    return(sdt.getDayOfWeekLocalTime() == '6' || sdt.getDayOfWeekLocalTime() == '7' );

    }
})(4);