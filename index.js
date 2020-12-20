const app = require('./app')

const config = require('./config')

app.listen(config.PORT, () =>
    console.log(`Example app listening on port 3000!`)
  )