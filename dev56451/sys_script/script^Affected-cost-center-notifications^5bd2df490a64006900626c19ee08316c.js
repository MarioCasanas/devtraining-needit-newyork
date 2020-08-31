if (current != null) {
  var thisTask = current.sys_id;
  var noNotify = new Object();

  var affectedItem = new GlideRecord('task_cost_center');
  affectedItem.addQuery('task', thisTask);
  affectedItem.query();
  while (affectedItem.next()) {
    var itemSysID = affectedItem.cost_center;
    var itemName = affectedItem.cost_center.getDisplayValue();
    if (!noNotify[itemSysID]) {
      noNotify[itemSysID] = true;
      gs.log('### Notifying subscribers of ' + itemName);
      gs.eventQueue('cost_center.affected', current, itemSysID, itemName);
      notifyParents('cmn_cost_center', itemSysID);
    }
  }
}

function notifyParents(table, itemSysID) {
   var item = new GlideRecord(table);
   item.addQuery('sys_id', itemSysID);
   item.query();
   if (item.next()) {
      if (item.parent) {
         var parentSysID = item.parent;
         var parentName = item.parent.getDisplayValue();
         if (!noNotify[parentSysID]) {
            gs.log('### Notifying subscribers of ' + parentName);
            noNotify[parentSysID] = true;
            gs.eventQueue('cost_center.affected', current, parentSysID, parentName);
            notifyParents(table, parentSysID);
         }
      }
   }
}