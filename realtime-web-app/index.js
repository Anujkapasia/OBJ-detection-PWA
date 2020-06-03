
if ('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./serviceworker.js')
            .then((reg)=> console.log('Success: ', reg.scope))
            .catch((err)=> console.log('Faliure: ', err))
    })
}



function app(){
    const video = document.getElementById('video')
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const status = document.getElementById('status')
    const classN = document.getElementById('class-name')
    const probab = document.getElementById('probability')

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio:false, video: {facingMode:'environment'} })
        .then(function (stream) {
        video.srcObject = stream;
        })
        .catch(function (err0r) {
            alert(err0r)
        });
    }


    mobilenet.load().then(model => {
        predict()

        async function predict(){
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            context.drawImage(video,0,0)
            
            
                
                model.classify(canvas).then(predictions => {
                    console.log(predictions)
                    classN.innerHTML = `${predictions[0].className}`
                    probab.innerHTML = `${predictions[0].probability}`
                });
            
            setTimeout( () => predict(), 1000)
        }
    })
}

app()
