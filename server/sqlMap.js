var sqlMap = {
  // 用户
  user: {
      findName: 'SELECT Name FROM users WHERE id = ?;',
      findNeighbors_attWeights: 'SELECT neighbors,att_weights FROM users WHERE id = ?;',
      findRecResult: 'SELECT recResult FROM users WHERE id = ?;',

  },
  movie: {
      findName: 'SELECT Name FROM movies WHERE id = ?;',
      findNeighbors_attWeights: 'SELECT neighbors,att_weights FROM movies WHERE id = ?;'
  },
  actor: {
      findName: 'SELECT Name FROM actors WHERE id = ?;',
      findNeighbors_attWeights: 'SELECT neighbors,att_weights FROM actors WHERE id = ?;'
  },
  director: {
      findName: 'SELECT Name FROM directors WHERE id = ?;',
      findNeighbors_attWeights: 'SELECT neighbors,att_weights FROM directors WHERE id = ?;'
  },
  genre: {
      findName: 'SELECT Name FROM genres WHERE id = ?;'
  }
}

module.exports = sqlMap;