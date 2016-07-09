'use strict';

var MORISAR = MORISAR || {};
MORISAR.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
  parent = MORISAR,
  i,
  isEmptyProps = false;
  // отбросить начальный префикс – имя глобального объекта
  if (parts[0] === 'MORISAR') {
    parts = parts.slice(1);
  }
  for (i = 0; i < parts.length; i += 1) {
    // создать свойство, если оно отсутствует
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
      isEmptyProps = true;
    }
    parent = parent[parts[i]];
  }
  if (!isEmptyProps) {
    console.warn('Свойство \'' + parts.join('.') + '\' уже существует!');
  };
  return parent;
};
