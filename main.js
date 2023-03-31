var song1 = "";
var song2 = ""
var tocando = false;

var rightWristyX = 0;
var rightWristyY = 0;

var leftWristyX = 0;
var leftWristyY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(550, 500);
    canvas.position(390, 190);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("O modelo PoseNet foi inicializado com sucesso!");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);

        leftWristyX = results[0].pose.leftWrist.x;
        leftWristyY = results[0].pose.leftWrist.y;
        console.log("LeftWridtX = " + leftWristyX + "LeftWristY = " + leftWristyY);

        rightWristyX = results[0].pose.rightWrist.x;
        rightWristyX = results[0].pose.rightWrist.y;
        console.log("RightWridtX = " + rightWristyX + "RightWristY = " + rightWristyY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
}

function play()
{
    if (tocando == false)
    {
        song2.play();
        tocando = true
        song2.setVolume(0.5);
        song2.rate(1);
    }

}