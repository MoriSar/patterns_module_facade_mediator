'use strict';
/**
 * Глобальный объект приложения
 * @type {Object}
 */
var MORISAR = MORISAR || {};

/**
 * Определение свободного пространства имен глобального объекта MORISAR
 * @param  {String} ns_string - строка с название создаваемого пространства имен
 * @return {Object}           - возвращает глобальный объект MORISAR
 */
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
