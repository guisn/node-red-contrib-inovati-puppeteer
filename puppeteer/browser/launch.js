const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    this.headless = (config.headless == "1" ? true : false)
    this.slowMo = config.slowMo
    this.name = config.name
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      puppeteer.launch( { args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true, slowMo: node.slowMo } )
        .then((browser) => {
          msg.puppeteer = {
            browser
          }
          node.send(msg)
        })
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-slowMo").val(this.slowMo)
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
