//client er den variabel der bruges til at oprette forbindelse til mqtt serveren
let client 
let connectionDiv, contentDiv

//setup er den funktion der kører, før selve web-appen går starter 
function setup() {
  connectionDiv = select('#connection')
  contentDiv = select('#hum')
  //det første vi gør her, er at oprette forbindelse til mqtt serveren - selve funktionen kan ses længere nede
  mqttInit()
  client.subscribe('#')
  //når vi modtager beskeder fra MQTT serveren kaldes denne funktion
  client.on('message', (topic, message) => {
    let newDiv = createDiv('<b>Message:</b> ' + message.toString() + '<br><b>Topic:</b> ' + topic)
    contentDiv.child(newDiv)
    console.log(contentDiv.elt.scrollTop = contentDiv.elt.scrollHeight)
  })  
}


































const mqttInit = () => {
  //opret et id med en random talkode og sæt gem servernavnet i en variabel
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  const host = 'wss://mqtt.nextservices.dk'

  //opret et objekt med de oplysninger der skal bruges til at forbinde til serveren
  const options = {
    keepalive: 300,
    clientId: clientId,
    reconnectPeriod: 1000,
  }

  console.log('connecting mqtt client')

  //forsøg at oprette forbindelse 
  client = mqtt.connect(host, options)

  //hvis der sker en fejl kaldes denne funktion
  client.on('error', (err) => {
    console.log('Connection error: ', err)
    client.end()
  })

  //og hvis forbindelsen mistes kaldes denne funktion
  client.on('reconnect', () => {
    console.log('Reconnecting...')
  })

  //hvis forbindelsen lykkes kaldes denne funktion
  client.on('connect', (t, m) => {
    console.log('Client connected:' + clientId, t)
    connectionDiv.html('<p>You are now connected to mqtt.nextservices.dk</p>')
  })

  //når forbindelsen lukkes kaldes denne funktion
  client.on('close', () => {
    console.log(clientId + ' disconnected')
  })
} 

function showChart(){
  //opret chart 
  chart = new Chart(select('#chartCanvas').elt, {
      type: 'bar',
      data: {
        labels: ['hej', 'med', 'dig'],
        datasets: [{
            label: 'Resultat',
            data: [33,10,23],
              backgroundColor: ['lightred', 'lightgreen', 'lightblue'],
              borderWidth: 3
          }]
      },
  });
}
