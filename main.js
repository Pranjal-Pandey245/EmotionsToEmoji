var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width:350,
    height: 300,
    image_format:'png',
    png_quality:90
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/img>';
    });
}

console.log('ml5 version', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoded);

function modelLoded(){
    console.log("model loded");
}

function speak(){
    var synth= window.speechSynthesis;
    var speak_data_1= "The first prediction is"+prediction1;
    var speak_data_2= "And the second prediction is"+prediction2;
    var utterthis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}

function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1= results[0].label;
        prediction2= results[1].label;

        if(results[0].label== "happy"){
            document.getElementById("update_emoji").innerHTML= "&#128522;";
        }
        else if(results[0].label== "sad"){
            document.getElementById("update_emoji").innerHTML= "&#128532;";
        }
        else if(results[0].label== "angry"){
            document.getElementById("update_emoji").innerHTML= "&#128548;";
        }

        
       if(results[1].label== "happy"){
           document.getElementById("update_emoji2").innerHTML= "&#128512;";
       }
       else if(results[1].label== "sad"){
           document.getElementById("results_emoji2").innerHTML= "&#128546;";
       }
       else if(results[1].label== "angry"){
           document.getElementById("results_emoji2").innerHTML= "&#128545;";
       }
    }
}