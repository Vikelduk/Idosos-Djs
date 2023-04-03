var song1 = "";
var song2 = "";

var tocando1 = false;
var tocando2 = false;

var rightWristyX = 0;
var rightWristyY = 0;

var leftWristyX = 0;
var leftWristyY = 0;

var scoreLeftWrist = 0;

var inNumberLeftWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(375, 190);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("O modelo PoseNet foi inicializado");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);       
        
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

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristyX, leftWristyY, 20);

        if (song1 == false)
        {
            song1.play();

            tocando1 = true;
        }

    }
}

function play()
{
    if ((tocando2 == false) && (tocando1 = false))
    {
        song2.play();
        tocando2 = true

        document.getElementById("bt").className = "btn btn-danger playButton";
        document.getElementById("bt").innerHTML = "Parar Música"
    }
    else
    {
        song2.stop();
        song1.stop();
        
        tocando1 = false;
        tocando2 = false;

        document.getElementById("bt").className = "btn btn-info playButton";
        document.getElementById("bt").innerHTML = "Tocar Música"
    }
    
    song.setVolume(0.5);
    song.rate(1);

}
