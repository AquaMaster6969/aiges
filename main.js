noseX=0;
noseY=0;
differenceh= 0;
differencew = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas=createCanvas(550, 550);
    canvas.position(560, 150);  

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is intialized!");
}
function gotPoses(results){
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = "+ noseX +" noseY = "+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = "+ leftWristX +" leftWristY = "+leftWristY);
        console.log("rightWristX = "+ rightWristX +" rightWristY = "+rightWristY);
        differenceh=floor(leftWristY - rightWristY);
        differencew=floor(leftWristX - rightWristX);
        console.log("height = "+ differenceh+"width = "+ differencew);
    }
}
function draw() {
    background('#629103');
    document.getElementById("rect_side").innerHTML="Height and Width of a rectangle is"+differenceh+"px"+" and "+differencew+"px";
    fill('#3533bd');
    stroke('#3533bd');
    rect(noseX, noseY, differenceh, differencew);
}

