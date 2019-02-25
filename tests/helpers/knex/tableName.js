function tableName(routeName) {
  if (routeName.includes('-')) return routeName.replace(/-/g, '_');
  return routeName;
}

module.exports = { tableName };
