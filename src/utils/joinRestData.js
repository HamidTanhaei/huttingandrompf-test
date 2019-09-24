export const oneToOneJoinData = (data) => {
  return data.data.map(row => {
    if(row.relationships){
      Object.keys(row.relationships).map(key => {
        row[key] = data.included.filter(relation => (
          relation.type === row.relationships[key].data.type &&
          relation.id === row.relationships[key].data.id
        ))[0];
        return row;
      });
      delete row.relationships;
    }
    return row;
  });
};
