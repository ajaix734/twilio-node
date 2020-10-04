'use strict'

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const { sendController, statusController } = require('../controller/v1_controller.js')

module.exports = function(express) {
    const app = express()
    const port = process.env.PORT || 3000
    app.use(cors())
    app.use(helmet())
    app.use(compression())
    app.use(
        express.urlencoded({
          extended: true
        })
      )
    app.use(express.json())

    app.use("/v1", sendController);
    app.use("/v1", statusController);

    app.listen(port, () => console.log(`Listening on port ${port}...`))
};