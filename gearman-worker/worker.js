const gearman = require('gearman')

let worker = gearman()

// handle jobs assigned by the server
worker.on('JOB_ASSIGN', function(job) {
    console.log('Received job =>' + job.func_name)

    // decode buffer as Base64
    const result = job.payload.toString('base64');

    // notify the server the job is done
    worker.sendWorkComplete(job.handle, result)

    // go back to sleep, telling the server we're ready for more work
    worker.preSleep()
});

// grab a job when the server signals one is available
worker.on('NOOP', function() {  worker.grabJob() })

// connect to the gearman server
worker.connect(function(){
    // register the functions this worker is capable of
    worker.addFunction('encode')

    // tell the server the worker is going to sleep, waiting for work
    worker.preSleep()
});
