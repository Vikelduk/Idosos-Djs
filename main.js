var song1 = "";
var song2 = "";

var tocando1 = false;
var tocando2 = false;

var rightWristX = 0;
var rightWristY = 0;

var leftWristX = 0;
var leftWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

var inNumberLeftWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(375, 120);

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
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);       
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWridtX = " + leftWristX + "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWridtX = " + rightWristX + "RightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        if ((leftWristX == 200) && (leftWristY == 200)) 
        {
            if (song1 == false)
            {
                song1.play();
                song2.stop();

                tocando1 = true;
                tocando2 = false;
            }
        }

    }

    if(scoreRightWrist > 0.2)
    {
        circle (rightWristX, rightWristyY, 20);

        if ((rightWristX == 200) && (rightWristY == 200))
        {
            if (song2 == false)
            {
                 song1.stop();
                song2.play();

                tocando1 = false;
                tocando2 = true;
            }
        }
    }
}